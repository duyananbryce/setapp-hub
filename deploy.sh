#!/bin/bash

# Setapp Apps Showcase 一键部署脚本
# 支持多种部署平台的自动化部署

set -e

echo "🚀 Setapp Apps Showcase 一键部署脚本"
echo "======================================"

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js >= 18.0.0"
    exit 1
fi

# 检查Node.js版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: Node.js 版本过低，需要 >= 18.0.0，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 运行代码检查
echo "🔍 运行代码检查..."
echo "⚠️  注意: 如果有lint错误，将继续构建过程"
npm run lint || echo "⚠️  发现代码检查问题，但继续构建过程"

# 构建项目
echo "🏗️ 构建生产版本..."
npm run build

echo "✅ 构建完成！"

# 部署选项
echo ""
echo "🌐 部署选项:"
echo "1. 本地预览 (npm run preview)"
echo "2. Vercel 部署"
echo "3. Netlify 部署"
echo "4. GitHub Pages 部署"
echo ""

read -p "请选择部署方式 (1-4): " choice

case $choice in
    1)
        echo "🖥️ 启动本地预览..."
        npm run preview
        ;;
    2)
        echo "🚀 Vercel 部署指南:"
        echo "1. 安装 Vercel CLI: npm i -g vercel"
        echo "2. 登录 Vercel: vercel login"
        echo "3. 部署项目: vercel --prod"
        echo "或者直接推送到 GitHub，Vercel 会自动部署"
        ;;
    3)
        echo "🌐 Netlify 部署指南:"
        echo "1. 将 dist 目录拖拽到 https://app.netlify.com/drop"
        echo "2. 或使用 Netlify CLI: npm i -g netlify-cli && netlify deploy --prod --dir=dist"
        ;;
    4)
        echo "📄 GitHub Pages 部署指南:"
        echo "1. 推送代码到 GitHub 仓库"
        echo "2. 在仓库设置中启用 GitHub Pages"
        echo "3. 选择 'GitHub Actions' 作为部署源"
        echo "4. 项目已配置 .github/workflows 自动部署"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 部署脚本执行完成！"
echo "📖 更多信息请查看 README.md 文档"