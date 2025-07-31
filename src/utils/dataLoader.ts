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
  if (!appName) {
    return '/icon/start.png';
  }
  
  // 尝试使用本地图标文件
  const iconPath = `/icon/${appName}.png`;
  return iconPath;
}

// 辅助函数：处理图标加载错误
export function handleIconError(event: Event, appName: string): void {
  const img = event.target as HTMLImageElement;
  if (img.src !== '/icon/start.png') {
    img.src = '/icon/start.png';
  }
}

export function calculateStats(apps: App[]): AppStats {
  const totalApps = apps.length;
  const macApps = apps.filter(app => app.平台?.includes('Mac')).length;
  const iosApps = apps.filter(app => app.平台?.includes('iOS')).length;
  const crossPlatformApps = apps.filter(app => app.平台?.includes(',') || app.平台?.includes('&')).length;
  
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
    // 搜索过滤
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const appName = app.名称?.toLowerCase() || '';
      const appDesc = app.功能描述?.toLowerCase() || '';
      if (!appName.includes(searchLower) && !appDesc.includes(searchLower)) {
        return false;
      }
    }
    
    // 平台过滤
    if (filters.platform && filters.platform !== 'all') {
      const platformStr = app.平台 || '';
      const appPlatforms = platformStr.toLowerCase().split(',').map(p => p.trim());
      if (!appPlatforms.includes(filters.platform.toLowerCase())) {
        return false;
      }
    }
    
    // 价格范围过滤
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      const appPrice = app.官方订阅价格 || 0;
      if (appPrice < minPrice || appPrice > maxPrice) {
        return false;
      }
    }
    
    // 评分过滤
    if (filters.minRating && (app.评分 || 0) < filters.minRating) {
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
        aValue = a.官方订阅价格 || 0;
        bValue = b.官方订阅价格 || 0;
        break;
      case 'rating':
        aValue = a.评分 || 0;
        bValue = b.评分 || 0;
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