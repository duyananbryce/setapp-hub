import { useState } from 'react';
import { DetailedFeature } from '@/types/app';
import { ChevronDown, ChevronRight, Settings, Code, Play, List } from 'lucide-react';

interface DetailedFeaturesProps {
  features: DetailedFeature[];
  expandable?: boolean;
  defaultExpanded?: boolean;
}

export default function DetailedFeatures({ 
  features, 
  expandable = true,
  defaultExpanded = false
}: DetailedFeaturesProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    defaultExpanded ? new Set(features.map((_, index) => index)) : new Set()
  );
  
  const toggleExpand = (index: number) => {
    if (!expandable) return;
    
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedModules(newExpanded);
  };
  
  const expandAll = () => {
    setExpandedModules(new Set(features.map((_, index) => index)));
  };
  
  const collapseAll = () => {
    setExpandedModules(new Set());
  };
  
  if (features.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>暂无详细功能信息</p>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      {/* 头部控制区 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-900 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-primary-600" />
          详细功能
        </h3>
        
        {expandable && features.length > 1 && (
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={expandAll}
              className="px-3 py-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded transition-colors"
            >
              展开全部
            </button>
            <span className="text-neutral-300">|</span>
            <button
              onClick={collapseAll}
              className="px-3 py-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded transition-colors"
            >
              收起全部
            </button>
          </div>
        )}
      </div>
      
      {/* 功能模块列表 */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const isExpanded = !expandable || expandedModules.has(index);
          
          return (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* 模块头部 */}
              <div 
                className={`p-4 bg-gray-50 flex justify-between items-center ${
                  expandable ? 'cursor-pointer hover:bg-gray-100' : ''
                } transition-colors`}
                onClick={() => expandable && toggleExpand(index)}
              >
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <List className="w-4 h-4 mr-2 text-gray-600" />
                  {feature.模块名称}
                </h4>
                {expandable && (
                  <div className="text-gray-500">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                )}
              </div>
              
              {/* 模块内容 */}
              {isExpanded && (
                <div className="p-6 bg-white">
                  {/* 功能说明 */}
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {feature.功能说明}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 子功能 */}
                    {feature.子功能 && feature.子功能.length > 0 && (
                      <div>
                        <h5 className="font-medium text-neutral-900 mb-3 flex items-center">
                          <List className="w-4 h-4 mr-2 text-primary-600" />
                          子功能模块
                        </h5>
                        <ul className="space-y-2">
                          {feature.子功能.map((sub, subIndex) => (
                            <li key={subIndex} className="flex items-start">
                              <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* 技术特点 */}
                    {feature.技术特点 && feature.技术特点.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Code className="w-4 h-4 mr-2 text-green-600" />
                          技术特点
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {feature.技术特点.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium border border-green-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 操作示例 */}
                  {feature.操作示例 && (
                    <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h5 className="font-medium text-amber-900 mb-2 flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        操作示例
                      </h5>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        {feature.操作示例}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* 统计信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>共 {features.length} 个功能模块</span>
          <span>包含 {features.reduce((total, f) => total + (f.子功能?.length || 0), 0)} 个子功能</span>
        </div>
      </div>
    </div>
  );
}