import { BarChart3, Smartphone, Monitor, Star, DollarSign } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useI18nStore } from '@/lib/currency';

export default function StatsPanel() {
  const { stats, filteredApps } = useAppStore();
  const { locale } = useI18nStore();
  
  if (!stats) return null;
  
  const currentCount = filteredApps.length;
  const showingAll = currentCount === stats.totalApps;
  
  const statCards = [
    {
      icon: BarChart3,
      label: showingAll ? 
        (locale === 'zh-CN' ? '总应用数' : locale === 'ja-JP' ? '総アプリ数' : 'Total Apps') : 
        (locale === 'zh-CN' ? '筛选结果' : locale === 'ja-JP' ? 'フィルター結果' : 'Filtered Results'),
      value: currentCount.toLocaleString(),
      subtext: showingAll ? '' : 
        (locale === 'zh-CN' ? `共 ${stats.totalApps} 个应用` : 
         locale === 'ja-JP' ? `合計${stats.totalApps}アプリ` : 
         `Total ${stats.totalApps} apps`)
    },
    {
      icon: Monitor,
      label: locale === 'zh-CN' ? 'Mac应用' : locale === 'ja-JP' ? 'Macアプリ' : 'Mac Apps',
      value: stats.macApps.toLocaleString(),
      subtext: `${((stats.macApps / stats.totalApps) * 100).toFixed(1)}%`
    },
    {
      icon: Smartphone,
      label: locale === 'zh-CN' ? 'iOS应用' : locale === 'ja-JP' ? 'iOSアプリ' : 'iOS Apps',
      value: stats.iosApps.toLocaleString(),
      subtext: `${((stats.iosApps / stats.totalApps) * 100).toFixed(1)}%`
    },
    {
      icon: Star,
      label: locale === 'zh-CN' ? '平均评分' : locale === 'ja-JP' ? '平均評価' : 'Average Rating',
      value: stats.averageRating.toFixed(1),
      subtext: locale === 'zh-CN' ? '满分100分' : locale === 'ja-JP' ? '100点満点' : 'Out of 100'
    },
    {
      icon: DollarSign,
      label: locale === 'zh-CN' ? '平均价格' : locale === 'ja-JP' ? '平均価格' : 'Average Price',
      value: `$${stats.averagePrice.toFixed(0)}`,
      subtext: locale === 'zh-CN' ? '年订阅费用' : locale === 'ja-JP' ? '年間購読料' : 'Annual subscription'
    }
  ];
  
  return (
    <div className="bg-neutral-50 border-b border-neutral-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-neutral-700 rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {locale === 'zh-CN' ? '应用统计概览' : 
               locale === 'ja-JP' ? 'アプリ統計概要' : 
               'App Statistics Overview'}
            </h2>
          </div>
          <p className="text-sm text-neutral-800">
            {showingAll ? 
              (locale === 'zh-CN' ? '展示所有Setapp应用的统计信息' : 
               locale === 'ja-JP' ? 'すべてのSetappアプリの統計情報を表示' : 
               'Statistics for all Setapp applications') : 
              (locale === 'zh-CN' ? '当前筛选条件下的应用统计' : 
               locale === 'ja-JP' ? '現在のフィルター条件下のアプリ統計' : 
               'Statistics for current filter criteria')
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className="relative bg-white border border-neutral-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-800 mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-neutral-900 mb-2">
                        {stat.value}
                      </p>
                      {stat.subtext && (
                        <p className="text-xs text-neutral-700">
                          {stat.subtext}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-xl">
                        <IconComponent className="w-8 h-8 text-neutral-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 平台分布可视化 */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-300 shadow-md">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-neutral-800 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              {locale === 'zh-CN' ? '平台分布' : 
               locale === 'ja-JP' ? 'プラットフォーム分布' : 
               'Platform Distribution'}
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* 综合分布条 */}
            <div className="mb-6">
              <div className="flex h-4 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="bg-neutral-600 transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.macApps / stats.totalApps) * 100}%` }}
                />
                <div 
                  className="bg-neutral-700 transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.iosApps / stats.totalApps) * 100}%`, animationDelay: '200ms' }}
                />
                <div 
                  className="bg-neutral-800 transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.crossPlatformApps / stats.totalApps) * 100}%`, animationDelay: '400ms' }}
                />
              </div>
            </div>
            
            {/* 详细分布 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl border border-neutral-300">
                <div className="p-2 bg-neutral-700 rounded-lg">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {locale === 'zh-CN' ? 'Mac应用' : 
                     locale === 'ja-JP' ? 'Macアプリ' : 
                     'Mac Apps'}
                  </div>
                  <div className="text-lg font-bold text-neutral-900">
                    {stats.macApps} <span className="text-sm font-normal text-neutral-800">({((stats.macApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl border border-neutral-300">
                <div className="p-2 bg-neutral-800 rounded-lg">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {locale === 'zh-CN' ? 'iOS应用' : 
                     locale === 'ja-JP' ? 'iOSアプリ' : 
                     'iOS Apps'}
                  </div>
                  <div className="text-lg font-bold text-neutral-900">
                    {stats.iosApps} <span className="text-sm font-normal text-neutral-800">({((stats.iosApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl border border-neutral-300">
                <div className="p-2 bg-neutral-900 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {locale === 'zh-CN' ? '跨平台' : 
                     locale === 'ja-JP' ? 'クロスプラットフォーム' : 
                     'Cross-platform'}
                  </div>
                  <div className="text-lg font-bold text-neutral-900">
                    {stats.crossPlatformApps} <span className="text-sm font-normal text-neutral-800">({((stats.crossPlatformApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}