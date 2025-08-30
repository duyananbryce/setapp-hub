# 🚀 Setapp Apps Showcase

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-green.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-blue.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个现代化的 Web 应用，专为浏览和探索 Setapp 应用商店中的优质应用而设计。支持多语言、多货币显示，提供智能搜索和数据可视化功能。

🌐 **[项目源码](.)** | 📖 **[文档](./docs/)** | 🛠️ **[开发指南](#开发指南)**

![项目截图](./archive/website-screenshot.png)

## 📑 目录

- [✨ 功能特性](#功能特性)
- [🛠️ 技术栈](#技术栈)
- [📁 项目结构](#项目结构)
- [🚀 快速开始](#快速开始)
- [📊 数据源与处理](#数据源与处理)
- [🌐 部署](#部署)
- [🛠️ 开发指南](#开发指南)
- [🤝 贡献指南](#贡献指南)
- [📄 许可证](#许可证)
- [🙏 致谢](#致谢)
- [📈 更新日志](#更新日志)
- [📞 联系我们](#联系我们)

## ✨ 功能特性

### 🔍 智能搜索与过滤
- **多维度搜索**：支持按应用名称、描述、开发者进行实时搜索
- **高级过滤**：按平台(Mac/iOS)、价格区间、评分等多条件筛选
- **快速排序**：支持按评分、价格、名称等多种方式排序

### 🌍 国际化支持
- **多语言**：支持简体中文、英文、日文三种语言
- **智能翻译**：为40+热门应用提供个性化的多语言描述
- **多货币**：支持 USD、CNY、EUR、JPY、GBP 五种货币显示
- **智能检测**：自动根据用户地理位置和浏览器语言设置默认选项
- **精准匹配**：基于关键词的智能翻译系统，确保每个应用描述准确反映其功能特性

### 📊 数据可视化
- **统计面板**：实时显示应用数量、平台分布、评分统计等关键指标
- **图表展示**：直观的数据图表帮助理解应用市场趋势
- **实时更新**：筛选条件变化时统计数据同步更新

### 🎨 现代化UI设计
- **极简风格**：参考Claude官网设计，采用简洁优雅的视觉风格
- **响应式布局**：完美适配桌面端、平板和移动设备
- **流畅动画**：平滑的过渡效果和悬停反馈
- **无障碍设计**：符合WCAG 2.1 AA级可访问性标准

### ⚡ 性能优化
- **快速加载**：基于Vite的极速构建和热更新
- **代码分割**：按需加载，优化首屏加载时间
- **内存管理**：智能的状态管理和数据缓存
- **翻译优化**：高效的多语言描述生成系统，避免重复计算

## 🛠️ 技术栈

### 前端框架
- **[React 18.3.1](https://reactjs.org/)** - 现代化的UI框架
- **[TypeScript 5.6.2](https://www.typescriptlang.org/)** - 类型安全的JavaScript
- **[Vite 6.0.1](https://vitejs.dev/)** - 下一代前端构建工具

### UI & 样式
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - 实用优先的CSS框架
- **[Radix UI](https://www.radix-ui.com/)** - 无样式的高质量组件
- **[Lucide React](https://lucide.dev/)** - 精美的图标库

### 状态管理 & 数据处理
- **[Zustand 5.0.2](https://github.com/pmndrs/zustand)** - 轻量级状态管理
- **[Papa Parse 5.4.1](https://www.papaparse.com/)** - 强大的CSV解析器
- **[React Router v7](https://reactrouter.com/)** - 声明式路由管理

### 国际化 & 工具库
- **[i18next](https://www.i18next.com/)** - 国际化框架
- **[React i18next](https://react.i18next.com/)** - React国际化绑定
- **[Clsx](https://github.com/lukeed/clsx)** - 条件类名工具

## 📁 项目结构

```
setapp-apps-showcase/
├── src/
│   ├── components/          # React组件
│   │   ├── AppCard.tsx         # 应用卡片组件
│   │   ├── AppDetailModal.tsx  # 应用详情模态框
│   │   ├── SearchFilters.tsx   # 搜索过滤器
│   │   ├── StatsPanel.tsx      # 统计面板
│   │   ├── FeatureGallery.tsx  # 功能展示
│   │   ├── PriceDisplay.tsx    # 价格显示
│   │   └── ...                 # 其他组件
│   ├── hooks/               # 自定义Hooks
│   │   └── useTheme.ts         # 主题管理Hook
│   ├── lib/                 # 工具库
│   │   ├── i18n.ts             # 国际化配置
│   │   ├── currency.ts         # 货币转换
│   │   └── utils.ts            # 通用工具函数
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx            # 首页
│   │   └── TestPage.tsx        # 测试页面
│   ├── store/               # 状态管理
│   │   └── appStore.ts         # 应用状态存储
│   ├── types/               # TypeScript类型定义
│   │   └── app.ts              # 应用相关类型
│   ├── utils/               # 工具函数
│   │   ├── dataLoader.ts       # 数据加载器
│   │   ├── appFeatureExtractor.ts # 应用特性提取
│   │   └── appDescriptionTranslator.ts # 多语言描述翻译器
│   ├── App.tsx              # 应用根组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── public/                  # 静态资源
│   ├── icon/                   # 应用图标
│   ├── apps_list_enhanced_descriptions.csv # 应用数据
│   └── favicon.svg             # 网站图标
├── scripts/                 # 数据处理脚本
│   ├── setapp_scraper_ultimate.py     # 终极爬虫脚本
│   ├── enhanced_html_parser.py        # HTML解析器
│   ├── merge_csv_data.py              # 数据合并工具
│   └── setapp_description_enhancer.py # 描述增强器
├── docs/                    # 项目文档
│   ├── IMPLEMENTATION_SUMMARY.md      # 实现总结
│   ├── LANGUAGE_CURRENCY_FIX_SUMMARY.md # 多语言修复说明
│   └── SMART_FEATURE_EXTRACTION_SUMMARY.md # 智能特征提取说明
├── archive/                 # 归档文件
│   ├── apps_list_*.csv         # 历史数据文件
│   ├── *.cjs                   # 测试脚本
│   └── *.png                   # 截图文件
└── package.json             # 项目配置
```

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 或 **yarn** >= 1.22.0
- **Git** (用于版本控制)

### 安装与运行

1. **克隆仓库**
   ```bash
   git clone <项目仓库地址>
   cd setapp-apps-showcase
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 [http://localhost:5173](http://localhost:5173)

### 构建部署

```bash
# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 📊 数据源与处理

### 数据来源
- **主数据源**：Setapp官方应用商店数据
- **数据格式**：CSV格式，包含应用名称、描述、评分、价格、图标等信息
- **更新频率**：根据需要手动更新

### 数据处理流程
1. **数据抓取**：使用Python脚本从Setapp官网抓取最新应用信息
2. **数据清洗**：清理和标准化应用数据格式
3. **描述增强**：使用AI技术增强应用功能描述
4. **数据合并**：将多个数据源合并为统一格式
5. **智能分类**：自动提取应用类型和核心功能

### 使用数据处理脚本

```bash
# 安装Python依赖
pip install requests beautifulsoup4 pandas

# 运行数据抓取脚本
python scripts/setapp_scraper_ultimate.py

# 增强应用描述
python scripts/setapp_description_enhancer.py

# 合并数据文件
python scripts/merge_csv_data.py
```

## 🌐 部署

### 🚀 一键部署（推荐）

使用项目提供的一键部署脚本，支持多种部署平台：

```bash
# 方式一：直接运行脚本
./deploy.sh

# 方式二：使用npm命令
npm run deploy
```

脚本会自动完成以下步骤：
1. ✅ 检查 Node.js 环境（>= 18.0.0）
2. 📦 安装项目依赖
3. 🔍 运行代码检查
4. 🏗️ 构建生产版本
5. 🌐 提供多种部署选项

### 手动部署选项

#### Vercel部署（推荐）

**方式一：GitHub自动部署**
1. 将代码推送到GitHub仓库
2. 在 [Vercel](https://vercel.com) 中导入该仓库
3. Vercel会自动检测到Vite项目并进行部署

**方式二：CLI部署**
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署到生产环境
vercel --prod
```

#### Netlify部署

**方式一：拖拽部署**
1. 构建项目：`npm run build`
2. 将 `dist` 目录拖拽到 [Netlify Drop](https://app.netlify.com/drop)

**方式二：CLI部署**
```bash
# 安装Netlify CLI
npm i -g netlify-cli

# 部署到生产环境
netlify deploy --prod --dir=dist
```

#### GitHub Pages部署

项目已配置GitHub Actions自动部署：
1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择 'GitHub Actions' 作为部署源
4. 每次推送到main分支会自动触发部署

#### 自托管部署

```bash
# 构建项目
npm run build

# 将dist目录内容部署到Web服务器
# 例如：rsync -av dist/ user@server:/var/www/html/
```

## 🛠️ 开发指南

### 开发环境配置

1. **代码编辑器推荐**
   - VS Code + TypeScript插件
   - WebStorm
   - 配置ESLint和Prettier

2. **开发流程**
   ```bash
   # 启动开发服务器
   npm run dev
   
   # 代码检查
   npm run lint
   
   # 构建项目
   npm run build
   ```

3. **调试技巧**
   - 使用浏览器开发者工具
   - React DevTools扩展
   - 网络面板监控API请求

### 开发规范

- 使用TypeScript进行类型安全开发
- 遵循ESLint代码规范
- 编写组件时确保可复用性
- 添加适当的注释和文档
- 确保响应式设计兼容性

### 项目架构

- **组件化开发**：每个功能模块独立组件
- **状态管理**：使用Zustand进行全局状态管理
- **国际化**：基于i18next的多语言支持
- **样式系统**：Tailwind CSS + 自定义组件库

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看我们的贡献指南：

1. **Fork** 本仓库
2. **创建**特性分支 (`git checkout -b feature/AmazingFeature`)
3. **提交**更改 (`git commit -m 'Add some AmazingFeature'`)
4. **推送**到分支 (`git push origin feature/AmazingFeature`)
5. **创建** Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

- [Setapp](https://setapp.com) - 提供优质的macOS应用数据
- [React团队](https://reactjs.org) - 出色的前端框架
- [Tailwind CSS](https://tailwindcss.com) - 强大的CSS框架
- [Vite](https://vitejs.dev) - 快速的构建工具

## 📈 更新日志

### v2.1.0 (2025-01-30)
- ✨ **新增**：智能多语言描述翻译系统
- 🔧 **优化**：为40+热门应用添加个性化英日描述
- 🐛 **修复**：APP_NAME_TO_TYPE对象重复键值问题
- ⚡ **改进**：关键词匹配算法，提升翻译准确性
- 🎨 **更新**：UI设计文档和样式规范

### v2.0.0 (2025-01-29)
- 🚀 **重构**：全新的现代化UI设计
- 🌍 **新增**：多语言和多货币支持
- 📊 **新增**：数据可视化统计面板
- 🔍 **增强**：智能搜索和过滤功能

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- 📧 邮箱：[your-email@example.com]
- 🐛 问题反馈：请通过项目Issues页面反馈
- 💬 讨论：欢迎在项目中提出建议和讨论

---

<div align="center">
  <p>用 ❤️ 制作于 2025</p>
  <p>如果这个项目对您有帮助，请给我们一个 ⭐</p>
</div>
