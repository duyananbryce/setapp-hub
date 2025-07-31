import React from 'react';

interface AppIconProps {
  appName: string;
  size?: number;
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ appName, size = 64, className = '' }) => {
  // 获取应用名称的首字母
  const getInitials = (name: string): string => {
    if (!name) return 'A';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
  };

  // 根据应用名称生成颜色
  const getColorFromName = (name: string): { bg: string; text: string } => {
    const colors = [
      { bg: '#3B82F6', text: '#FFFFFF' }, // Blue
      { bg: '#10B981', text: '#FFFFFF' }, // Green
      { bg: '#F59E0B', text: '#FFFFFF' }, // Amber
      { bg: '#EF4444', text: '#FFFFFF' }, // Red
      { bg: '#8B5CF6', text: '#FFFFFF' }, // Purple
      { bg: '#06B6D4', text: '#FFFFFF' }, // Cyan
      { bg: '#F97316', text: '#FFFFFF' }, // Orange
      { bg: '#84CC16', text: '#FFFFFF' }, // Lime
      { bg: '#EC4899', text: '#FFFFFF' }, // Pink
      { bg: '#6366F1', text: '#FFFFFF' }, // Indigo
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const initials = getInitials(appName);
  const colors = getColorFromName(appName);
  const gradientId = `gradient-${appName.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`inline-flex items-center justify-center rounded-lg shadow-sm ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" className="rounded-lg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.bg} />
            <stop offset="100%" stopColor={colors.bg} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="12" fill={`url(#${gradientId})`} />
        <text
          x="32"
          y="32"
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.text}
          fontSize={initials.length === 1 ? "24" : "18"}
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
};

export default AppIcon;