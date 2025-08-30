#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
合并CSV数据脚本
将新爬取的数据与原有数据合并，保留原有的功能描述，更新官方网站链接
"""

import pandas as pd
import sys

def merge_csv_data():
    """
    合并两个CSV文件的数据
    """
    try:
        # 读取原始数据
        print("正在读取原始数据...")
        original_df = pd.read_csv('apps_list.csv')
        print(f"原始数据包含 {len(original_df)} 个应用")
        
        # 读取新爬取的数据
        print("正在读取新爬取的数据...")
        new_df = pd.read_csv('setapp_apps_ultimate.csv')
        print(f"新数据包含 {len(new_df)} 个应用")
        
        # 创建合并后的数据框
        merged_data = []
        
        # 处理新数据中的每个应用
        for _, new_row in new_df.iterrows():
            app_name = new_row['名称']
            
            # 在原始数据中查找对应的应用
            original_match = original_df[original_df['名称'] == app_name]
            
            if not original_match.empty:
                # 如果在原始数据中找到了，使用原始数据的功能描述
                original_row = original_match.iloc[0]
                merged_row = {
                    '名称': app_name,
                    '平台': new_row['平台'],  # 使用新数据的平台信息
                    '评分': new_row['评分'],
                    '官方订阅价格': new_row['官方订阅价格'],
                    '功能描述': original_row['功能描述'] if pd.notna(original_row['功能描述']) and original_row['功能描述'].strip() else new_row['功能描述'],
                    '官方网站': new_row['官方网站'],  # 使用新数据的官方网站
                    'Setapp链接': new_row['Setapp链接']
                }
            else:
                # 如果在原始数据中没找到，直接使用新数据
                merged_row = {
                    '名称': app_name,
                    '平台': new_row['平台'],
                    '评分': new_row['评分'],
                    '官方订阅价格': new_row['官方订阅价格'],
                    '功能描述': new_row['功能描述'],
                    '官方网站': new_row['官方网站'],
                    'Setapp链接': new_row['Setapp链接']
                }
            
            merged_data.append(merged_row)
        
        # 添加原始数据中存在但新数据中不存在的应用
        new_app_names = set(new_df['名称'].tolist())
        for _, original_row in original_df.iterrows():
            if original_row['名称'] not in new_app_names:
                merged_row = {
                    '名称': original_row['名称'],
                    '平台': original_row['平台'],
                    '评分': original_row['评分'],
                    '官方订阅价格': original_row['官方订阅价格'],
                    '功能描述': original_row['功能描述'],
                    '官方网站': original_row['官方网站'],
                    'Setapp链接': original_row['Setapp链接']
                }
                merged_data.append(merged_row)
        
        # 创建合并后的DataFrame
        merged_df = pd.DataFrame(merged_data)
        
        # 保存合并后的数据
        merged_df.to_csv('apps_list_merged.csv', index=False, encoding='utf-8')
        print(f"\n合并完成！共包含 {len(merged_df)} 个应用")
        
        # 统计信息
        print("\n=== 合并统计 ===")
        print(f"总应用数: {len(merged_df)}")
        
        # 统计有功能描述的应用
        apps_with_description = merged_df[merged_df['功能描述'].notna() & (merged_df['功能描述'].str.strip() != '')]
        print(f"有功能描述的应用: {len(apps_with_description)} ({len(apps_with_description)/len(merged_df)*100:.1f}%)")
        
        # 统计有官方网站的应用
        apps_with_website = merged_df[merged_df['官方网站'].notna() & (merged_df['官方网站'].str.strip() != '')]
        print(f"有官方网站的应用: {len(apps_with_website)} ({len(apps_with_website)/len(merged_df)*100:.1f}%)")
        
        # 统计平台分布
        platform_counts = merged_df['平台'].value_counts()
        print(f"\n平台分布:")
        for platform, count in platform_counts.items():
            print(f"  {platform}: {count} 个应用")
        
        return True
        
    except Exception as e:
        print(f"合并过程中出现错误: {e}")
        return False

if __name__ == "__main__":
    success = merge_csv_data()
    sys.exit(0 if success else 1)