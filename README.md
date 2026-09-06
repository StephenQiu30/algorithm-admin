# 排序算法教学平台管理后台 | React + Ant Design Pro

> 面向排序算法教学与 RAG 知识库的开源管理后台，提供用户、内容、知识库、文档和系统运营能力。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

`algorithm-admin` 是排序算法教学平台的管理端前端，基于 React、TypeScript、Umi 和 Ant Design Pro 构建。它适合用于搭建需要用户认证、RBAC 权限、Markdown 内容管理、文件上传、全文搜索和 RAG 知识库运营的中后台应用。

## 项目定位

管理后台与平台的其他仓库协同工作：

- [algorithm-next](https://github.com/StephenQiu30/algorithm-next)：排序算法可视化课堂与用户侧交互前端。
- [algorithm-cloud](https://github.com/StephenQiu30/algorithm-cloud)：基于 Spring Cloud Alibaba 的 Java 微服务后端、RAG 服务和基础设施配置。

## 核心功能

- **用户认证**：账号密码登录、邮箱/手机号登录、注册、JWT Token 和登录状态持久化。
- **RBAC 权限管理**：动态路由、页面权限、普通用户与管理员角色控制。
- **内容运营**：帖子创建、编辑、审核、删除、分类标签和 Markdown 编辑。
- **RAG 知识库管理**：知识库、文档和文档分片管理，支持 RAG 流式问答与召回效果分析。
- **用户与互动管理**：用户分页查询、状态维护、个人资料、收藏和点赞数据查看。
- **搜索与文件**：基于 Elasticsearch 的全文/聚合搜索，以及头像、帖子图片等业务文件上传。
- **工程化体验**：OpenAPI 自动生成请求代码，TypeScript 类型检查，ESLint、Prettier、Husky 和 lint-staged。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | React 18、Umi 4、Ant Design Pro 6 |
| UI 与业务组件 | Ant Design 5、`@ant-design/pro-components`、`@ant-design/md-editor` |
| 语言与工具 | TypeScript、Day.js、Lodash、Highlight.js |
| API 与质量 | Swagger/OpenAPI、ESLint、Prettier、Husky、lint-staged |

## 目录结构

```text
algorithm-admin/
├── config/                 # Umi、路由、代理和默认设置
├── public/                 # 静态资源
├── src/
│   ├── components/         # Markdown、用户、帖子等公共组件
│   ├── pages/              # 登录、用户、管理、个人中心等页面
│   ├── services/           # OpenAPI 生成的后端请求代码
│   ├── access.ts           # 权限定义
│   ├── app.tsx             # 应用入口
│   └── constants/          # 业务常量
└── package.json
```

## 环境要求

- Node.js `>= 12`（建议使用当前维护中的 LTS 版本）
- npm、pnpm 或 yarn
- 已启动并可访问的 `algorithm-cloud` 后端 API

## 快速开始

```bash
git clone https://github.com/StephenQiu30/algorithm-admin.git
cd algorithm-admin

# 推荐使用 pnpm；也可以使用 npm install
pnpm install
pnpm run dev
```

开发服务器默认运行在 <http://localhost:8000>。

### 配置后端 API

请根据本地后端地址检查 `config/config.ts` 中的代理和 OpenAPI 配置。后端 API 文档地址通常形如：

```ts
openAPI: [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: 'http://localhost:8081/api/v3/api-docs',
    projectName: 'user',
  },
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: 'http://localhost:8088/api/v3/api-docs',
    projectName: 'ai',
  },
]
```

项目当前还为帖子、通知、搜索、文件、日志和邮件服务配置了对应的 OpenAPI 文档，完整列表以 `config/config.ts` 为准。

后端接口发生变化后，可运行以下命令重新生成类型安全的请求代码：

```bash
pnpm run openapi
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm run dev` | 启动开发服务器 |
| `pnpm run build` | 构建生产版本，产物位于 `dist/` |
| `pnpm run preview` | 构建并预览生产版本 |
| `pnpm run openapi` | 根据 OpenAPI 文档生成请求代码 |
| `pnpm run lint` | 执行 ESLint、Prettier 和 TypeScript 检查 |
| `pnpm run lint:fix` | 自动修复部分 ESLint 问题 |
| `pnpm run analyze` | 分析构建产物 |

## 个性化配置与部署

- 修改 `config/defaultSettings.ts` 和 `src/constants/index.ts` 可调整标题、Logo 和背景图。
- 修改 `config/proxy.ts` 可配置本地开发代理。
- 运行 `pnpm run build` 后，可将 `dist/` 部署到静态 Web 服务器。
- 项目提供 `pnpm run deploy`，用于构建并发布到 GitHub Pages；使用前请确认仓库权限和发布配置。

## 参与贡献

欢迎通过 Issue 反馈问题，或提交 Pull Request 改进功能、文档和开发体验。提交前请运行 `pnpm run lint`。

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 维护者

[StephenQiu30](https://github.com/StephenQiu30)
