#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Setapp应用描述增强器
专门用于获取应用的详细功能描述
"""

import requests
import pandas as pd
from bs4 import BeautifulSoup
import time
import random
from urllib.parse import urljoin, urlparse
import re
import sys

class SetappDescriptionEnhancer:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
    def get_page_content(self, url, max_retries=3):
        """获取页面内容"""
        for attempt in range(max_retries):
            try:
                response = self.session.get(url, timeout=15)
                if response.status_code == 200:
                    return response.text
                elif response.status_code == 404:
                    print(f"页面不存在: {url}")
                    return None
                else:
                    print(f"HTTP {response.status_code}: {url}")
            except Exception as e:
                print(f"请求失败 (尝试 {attempt + 1}/{max_retries}): {url} - {e}")
                if attempt < max_retries - 1:
                    time.sleep(random.uniform(2, 5))
        return None
    
    def extract_app_description(self, setapp_url):
        """从Setapp应用页面提取详细描述"""
        html = self.get_page_content(setapp_url)
        if not html:
            return None
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # 尝试多种选择器来获取应用描述
        description_selectors = [
            '.app-description',
            '.app-overview',
            '.app-details p',
            '.description',
            '.overview',
            '[data-testid="app-description"]',
            '.app-info .description',
            '.app-content p',
            '.hero-description',
            '.app-summary',
            'meta[name="description"]',
            'meta[property="og:description"]'
        ]
        
        for selector in description_selectors:
            try:
                if selector.startswith('meta'):
                    element = soup.select_one(selector)
                    if element and element.get('content'):
                        description = element.get('content').strip()
                        if len(description) > 20:
                            return description
                else:
                    elements = soup.select(selector)
                    for element in elements:
                        text = element.get_text().strip()
                        if len(text) > 20 and not text.startswith('Download') and not text.startswith('Get'):
                            return text
            except Exception as e:
                continue
        
        # 如果没有找到专门的描述，尝试从页面标题和内容中提取
        try:
            # 尝试获取页面主要内容
            main_content = soup.select_one('main, .main, .content, .app-page')
            if main_content:
                paragraphs = main_content.find_all('p')
                for p in paragraphs:
                    text = p.get_text().strip()
                    if len(text) > 30 and len(text) < 500:
                        # 过滤掉一些不相关的内容
                        if not any(skip in text.lower() for skip in ['download', 'install', 'get it', 'try it', 'subscribe', 'pricing']):
                            return text
        except Exception as e:
            pass
            
        return None
    
    def extract_platform_info(self, setapp_url):
        """从Setapp应用页面提取平台信息"""
        html = self.get_page_content(setapp_url)
        if not html:
            return "Mac"
            
        soup = BeautifulSoup(html, 'html.parser')
        platforms = set()
        
        # 查找平台信息的选择器
        platform_selectors = [
            '.platform-info',
            '.compatibility',
            '.supported-platforms',
            '.app-platforms',
            '[data-testid="platforms"]'
        ]
        
        for selector in platform_selectors:
            elements = soup.select(selector)
            for element in elements:
                text = element.get_text().lower()
                if 'mac' in text or 'macos' in text:
                    platforms.add('Mac')
                if 'ios' in text or 'iphone' in text:
                    platforms.add('iOS')
                if 'ipad' in text or 'ipados' in text:
                    platforms.add('iPadOS')
        
        # 如果没有找到明确的平台信息，检查页面内容
        if not platforms:
            page_text = soup.get_text().lower()
            if 'mac' in page_text or 'macos' in page_text:
                platforms.add('Mac')
            if 'ios' in page_text or 'iphone' in page_text:
                platforms.add('iOS')
            if 'ipad' in page_text or 'ipados' in page_text:
                platforms.add('iPadOS')
        
        # 默认返回Mac
        return ', '.join(sorted(platforms)) if platforms else 'Mac'
    
    def enhance_descriptions(self, csv_file='apps_list.csv'):
        """增强应用描述"""
        try:
            # 读取CSV文件
            df = pd.read_csv(csv_file)
            print(f"读取到 {len(df)} 个应用")
            
            enhanced_count = 0
            platform_updated_count = 0
            
            for index, row in df.iterrows():
                app_name = row['名称']
                setapp_url = row['Setapp链接']
                current_description = row['功能描述']
                current_platform = row['平台']
                
                print(f"\n处理应用 {index + 1}/{len(df)}: {app_name}")
                
                # 如果没有功能描述，尝试获取
                if pd.isna(current_description) or not str(current_description).strip():
                    print(f"  获取功能描述...")
                    description = self.extract_app_description(setapp_url)
                    if description:
                        df.at[index, '功能描述'] = description
                        enhanced_count += 1
                        print(f"  ✓ 获取到描述: {description[:50]}...")
                    else:
                        print(f"  ✗ 未能获取到描述")
                else:
                    print(f"  已有描述: {str(current_description)[:50]}...")
                
                # 更新平台信息
                if current_platform == 'Mac':
                    print(f"  检查平台信息...")
                    platform_info = self.extract_platform_info(setapp_url)
                    if platform_info != 'Mac':
                        df.at[index, '平台'] = platform_info
                        platform_updated_count += 1
                        print(f"  ✓ 更新平台信息: {platform_info}")
                    else:
                        print(f"  平台信息无变化: Mac")
                
                # 添加延迟避免被封
                time.sleep(random.uniform(1, 3))
            
            # 保存增强后的数据
            output_file = 'apps_list_enhanced.csv'
            df.to_csv(output_file, index=False, encoding='utf-8')
            
            print(f"\n=== 增强完成 ===")
            print(f"总应用数: {len(df)}")
            print(f"新增功能描述: {enhanced_count} 个")
            print(f"更新平台信息: {platform_updated_count} 个")
            
            # 统计最终结果
            final_descriptions = df[df['功能描述'].notna() & (df['功能描述'].str.strip() != '')]
            print(f"最终有描述的应用: {len(final_descriptions)} ({len(final_descriptions)/len(df)*100:.1f}%)")
            
            # 统计平台分布
            platform_counts = df['平台'].value_counts()
            print(f"\n平台分布:")
            for platform, count in platform_counts.items():
                print(f"  {platform}: {count} 个应用")
            
            print(f"\n增强后的数据已保存到: {output_file}")
            return True
            
        except Exception as e:
            print(f"增强过程中出现错误: {e}")
            return False

if __name__ == "__main__":
    enhancer = SetappDescriptionEnhancer()
    success = enhancer.enhance_descriptions()
    sys.exit(0 if success else 1)