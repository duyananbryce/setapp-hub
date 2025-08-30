import { Users, Target, Star } from 'lucide-react';

interface FeatureOverviewProps {
  应用概述: string;
  目标用户?: string[];
  核心价值?: string;
  应用分类?: string;
}

export default function FeatureOverview({
  应用概述,
  目标用户 = [],
  核心价值,
  应用分类
}: FeatureOverviewProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border border-blue-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Star className="w-5 h-5 mr-2 text-blue-600" />
        功能概览
      </h3>
      
      {/* 应用概述 */}
      <div className="mb-6">
        <p className="text-lg text-gray-800 leading-relaxed font-medium">
          {应用概述}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 目标用户 */}
        {目标用户.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">适用人群</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {目标用户.map((user, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                >
                  {user}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 应用分类 */}
        {应用分类 && (
          <div>
            <div className="flex items-center mb-3">
              <Target className="w-4 h-4 mr-2 text-primary-600" />
              <span className="text-sm font-semibold text-neutral-800">应用分类</span>
            </div>
            <span className="px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium border border-primary-200">
              {应用分类}
            </span>
          </div>
        )}
      </div>
      
      {/* 核心价值 */}
      {核心价值 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <h4 className="font-semibold text-neutral-900 mb-2 flex items-center">
            <Target className="w-4 h-4 mr-2 text-success-600" />
            核心价值
          </h4>
          <p className="text-neutral-800 leading-relaxed">{核心价值}</p>
        </div>
      )}
    </div>
  );
}