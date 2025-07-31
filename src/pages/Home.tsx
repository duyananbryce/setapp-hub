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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Setapp 应用展示平台
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              探索精选的Mac和iOS应用程序，发现提升工作效率和创造力的最佳工具
            </p>
          </div>
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