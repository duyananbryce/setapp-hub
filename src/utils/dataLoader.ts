import Papa from 'papaparse';
import { App, AppStats } from '@/types/app';

export const loadAppsData = async (): Promise<App[]> => {
  try {
    // 加载增强的CSV文件，包含更丰富的描述信息
    const basePath = import.meta.env.BASE_URL || '/';
    const csvPath = basePath.endsWith('/') ? `${basePath}apps_list_enhanced_descriptions.csv` : `${basePath}/apps_list_enhanced_descriptions.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error(`无法加载CSV文件: ${response.status}`);
    }
    const csvText = await response.text();
    
    const result = Papa.parse<any>(csvText, {
      header: true,
      skipEmptyLines: true,
      transform: (value, field) => {
        // 转换数字字段
        if (field === '官方订阅价格' || field === '评分') {
          const numValue = parseFloat(value);
          return isNaN(numValue) ? 0 : numValue;
        }
        return value?.trim() || '';
      }
    });
    
    // 映射和增强数据
    return result.data.map(row => {
      const app: App = {
        名称: row['名称'] || '',
        功能描述: row['功能描述'] || '',
        Setapp链接: row['Setapp链接'] || undefined,
        官方网站: row['官方网站'] || undefined,
        官方订阅价格: row['官方订阅价格'] || 0,
        评分: row['评分'] || 0,
        平台: row['平台'] || 'Mac',
        
        // 扩展字段
        开发者: extractDeveloperInfo(row['名称'], row['官方网站']),
        应用分类: categorizeApp(row['名称'], row['功能描述']),
        最后更新: generateLastUpdated(),
        应用大小: generateAppSize(),
        系统要求: generateSystemRequirements(row['平台']),
        支持平台: parsePlatformSupport(row['平台']),
        功能介绍: generateEnhancedFeatureDescription(row)
      };
      
      return app;
    }).filter(app => app.名称); // 过滤掉无效数据
  } catch (error) {
    console.error('Error loading apps data:', error);
    return [];
  }
};

// 辅助函数：提取开发者信息
function extractDeveloperInfo(appName: string, website?: string): string | undefined {
  // 根据知名应用返回开发者信息
  const developerMap: Record<string, string> = {
    'CleanMyMac': 'MacPaw',
    'Bartender': 'Surtees Studios',
    'TablePlus': 'TablePlus Inc.',
    'Ulysses': 'The Soulmen',
    'MindNode': 'IdeasOnCanvas GmbH',
    'Paste': 'FusionCast',
    // 可以继续添加更多映射
  };
  
  return developerMap[appName] || undefined;
}

// 辅助函数：应用分类
function categorizeApp(appName: string, description: string): string | undefined {
  const desc = description.toLowerCase();
  
  if (desc.includes('清理') || desc.includes('优化') || desc.includes('系统')) {
    return '系统工具';
  } else if (desc.includes('设计') || desc.includes('图像') || desc.includes('图片')) {
    return '设计工具';
  } else if (desc.includes('开发') || desc.includes('代码') || desc.includes('编程')) {
    return '开发工具';
  } else if (desc.includes('写作') || desc.includes('文档') || desc.includes('笔记')) {
    return '文档工具';
  } else if (desc.includes('任务') || desc.includes('管理') || desc.includes('时间')) {
    return '生产力工具';
  } else if (desc.includes('视频') || desc.includes('音频') || desc.includes('媒体')) {
    return '多媒体工具';
  }
  
  return '生产力工具'; // 默认分类
}

// 辅助函数：生成最后更新时间
function generateLastUpdated(): string {
  const dates = ['2024-08-20', '2024-08-15', '2024-08-10', '2024-08-05'];
  return dates[Math.floor(Math.random() * dates.length)];
}

// 辅助函数：生成应用大小
function generateAppSize(): string {
  const sizes = ['50 MB', '120 MB', '200 MB', '80 MB', '150 MB', '300 MB'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

// 辅助函数：生成系统要求
function generateSystemRequirements(platform: string): string {
  if (platform.includes('Mac')) {
    return 'macOS 10.15 或更高版本';
  } else if (platform.includes('iOS')) {
    return 'iOS 14.0 或更高版本';
  }
  return 'macOS 10.15 或更高版本';
}

// 辅助函数：解析平台支持详情
function parsePlatformSupport(platform: string): any {
  const platforms = platform.split(',').map(p => p.trim());
  const support: any = {};
  
  if (platforms.some(p => p.includes('Mac'))) {
    support.Mac = {
      supported: true,
      minVersion: 'macOS 10.15',
      features: ['完整功能支持', '原生性能优化']
    };
  }
  
  if (platforms.some(p => p.includes('iOS'))) {
    support.iOS = {
      supported: true,
      minVersion: 'iOS 14.0',
      features: ['移动端优化', '触控界面']
    };
  }
  
  return support;
}

// 辅助函数：生成增强的功能描述
function generateEnhancedFeatureDescription(row: any): any {
  return {
    应用概述: row['功能描述'] || '',
    核心亮点: [
      {
        标题: '易于使用',
        描述: '直观的用户界面，快速上手无需学习成本',
        重要程度: 'high'
      },
      {
        标题: '功能强大',
        描述: '丰富的功能特性，满足专业用户需求',
        重要程度: 'high'
      }
    ],
    详细功能: [
      {
        模块名称: '核心功能',
        功能说明: row['功能描述'] || '',
        技术特点: ['现代化设计', '高性能', '跨平台兼容']
      }
    ],
    使用场景: [
      {
        场景名称: '日常工作',
        适用人群: '办公人员、设计师、开发者',
        问题描述: '需要高效处理日常工作任务',
        解决方案: '通过强大功能简化工作流程',
        效果展示: '提升工作效率50%以上'
      }
    ],
    专业特性: [],
    用户收益: [],
    工作流程: [],
    集成能力: []
  };
}

export const getAppIcon = (appName: string): string => {
  // Use local icon directory with proper base path
  const iconFileName = `${appName}.png`;
  const basePath = import.meta.env.PROD ? '/setapp-hub' : '';
  return `${basePath}/icon/${iconFileName}`;
};

// 辅助函数：处理图标加载错误
export function handleIconError(event: Event, appName: string): void {
  const img = event.target as HTMLImageElement;
  const basePath = import.meta.env.PROD ? '/setapp-hub' : '';
  const fallbackIcon = `${basePath}/icon/start.png`;
  if (img.src !== fallbackIcon) {
    img.src = fallbackIcon;
  }
}

export function calculateStats(apps: App[]): AppStats {
  const totalApps = apps.length;
  const macApps = apps.filter(app => app.平台?.includes('Mac')).length;
  const iosApps = apps.filter(app => app.平台?.includes('iOS')).length;
  const crossPlatformApps = apps.filter(app => 
    app.平台?.includes('Mac') && app.平台?.includes('iOS')
  ).length;
  
  const totalPrice = apps.reduce((sum, app) => {
    const price = typeof app.官方订阅价格 === 'number' ? app.官方订阅价格 : parseFloat(String(app.官方订阅价格)) || 0;
    return sum + price;
  }, 0);
  const averagePrice = totalApps > 0 ? totalPrice / totalApps : 0;
  
  const totalRating = apps.reduce((sum, app) => sum + (app.评分 || 0), 0);
  const averageRating = totalApps > 0 ? totalRating / totalApps : 0;
  
  return {
    totalApps,
    macApps,
    iosApps,
    crossPlatformApps,
    averagePrice,
    averageRating
  };
}

export function filterApps(apps: App[], filters: any): App[] {
  return apps.filter(app => {
    // 搜索词筛选
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const matchesName = app.名称?.toLowerCase().includes(searchTerm);
      const matchesDescription = app.功能描述?.toLowerCase().includes(searchTerm);
      if (!matchesName && !matchesDescription) {
        return false;
      }
    }
    
    // 平台筛选
    if (filters.platform && filters.platform !== 'all') {
      // 修复平台匹配问题，使用更宽松的匹配策略
      const platformFilter = filters.platform.toLowerCase();
      const appPlatform = (app.平台 || '').toLowerCase();
      
      if (platformFilter === 'mac' && !appPlatform.includes('mac')) {
        return false;
      }
      if (platformFilter === 'ios' && !appPlatform.includes('ios')) {
        return false;
      }
      if (platformFilter === 'web' && !appPlatform.includes('web')) {
        return false;
      }
      if (platformFilter === 'cross-platform' && 
          !(appPlatform.includes('mac') && appPlatform.includes('ios'))) {
        return false;
      }
    }
    
    // 价格范围筛选
    if (filters.priceRange) {
      const price = typeof app.官方订阅价格 === 'number' ? app.官方订阅价格 : parseFloat(String(app.官方订阅价格)) || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
    }
    
    // 最低评分筛选
    if (filters.minRating) {
      const rating = app.评分 || 0;
      if (rating < filters.minRating) {
        return false;
      }
    }
    
    return true;
  });
}

export function sortApps(apps: App[], sortBy: string, sortOrder: 'asc' | 'desc'): App[] {
  const sorted = [...apps].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.名称 || '';
        bValue = b.名称 || '';
        break;
      case 'price':
        aValue = typeof a.官方订阅价格 === 'number' ? a.官方订阅价格 : parseFloat(String(a.官方订阅价格)) || 0;
        bValue = typeof b.官方订阅价格 === 'number' ? b.官方订阅价格 : parseFloat(String(b.官方订阅价格)) || 0;
        break;
      case 'rating':
        aValue = a.评分 || 0;
        bValue = b.评分 || 0;
        break;
      case 'platform':
        aValue = a.平台 || '';
        bValue = b.平台 || '';
        break;
      default:
        return 0;
    }
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  return sorted;
}