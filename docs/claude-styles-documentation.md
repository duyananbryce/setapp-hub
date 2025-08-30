# Claude 官网样式方案复刻文档

## 📋 目录
1. [配色方案](#配色方案)
2. [字体系统](#字体系统)
3. [组件样式](#组件样式)
4. [布局系统](#布局系统)
5. [使用指南](#使用指南)

---

## 🎨 配色方案

### 主要颜色
| 颜色名称 | 十六进制值 | CSS变量 | 使用场景 |
|---------|-----------|---------|----------|
| 主背景色 | `#FAFAF9` | `--primary-background` | 网站主体背景 |
| 次要背景色 | `#F5F5F5` | `--secondary-background` | 区块背景、悬停状态 |
| 卡片背景色 | `#FFFFFF` | `--card-background` | 卡片、表单、弹窗背景 |
| 半透明背景 | `rgba(255, 255, 255, 0.95)` | `--overlay-background` | 导航栏、模态框背景 |

### 文字颜色
| 颜色名称 | 十六进制值 | CSS变量 | 使用场景 |
|---------|-----------|---------|----------|
| 主文字颜色 | `#2D2D2D` | `--primary-text` | 正文、段落文字 |
| 次要文字颜色 | `#666666` | `--secondary-text` | 辅助文字、说明文字 |
| 标题文字 | `#1A1A1A` | `--heading-text` | 所有级别标题 |
| 弱化文字 | `#999999` | `--muted-text` | 占位符、禁用状态 |

### 强调色和品牌色
| 颜色名称 | 十六进制值 | CSS变量 | 使用场景 |
|---------|-----------|---------|----------|
| 珊瑚色强调色 | `#E07B5F` | `--accent-coral` | 高亮文字、装饰元素 |
| 橙色强调色 | `#F4A460` | `--accent-orange` | 渐变效果、辅助强调 |
| 主按钮黑色 | `#000000` | `--primary-black` | 主要按钮背景 |
| 按钮悬停色 | `#333333` | `--hover-black` | 按钮悬停状态 |

### 边框和阴影
| 类型 | 值 | CSS变量 | 使用场景 |
|------|----|---------|---------| 
| 浅色边框 | `#E5E5E5` | `--border-light` | 卡片边框、分割线 |
| 中等边框 | `#D1D1D1` | `--border-medium` | 表单边框、按钮边框 |
| 深色边框 | `#B8B8B8` | `--border-dark` | 激活状态边框 |
| 轻阴影 | `0 2px 8px rgba(0, 0, 0, 0.08)` | `--shadow-light` | 卡片、按钮默认阴影 |
| 中等阴影 | `0 4px 16px rgba(0, 0, 0, 0.12)` | `--shadow-medium` | 悬停状态阴影 |
| 重阴影 | `0 8px 32px rgba(0, 0, 0, 0.16)` | `--shadow-heavy` | 模态框、弹窗阴影 |

---

## 📝 字体系统

### 字体家族
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

### 字体层级
| 级别 | 字号 | 字重 | 行高 | 字间距 | 使用场景 |
|------|------|------|------|--------|----------|
| H1 | 56px (3.5rem) | 600 | 1.1 | -0.02em | Hero标题、页面主标题 |
| H2 | 40px (2.5rem) | 600 | 1.2 | -0.01em | 章节标题 |
| H3 | 28px (1.75rem) | 600 | 1.3 | 0 | 子章节标题 |
| H4 | 20px (1.25rem) | 600 | 1.4 | 0 | 卡片标题 |
| H5 | 18px (1.125rem) | 600 | 1.4 | 0 | 小标题 |
| H6 | 16px (1rem) | 600 | 1.4 | 0 | 最小标题 |

### 正文字体
| 类型 | 字号 | 字重 | 行高 | 使用场景 |
|------|------|------|------|----------|
| 正文 | 16px (1rem) | 400 | 1.6 | 段落文字、默认文字 |
| 大正文 | 18px (1.125rem) | 400 | 1.6 | 重要段落、介绍文字 |
| 小正文 | 14px (0.875rem) | 400 | 1.5 | 辅助信息、说明文字 |
| 超小正文 | 12px (0.75rem) | 400 | 1.4 | 标签、时间戳 |

---

## 🧩 组件样式

### 按钮组件
#### 主要按钮 (.btn-primary)
- **背景色**: `#000000`
- **文字颜色**: `#FFFFFF` 
- **内边距**: `14px 24px`
- **圆角**: `8px`
- **字号**: `0.9rem`
- **字重**: `600`
- **悬停效果**: 背景变为 `#333333`，向上移动1px，添加中等阴影

#### 次要按钮 (.btn-secondary)
- **背景色**: 透明
- **文字颜色**: `#2D2D2D`
- **边框**: `2px solid #D1D1D1`
- **内边距**: `12px 22px`
- **悬停效果**: 边框变为主文字色，背景变为次要背景色

#### 轮廓按钮 (.btn-outline)
- **背景色**: `#FFFFFF`
- **边框**: `1px solid #E5E5E5`
- **内边距**: `10px 20px`
- **圆角**: `24px`（胶囊形）
- **字号**: `0.85rem`
- **字重**: `500`

### 卡片组件
#### 标准卡片 (.card)
- **背景色**: `#FFFFFF`
- **圆角**: `12px`
- **内边距**: `24px`
- **边框**: `1px solid #E5E5E5`
- **阴影**: 轻阴影
- **悬停效果**: 中等阴影，向上移动2px

#### 特色卡片 (.card-feature)
- **圆角**: `16px`
- **内边距**: `32px`
- **文字对齐**: 居中
- **用途**: 功能介绍、产品特色展示

### 导航栏组件
#### 导航容器 (.nav)
- **背景色**: `rgba(255, 255, 255, 0.95)`
- **边框**: 底部 `1px solid #E5E5E5`
- **内边距**: `16px 24px`
- **定位**: 粘性定位，顶部固定
- **模糊效果**: `backdrop-filter: blur(10px)`

#### 导航链接 (.nav-links a)
- **字号**: `0.9rem`
- **字重**: `500`
- **颜色**: `#666666`
- **内边距**: `8px 16px`
- **圆角**: `4px`
- **悬停效果**: 文字变为主色，背景变为次要背景色

### 表单组件
#### 输入框 (.form-input)
- **边框**: `1px solid #E5E5E5`
- **圆角**: `8px`
- **内边距**: `12px 16px`
- **字号**: `1rem`
- **背景色**: `#FFFFFF`
- **聚焦效果**: 边框变为主文字色，添加聚焦阴影

---

## 📐 布局系统

### 容器
#### 标准容器 (.container)
- **最大宽度**: `1200px`
- **居中**: `margin: 0 auto`
- **内边距**: `0 24px`

#### 流体容器 (.container-fluid)
- **宽度**: `100%`
- **内边距**: `0 24px`

### 区块
#### 标准区块 (.section)
- **内边距**: `80px 0`

#### Hero区块 (.section-hero)
- **内边距**: `120px 0`
- **背景色**: 主背景色

#### 交替区块 (.section-alt)
- **背景色**: 次要背景色
- **内边距**: `80px 0`

### 网格系统
#### 两列网格 (.grid-2)
```css
grid-template-columns: 1fr 1fr;
align-items: center;
gap: 32px;
```

#### 三列网格 (.grid-3)
```css
grid-template-columns: repeat(3, 1fr);
gap: 32px;
```

#### 四列网格 (.grid-4)
```css
grid-template-columns: repeat(4, 1fr);
gap: 32px;
```

### 间距系统
| 名称 | 值 | CSS变量 | 使用场景 |
|------|----|---------|---------| 
| 超小 | 4px | `--spacing-xs` | 图标间距、紧密元素 |
| 小 | 8px | `--spacing-sm` | 按钮内容间距、小间距 |
| 中等 | 16px | `--spacing-md` | 段落间距、表单间距 |
| 大 | 24px | `--spacing-lg` | 卡片内边距、导航间距 |
| 超大 | 32px | `--spacing-xl` | 网格间距、区块间距 |
| 2倍大 | 48px | `--spacing-2xl` | 大区块间距 |
| 3倍大 | 64px | `--spacing-3xl` | 章节间距 |
| 4倍大 | 80px | `--spacing-4xl` | 页面区块间距 |

---

## 📱 响应式设计

### 断点定义
- **桌面端**: > 1024px
- **平板端**: 768px - 1024px  
- **手机端**: < 768px
- **小手机**: < 480px

### 响应式调整
#### 平板端 (max-width: 1024px)
- 四列网格变为两列
- 容器内边距调整为 `16px`

#### 手机端 (max-width: 768px)
- 所有多列网格变为单列
- 字体尺寸缩小：
  - H1: `2.5rem` → H2: `2rem` → H3: `1.5rem`
- 区块内边距减少到 `60px 0`
- 按钮变为全宽

#### 小手机 (max-width: 480px)
- H1字号进一步缩小到 `2rem`
- 卡片内边距减少到 `16px`
- 区块内边距减少到 `48px 0`

---

## 🎯 使用指南

### 快速开始
1. 将CSS文件引入到你的HTML文档中：
```html
<link rel="stylesheet" href="claude-styles.css">
```

2. 使用预定义的组件类：
```html
<!-- 主要按钮 -->
<button class="btn btn-primary">立即开始</button>

<!-- 卡片 -->
<div class="card">
  <h3 class="card-title">卡片标题</h3>
  <p>卡片内容...</p>
</div>

<!-- 网格布局 -->
<div class="grid grid-3">
  <div class="card">内容1</div>
  <div class="card">内容2</div>
  <div class="card">内容3</div>
</div>
```

### 自定义CSS变量
你可以通过重新定义CSS变量来自定义配色方案：
```css
:root {
  --primary-background: #F8F9FA;  /* 自定义背景色 */
  --accent-coral: #FF6B6B;        /* 自定义强调色 */
  --primary-black: #2C3E50;       /* 自定义按钮色 */
}
```

### 组件组合示例
```html
<!-- Hero区域 -->
<section class="section-hero">
  <div class="container">
    <div class="grid-2">
      <div>
        <h1>欢迎使用我们的产品</h1>
        <p class="body-text-large">这里是产品介绍文字...</p>
        <div class="flex gap-md">
          <button class="btn btn-primary">立即开始</button>
          <button class="btn btn-secondary">了解更多</button>
        </div>
      </div>
      <div>
        <!-- 图片或其他内容 -->
      </div>
    </div>
  </div>
</section>

<!-- 功能介绍区域 -->
<section class="section-alt">
  <div class="container">
    <h2 class="text-center">核心功能</h2>
    <div class="grid-3">
      <div class="card-feature">
        <div class="icon-xl"></div>
        <h4>功能一</h4>
        <p>功能描述...</p>
      </div>
      <div class="card-feature">
        <div class="icon-xl"></div>
        <h4>功能二</h4>
        <p>功能描述...</p>
      </div>
      <div class="card-feature">
        <div class="icon-xl"></div>
        <h4>功能三</h4>
        <p>功能描述...</p>
      </div>
    </div>
  </div>
</section>
```

### 工具类使用
```html
<!-- 间距工具类 -->
<div class="m-4 p-3">内容</div>

<!-- 圆角工具类 -->
<div class="rounded-lg">圆角内容</div>

<!-- 阴影工具类 -->
<div class="shadow-medium">带阴影的内容</div>

<!-- 文字工具类 -->
<p class="text-highlight">高亮文字</p>
<p class="text-muted">弱化文字</p>
```

### 注意事项
1. **字体加载**: 确保系统字体可正常加载，建议添加字体回退方案
2. **图标支持**: 样式中包含图标类，需要配合图标字体或SVG图标使用
3. **浏览器兼容**: 使用了现代CSS特性，建议在现代浏览器中使用
4. **性能优化**: 大型项目中建议按需加载相关样式

---

## 🔗 扩展建议

### 深色模式支持
可以通过CSS变量轻松添加深色模式：
```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-background: #1a1a1a;
    --card-background: #2d2d2d;
    --primary-text: #ffffff;
    --secondary-text: #a0a0a0;
  }
}
```

### 动画增强
添加更多微交互动画：
```css
.btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

这套样式系统完全复刻了Claude官网的设计语言，提供了一个现代、优雅、易用的UI组件库，可以直接用于新项目开发。