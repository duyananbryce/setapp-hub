import { create } from 'zustand';
import { App, FilterOptions, AppStats } from '@/types/app';
import { loadAppsData, calculateStats, filterApps, sortApps } from '@/utils/dataLoader';

interface AppStore {
  // 数据状态
  apps: App[];
  filteredApps: App[];
  stats: AppStats | null;
  loading: boolean;
  error: string | null;
  
  // 筛选状态
  filters: FilterOptions;
  
  // 选中的应用
  selectedApp: App | null;
  
  // 操作方法
  loadApps: () => Promise<void>;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSelectedApp: (app: App | null) => void;
  applyFilters: () => void;
}

const initialFilters: FilterOptions = {
  searchTerm: '',
  platform: 'all',
  priceRange: [0, 500],
  minRating: 0,
  sortBy: 'name',
  sortOrder: 'asc'
};

export const useAppStore = create<AppStore>((set, get) => ({
  // 初始状态
  apps: [],
  filteredApps: [],
  stats: null,
  loading: false,
  error: null,
  filters: initialFilters,
  selectedApp: null,
  
  // 加载应用数据
  loadApps: async () => {
    set({ loading: true, error: null });
    try {
      const apps = await loadAppsData();
      const stats = calculateStats(apps);
      set({ 
        apps, 
        filteredApps: apps, 
        stats, 
        loading: false 
      });
      // 应用初始筛选
      get().applyFilters();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '加载数据失败', 
        loading: false 
      });
    }
  },
  
  // 设置筛选条件
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFilters();
  },
  
  // 设置选中的应用
  setSelectedApp: (app) => {
    set({ selectedApp: app });
  },
  
  // 应用筛选和排序
  applyFilters: () => {
    const { apps, filters } = get();
    let filtered = filterApps(apps, filters);
    filtered = sortApps(filtered, filters.sortBy, filters.sortOrder);
    set({ filteredApps: filtered });
  }
}));