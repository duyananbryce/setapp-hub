import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import AppCard from '@/components/AppCard';
import SearchFilters from '@/components/SearchFilters';
import StatsPanel from '@/components/StatsPanel';
import AppDetailModal from '@/components/AppDetailModal';
import { Loader2, AlertCircle, Grid, List } from 'lucide-react';

export default function Home() {
  const { 
    filteredApps, 
    loading, 
    error, 
    selectedApp, 
    loadApps, 
    setSelectedApp 
  } = useAppStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    loadApps();
  }, [loadApps]);
  
  useEffect(() => {
    if (selectedApp) {
      setIsModalOpen(true);
    }
  }, [selectedApp]);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">加载应用数据中...</h2>
          <p className="text-gray-600">正在从CSV文件中读取应用信息</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">加载失败</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => loadApps()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-slide-down">
              <span className="w-2 h-2 bg-success-400 rounded-full mr-2 animate-pulse"></span>
              现已收录 {filteredApps.length}+ 精选应用
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                Setapp 应用
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">
                展示平台
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-8 animate-slide-up delay-200">
              探索精选的 Mac 和 iOS 应用程序，发现提升工作效率和创造力的最佳工具。
              <br className="hidden md:block" />
              让每一个应用都成为你数字生活的完美伙伴。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
              <button className="group px-8 py-4 bg-white text-primary-600 rounded-2xl font-semibold shadow-large hover:shadow-colored transition-all duration-300 hover:scale-105">
                <span className="flex items-center">
                  开始探索
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                <span className="flex items-center">
                  了解更多
                  <svg className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 底部波浪装饰 */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>
      
      {/* 统计面板 */}
      <StatsPanel />
      
      {/* 搜索和筛选 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchFilters />
          
          {/* 视图切换和结果计数 */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                找到 <span className="font-semibold text-gray-900">{filteredApps.length}</span> 个应用
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">视图:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 应用列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              未找到匹配的应用
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              请尝试调整搜索条件或筛选器，或者清除所有筛选条件重新开始
            </p>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }`}>
            {filteredApps.map((app, index) => (
              <AppCard 
                key={`${app.名称}-${index}`} 
                app={app} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
        
        {/* 加载更多提示 */}
        {filteredApps.length > 0 && (
          <div className="text-center mt-12 py-8 border-t border-gray-200">
            <p className="text-gray-600">
              已显示所有 {filteredApps.length} 个应用
            </p>
          </div>
        )}
      </div>
      
      {/* 应用详情模态框 */}
      <AppDetailModal 
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      {/* 页脚 */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">
              Setapp 应用展示平台
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              这是一个展示Setapp平台上精选应用的网站，帮助用户发现和了解各种优秀的Mac和iOS应用程序。
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Setapp应用展示平台</span>
              <span>•</span>
              <span>数据来源: Setapp官方</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}