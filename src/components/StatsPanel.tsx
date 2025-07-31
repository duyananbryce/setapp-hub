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
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">应用统计</h2>
          <p className="text-sm text-gray-600 mt-1">
            {showingAll ? 
              '展示所有Setapp应用的统计信息' : 
              `当前筛选条件下的应用统计`
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.color} rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/90 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    {stat.subtext && (
                      <p className="text-xs text-white/80">
                        {stat.subtext}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 平台分布可视化 */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">平台分布</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 transition-all duration-500"
                  style={{ width: `${(stats.macApps / stats.totalApps) * 100}%` }}
                />
                <div 
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${(stats.iosApps / stats.totalApps) * 100}%` }}
                />
                <div 
                  className="bg-purple-500 transition-all duration-500"
                  style={{ width: `${(stats.crossPlatformApps / stats.totalApps) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>Mac</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>iOS</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>跨平台</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}