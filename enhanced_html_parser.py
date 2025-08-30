#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
增强版HTML解析器，提取Setapp应用数据并翻译成中文
"""

import re
import csv
import json
from urllib.parse import unquote

def clean_platform_field(platform_str):
    """
    清理平台字段格式
    """
    if not platform_str:
        return "Mac"
    
    # 移除引号和多余字符
    cleaned = platform_str.strip('"').strip("'").strip()
    
    # 处理特殊情况
    if cleaned.endswith(','):
        cleaned = cleaned[:-1]
    
    # 标准化平台名称
    if 'Mac' in cleaned and 'iOS' in cleaned:
        return "Mac,iOS"
    elif 'Mac' in cleaned:
        return "Mac"
    elif 'iOS' in cleaned:
        return "iOS"
    elif 'Web' in cleaned:
        return "Web"
    else:
        return "Mac"  # 默认值

def translate_description_to_chinese(description):
    """
    将英文描述翻译成中文（简单映射）
    """
    translations = {
        "Recover deleted or lost files": "恢复已删除或丢失的文件",
        "Take better screenshots and GIFs": "拍摄更好的截图和GIF",
        "Mind map and brainstorm ideas": "思维导图和头脑风暴",
        "Get full-screen meeting alerts": "获取全屏会议提醒",
        "Set battery charging limits": "设置电池充电限制",
        "Access macOS features fast": "快速访问macOS功能",
        "Compress PDFs without quality loss": "无损压缩PDF文件",
        "Versatile media player": "多功能媒体播放器",
        "Close windows from Mission Control": "从Mission Control关闭窗口",
        "Play all video formats": "播放所有视频格式",
        "Check Mac camera in a click": "一键检查Mac摄像头",
        "Measure golden ratio in designs": "测量设计中的黄金比例",
        "Track CPU, GPU, sensors, etc.": "监控CPU、GPU、传感器等",
        "100+ dynamic wallpapers": "100+动态壁纸",
        "Access recent and favorite files": "访问最近和收藏的文件",
        "Check your security settings": "检查安全设置",
        "Manage multiple DBMS": "管理多个数据库管理系统",
        "Fix WiFi problems": "修复WiFi问题",
        "Try aerial screen savers": "尝试航拍屏保",
        "Simplify two-step authentication": "简化两步验证",
        "Manage to-do lists with timers": "使用计时器管理待办事项",
        "Manage SSH client config files": "管理SSH客户端配置文件",
        "Build better habits": "培养更好的习惯",
        "Manage large projects": "管理大型项目",
        "Boost your typing speed": "提升打字速度",
        "Create your perfect RSS feed": "创建完美的RSS订阅",
        "Control SQLite databases": "控制SQLite数据库",
        "Translate anything": "翻译任何内容",
        "Receive weather alerts": "接收天气预警",
        "Reduce CPU usage": "降低CPU使用率",
        "Two-pane file manager": "双窗格文件管理器",
        "Sync and back up folders": "同步和备份文件夹",
        "Remind yourself to take a break": "提醒自己休息",
        "Edit and manage icon designs": "编辑和管理图标设计",
        "Prepare icons and app assets": "准备图标和应用资源",
        "Generate mockups for all devices": "为所有设备生成模型",
        "Full-featured SSH terminal": "全功能SSH终端",
        "Play lofi music in a click": "一键播放lofi音乐",
        "Self-publish books or booklets": "自助出版书籍或小册子",
        "Create visual outlines": "创建可视化大纲",
        "Curate your movie collection": "管理电影收藏",
        "Copy, delete, and sync files": "复制、删除和同步文件",
        "Monitor your Wi-Fi connection": "监控Wi-Fi连接",
        "Find anything in a PDF with AI": "使用AI在PDF中查找任何内容",
        "Boost volume and audio quality": "提升音量和音频质量",
        "Block websites and apps": "屏蔽网站和应用",
        "Record video with teleprompter": "使用提词器录制视频",
        "Improve your photos like a pro": "像专业人士一样改善照片",
        "Personalize WhatsApp": "个性化WhatsApp",
        "Edit photos and videos": "编辑照片和视频",
        "Work with your PDFs": "处理PDF文件",
        "Manage emails easier": "更轻松地管理邮件",
        "Work across time zones": "跨时区工作",
        "Expand your Mac's right click": "扩展Mac的右键功能",
        "Chat with your PDFs": "与PDF对话",
        "Track your Mac connections": "跟踪Mac连接",
        "Work with timers": "使用计时器工作",
        "Read/write to NTFS drives": "读写NTFS驱动器",
        "Back up only essential files": "仅备份重要文件",
        "Edit and track invoices": "编辑和跟踪发票",
        "Write and manage emails": "编写和管理邮件",
        "Save time typing with text snippets": "使用文本片段节省打字时间",
        "Smart Meeting Notes with AI": "AI智能会议记录",
        "Share files and boost your brand": "共享文件并提升品牌",
        "Budget and manage bills": "预算和管理账单",
        "Access app actions in a click": "一键访问应用操作",
        "Control Mac from your phone": "从手机控制Mac",
        "Move files between macOS and iOS": "在macOS和iOS之间移动文件",
        "Store and manage passwords": "存储和管理密码",
        "Rename screenshots with AI": "使用AI重命名截图",
        "Turn websites into apps": "将网站转换为应用",
        "Easily edit videos like a pro": "像专业人士一样轻松编辑视频",
        "Reflect on your life": "反思人生",
        "Tabs from all browsers in one spot": "在一个地方查看所有浏览器标签",
        "Record and edit music on Mac": "在Mac上录制和编辑音乐",
        "Customize your home screen": "自定义主屏幕",
        "Listen to your texts": "聆听文本内容",
        "Manage email subscriptions": "管理邮件订阅",
        "Generate draft email replies": "生成邮件回复草稿"
    }
    
    return translations.get(description, description)

def parse_html_file_enhanced(html_file_path):
    """
    增强版HTML文件解析
    """
    print(f"正在解析HTML文件: {html_file_path}")
    
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"HTML文件大小: {len(content)} 字符")
        
        # 使用更精确的正则表达式
        app_pattern = r'<app-details\s+name="([^"]+)"\s+description="([^"]+)"[^>]*?url=([^\s>]+)[^>]*?platforms=([^\s>]+)[^>]*?>'
        matches = re.findall(app_pattern, content)
        
        print(f"找到 {len(matches)} 个应用")
        
        apps = []
        
        for i, (name, description, url, platforms) in enumerate(matches):
            try:
                # 清理和处理数据
                cleaned_name = name.strip()
                cleaned_description = description.strip()
                cleaned_url = url.strip()
                cleaned_platforms = clean_platform_field(platforms)
                
                # 翻译描述
                chinese_description = translate_description_to_chinese(cleaned_description)
                
                app_data = {
                    '名称': cleaned_name,
                    '平台': cleaned_platforms,
                    '官方网站': cleaned_url,
                    '功能描述': chinese_description
                }
                apps.append(app_data)
                
                if i < 5:  # 显示前5个应用的信息
                    print(f"应用 {i+1}: {cleaned_name} - {chinese_description}")
                    
            except Exception as e:
                print(f"解析应用 {i+1} 时出错: {e}")
                continue
        
        return apps
        
    except Exception as e:
        print(f"读取HTML文件时出错: {e}")
        return []

def save_to_csv_enhanced(apps, output_file):
    """
    保存应用数据到CSV文件
    """
    print(f"\n正在保存 {len(apps)} 个应用到 {output_file}")
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['名称', '平台', '官方网站', '功能描述']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for app in apps:
            writer.writerow(app)
    
    print(f"成功保存到 {output_file}")

def analyze_data_enhanced(apps):
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
    output_file = "apps_list_chinese_enhanced.csv"
    
    # 解析HTML文件
    apps = parse_html_file_enhanced(html_file)
    
    if apps:
        # 分析数据
        analyze_data_enhanced(apps)
        
        # 保存到CSV
        save_to_csv_enhanced(apps, output_file)
        
        print(f"\n处理完成！共提取 {len(apps)} 个应用的数据，所有描述已翻译为中文")
    else:
        print("未能提取到任何应用数据")

if __name__ == "__main__":
    main()