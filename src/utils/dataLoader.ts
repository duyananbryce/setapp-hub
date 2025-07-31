import Papa from 'papaparse';
import { App, AppStats } from '@/types/app';

export const loadAppsData = async (): Promise<App[]> => {
  try {
    // 尝试从public目录加载CSV文件
    const response = await fetch('/apps_list_enhanced_descriptions.csv');
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

export function getAppIcon(appName: string): string {
  // 使用在线图标服务或默认图标
  // 这里可以使用应用名称生成一个默认的图标URL
  const encodedName = encodeURIComponent(appName);
  return `https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=${encodedName.slice(0, 2)}`;
}

export function calculateStats(apps: App[]): AppStats {
  const totalApps = apps.length;
  const macApps = apps.filter(app => app.平台.includes('Mac')).length;
  const iosApps = apps.filter(app => app.平台.includes('iOS')).length;
  const crossPlatformApps = apps.filter(app => app.平台.includes(',') || app.平台.includes('&')).length;
  
  const totalPrice = apps.reduce((sum, app) => sum + app.官方订阅价格, 0);
  const averagePrice = totalPrice / totalApps;
  
  const totalRating = apps.reduce((sum, app) => sum + app.评分, 0);
  const averageRating = totalRating / totalApps;
  
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
    // 搜索过滤
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      if (!app.名称.toLowerCase().includes(searchLower) && 
          !app.功能描述.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    // 平台过滤
    if (filters.platform && filters.platform !== 'all') {
      const appPlatforms = app.平台.toLowerCase().split(',').map(p => p.trim());
      if (!appPlatforms.includes(filters.platform.toLowerCase())) {
        return false;
      }
    }
    
    // 价格范围过滤
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (app.官方订阅价格 < minPrice || app.官方订阅价格 > maxPrice) {
        return false;
      }
    }
    
    // 评分过滤
    if (filters.minRating && app.评分 < filters.minRating) {
      return false;
    }
    
    return true;
  });
}

export function sortApps(apps: App[], sortBy: string, sortOrder: 'asc' | 'desc'): App[] {
  return [...apps].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.名称;
        bValue = b.名称;
        break;
      case 'price':
        aValue = a.官方订阅价格;
        bValue = b.官方订阅价格;
        break;
      case 'rating':
        aValue = a.评分;
        bValue = b.评分;
        break;
      case 'platform':
        aValue = a.平台;
        bValue = b.平台;
        break;
      default:
        return 0;
    }
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
}