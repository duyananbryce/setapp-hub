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
      subtext: showingAll ? 
        (locale === 'zh-CN' ? 'Setapp 应用商店' : 
         locale === 'ja-JP' ? 'Setappアプリストア' : 
         'Setapp App Store') :
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
      subtext: locale === 'zh-CN' ? '满分100' : locale === 'ja-JP' ? '100点満点' : 'Out of 100'
    },
    {
      icon: DollarSign,
      label: locale === 'zh-CN' ? '平均价格' : locale === 'ja-JP' ? '平均価格' : 'Average Price',
      value: `$${stats.averagePrice.toFixed(0)}`,
      subtext: locale === 'zh-CN' ? '年订阅费用' : locale === 'ja-JP' ? '年間購読料' : 'Per year'
    }
  ];
  
  return (
    <div className="bg-claude-card border-b border-claude-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-claude-black rounded-xl shadow-claude">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-claude-text-heading">
              {locale === 'zh-CN' ? '应用统计概览' : 
               locale === 'ja-JP' ? 'アプリ統計概要' : 
               'App Statistics Overview'}
            </h2>
          </div>
          <p className="text-sm text-claude-text-secondary">
            {showingAll ? 
              (locale === 'zh-CN' ? '展示Setapp应用的统计信息' : 
               locale === 'ja-JP' ? 'Setappアプリの統計情報を表示' : 
               'Statistics for Setapp applications') : 
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
                <div className="relative card-claude hover-claude-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-claude-text-secondary mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-semibold text-claude-text-heading mb-2">
                        {stat.value}
                      </p>
                      <p className="text-xs text-claude-text-muted">
                        {stat.subtext}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="p-3 bg-neutral-100 border border-claude-border-light rounded-xl">
                        <IconComponent className="w-8 h-8 text-claude-text" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 平台分布可视化 */}
        <div className="card-claude">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-claude-black rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-claude-text-heading">
              {locale === 'zh-CN' ? '平台分布' : 
               locale === 'ja-JP' ? 'プラットフォーム分布' : 
               'Platform Distribution'}
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* 综合分布条 */}
            <div className="mb-6">
              <div className="flex h-4 bg-claude-border-light rounded-full overflow-hidden">
                <div 
                  className="bg-claude-accent transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.macApps / stats.totalApps) * 100}%` }}
                />
                <div 
                  className="bg-claude-black transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.iosApps / stats.totalApps) * 100}%`, animationDelay: '200ms' }}
                />
                <div 
                  className="bg-claude-text-muted transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.crossPlatformApps / stats.totalApps) * 100}%`, animationDelay: '400ms' }}
                />
              </div>
            </div>
            
            {/* 详细分布 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-neutral-100 rounded-xl border border-claude-border-light">
                <div className="p-2 bg-claude-accent rounded-lg">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-claude-text-heading">
                    {locale === 'zh-CN' ? 'Mac应用' : 
                     locale === 'ja-JP' ? 'Macアプリ' : 
                     'Mac Apps'}
                  </div>
                  <div className="text-lg font-semibold text-claude-text-heading">
                    {stats.macApps} <span className="text-sm font-normal text-claude-text-secondary">({((stats.macApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-100 rounded-xl border border-claude-border-light">
                <div className="p-2 bg-claude-black rounded-lg">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-claude-text-heading">
                    {locale === 'zh-CN' ? 'iOS应用' : 
                     locale === 'ja-JP' ? 'iOSアプリ' : 
                     'iOS Apps'}
                  </div>
                  <div className="text-lg font-semibold text-claude-text-heading">
                    {stats.iosApps} <span className="text-sm font-normal text-claude-text-secondary">({((stats.iosApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-100 rounded-xl border border-claude-border-light">
                <div className="p-2 bg-claude-text-muted rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-claude-text-heading">
                    {locale === 'zh-CN' ? '跨平台' : 
                     locale === 'ja-JP' ? 'クロスプラットフォーム' : 
                     'Cross-platform'}
                  </div>
                  <div className="text-lg font-semibold text-claude-text-heading">
                    {stats.crossPlatformApps} <span className="text-sm font-normal text-claude-text-secondary">({((stats.crossPlatformApps / stats.totalApps) * 100).toFixed(1)}%)</span>
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