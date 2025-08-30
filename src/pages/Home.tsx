import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from 'react-i18next';
import { useI18nStore } from '@/lib/currency';
import AppCard from '@/components/AppCard';
import SearchFilters from '@/components/SearchFilters';
import StatsPanel from '@/components/StatsPanel';
import AppDetailModal from '@/components/AppDetailModal';
import StickyQuickSwitcher from '@/components/StickyQuickSwitcher';
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
  
  const { t } = useTranslation();
  const { locale } = useI18nStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  
  // 监听语言变化事件，强制重新渲染
  useEffect(() => {
    const handleLanguageChanged = () => {
      setForceRender(prev => prev + 1);
    };
    
    window.addEventListener('language-changed', handleLanguageChanged);
    return () => {
      window.removeEventListener('language-changed', handleLanguageChanged);
    };
  }, []);
  
  // 监听 locale 变化，自动重新渲染
  useEffect(() => {
    setForceRender(prev => prev + 1);
  }, [locale]);
  // 获取超紧凑响应式网格类名 - 扩展到10列适配4K显示器
  const getGridClasses = (viewMode: 'grid' | 'list') => {
    if (viewMode === 'list') return 'space-y-2';
    
    return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
            xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8
            gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6`;
  };
  
  // 获取超紧凑容器类名 - 扩展到12xl适配超宽屏
  const getContainerClasses = () => {
    return `max-w-3xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl 
            2xl:max-w-10xl 3xl:max-w-11xl 4xl:max-w-12xl mx-auto 
            px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8`;
  };
  
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
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">加载应用数据中...</h2>
          <p className="text-neutral-800">正在从CSV文件中读取应用信息</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-danger-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">加载失败</h2>
          <p className="text-neutral-800 mb-4">{error}</p>
          <button
            onClick={() => loadApps()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* 粘性头部快速切换器 */}
      <StickyQuickSwitcher />
      {/* 页面头部 - Claude 风格简洁设计 */}
      <div className="bg-white border-b border-secondary-200">
        <div className={`${getContainerClasses()} py-16 lg:py-24`}>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-primary-900">
              {locale === 'zh-CN' ? 'Setapp 应用展示平台' :
               locale === 'ja-JP' ? 'Setapp アプリショーケース' :
               'Setapp Apps Showcase'}
            </h1>
            
            <p className="text-lg md:text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed mb-12">
              {locale === 'zh-CN' ? '探索精选的 Mac 和 iOS 应用程序，发现提升工作效率和创造力的最佳工具。' :
               locale === 'ja-JP' ? '厘選されたMacおよびiOSアプリケーションを探索し、生産性と創造性を向上させる最適なツールを発見してください。' :
               'Explore curated Mac and iOS applications, discover the best tools to enhance productivity and creativity.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* 搜索按钮 - Claude 风格 */}
              <button 
                onClick={() => {
                  const searchInput = document.querySelector('input[placeholder*="搜索"]') as HTMLInputElement;
                  if (searchInput) {
                    searchInput.focus();
                    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {locale === 'zh-CN' ? '搜索应用' :
                 locale === 'ja-JP' ? 'アプリを検索' :
                 'Search Apps'}
              </button>
              
              {/* 随机推荐按钮 - Claude 风格 */}
              <button 
                onClick={() => {
                  if (filteredApps.length > 0) {
                    const randomApp = filteredApps[Math.floor(Math.random() * filteredApps.length)];
                    setSelectedApp(randomApp);
                  }
                }}
                className="bg-white border border-secondary-300 hover:bg-secondary-50 text-primary-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {locale === 'zh-CN' ? '随机发现' :
                 locale === 'ja-JP' ? 'ランダム発見' :
                 'Random Discovery'}
              </button>
            </div>
            
            <div className="mt-8 text-sm text-secondary-500">
              {locale === 'zh-CN' ? `现已收录 ${filteredApps.length}+ 精选应用` :
               locale === 'ja-JP' ? `${filteredApps.length}+の厘選アプリを収録しています` :
               `${filteredApps.length}+ Curated Apps Available`}
            </div>
          </div>
        </div>
      </div>
      
      {/* 统计面板 */}
      <div data-section="stats">
        <StatsPanel />
      </div>
      
      {/* 搜索和筛选 - Claude 风格简洁设计 */}
      <div className="bg-white border-b border-secondary-200">
        <div className={`${getContainerClasses()} py-8`}>
          <SearchFilters />
          
          {/* 视图切换和结果计数 - 简洁版本 */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-secondary-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-800 font-medium">
                {locale === 'zh-CN' ? '找到' :
                 locale === 'ja-JP' ? '見つかった' :
                 'Found'} <span className="font-semibold text-primary-600">{filteredApps.length}</span> {locale === 'zh-CN' ? '个应用' :
                 locale === 'ja-JP' ? '個のアプリ' :
                 'apps'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-secondary-600 font-medium">
                {locale === 'zh-CN' ? '视图:' :
                 locale === 'ja-JP' ? '表示:' :
                 'View:'}
              </span>
              <div className="flex items-center bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-secondary-600 hover:text-primary-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-secondary-600 hover:text-primary-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 应用列表 - Claude 风格简洁设计 */}
      <div className="bg-secondary-50">
        <div className={getContainerClasses() + ' py-12'}>
          {filteredApps.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-secondary-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-lg font-medium text-primary-800 mb-3">
                {locale === 'zh-CN' ? '未找到匹配的应用' :
                 locale === 'ja-JP' ? '一致するアプリが見つかりません' :
                 'No matching apps found'}
              </h3>
              <p className="text-sm text-secondary-600 max-w-md mx-auto">
                {locale === 'zh-CN' ? '请尝试调整搜索条件或筛选器，或者清除所有筛选条件重新开始' :
                 locale === 'ja-JP' ? '検索条件やフィルターを調整するか、すべてのフィルターをクリアしてやり直してください' :
                 'Try adjusting your search terms or filters, or clear all filters to start over'}
              </p>
            </div>
          ) : (
            <div className={getGridClasses(viewMode)}>
              {filteredApps.map((app, index) => (
                <AppCard 
                  key={`${app.名称}-${index}`} 
                  app={app} 
                  viewMode={viewMode}
                  showPlatformDetails={true}
                  onPlatformClick={(platform) => {
                    console.log('点击了平台:', platform);
                    // 可以在这里添加平台筛选功能
                  }}
                />
              ))}
            </div>
          )}
          
          {/* 统计信息 */}
          {filteredApps.length > 0 && (
            <div className="text-center mt-12 pt-8 border-t border-secondary-200">
              <p className="text-sm text-secondary-600">
                {locale === 'zh-CN' ? '已显示所有' :
                 locale === 'ja-JP' ? 'すべて表示中' :
                 'Showing all'} <span className="font-medium text-primary-700">{filteredApps.length}</span> {locale === 'zh-CN' ? '个应用' :
                 locale === 'ja-JP' ? '個のアプリ' :
                 'apps'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* 应用详情模态框 */}
      <AppDetailModal 
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      {/* 页脚 - Claude 风格简洁设计 */}
      <footer className="bg-white border-t border-secondary-200">
        <div className={`${getContainerClasses()} py-12`}>
          <div className="text-center">
            <h3 className="text-lg font-medium text-primary-800 mb-3">
              {locale === 'zh-CN' ? 'Setapp 应用展示平台' :
               locale === 'ja-JP' ? 'Setapp アプリショーケース' :
               'Setapp Apps Showcase'}
            </h3>
            <p className="text-sm text-secondary-600 max-w-2xl mx-auto mb-6">
              {locale === 'zh-CN' ? '这是一个展示Setapp平台上精选应用的网站，帮助用户发现和了解各种优秀的Mac和iOS应用程序。' :
               locale === 'ja-JP' ? 'Setappプラットフォームの厳選アプリを紹介するウェブサイトで、ユーザーが優秀なMacやiOSアプリケーションを発見し理解することを支援します。' :
               'A website showcasing curated applications from the Setapp platform, helping users discover and learn about excellent Mac and iOS applications.'}
            </p>
            <div className="flex justify-center items-center space-x-2 text-xs text-secondary-500">
              <span>
                {locale === 'zh-CN' ? '© 2024 Setapp应用展示平台' :
                 locale === 'ja-JP' ? '© 2024 Setappアプリショーケース' :
                 '© 2024 Setapp Apps Showcase'}
              </span>
              <span>•</span>
              <span>
                {locale === 'zh-CN' ? '数据来源: Setapp官方' :
                 locale === 'ja-JP' ? 'データソース: Setapp公式' :
                 'Data Source: Official Setapp'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}