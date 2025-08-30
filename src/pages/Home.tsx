import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { useI18nStore } from '@/lib/currency';
import { Loader2, AlertCircle, Grid, List, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// 组件导入
import SearchFilters from '@/components/SearchFilters';
import StatsPanel from '@/components/StatsPanel';
import AppCard from '@/components/AppCard';
import AppDetailModal from '@/components/AppDetailModal';
import StickyQuickSwitcher from '@/components/StickyQuickSwitcher';
import Empty from '@/components/Empty';

export default function Home() {
  const { 
    filteredApps, 
    loading, 
    error, 
    loadApps,
    selectedApp,
    setSelectedApp,
    setFilters
  } = useAppStore();
  
  const { locale } = useI18nStore();
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPlatformDetails, setShowPlatformDetails] = useState(false);
  
  useEffect(() => {
    console.log('Home component mounted, loading apps...');
    loadApps().catch(console.error);
  }, []);
  
  console.log('Home render:', { loading, error, appsCount: filteredApps?.length || 0 });
  
  // 处理平台点击筛选
  const handlePlatformClick = (platform: string) => {
    setFilters({ platform });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-claude-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-claude-black rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <Loader2 className="absolute inset-0 w-16 h-16 text-claude-accent animate-spin mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-claude-text-heading mb-2">
            {locale === 'zh-CN' ? '加载应用数据中...' : 
             locale === 'ja-JP' ? 'アプリデータを読み込み中...' : 
             'Loading app data...'}
          </h2>
          <p className="text-claude-text-secondary">
            {locale === 'zh-CN' ? '正在从CSV文件中读取应用信息' : 
             locale === 'ja-JP' ? 'CSVファイルからアプリ情報を読み取り中' : 
             'Reading app information from CSV file'}
          </p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-claude-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-claude-text-heading mb-2">
            {locale === 'zh-CN' ? '加载失败' : 
             locale === 'ja-JP' ? '読み込み失敗' : 
             'Loading Failed'}
          </h2>
          <p className="text-claude-text-secondary mb-4">{error}</p>
          <button
            onClick={() => loadApps().catch(console.error)}
            className="btn-claude-primary"
          >
            {locale === 'zh-CN' ? '重试' : 
             locale === 'ja-JP' ? 'リトライ' : 
             'Retry'}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-claude-bg">
      {/* 顶部快速切换器 */}
      <StickyQuickSwitcher />
      
      {/* 主标题区域 - Claude极简风格 */}
      <div className="bg-claude-card border-b border-claude-border-light">
        <div className="max-w-12xl mx-auto px-3 sm:px-4 md:px-6 xl:px-8 pt-20 pb-12 md:pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <div className="p-3 md:p-4 bg-claude-black rounded-xl">
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-claude-text-heading mb-4 md:mb-6 leading-tight">
              {locale === 'zh-CN' ? 'Setapp 应用展示' : 
               locale === 'ja-JP' ? 'Setapp アプリショーケース' : 
               'Setapp Apps Showcase'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-claude-text-secondary max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-4">
              {locale === 'zh-CN' ? '探索最优质的Mac和iOS应用，提升您的工作效率和创造力' : 
               locale === 'ja-JP' ? '最高品質のMacとiOSアプリを探索し、生産性と創造性を向上させます' : 
               'Discover the finest Mac and iOS apps to boost your productivity and creativity'}
            </p>
          </div>
        </div>
      </div>
      
      {/* 统计面板 */}
      <StatsPanel />
      
      {/* 搜索和筛选 */}
      <SearchFilters />
      
      {/* 视图控制和应用列表 */}
      <div className="max-w-12xl mx-auto px-3 sm:px-4 md:px-6 xl:px-8 py-6 md:py-8">
        {/* 视图控制栏 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl md:text-2xl font-semibold text-claude-text-heading">
              {locale === 'zh-CN' ? '应用列表' : 
               locale === 'ja-JP' ? 'アプリリスト' : 
               'App Gallery'}
              <span className="ml-2 md:ml-3 text-base md:text-lg font-normal text-claude-text-secondary">
                ({filteredApps?.length || 0})
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* 平台详情切换 */}
            <button
              onClick={() => setShowPlatformDetails(!showPlatformDetails)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showPlatformDetails
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {locale === 'zh-CN' ? '平台详情' : 
               locale === 'ja-JP' ? 'プラットフォーム詳細' : 
               'Platform Details'}
            </button>
            
            {/* 视图模式切换 */}
            <div className="flex bg-white rounded-lg border border-neutral-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
                title={locale === 'zh-CN' ? '网格视图' : locale === 'ja-JP' ? 'グリッドビュー' : 'Grid View'}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
                title={locale === 'zh-CN' ? '列表视图' : locale === 'ja-JP' ? 'リストビュー' : 'List View'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 应用卡片网格/列表 */}
        {filteredApps && filteredApps.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 gap-3 sm:gap-4 lg:gap-5 2xl:gap-6'
            : 'space-y-3 md:space-y-4'
          }>
            {filteredApps.map((app, index) => (
              <AppCard 
                key={`${app.名称}-${index}`}
                app={app}
                viewMode={viewMode}
                showPlatformDetails={showPlatformDetails}
                onPlatformClick={handlePlatformClick}
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
      
      {/* 应用详情模态框 */}
      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}