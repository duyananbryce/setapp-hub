/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude 风格主色调 - 现代中性灰蓝色系
        primary: {
          50: '#f8fafc',    // 极浅灰蓝
          100: '#f1f5f9',   // 浅灰蓝
          200: '#e2e8f0',   // 中浅灰蓝
          300: '#cbd5e1',   // 中灰蓝
          400: '#94a3b8',   // 中深灰蓝
          500: '#64748b',   // 主灰蓝色 - Claude风格
          600: '#475569',   // 深灰蓝
          700: '#334155',   // 较深灰蓝
          800: '#1e293b',   // 深灰蓝
          900: '#0f172a',   // 极深灰蓝
          950: '#020617',   // 最深灰蓝
        },
        // 优化的辅助色 - 纯净灰色系
        secondary: {
          50: '#f9fafb',    // 极浅灰
          100: '#f3f4f6',   // 浅灰
          200: '#e5e7eb',   // 中浅灰
          300: '#d1d5db',   // 中灰
          400: '#9ca3af',   // 中深灰
          500: '#6b7280',   // 主灰色
          600: '#4b5563',   // 深灰
          700: '#374151',   // 较深灰
          800: '#1f2937',   // 深灰
          900: '#111827',   // 极深灰
          950: '#030712',   // 最深灰
        },
        // 重新设计的强调色 - 温和蓝色系
        accent: {
          50: '#eff6ff',    // 极浅蓝
          100: '#dbeafe',   // 浅蓝
          200: '#bfdbfe',   // 中浅蓝
          300: '#93c5fd',   // 中蓝
          400: '#60a5fa',   // 中深蓝
          500: '#3b82f6',   // 主蓝色
          600: '#2563eb',   // 深蓝
          700: '#1d4ed8',   // 较深蓝
          800: '#1e40af',   // 深蓝
          900: '#1e3a8a',   // 极深蓝
          950: '#172554',   // 最深蓝
        },
        // Claude风格背景色系 - 纯净白色系
        neutral: {
          50: '#ffffff',    // 纯白
          100: '#fefefe',   // 极浅白
          200: '#fafafa',   // 浅白
          300: '#f5f5f5',   // 中浅白
          400: '#e5e5e5',   // 中白
          500: '#d4d4d4',   // 主白色
          600: '#a3a3a3',   // 深白
          700: '#737373',   // 较深白
          800: '#525252',   // 深白
          900: '#404040',   // 极深白
          950: '#262626',   // 最深白
        },
        // 优化的功能性色彩 - 更低饱和度，更温和
        success: {
          50: '#f0fdf4',    // 极浅绿
          100: '#dcfce7',   // 浅绿
          200: '#bbf7d0',   // 中浅绿
          300: '#86efac',   // 中绿
          400: '#4ade80',   // 中深绿
          500: '#22c55e',   // 主绿色 - 降低饱和度
          600: '#16a34a',   // 深绿
          700: '#15803d',   // 较深绿
          800: '#166534',   // 深绿
          900: '#14532d',   // 极深绿
          950: '#052e16',   // 最深绿
        },
        warning: {
          50: '#fffbeb',    // 极浅橙
          100: '#fef3c7',   // 浅橙
          200: '#fde68a',   // 中浅橙
          300: '#fcd34d',   // 中橙
          400: '#fbbf24',   // 中深橙
          500: '#f59e0b',   // 主橙色
          600: '#d97706',   // 深橙
          700: '#b45309',   // 较深橙
          800: '#92400e',   // 深橙
          900: '#78350f',   // 极深橙
          950: '#451a03',   // 最深橙
        },
        danger: {
          50: '#fef2f2',    // 极浅红
          100: '#fee2e2',   // 浅红
          200: '#fecaca',   // 中浅红
          300: '#fca5a5',   // 中红
          400: '#f87171',   // 中深红
          500: '#ef4444',   // 主红色
          600: '#dc2626',   // 深红
          700: '#b91c1c',   // 较深红
          800: '#991b1b',   // 深红
          900: '#7f1d1d',   // 极深红
          950: '#450a0a',   // 最深红
        },
      },
      fontFamily: {
        // Claude风格字体系统
        'sans': ['Inter', 'Libre Franklin', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Fraunces', 'Inter', 'system-ui', 'sans-serif'],
        'cal': ['Cal Sans', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        // Claude风格字体大小，加入字间距和行高优化
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.011em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.011em' }],
        'base': ['1rem', { lineHeight: '1.5', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.444', letterSpacing: '-0.011em' }],
        'xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.014em' }],
        '2xl': ['1.5rem', { lineHeight: '1.333', letterSpacing: '-0.017em' }],
        '3xl': ['1.875rem', { lineHeight: '1.267', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.222', letterSpacing: '-0.022em' }],
        '5xl': ['3rem', { lineHeight: '1.167', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1.133', letterSpacing: '-0.025em' }],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '-0.011em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      spacing: {
        '15': '3.75rem',   // 60px
        '18': '4.5rem',    // 72px
        '88': '22rem',     // 352px
        '128': '32rem',    // 512px
        '144': '36rem',    // 576px
        '160': '40rem',    // 640px
      },
      screens: {
        '3xl': '1920px',   // 超宽屏断点
        '4xl': '2560px',   // 4K显示器断点  
      },
      maxWidth: {
        '8xl': '88rem',    // 1408px - 针对大屏优化
        '9xl': '96rem',    // 1536px - 桌面显示器
        '10xl': '110rem',  // 1760px - 宽屏显示器
        '11xl': '120rem',  // 1920px - 超宽屏
        '12xl': '140rem',  // 2240px - 4K显示器
      },
      gridTemplateColumns: {
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      borderRadius: {
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',     // 16px  
        '3xl': '1.5rem',   // 24px
        '4xl': '2rem',     // 32px
        '5xl': '2.5rem',   // 40px
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.03), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        'subtle': '0 0 0 1px rgba(0, 0, 0, 0.05)',
        'border': '0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -12px, 0)' },
          '70%': { transform: 'translate3d(0, -6px, 0)' },
          '90%': { transform: 'translate3d(0, -3px, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(205, 111, 71, 0.15), 0 0 10px rgba(205, 111, 71, 0.08)' },
          '100%': { boxShadow: '0 0 15px rgba(205, 111, 71, 0.25), 0 0 25px rgba(205, 111, 71, 0.12)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '80px',
      },
      backdropSaturate: {
        25: '.25',
        75: '.75',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // require('@tailwindcss/line-clamp'), // 已在 Tailwind CSS v3.3+ 中内置
  ],
}