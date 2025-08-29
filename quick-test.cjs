const puppeteer = require('puppeteer');

async function quickTest() {
  console.log('🚀 快速测试修复后的网站...');
  
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
      if (!text.includes('Download the React DevTools')) {
        console.log(`📝 控制台[${type.toUpperCase()}]: ${text}`);
      }
    });
    
    // 监听页面错误
    page.on('pageerror', error => {
      console.log('❌ 页面错误:', error.message);
    });
    
    console.log('🌐 导航到网站...');
    const response = await page.goto('https://duyananbryce.github.io/setapp-apps-showcase-modern/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log(`📊 响应状态: ${response.status()}`);
    
    // 等待React应用加载
    console.log('⏳ 等待React应用加载...');
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // 检查页面标题
    const title = await page.title();
    console.log(`📄 页面标题: "${title}"`);
    
    // 检查root元素内容
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      if (!root) return null;
      
      // 查找应用卡片的多种可能选择器
      const cardSelectors = [
        '[class*="card"]',
        '[data-testid="app-card"]',
        '.grid > div',
        '[class*="bg-white"][class*="rounded"]',
        '[class*="shadow"]'
      ];
      
      let appCards = 0;
      for (const selector of cardSelectors) {
        const elements = root.querySelectorAll(selector);
        if (elements.length > appCards) {
          appCards = elements.length;
        }
      }
      
      // 查找搜索框
      const searchSelectors = [
        'input[type="text"]',
        'input[placeholder*="搜索"]',
        'input[placeholder*="search"]',
        'input[class*="search"]'
      ];
      
      let hasSearchBox = false;
      for (const selector of searchSelectors) {
        if (root.querySelector(selector)) {
          hasSearchBox = true;
          break;
        }
      }
      
      return {
        hasChildren: root.children.length > 0,
        childrenCount: root.children.length,
        appCardsCount: appCards,
        hasSearchBox: hasSearchBox,
        textContent: root.textContent.substring(0, 300),
        innerHTML: root.innerHTML.substring(0, 500)
      };
    });
    
    if (rootContent) {
      console.log('🎯 Root元素分析:');
      console.log(`   - 有子元素: ${rootContent.hasChildren ? '✅' : '❌'}`);
      console.log(`   - 子元素数量: ${rootContent.childrenCount}`);
      console.log(`   - 应用卡片数量: ${rootContent.appCardsCount}`);
      console.log(`   - 有搜索框: ${rootContent.hasSearchBox ? '✅' : '❌'}`);
      console.log(`   - 文本内容: "${rootContent.textContent}"`);
      console.log(`   - HTML内容: "${rootContent.innerHTML}"`);
    } else {
      console.log('❌ 未找到root元素');
    }
    
    // 检查React是否正常工作
    const reactStatus = await page.evaluate(() => {
      return {
        reactExists: typeof React !== 'undefined',
        hasReactRoot: document.getElementById('root').children.length > 1,
        documentReady: document.readyState,
        windowReact: window.React !== undefined
      };
    });
    
    console.log('🔧 React状态:');
    console.log(`   - React存在: ${reactStatus.reactExists ? '✅' : '❌'}`);
    console.log(`   - Window.React: ${reactStatus.windowReact ? '✅' : '❌'}`);
    console.log(`   - React已渲染: ${reactStatus.hasReactRoot ? '✅' : '❌'}`);
    console.log(`   - 文档状态: ${reactStatus.documentReady}`);
    
    // 截图
    await page.screenshot({ 
      path: '/Volumes/003/002/setapp-apps-showcase/quick-test-screenshot.png',
      fullPage: true 
    });
    console.log('📸 已保存测试截图');
    
    // 最终结论
    const isWorking = rootContent && rootContent.hasChildren && rootContent.appCardsCount > 0;
    
    console.log('\n' + '='.repeat(60));
    if (isWorking) {
      console.log('🎉 网站修复成功！React Router问题已解决，应用正常运行。');
      console.log(`✅ 找到 ${rootContent.appCardsCount} 个应用卡片`);
      console.log(`✅ 搜索功能: ${rootContent.hasSearchBox ? '正常' : '需检查'}`);
    } else {
      console.log('⚠️  网站可能仍有问题:');
      if (!rootContent || !rootContent.hasChildren) {
        console.log('   - Root元素为空或无子元素');
      }
      if (!rootContent || rootContent.appCardsCount === 0) {
        console.log('   - 未找到应用卡片，可能数据加载失败');
      }
    }
    console.log('='.repeat(60));
    
    // 保持浏览器打开供用户查看
    console.log('\n🔍 浏览器窗口已打开，请手动验证网站功能...');
    console.log('按 Ctrl+C 结束测试');
    await new Promise(() => {});
    
  } catch (error) {
    console.error('💥 测试过程中出现错误:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

quickTest().catch(console.error);