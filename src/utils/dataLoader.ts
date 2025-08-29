import Papa from 'papaparse';
import { App, AppStats } from '@/types/app';

export const loadAppsData = async (): Promise<App[]> => {
  try {
    // 尝试从public目录加载CSV文件，考虑base路径
    const basePath = import.meta.env.BASE_URL || '/';
    const response = await fetch(`${basePath}apps_list_enhanced_descriptions.csv`);
    if (!response.ok) {
      throw new Error(`无法加载CSV文件: ${response.status}`);
    }
    const csvText = await response.text();
    
    const result = Papa.parse<App>(csvText, {
      header: true,
      skipEmptyLines: true,
      transform: (value, field) => {
        // 转换数字字段
        if (field === '官方订阅价格' || field === '评分') {
          return parseFloat(value) || 0;
        }
        return value;
      }
    });
    
    return result.data;
  } catch (error) {
    console.error('Error loading apps data:', error);
    return [];
  }
}

export const getAppIcon = (appName: string): string => {
  // Use local icon directory
  const iconFileName = `${appName}.png`;
  return `/icon/${iconFileName}`;
};

// 辅助函数：处理图标加载错误
export function handleIconError(event: Event, appName: string): void {
  const img = event.target as HTMLImageElement;
  const fallbackIcon = `/icon/start.png`;
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
  
  const totalPrice = apps.reduce((sum, app) => sum + (app.官方订阅价格 || 0), 0);
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
      if (filters.platform === 'Mac' && !app.平台?.includes('Mac')) {
        return false;
      }
      if (filters.platform === 'iOS' && !app.平台?.includes('iOS')) {
        return false;
      }
      if (filters.platform === 'Cross-platform' && 
          !(app.平台?.includes('Mac') && app.平台?.includes('iOS'))) {
        return false;
      }
    }
    
    // 价格范围筛选
    if (filters.priceRange) {
      const price = app.官方订阅价格 || 0;
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
        aValue = a.官方订阅价格 || 0;
        bValue = b.官方订阅价格 || 0;
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