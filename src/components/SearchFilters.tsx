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
    <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 sticky top-0 z-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-pink-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* 主搜索栏 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
          {/* 搜索框 */}
          <div className="flex-1 max-w-lg">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 w-5 h-5 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="搜索应用名称或功能描述..."
                  value={filters.searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 text-gray-700 font-medium shadow-sm hover:shadow-md"
                />
              </div>
            </div>
          </div>
          
          {/* 快速筛选和排序 */}
          <div className="flex items-center space-x-4">
            {/* 平台筛选 */}
            <div className="relative group">
              <select
                value={filters.platform}
                onChange={handlePlatformChange}
                className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-200 text-gray-700 font-medium shadow-sm hover:shadow-md appearance-none pr-10"
              >
                <option value="all">所有平台</option>
                <option value="mac">Mac</option>
                <option value="ios">iOS</option>
                <option value="web">Web</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* 排序方式 */}
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-200 text-gray-700 font-medium shadow-sm hover:shadow-md appearance-none pr-10"
                >
                  <option value="name">按名称</option>
                  <option value="price">按价格</option>
                  <option value="rating">按评分</option>
                  <option value="platform">按平台</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={toggleSortOrder}
                className="p-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:bg-white/90 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
                title={filters.sortOrder === 'asc' ? '升序' : '降序'}
              >
                {filters.sortOrder === 'asc' ? 
                  <SortAsc className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" /> : 
                  <SortDesc className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                }
              </button>
            </div>
            
            {/* 高级筛选按钮 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md ${
                showFilters 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-blue-400/50' 
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 border border-gray-200/50 hover:bg-white/90 hover:border-blue-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>筛选</span>
            </button>
          </div>
        </div>
        
        {/* 高级筛选面板 */}
        {showFilters && (
          <div className="mt-6 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 价格范围 */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  最高价格: <span className="text-blue-600 font-bold">${filters.priceRange[1]}</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={handlePriceRangeChange}
                    className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider hover:from-blue-200 hover:to-purple-200 transition-all duration-200"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${(filters.priceRange[1] / 500) * 100}%, #e5e7eb ${(filters.priceRange[1] / 500) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span className="font-medium">$0</span>
                  <span className="font-medium">$500+</span>
                </div>
              </div>
              
              {/* 最低评分 */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  最低评分: <span className="text-purple-600 font-bold">{filters.minRating}</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={filters.minRating}
                    onChange={handleRatingChange}
                    className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider hover:from-purple-200 hover:to-pink-200 transition-all duration-200"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #ec4899 ${(filters.minRating / 100) * 100}%, #e5e7eb ${(filters.minRating / 100) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span className="font-medium">0</span>
                  <span className="font-medium">100</span>
                </div>
              </div>
            </div>
            
            {/* 重置按钮 */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setFilters({
                  searchTerm: '',
                  platform: 'all',
                  priceRange: [0, 500],
                  minRating: 0,
                  sortBy: 'name',
                  sortOrder: 'asc'
                })}
                className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-white bg-white/70 hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 border border-gray-200/50 hover:border-gray-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
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