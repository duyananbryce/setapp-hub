import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useI18nStore } from '@/lib/currency';
import { useState } from 'react';

export default function SearchFilters() {
  const { filters, setFilters } = useAppStore();
  const { locale } = useI18nStore();
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
    <div className="bg-claude-card border-b border-claude-border-light">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 主搜索栏 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          {/* 搜索框 */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-claude-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder={locale === 'zh-CN' ? '搜索应用名称或功能描述...' :
                           locale === 'ja-JP' ? 'アプリ名や機能を検索...' :
                           'Search app names or features...'}
                value={filters.searchTerm}
                onChange={handleSearchChange}
                className="input-claude pl-10"
              />
            </div>
          </div>
          
          {/* 快速筛选和排序 */}
          <div className="flex items-center space-x-3">
            {/* 平台筛选 */}
            <div className="relative">
              <select
                value={filters.platform}
                onChange={handlePlatformChange}
                className="input-claude pr-10 min-w-[120px]"
              >
                <option value="all">
                  {locale === 'zh-CN' ? '所有平台' :
                   locale === 'ja-JP' ? 'すべてのプラットフォーム' :
                   'All Platforms'}
                </option>
                <option value="Mac">Mac</option>
                <option value="iOS">iOS</option>
                <option value="Web">Web</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-claude-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* 排序方式 */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="input-claude pr-10 min-w-[100px]"
                >
                  <option value="name">
                    {locale === 'zh-CN' ? '按名称' :
                     locale === 'ja-JP' ? '名前順' :
                     'By Name'}
                  </option>
                  <option value="price">
                    {locale === 'zh-CN' ? '按价格' :
                     locale === 'ja-JP' ? '価格順' :
                     'By Price'}
                  </option>
                  <option value="rating">
                    {locale === 'zh-CN' ? '按评分' :
                     locale === 'ja-JP' ? '評価順' :
                     'By Rating'}
                  </option>
                  <option value="platform">
                    {locale === 'zh-CN' ? '按平台' :
                     locale === 'ja-JP' ? 'プラットフォーム順' :
                     'By Platform'}
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-claude-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={toggleSortOrder}
                className="p-3 bg-claude-card border border-claude-border-light rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                title={filters.sortOrder === 'asc' ? 
                  (locale === 'zh-CN' ? '升序' : locale === 'ja-JP' ? '昇順' : 'Ascending') :
                  (locale === 'zh-CN' ? '降序' : locale === 'ja-JP' ? '降順' : 'Descending')}
              >
                {filters.sortOrder === 'asc' ? 
                  <SortAsc className="w-4 h-4 text-claude-text" /> : 
                  <SortDesc className="w-4 h-4 text-claude-text" />
                }
              </button>
            </div>
            
            {/* 高级筛选按钮 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                showFilters 
                  ? 'bg-primary-600 text-white border border-primary-600' 
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>
                {locale === 'zh-CN' ? '筛选' :
                 locale === 'ja-JP' ? 'フィルター' :
                 'Filter'}
              </span>
            </button>
          </div>
        </div>
        
        {/* 高级筛选面板 */}
        {showFilters && (
          <div className="mt-6 p-6 bg-neutral-100 rounded-xl border border-claude-border-light">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 价格范围 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-claude-text-heading mb-3">
                  {locale === 'zh-CN' ? '最高价格' :
                   locale === 'ja-JP' ? '最高価格' :
                   'Max Price'}: <span className="text-claude-accent font-semibold">${filters.priceRange[1]}</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={handlePriceRangeChange}
                    className="w-full h-2 bg-claude-border-light rounded-lg appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      background: `linear-gradient(to right, #E07B5F 0%, #E07B5F ${(filters.priceRange[1] / 500) * 100}%, #E5E5E5 ${(filters.priceRange[1] / 500) * 100}%, #E5E5E5 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-claude-text-muted mt-2">
                  <span className="font-medium">$0</span>
                  <span className="font-medium">$500+</span>
                </div>
              </div>
              
              {/* 最低评分 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-claude-text-heading mb-3">
                  {locale === 'zh-CN' ? '最低评分' :
                   locale === 'ja-JP' ? '最低評価' :
                   'Min Rating'}: <span className="text-claude-accent font-semibold">{filters.minRating}</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={filters.minRating}
                    onChange={handleRatingChange}
                    className="w-full h-2 bg-claude-border-light rounded-lg appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      background: `linear-gradient(to right, #E07B5F 0%, #E07B5F ${(filters.minRating / 100) * 100}%, #E5E5E5 ${(filters.minRating / 100) * 100}%, #E5E5E5 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-claude-text-muted mt-2">
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
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50"
              >
                {locale === 'zh-CN' ? '重置筛选' :
                 locale === 'ja-JP' ? 'フィルターをリセット' :
                 'Reset Filters'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}