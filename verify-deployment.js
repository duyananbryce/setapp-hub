import puppeteer from 'puppeteer';

async function verifyDeployment() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('正在访问Vercel部署页面...');
    await page.goto('https://setapp-apps-showcase-45jdcwlac-duyananbryces-projects.vercel.app', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // 等待页面加载
    await page.waitForTimeout(3000);
    
    // 检查页面标题
    const title = await page.title();
    console.log('页面标题:', title);
    
    // 检查是否有React根元素
    const rootElement = await page.$('#root');
    if (rootElement) {
      console.log('找到React根元素');
      
      // 检查根元素是否有内容
      const rootContent = await page.$eval('#root', el => el.innerHTML);
      if (rootContent.trim()) {
        console.log('根元素有内容，长度:', rootContent.length);
        console.log('内容预览:', rootContent.substring(0, 200) + '...');
      } else {
        console.log('根元素为空！');
      }
    } else {
      console.log('未找到React根元素！');
    }
    
    // 检查控制台错误
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`控制台错误: ${msg.text()}`);
      }
    });
    
    // 检查网络请求失败
    page.on('requestfailed', request => {
      logs.push(`请求失败: ${request.url()} - ${request.failure().errorText}`);
    });
    
    // 等待一段时间收集错误
    await page.waitForTimeout(5000);
    
    if (logs.length > 0) {
      console.log('发现错误:');
      logs.forEach(log => console.log(log));
    } else {
      console.log('未发现控制台错误');
    }
    
    // 截图保存
    await page.screenshot({ path: 'vercel-deployment-screenshot.png', fullPage: true });
    console.log('已保存截图: vercel-deployment-screenshot.png');
    
  } catch (error) {
    console.error('验证过程中出错:', error);
  } finally {
    await browser.close();
  }
}

verifyDeployment();