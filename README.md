# StephenQiu30 - 前端应用

> 作者：[StephenQiu](https://github.com/Stephenqhd30)

基于 React + Ant Design Pro 的全功能博客前端应用，整合了现代前端开发主流框架和核心业务功能。

## 技术栈

### 核心框架

- **Ant Design Pro 6.0.0** - 企业级中后台前端/设计解决方案
- **React 18.3.1** - 用于构建用户界面的 JavaScript 库
- **Umi 4.x** - 可扩展的企业级前端应用框架
- **Ant Design 5.29.3** - 企业级 UI 设计语言和 React 组件库
- **TypeScript 5.9.3** - JavaScript 的超集，提供类型安全

### 开发工具

- **OpenAPI** - 自动生成后端请求代码，基于 Swagger/OpenAPI 规范
- **ESLint + Prettier** - 代码规范和格式化工具
- **Husky + lint-staged** - Git 提交前的代码检查

### 主要组件库

- **@ant-design/pro-components** - 高级业务组件
  - ProLayout - 提供开箱即用的菜单和面包屑功能
  - ProForm - 表单模板组件，预设常见布局和行为
  - ProTable - 表格模板组件，抽象网格请求和单元格样式
  - ProCard - 提供卡片切分以及栅格布局能力
- **@ant-design/md-editor** - Markdown 编辑器组件
- **dayjs** - 轻量级日期处理库

## 核心功能

### 用户认证系统

- 账号密码登录
- 手机号登录
- 用户注册
- JWT Token 认证
- 登录状态持久化

### 权限管理

- 基于角色的访问控制（RBAC）
- 动态路由权限控制
- 用户角色：普通用户、管理员
- 页面级权限校验

### 用户管理（管理员功能）

- 用户列表查询与分页
- 创建新用户
- 编辑用户信息
- 删除用户
- 用户状态管理

### 帖子管理（管理员功能）

- 帖子列表查询与分页
- 创建帖子（支持 Markdown 编辑）
- 编辑帖子
- 删除帖子
- 帖子详情查看
- 帖子审核管理

### 个人中心

- 个人信息展示
- 我的帖子列表
- 我的收藏列表
- 我的点赞列表

### 个人设置

- 基本信息设置
- 密码修改
- 账号绑定管理

### 搜索功能（基于 Elasticsearch）

- 全文搜索
- 帖子搜索（支持标题、内容、分类、标签）
- 用户搜索
- 聚合搜索（同时搜索帖子、用户等）
- 搜索结果高亮显示

### 文件上传

- 图片上传（支持头像、帖子图片等）
- 文件管理
- 业务场景分类上传

### Markdown 功能

- **Markdown 编辑器**（基于 @ant-design/md-editor）
  - 实时预览
  - 支持多种主题
  - 工具栏快捷操作
  - 代码高亮
- **Markdown 查看器**
  - 多种主题渲染
  - 目录导航
  - 代码语法高亮

### 数据交互

- OpenAPI 自动生成类型安全的 API 请求代码
- 统一的错误处理机制
- 请求/响应拦截
- Loading 状态管理

## 架构特性

### 前端架构

- 组件化开发，复用性强
- 路由懒加载，优化首屏加载
- 响应式布局，支持多终端
- 状态管理（Umi Model + initialState）

### 代码规范

- TypeScript 类型检查
- ESLint 代码规范检查
- Prettier 代码格式化
- Git Hooks 提交前检查

### 性能优化

- Webpack 打包优化
- 资源静态化（支持部署到 GitHub Pages）
- Hash 文件名，支持增量发布
- MFSU（Module Federation Speed Up）加速构建

## 目录结构

```
stephen-frontend/
├── config/              # 配置文件
│   ├── config.ts       # Umi 配置
│   ├── routes.ts       # 路由配置
│   ├── proxy.ts        # 代理配置
│   └── defaultSettings.ts # 默认设置
├── public/             # 静态资源
├── src/
│   ├── components/     # 公共组件
│   │   ├── Footer/     # 页脚组件
│   │   ├── Markdown/   # Markdown 编辑器和查看器
│   │   ├── RePost/     # 帖子相关组件
│   │   ├── ReUser/     # 用户相关组件
│   │   └── RightContent/ # 右侧内容组件
│   ├── pages/          # 页面组件
│   │   ├── Welcome/    # 欢迎页
│   │   ├── User/       # 用户相关页面（登录、注册）
│   │   ├── Admin/      # 管理员页面（用户管理、帖子管理）
│   │   ├── Account/    # 个人中心页面
│   │   └── Exception/  # 异常页面（403、404、500）
│   ├── services/       # API 服务（自动生成）
│   │   ├── ant-design-pro/ # 示例 API
│   │   └── stephen-backend/ # 后端 API
│   ├── access.ts       # 权限定义
│   ├── app.tsx         # 应用入口配置
│   ├── constants/      # 常量定义
│   ├── enums/          # 枚举定义
│   └── typings.d.ts    # 类型定义
└── package.json        # 项目依赖
```

## 环境要求

- **Node.js**: >= 12.0.0（建议 >= 16.x）
- **npm** 或 **yarn** 或 **pnpm**

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 配置后端 API

确保后端服务已启动，并修改 `config/config.ts` 中的 OpenAPI 配置：

```typescript
openAPI: [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: 'http://localhost:8080/api/v3/api-docs', // 你的后端 API 文档地址
    projectName: 'stephen-backend',
  },
],
```

### 3. 生成后端请求代码

```bash
npm run openapi
```

### 4. 启动开发服务器

```bash
npm run dev
# 或
npm run start:dev
```

访问 http://localhost:8000 查看应用。

### 5. 构建生产版本

```bash
npm run build
```

构建产物在 `dist` 目录。

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run analyze` - 分析构建产物
- `npm run lint` - 运行代码检查
- `npm run lint:fix` - 自动修复代码问题
- `npm run openapi` - 生成后端 API 请求代码
- `npm run preview` - 预览构建后的应用

## 个性化配置

### 修改标题和 Logo

编辑 `config/defaultSettings.ts` 和 `src/constants/index.ts`：

```typescript
// src/constants/index.ts
export const STEPHEN_TITLE = '你的应用标题';
export const STEPHEN_SUBTITLE = '你的副标题';
export const BACKGROUND_IMAGE = '你的背景图URL';
```

### 代理配置

编辑 `config/proxy.ts` 修改后端 API 代理配置。

## 部署

### 部署到 GitHub Pages

```bash
npm run deploy
```

### 部署到其他服务器

1. 运行 `npm run build` 构建项目
2. 将 `dist` 目录部署到你的服务器

## 相关项目

- [后端项目](https://github.com/Stephenqhd30) - 基于 Spring Boot 的后端 API

## 许可证

本项目仅供学习和个人使用。

## 联系方式

- GitHub: [@Stephenqhd30](https://github.com/Stephenqhd30)
