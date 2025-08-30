const https = require('https');
const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data.substring(0, 500) // 只取前500字符
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function checkDeployment() {
  console.log('🔍 检查GitHub Pages部署状态...');
  
  const urls = [
    'https://duyananbryce.github.io/setapp-hub/',
    'https://duyananbryce.github.io/setapp-hub/index.html',
    'https://duyananbryce.github.io/setapp-hub/assets/'
  ];
  
  for (const url of urls) {
    try {
      console.log(`\n📡 测试: ${url}`);
      const result = await makeRequest(url);
      
      console.log(`   状态码: ${result.statusCode}`);
      console.log(`   内容类型: ${result.headers['content-type'] || '未知'}`);
      console.log(`   内容长度: ${result.headers['content-length'] || '未知'}`);
      
      if (result.statusCode === 200) {
        console.log('   ✅ 成功访问');
        if (result.body.includes('<div id="root">')) {
          console.log('   ✅ 找到React根元素');
        }
        if (result.body.includes('setapp-hub')) {
          console.log('   ✅ 包含正确的base路径');
        }
      } else {
        console.log(`   ❌ 访问失败: ${result.statusCode}`);
      }
      
    } catch (error) {
      console.log(`   💥 请求错误: ${error.message}`);
    }
  }
  
  // 检查GitHub API获取部署状态
  try {
    console.log('\n🔍 检查GitHub Pages部署状态...');
    const apiUrl = 'https://api.github.com/repos/duyananbryce/setapp-hub/pages';
    const result = await makeRequest(apiUrl);
    
    if (result.statusCode === 200) {
      const pageInfo = JSON.parse(result.body);
      console.log(`   状态: ${pageInfo.status}`);
      console.log(`   URL: ${pageInfo.html_url}`);
      console.log(`   源: ${pageInfo.source?.branch}/${pageInfo.source?.path}`);
    }
  } catch (error) {
    console.log(`   GitHub API错误: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('💡 建议:');
  console.log('1. 如果主页面返回404，等待几分钟让GitHub Pages完成部署');
  console.log('2. 如果返回200但内容不正确，检查base路径配置');
  console.log('3. 如果assets返回404，检查构建输出和路径配置');
  console.log('='.repeat(50));
}

checkDeployment().catch(console.error);