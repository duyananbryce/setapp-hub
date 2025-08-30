const puppeteer = require('puppeteer');

async function finalBrowserTest() {
  console.log('🚀 最终浏览器测试 - 所有资源已确认可访问');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    // 监听所有控制台消息
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (!text.includes('Download the React DevTools') && !text.includes('extension')) {
        console.log(`📝 [${type.toUpperCase()}]: ${text}`);
      }
    });
    
    // 监听页面错误
    page.on('pageerror', error => {
      console.log('❌ 页面错误:', error.message);
    });
    
    // 监听请求失败
    page.on('requestfailed', request => {
      console.log('🚫 请求失败:', request.url(), request.failure().errorText);
    });
    
    console.log('🌐 导航到网站...');
    const response = await page.goto('https://duyananbryce.github.io/setapp-hub/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log(`📊 主页响应状态: ${response.status()}`);
    
    // 等待更长时间让React应用完全加载
    console.log('⏳ 等待React应用完全加载...');
    await page.waitForTimeout(10000);
    
    // 检查页面标题
    const title = await page.title();
    console.log(`📄 页面标题: "${title}"`);
    
    // 详细检查页面内容
    const pageAnalysis = await page.evaluate(() => {
      const root = document.getElementById('root');
      if (!root) return { error: 'Root元素不存在' };
      
      // 检查各种可能的应用卡片选择器
      const possibleSelectors = [
        '.grid > div',
        '[class*="card"]',
        '[class*="bg-white"]',
        '[class*="shadow"]',
        '[class*="rounded"]',
        'div[class*="p-"]',
        'div[class*="border"]'
      ];
      
      let foundElements = {};
      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          foundElements[selector] = elements.length;
        }
      }
      
      // 检查搜索相关元素
      const searchElements = {
        'input[type="text"]': document.querySelectorAll('input[type="text"]').length,
        'input[placeholder*="搜索"]': document.querySelectorAll('input[placeholder*="搜索"]').length,
        'input[placeholder*="search"]': document.querySelectorAll('input[placeholder*="search"]').length
      };
      
      // 检查是否有任何文本内容
      const hasText = root.textContent.trim().length > 0;
      const textSample = root.textContent.trim().substring(0, 200);
      
      // 检查是否有图片
      const images = document.querySelectorAll('img').length;
      
      return {
        rootExists: true,
        childrenCount: root.children.length,
        hasText: hasText,
        textSample: textSample,
        foundElements: foundElements,
        searchElements: searchElements,
        imageCount: images,
        bodyClasses: document.body.className,
        rootHTML: root.innerHTML.substring(0, 500)
      };
    });
    
    console.log('\n🔍 页面分析结果:');
    console.log('=====================================');
    
    if (pageAnalysis.error) {
      console.log(`❌ ${pageAnalysis.error}`);
    } else {
      console.log(`✅ Root元素存在，子元素数量: ${pageAnalysis.childrenCount}`);
      console.log(`📝 有文本内容: ${pageAnalysis.hasText ? '是' : '否'}`);
      
      if (pageAnalysis.hasText) {
        console.log(`📄 文本示例: "${pageAnalysis.textSample}"`);
      }
      
      console.log(`🖼️  图片数量: ${pageAnalysis.imageCount}`);
      
      console.log('\n🎯 找到的元素:');
      for (const [selector, count] of Object.entries(pageAnalysis.foundElements)) {
        console.log(`   ${selector}: ${count} 个`);
      }
      
      console.log('\n🔍 搜索元素:');
      for (const [selector, count] of Object.entries(pageAnalysis.searchElements)) {
        if (count > 0) {
          console.log(`   ${selector}: ${count} 个`);
        }
      }
      
      console.log(`\n📋 Root HTML示例: "${pageAnalysis.rootHTML}"`);
    }
    
    // 截图
    await page.screenshot({ 
      path: '/Volumes/003/002/setapp-apps-showcase/final-test-screenshot.png',
      fullPage: true 
    });
    console.log('\n📸 已保存最终测试截图');
    
    // 判断网站是否正常工作
    const isWorking = pageAnalysis.hasText && 
                     pageAnalysis.childrenCount > 1 && 
                     Object.keys(pageAnalysis.foundElements).length > 0;
    
    console.log('\n' + '='.repeat(60));
    if (isWorking) {
      console.log('🎉 网站修复成功！');
      console.log('✅ React应用已正常加载和渲染');
      console.log('✅ 页面有内容显示');
      console.log('✅ 找到了页面元素');
    } else {
      console.log('⚠️  网站可能仍有问题:');
      if (!pageAnalysis.hasText) {
        console.log('   - 页面没有文本内容');
      }
      if (pageAnalysis.childrenCount <= 1) {
        console.log('   - Root元素子元素太少');
      }
      if (Object.keys(pageAnalysis.foundElements).length === 0) {
        console.log('   - 未找到预期的页面元素');
      }
    }
    console.log('='.repeat(60));
    
    // 保持浏览器打开
    console.log('\n🔍 浏览器窗口已打开，请手动验证网站...');
    console.log('按 Ctrl+C 结束测试');
    
    // 无限等待，让用户手动检查
    await new Promise(() => {});
    
  } catch (error) {
    console.error('💥 测试过程中出现错误:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

finalBrowserTest().catch(console.error);