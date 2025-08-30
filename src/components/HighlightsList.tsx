import { FeatureHighlight } from '@/types/app';
import { Sparkles, Zap, Star, Heart } from 'lucide-react';

interface HighlightsListProps {
  highlights: FeatureHighlight[];
  layout?: 'grid' | 'list';
}

export default function HighlightsList({ 
  highlights, 
  layout = 'grid' 
}: HighlightsListProps) {
  const getImportanceStyle = (importance: string) => {
    switch (importance) {
      case 'high':
        return {
          containerClass: 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900'
        };
      case 'medium':
        return {
          containerClass: 'border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900'
        };
      default:
        return {
          containerClass: 'border-l-4 border-l-success-500 bg-gradient-to-r from-success-50 to-success-100 hover:from-success-100 hover:to-success-200',
          iconColor: 'text-success-600',
          titleColor: 'text-success-900'
        };
    }
  };
  
  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Zap className="w-5 h-5" />;
      case 'medium':
        return <Star className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };
  
  if (highlights.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>暂无核心亮点信息</p>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-accent-600" />
        核心亮点
      </h3>
      
      <div className={`grid gap-4 ${
        layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
      }`}>
        {highlights.map((highlight, index) => {
          const style = getImportanceStyle(highlight.重要程度);
          
          return (
            <div 
              key={index}
              className={`p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border ${
                style.containerClass
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* 图标区域 */}
                <div className="flex-shrink-0">
                  {highlight.图标 ? (
                    <img 
                      src={highlight.图标} 
                      alt={highlight.标题}
                      className="w-8 h-8 rounded"
                    />
                  ) : (
                    <div className={`${style.iconColor}`}>
                      {getImportanceIcon(highlight.重要程度)}
                    </div>
                  )}
                </div>
                
                {/* 内容区域 */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold mb-2 ${style.titleColor}`}>
                    {highlight.标题}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {highlight.描述}
                  </p>
                  
                  {/* 重要程度指示器 */}
                  <div className="mt-3 flex items-center">
                    <span className="text-xs text-gray-500 mr-2">重要程度：</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            (highlight.重要程度 === 'high' && level <= 3) ||
                            (highlight.重要程度 === 'medium' && level <= 2) ||
                            (highlight.重要程度 === 'low' && level <= 1)
                              ? style.iconColor.replace('text-', 'bg-')
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 总结信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>共 {highlights.length} 个核心亮点</span>
          <span>高优先级 {highlights.filter(h => h.重要程度 === 'high').length} 个</span>
        </div>
      </div>
    </div>
  );
}