import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useState } from 'react';

export default function SearchFilters() {
  const { filters, setFilters } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchTerm: e.target.value });
  };
  
  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ platform: e.target.value });
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortBy: e.target.value as any });
  };
  
  const toggleSortOrder = () => {
    setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };
  
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = parseInt(e.target.value);
    setFilters({ priceRange: [0, maxPrice] });
  };
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ minRating: parseInt(e.target.value) });
  };
  
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* 主搜索栏 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* 搜索框 */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索应用名称或功能描述..."
                value={filters.searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* 快速筛选和排序 */}
          <div className="flex items-center space-x-4">
            {/* 平台筛选 */}
            <select
              value={filters.platform}
              onChange={handlePlatformChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有平台</option>
              <option value="mac">Mac</option>
              <option value="ios">iOS</option>
              <option value="web">Web</option>
            </select>
            
            {/* 排序方式 */}
            <div className="flex items-center space-x-2">
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">按名称</option>
                <option value="price">按价格</option>
                <option value="rating">按评分</option>
                <option value="platform">按平台</option>
              </select>
              
              <button
                onClick={toggleSortOrder}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={filters.sortOrder === 'asc' ? '升序' : '降序'}
              >
                {filters.sortOrder === 'asc' ? 
                  <SortAsc className="w-4 h-4" /> : 
                  <SortDesc className="w-4 h-4" />
                }
              </button>
            </div>
            
            {/* 高级筛选按钮 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>筛选</span>
            </button>
          </div>
        </div>
        
        {/* 高级筛选面板 */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 价格范围 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  最高价格: ${filters.priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
              
              {/* 最低评分 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  最低评分: {filters.minRating}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={filters.minRating}
                  onChange={handleRatingChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            
            {/* 重置按钮 */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({
                  searchTerm: '',
                  platform: 'all',
                  priceRange: [0, 500],
                  minRating: 0,
                  sortBy: 'name',
                  sortOrder: 'asc'
                })}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                重置筛选
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}