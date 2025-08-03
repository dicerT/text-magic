# 文本魔法 (Text Magic)

一个基于 Next.js 14 和 TypeScript 构建的现代化文本处理工具，提供多种创意文本生成和转换功能。

## 项目概述

这是一个多功能的文本处理应用，包含以下核心功能：
- **文本重复器**: 高性能文本重复工具，支持最高10万次重复，提供4种输出格式（换行、逗号、空格、无分隔符）
- **表情符号文字**: 将文字转换为表情符号像素艺术，支持中英文、数字，可选择纵向和横向排列
- **字体转换器**: 提供6种Unicode字体样式转换（哥特式、神秘斜体、数学无衬线、轻量气泡字、粗体手写斜体、童话字体）

## 技术栈

- **框架**: Next.js 14.2.16 (React 18.2+)
- **语言**: TypeScript 5.x (严格模式)
- **样式**: Tailwind CSS 3.4+ 
- **UI组件**: Radix UI + shadcn/ui 完整组件库
- **动画**: Framer Motion (页面切换和交互动画)
- **主题**: next-themes (明暗主题支持)
- **图标**: Lucide React 0.454+
- **包管理**: pnpm (性能优化)

## 项目结构

```
text-magic/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 主应用页面 (路由管理和状态切换)
│   └── globals.css        # 全局样式和Tailwind导入
├── components/            # React 组件目录
│   ├── ui/               # shadcn/ui 完整组件库 (20+组件)
│   ├── home-page.tsx     # 主页组件 (功能导航卡片)
│   ├── text-repeater.tsx # 文本重复器组件 (核心功能)
│   ├── emoji-text.tsx    # 表情符号文字组件 (像素艺术生成)
│   ├── font-text.tsx     # 字体转换器组件 (Unicode样式转换)
│   ├── language-provider.tsx # 多语言支持提供者
│   ├── language-switcher.tsx # 语言切换器
│   └── theme-provider.tsx # 主题提供者 (明暗模式)
├── hooks/                # 自定义React Hooks
├── lib/                  # 工具函数库
├── public/               # 静态资源
│   └── images/          # 图片资源
└── styles/               # 样式文件
```

## 核心功能详解

### 1. 文本重复器 (`components/text-repeater.tsx`)
**高性能文本重复工具**
- 支持重复次数：1-100,000次 (完全可配置)
- 4种输出格式：
  - 每行一个 (换行分隔)
  - 逗号分隔 (CSV格式)
  - 空格分隔 (文本拼接)
  - 无分隔符 (连续输出)
- 预设快捷按钮：×10, ×100, ×1000, ×10000
- 实时字符统计和输入验证
- 一键复制结果到剪贴板
- 优雅的加载状态和错误处理
- 响应式双栏布局设计

### 2. 表情符号文字 (`components/emoji-text.tsx`)
**像素艺术创作工具**
- 支持字符：英文字母(A-Z)、数字(0-9)、常用中文汉字、空格
- 7×5像素矩阵精准渲染
- 双模式生成：
  - 纵向排列：字符垂直堆叠，适合短文本
  - 横向排列：字符水平连接，适合标语
- 智能表情符号选择器 (400+表情符号)
- 前景/背景表情符号自定义
- 实时预览和一键复制

### 3. 字体转换器 (`components/font-text.tsx`)
**Unicode字体样式转换**
- 6种精美字体样式：
  - Fraktur (哥特式字体)
  - Cryptic Italic (神秘斜体) 
  - Math Sans (数学无衬线)
  - Light Text Bubbles (轻量气泡字)
  - Script Bold Italic (粗体手写斜体)
  - Fairytale (童话字体)
- 智能字符兼容性检测
- 字体可用性自动检测
- Unicode渲染回退机制
- 批量转换和独立复制功能

## 开发相关

### 安装依赖
```bash
pnpm install
```

### 开发服务器
```bash
pnpm dev
```
应用将在 http://localhost:3000 运行

### 构建项目
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

### 代码检查
```bash
pnpm lint
```

## 项目特点

- **🎨 现代化设计**: 使用 shadcn/ui + Tailwind CSS，界面简洁专业，支持明暗主题
- **📱 完全响应式**: 移动端优先设计，完美适配手机、平板、桌面端
- **⚡ 高性能优化**: Next.js 14 App Router + TypeScript 严格模式，确保类型安全和运行效率
- **🎬 流畅动画**: Framer Motion 提供的页面切换、卡片悬停、状态过渡动画
- **🌍 国际化支持**: 内置多语言切换功能，支持中英文界面
- **🔄 状态管理**: 客户端状态管理，无刷新页面切换体验
- **⌨️ 用户体验**: 实时输入验证、加载状态、错误提示、复制反馈
- **🎯 无障碍友好**: 语义化HTML结构，键盘导航支持

## 配置文件

- `next.config.mjs`: Next.js 14 应用配置
- `tailwind.config.ts`: Tailwind CSS 自定义配置
- `tsconfig.json`: TypeScript 严格模式配置
- `components.json`: shadcn/ui 组件库配置
- `postcss.config.mjs`: PostCSS 处理配置
- `package.json`: 项目依赖和脚本配置

## 部署指南

项目支持多种部署方式：
- **Vercel** (推荐): 零配置部署，完美支持 Next.js 14
- **Netlify**: 静态站点部署
- **自托管**: Docker 容器部署
- **CDN**: 静态资源分发优化

## 技术要求

- **Node.js**: 18.17+ 或 20.0+
- **pnpm**: 8.0+ (推荐包管理工具)
- **现代浏览器**: 支持 ES2020+ 和 CSS Grid

## 性能特性

- **代码分割**: 按需加载组件和资源
- **图片优化**: Next.js Image 组件自动优化
- **字体优化**: Geist 字体家族，支持可变字重
- **缓存策略**: 静态资源长期缓存
- **压缩优化**: Gzip/Brotli 自动压缩