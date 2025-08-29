const puppeteer = require('puppeteer');

async function finalVerification() {
  console.log('🚀 开始最终网站验证...');
  console.log('⏳ 等待GitHub Pages部署完成（约2-3分钟）...');
  
  // 等待部署完成
  await new Promise(resolve => setTimeout(resolve, 180000)); // 3分钟
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    // 监听控制台消息
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      console.log(`📝 控制台[${type.toUpperCase()}]: ${text}`);
    });
    
    // 监听页面错误
    page.on('pageerror', error => {
      console.log('❌ 页面错误:', error.message);
    });
    
    console.log('🌐 导航到修复后的网站...');
    const response = await page.goto('https://duyananbryce.github.io/setapp-apps-showcase-modern/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log(`📊 响应状态: ${response.status()}`);
    
    // 等待React应用加载
    console.log('⏳ 等待React应用加载...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 检查页面标题
    const title = await page.title();
    console.log(`📄 页面标题: "${title}"`);
    
    // 检查root元素内容
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      if (!root) return null;
      return {
        hasChildren: root.children.length > 0,
        childrenCount: root.children.length,
        hasAppCards: root.querySelector('[class*="card"], [data-testid="app-card"]') !== null,
        hasSearchBox: root.querySelector('input[type="text"], input[placeholder*="搜索"]') !== null,
        textContent: root.textContent.substring(0, 200)
      };
    });
    
    if (rootContent) {
      console.log('🎯 Root元素分析:');
      console.log(`   - 有子元素: ${rootContent.hasChildren ? '✅' : '❌'}`);
      console.log(`   - 子元素数量: ${rootContent.childrenCount}`);
      console.log(`   - 有应用卡片: ${rootContent.hasAppCards ? '✅' : '❌'}`);
      console.log(`   - 有搜索框: ${rootContent.hasSearchBox ? '✅' : '❌'}`);
      console.log(`   - 文本内容: "${rootContent.textContent}"`);
    } else {
      console.log('❌ 未找到root元素');
    }
    
    // 检查React是否正常工作
    const reactStatus = await page.evaluate(() => {
      return {
        reactExists: typeof React !== 'undefined',
        hasReactRoot: document.getElementById('root').children.length > 1,
        documentReady: document.readyState
      };
    });
    
    console.log('🔧 React状态:');
    console.log(`   - React存在: ${reactStatus.reactExists ? '✅' : '❌'}`);
    console.log(`   - React已渲染: ${reactStatus.hasReactRoot ? '✅' : '❌'}`);
    console.log(`   - 文档状态: ${reactStatus.documentReady}`);
    
    // 截图
    await page.screenshot({ 
      path: '/Volumes/003/002/setapp-apps-showcase/final-verification-screenshot.png',
      fullPage: true 
    });
    console.log('📸 已保存验证截图');
    
    // 最终结论
    const isWorking = rootContent && rootContent.hasChildren && rootContent.hasAppCards;
    
    console.log('\n' + '='.repeat(50));
    if (isWorking) {
      console.log('🎉 网站修复成功！React Router问题已解决，应用正常运行。');
    } else {
      console.log('⚠️  网站仍有问题，需要进一步调试。');
    }
    console.log('='.repeat(50));
    
    // 保持浏览器打开供用户查看
    console.log('\n🔍 浏览器窗口已打开，请手动验证网站功能...');
    console.log('按 Ctrl+C 结束验证');
    await new Promise(() => {});
    
  } catch (error) {
    console.error('💥 验证过程中出现错误:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

finalVerification().catch(console.error);