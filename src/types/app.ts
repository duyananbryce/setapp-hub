export interface App {
  名称: string;
  功能描述: string;
  Setapp链接: string;
  官方网站: string;
  官方订阅价格: number;
  评分: number;
  平台: string;
}

export interface FilterOptions {
  searchTerm: string;
  platform: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: 'name' | 'price' | 'rating' | 'platform';
  sortOrder: 'asc' | 'desc';
}

export interface AppStats {
  totalApps: number;
  macApps: number;
  iosApps: number;
  crossPlatformApps: number;
  averagePrice: number;
  averageRating: number;
}