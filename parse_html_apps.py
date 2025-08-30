#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
解析本地HTML文件，提取Setapp应用数据
"""

import re
import csv
import json
from bs4 import BeautifulSoup
from urllib.parse import unquote

def parse_html_file(html_file_path):
    """
    解析HTML文件，提取应用数据
    """
    print(f"正在解析HTML文件: {html_file_path}")
    
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"HTML文件大小: {len(content)} 字符")
        
        # 使用正则表达式查找所有app-details标签
        app_pattern = r'<app-details\s+([^>]+)>'
        matches = re.findall(app_pattern, content)
        
        print(f"找到 {len(matches)} 个应用")
        
        apps = []
        
        for i, match in enumerate(matches):
            try:
                # 解析属性
                attrs = {}
                
                # 提取name属性
                name_match = re.search(r'name="([^"]+)"', match)
                if name_match:
                    attrs['name'] = name_match.group(1)
                
                # 提取description属性
                desc_match = re.search(r'description="([^"]+)"', match)
                if desc_match:
                    attrs['description'] = desc_match.group(1)
                
                # 提取url属性
                url_match = re.search(r'url=([^\s>]+)', match)
                if url_match:
                    attrs['url'] = url_match.group(1)
                
                # 提取platforms属性
                platforms_match = re.search(r'platforms=([^\s>]+)', match)
                if platforms_match:
                    attrs['platforms'] = platforms_match.group(1)
                
                # 提取rating属性
                rating_match = re.search(r'rating=([^\s>]+)', match)
                if rating_match:
                    attrs['rating'] = rating_match.group(1)
                
                if 'name' in attrs:
                    app_data = {
                        '名称': attrs.get('name', ''),
                        '平台': attrs.get('platforms', 'Mac'),
                        '官方网站': attrs.get('url', ''),
                        '功能描述': attrs.get('description', ''),
                        '评分': attrs.get('rating', '0')
                    }
                    apps.append(app_data)
                    
                    if i < 5:  # 显示前5个应用的信息
                        print(f"应用 {i+1}: {app_data['名称']} - {app_data['功能描述'][:50]}...")
                        
            except Exception as e:
                print(f"解析应用 {i+1} 时出错: {e}")
                continue
        
        return apps
        
    except Exception as e:
        print(f"读取HTML文件时出错: {e}")
        return []

def save_to_csv(apps, output_file):
    """
    保存应用数据到CSV文件
    """
    print(f"\n正在保存 {len(apps)} 个应用到 {output_file}")
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['名称', '平台', '官方网站', '功能描述']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for app in apps:
            # 只保存需要的字段
            row = {
                '名称': app['名称'],
                '平台': app['平台'],
                '官方网站': app['官方网站'],
                '功能描述': app['功能描述']
            }
            writer.writerow(row)
    
    print(f"成功保存到 {output_file}")

def analyze_data(apps):
    """
    分析提取的数据
    """
    print("\n=== 数据分析 ===")
    print(f"总应用数量: {len(apps)}")
    
    # 统计有描述的应用
    apps_with_desc = [app for app in apps if app['功能描述'].strip()]
    print(f"有功能描述的应用: {len(apps_with_desc)} ({len(apps_with_desc)/len(apps)*100:.1f}%)")
    
    # 统计有官网的应用
    apps_with_url = [app for app in apps if app['官方网站'].strip()]
    print(f"有官方网站的应用: {len(apps_with_url)} ({len(apps_with_url)/len(apps)*100:.1f}%)")
    
    # 统计平台分布
    platform_count = {}
    for app in apps:
        platforms = app['平台']
        if platforms in platform_count:
            platform_count[platforms] += 1
        else:
            platform_count[platforms] = 1
    
    print("\n平台分布:")
    for platform, count in sorted(platform_count.items()):
        print(f"  {platform}: {count}")

def main():
    html_file = "/Volumes/003/002/setapp-apps-showcase/Apps for your tasks ｜ Setapp (2025_8_29 15：38：10).html"
    output_file = "apps_list_from_html.csv"
    
    # 解析HTML文件
    apps = parse_html_file(html_file)
    
    if apps:
        # 分析数据
        analyze_data(apps)
        
        # 保存到CSV
        save_to_csv(apps, output_file)
        
        print(f"\n处理完成！共提取 {len(apps)} 个应用的数据")
    else:
        print("未能提取到任何应用数据")

if __name__ == "__main__":
    main()