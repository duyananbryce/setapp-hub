import { BarChart3, Smartphone, Monitor, Star, DollarSign } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export default function StatsPanel() {
  const { stats, filteredApps } = useAppStore();
  
  if (!stats) return null;
  
  const currentCount = filteredApps.length;
  const showingAll = currentCount === stats.totalApps;
  
  const statCards = [
    {
      icon: BarChart3,
      label: showingAll ? '总应用数' : '筛选结果',
      value: currentCount.toLocaleString(),
      subtext: showingAll ? '' : `共 ${stats.totalApps} 个应用`,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      iconColor: 'text-blue-100'
    },
    {
      icon: Monitor,
      label: 'Mac应用',
      value: stats.macApps.toLocaleString(),
      subtext: `${((stats.macApps / stats.totalApps) * 100).toFixed(1)}%`,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      iconColor: 'text-indigo-100'
    },
    {
      icon: Smartphone,
      label: 'iOS应用',
      value: stats.iosApps.toLocaleString(),
      subtext: `${((stats.iosApps / stats.totalApps) * 100).toFixed(1)}%`,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      iconColor: 'text-green-100'
    },
    {
      icon: Star,
      label: '平均评分',
      value: stats.averageRating.toFixed(1),
      subtext: '满分100分',
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      iconColor: 'text-yellow-100'
    },
    {
      icon: DollarSign,
      label: '平均价格',
      value: `$${stats.averagePrice.toFixed(0)}`,
      subtext: '年订阅费用',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      iconColor: 'text-purple-100'
    }
  ];
  
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 animate-pulse"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-green-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">应用统计概览</h2>
          </div>
          <p className="text-sm text-gray-600">
            {showingAll ? 
              '展示所有Setapp应用的统计信息' : 
              `当前筛选条件下的应用统计`
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
                <div className={`absolute inset-0 ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className={`relative ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/90 mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-white mb-2 animate-fade-in">
                        {stat.value}
                      </p>
                      {stat.subtext && (
                        <p className="text-xs text-white/80">
                          {stat.subtext}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 平台分布可视化 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">平台分布</h3>
          </div>
          
          <div className="space-y-6">
            {/* 综合分布条 */}
            <div className="mb-6">
              <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-1000 ease-out animate-slide-in"
                  style={{ width: `${(stats.macApps / stats.totalApps) * 100}%` }}
                />
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 ease-out animate-slide-in"
                  style={{ width: `${(stats.iosApps / stats.totalApps) * 100}%`, animationDelay: '200ms' }}
                />
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-1000 ease-out animate-slide-in"
                  style={{ width: `${(stats.crossPlatformApps / stats.totalApps) * 100}%`, animationDelay: '400ms' }}
                />
              </div>
            </div>
            
            {/* 详细分布 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-indigo-700">Mac应用</div>
                  <div className="text-lg font-bold text-indigo-900">
                    {stats.macApps} <span className="text-sm font-normal">({((stats.macApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-700">iOS应用</div>
                  <div className="text-lg font-bold text-green-900">
                    {stats.iosApps} <span className="text-sm font-normal">({((stats.iosApps / stats.totalApps) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-purple-700">跨平台</div>
                  <div className="text-lg font-bold text-purple-900">
                    {stats.crossPlatformApps} <span className="text-sm font-normal">({((stats.crossPlatformApps / stats.totalApps) * 100).toFixed(1)}%)</span>
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