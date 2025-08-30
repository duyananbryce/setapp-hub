import { Monitor, Smartphone, Tablet, Globe } from 'lucide-react';
import { PlatformSupport } from '@/types/app';

interface PlatformIndicatorProps {
  platform: string;
  supportDetails?: PlatformSupport;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlatformIndicator({ 
  platform, 
  supportDetails,
  showDetails = false,
  size = 'md'
}: PlatformIndicatorProps) {
  const platforms = platform.split(',').map(p => p.trim());
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const badgeSizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const getPlatformIcon = (platformName: string) => {
    const iconClass = sizeClasses[size];
    
    if (platformName.includes('Mac')) {
      return <Monitor className={iconClass} />;
    } else if (platformName.includes('iOS') || platformName.includes('iPhone')) {
      return <Smartphone className={iconClass} />;
    } else if (platformName.includes('iPad')) {
      return <Tablet className={iconClass} />;
    } else if (platformName.includes('Web')) {
      return <Globe className={iconClass} />;
    } else {
      return <Monitor className={iconClass} />;
    }
  };
  
  const getPlatformStyle = (platformName: string) => {
    if (platformName.includes('Mac')) {
      return 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 border-neutral-200';
    } else if (platformName.includes('iOS') || platformName.includes('iPhone')) {
      return 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border-primary-200';
    } else if (platformName.includes('iPad')) {
      return 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 border-accent-200';
    } else if (platformName.includes('Web')) {
      return 'bg-gradient-to-r from-success-100 to-success-200 text-success-700 border-success-200';
    } else {
      return 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 border-secondary-200';
    }
  };

  const getPlatformDetail = (platformName: string) => {
    if (!supportDetails) return null;
    
    if (platformName.includes('Mac')) return supportDetails.Mac;
    if (platformName.includes('iOS')) return supportDetails.iOS;
    if (platformName.includes('iPad')) return supportDetails.iPadOS;
    if (platformName.includes('Web')) return supportDetails.Web;
    
    return null;
  };

  if (!showDetails) {
    return (
      <div className="flex flex-wrap gap-2">
        {platforms.map((platformName, index) => (
          <span 
            key={index}
            className={`inline-flex items-center ${badgeSizeClasses[size]} rounded-full font-medium border shadow-sm ${getPlatformStyle(platformName)}`}
          >
            {getPlatformIcon(platformName)}
            <span className="ml-1.5">{platformName}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 mb-3">平台支持</h4>
      {platforms.map((platformName, index) => {
        const detail = getPlatformDetail(platformName);
        
        return (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <span className={`inline-flex items-center ${badgeSizeClasses[size]} rounded-full font-medium border shadow-sm ${getPlatformStyle(platformName)}`}>
                {getPlatformIcon(platformName)}
                <span className="ml-1.5">{platformName}</span>
              </span>
            </div>
            
            {detail && (
              <div className="space-y-2 text-sm text-gray-600">
                {detail.minVersion && (
                  <div>
                    <span className="font-medium">最低版本要求：</span>
                    {detail.minVersion}
                  </div>
                )}
                
                {detail.features && detail.features.length > 0 && (
                  <div>
                    <span className="font-medium">支持功能：</span>
                    <ul className="list-disc list-inside mt-1">
                      {detail.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {detail.limitations && detail.limitations.length > 0 && (
                  <div>
                    <span className="font-medium">功能限制：</span>
                    <ul className="list-disc list-inside mt-1">
                      {detail.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-amber-600">{limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}