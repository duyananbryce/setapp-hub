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
      { bg: '#cd6f47', text: '#FFFFFF' }, // Primary
      { bg: '#8a7fbd', text: '#FFFFFF' }, // Accent
      { bg: '#22c55e', text: '#FFFFFF' }, // Success
      { bg: '#f59e0b', text: '#FFFFFF' }, // Warning
      { bg: '#ef4444', text: '#FFFFFF' }, // Danger
      { bg: '#71717a', text: '#FFFFFF' }, // Secondary
      { bg: '#b05730', text: '#FFFFFF' }, // Primary-600
      { bg: '#6c5dac', text: '#FFFFFF' }, // Accent-600
      { bg: '#16a34a', text: '#FFFFFF' }, // Success-600
      { bg: '#d97706', text: '#FFFFFF' }, // Warning-600
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