import { UseCase } from '@/types/app';
import { Users, Target, CheckCircle, TrendingUp, Lightbulb } from 'lucide-react';

interface UseCasePanelProps {
  useCases: UseCase[];
  layout?: 'grid' | 'list';
}

export default function UseCasePanel({ 
  useCases, 
  layout = 'grid' 
}: UseCasePanelProps) {
  if (useCases.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>暂无使用场景信息</p>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Target className="w-5 h-5 mr-2 text-green-600" />
        使用场景
      </h3>
      
      <div className={`grid gap-6 ${
        layout === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'
      }`}>
        {useCases.map((useCase, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* 场景头部 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-green-100">
              <h4 className="font-semibold text-green-900 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                {useCase.场景名称}
              </h4>
            </div>
            
            {/* 场景内容 */}
            <div className="p-4 space-y-4">
              {/* 适用人群 */}
              <div>
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 mr-2 text-primary-600" />
                  <span className="text-sm font-medium text-neutral-800">适用人群</span>
                </div>
                <p className="text-sm text-neutral-800 bg-primary-50 px-3 py-2 rounded border border-primary-100">
                  {useCase.适用人群}
                </p>
              </div>
              
              {/* 问题描述 */}
              <div>
                <div className="flex items-center mb-2">
                  <Target className="w-4 h-4 mr-2 text-danger-600" />
                  <span className="text-sm font-medium text-neutral-800">问题挑战</span>
                </div>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {useCase.问题描述}
                </p>
              </div>
              
              {/* 解决方案 */}
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-4 h-4 mr-2 text-success-600" />
                  <span className="text-sm font-medium text-neutral-800">解决方案</span>
                </div>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {useCase.解决方案}
                </p>
              </div>
              
              {/* 效果展示 */}
              {useCase.效果展示 && (
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium text-green-800">预期效果</span>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">
                    {useCase.效果展示}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 场景总结 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>共 {useCases.length} 个应用场景</span>
          <span>覆盖多种用户需求</span>
        </div>
      </div>
    </div>
  );
}