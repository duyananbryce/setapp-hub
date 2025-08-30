const puppeteer = require('puppeteer');

async function deepWebsiteTest() {
  console.log('🚀 启动深度网站检测...');
  
  let browser;
  try {
    // 启动浏览器
    browser = await puppeteer.launch({
      headless: false, // 显示浏览器窗口
      devtools: true,  // 打开开发者工具
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    
    // 设置视口
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
    
    // 监听请求失败
    page.on('requestfailed', request => {
      console.log('🚫 请求失败:', request.url(), request.failure().errorText);
    });
    
    // 监听响应
    page.on('response', response => {
      const status = response.status();
      const url = response.url();
      if (status >= 400) {
        console.log(`⚠️  响应错误 ${status}: ${url}`);
      } else if (url.includes('setapp-apps-showcase')) {
        console.log(`✅ 成功加载 ${status}: ${url}`);
      }
    });
    
    console.log('🌐 导航到网站...');
    const response = await page.goto('https://duyananbryce.github.io/setapp-apps-showcase-modern/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log(`📊 主页响应状态: ${response.status()}`);
    
    // 等待一段时间让JavaScript执行
    console.log('⏳ 等待JavaScript执行...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 检查页面标题
    const title = await page.title();
    console.log(`📄 页面标题: "${title}"`);
    
    // 检查root元素
    const rootElement = await page.$('#root');
    if (rootElement) {
      const rootContent = await page.evaluate(() => {
        const root = document.getElementById('root');
        return {
          innerHTML: root.innerHTML.substring(0, 200),
          childrenCount: root.children.length,
          textContent: root.textContent.substring(0, 100)
        };
      });
      console.log('🎯 Root元素状态:');
      console.log(`  - 子元素数量: ${rootContent.childrenCount}`);
      console.log(`  - 文本内容: "${rootContent.textContent}"`);
      console.log(`  - HTML内容: "${rootContent.innerHTML}"`);
    } else {
      console.log('❌ 未找到root元素');
    }
    
    // 检查是否有应用卡片
    const appCards = await page.$$('[data-testid="app-card"], .app-card, [class*="card"]');
    console.log(`🃏 找到应用卡片数量: ${appCards.length}`);
    
    // 检查是否有搜索框
    const searchBox = await page.$('input[type="search"], input[placeholder*="搜索"], input[placeholder*="search"]');
    console.log(`🔍 搜索框存在: ${searchBox ? '是' : '否'}`);
    
    // 检查网络请求
    const performanceEntries = await page.evaluate(() => {
      return performance.getEntriesByType('navigation').map(entry => ({
        name: entry.name,
        loadEventEnd: entry.loadEventEnd,
        domContentLoadedEventEnd: entry.domContentLoadedEventEnd
      }));
    });
    console.log('⚡ 性能指标:', performanceEntries);
    
    // 检查JavaScript是否正常执行
    const jsTest = await page.evaluate(() => {
      return {
        reactExists: typeof React !== 'undefined',
        documentReady: document.readyState,
        windowLoaded: document.readyState === 'complete',
        hasErrors: window.onerror !== null
      };
    });
    console.log('🔧 JavaScript状态:', jsTest);
    
    // 截图保存
    await page.screenshot({ 
      path: '/Volumes/003/002/setapp-apps-showcase/website-screenshot.png',
      fullPage: true 
    });
    console.log('📸 已保存完整页面截图');
    
    // 等待用户查看
    console.log('\n🔍 浏览器窗口已打开，请手动检查网站状态...');
    console.log('按 Ctrl+C 结束测试');
    
    // 保持浏览器打开
    await new Promise(() => {});
    
  } catch (error) {
    console.error('💥 测试过程中出现错误:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 检查是否安装了puppeteer
try {
  require.resolve('puppeteer');
  deepWebsiteTest();
} catch (e) {
  console.log('❌ Puppeteer未安装，正在安装...');
  console.log('请运行: npm install puppeteer');
  process.exit(1);
}