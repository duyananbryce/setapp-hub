const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('正在访问网站...');
    await page.goto('https://duyananbryce.github.io/setapp-apps-showcase-modern/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // 等待应用数据加载
    console.log('等待应用数据加载...');
    await page.waitForSelector('[data-testid="app-card"], .app-card, .grid > div', { timeout: 15000 });
    
    // 检查是否有应用卡片
    const appCards = await page.$$eval('div[class*="card"], div[class*="app"]', cards => cards.length);
    console.log(`找到 ${appCards} 个应用卡片`);
    
    // 检查页面标题
    const title = await page.title();
    console.log(`页面标题: ${title}`);
    
    // 检查是否有搜索框
    const searchBox = await page.$('input[type="text"], input[placeholder*="搜索"], input[placeholder*="search"]');
    console.log(`搜索框存在: ${searchBox ? '是' : '否'}`);
    
    // 截图保存
    await page.screenshot({ path: 'deployment-test.png', fullPage: true });
    console.log('截图已保存为 deployment-test.png');
    
    if (appCards > 0) {
      console.log('✅ 部署验证成功！网站正常工作，应用数据已加载。');
    } else {
      console.log('❌ 部署验证失败！未找到应用数据。');
    }
    
  } catch (error) {
    console.error('验证过程中出现错误:', error.message);
  } finally {
    await browser.close();
  }
})();