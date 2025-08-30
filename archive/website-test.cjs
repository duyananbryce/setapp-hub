const https = require('https');
const fs = require('fs');

const testWebsite = async () => {
  console.log('🔍 开始网站验证测试...');
  
  const baseUrl = 'https://duyananbryce.github.io/setapp-hub';
  
  // 测试主页
  console.log('\n1. 测试主页HTML...');
  await testUrl(`${baseUrl}/`);
  
  // 测试JavaScript文件
  console.log('\n2. 测试JavaScript文件...');
  await testUrl(`${baseUrl}/assets/index-YwzrO7r_.js`);
  
  // 测试CSS文件
  console.log('\n3. 测试CSS文件...');
  await testUrl(`${baseUrl}/assets/index-CDsEaISz.css`);
  
  // 测试CSV数据文件
  console.log('\n4. 测试CSV数据文件...');
  await testUrl(`${baseUrl}/apps_list_enhanced_descriptions.csv`);
  
  // 测试图标文件
  console.log('\n5. 测试图标文件...');
  await testUrl(`${baseUrl}/icon/Bartender.png`);
  
  console.log('\n✅ 所有测试完成！');
};

const testUrl = (url) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    https.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log(`   ${url}`);
      console.log(`   状态码: ${res.statusCode}`);
      console.log(`   响应时间: ${responseTime}ms`);
      console.log(`   内容类型: ${res.headers['content-type']}`);
      console.log(`   内容长度: ${res.headers['content-length']} bytes`);
      
      if (res.statusCode === 200) {
        console.log('   ✅ 成功');
      } else {
        console.log('   ❌ 失败');
      }
      
      res.on('data', () => {});
      res.on('end', () => resolve());
    }).on('error', (err) => {
      console.log(`   ❌ 错误: ${err.message}`);
      resolve();
    });
  });
};

testWebsite().catch(console.error);