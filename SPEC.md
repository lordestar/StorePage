# Implementation Plan: 轻量化电商平台 (React 商城系统)

## Overview

基于 React 19 + Vite 8 + React Router 7 构建完整电商平台，包含前台商城与后台管理端，数据全量 localStorage 持久化。本项目为第四次大作业，需满足 README.md 中全部功能要求并完成至少 5 项加分项。

## Requirements Summary

### 前台功能

| ID    | 功能             | 描述                                               | 优先级 |
|-------|------------------|----------------------------------------------------|--------|
| F-01  | 商城首页         | 搜索栏, 轮播图(Banner), 热门商品展示               | P0     |
| F-02  | 分类页           | 展示所有商品分类，可按分类筛选商品                  | P0     |
| F-03  | 商品详情页       | 商品详细信息, 加入购物车, 立即购买                  | P0     |
| F-04  | 购物车           | 查看, 修改数量, 删除, 选中结算                      | P0     |
| F-05  | 我的页面         | 用户个人信息, 订单列表入口                          | P0     |
| F-06  | 创建订单页面     | 确认收货地址, 商品清单, 生成订单                    | P0     |
| F-07  | 支付页面         | 模拟支付流程(倒计时, 二维码模拟)                    | P0     |
| F-08  | 订单详情页       | 订单状态, 商品信息, 物流信息                        | P0     |
| F-09  | 用户登录/注册    | 前台用户登录/注册, 登录后可用购物车/下单            | P0     |

### 后台功能

| ID    | 功能             | 描述                                               | 优先级 |
|-------|------------------|----------------------------------------------------|--------|
| B-01  | 后台登录         | 独立后台登录页, 验证后进入管理界面                  | P0     |
| B-02  | 权限管理         | 角色控制后台模块可见性(管理员/运营)                 | P0     |
| B-03  | 商品管理         | 商品 CRUD, 上下架                                  | P0     |

### 通用功能

| ID    | 功能             | 描述                                               | 优先级 |
|-------|------------------|----------------------------------------------------|--------|
| G-01  | 数据联动         | 前后台数据通过 localStorage 共享                   | P0     |
| G-02  | 数据持久化       | 刷新后购物车/登录态/商品数据不丢失                 | P0     |

### Acceptance Criteria

- [ ] `npm run dev` 启动后, 6 个前台页面 + 4 个后台页面均可正常交互
- [ ] `node tool/check.cjs` 自检脚本全部通过
- [ ] 购物车增删改查完整可用
- [ ] 订单创建->支付->状态流转完整
- [ ] 商品后台 CRUD 完整可用
- [ ] 用户登录态跨页面持久化

### 加分项目标

- [ ] 数据持久化: localStorage 全覆盖(购物车/登录/商品/订单)
- [ ] 表单验证: 登录/注册/商品编辑表单前端验证 + 错误提示
- [ ] 支付模拟优化: 倒计时 + 二维码 + 支付成功动画
- [ ] 响应式布局: 手机/平板/PC 三端适配
- [ ] 性能优化: React.memo, useCallback, lazy loading
- [ ] 部署上线: Vercel 部署并提供可访问链接

## Technical Approach

### Architecture

```
App (Root Layout: Header + Outlet + Footer)
├── Context Providers (AuthContext / CartContext / ServiceContext)
├── Frontend Routes (前台)
│   ├── HomePage        -> 首页
│   ├── CategoryPage    -> 分类页
│   ├── DetailPage      -> 商品详情
│   ├── CartPage        -> 购物车
│   ├── LoginPage       -> 登录注册
│   ├── UserPage        -> 我的
│   ├── CreateOrderPage -> 下单
│   ├── PayPage         -> 支付
│   ├── OrderListPage   -> 订单列表
│   └── OrderDetailPage -> 订单详情
├── Backend Routes (后台 /admin/*)
│   ├── AdminLoginPage  -> 后台登录
│   ├── AdminLayout     -> 后台布局壳
│   │   ├── Dashboard       -> 仪表盘
│   │   ├── ProductManage   -> 商品管理
│   │   ├── CategoryManage  -> 分类管理
│   │   └── OrderManage     -> 订单管理
└── Shared Components
    ├── Header, Footer, SearchBar, Carousel
    ├── ProductCard, ProductGrid
    ├── CartItem, OrderCard
    └── FormInput, Button, Toast
```

### Technology Stack

| 层面       | 技术                                   |
|------------|----------------------------------------|
| 构建       | Vite 8 (Rolldown)                      |
| 框架       | React 19 (Hooks)                       |
| 路由       | React Router 7 (createBrowserRouter)   |
| 状态管理   | Context + useReducer                   |
| 样式       | CSS Modules + CSS Variables (主题系统)  |
| 数据存储   | localStorage (Service 层封装)           |
| 图标       | Lucide React                           |
| 部署       | Vercel (加分项)                        |
| 测试       | Playwright E2E (加分项)                |

### Key Design Decisions

1. **Context 而非 Redux**: 项目规模适中，3 个 Context (Auth/Cart/Service) 足够，避免引入重量级依赖
2. **Service 层抽象**: goodService / orderService / userService / cartService 统一封装 localStorage 读写，业务逻辑与 UI 解耦
3. **CSS Variables 设计系统**: 全局主题色/间距/字号通过 CSS 变量控制，避免魔法值，方便深色模式扩展
4. **单路由壳 + 子路由**: 前台 `/` 和后台 `/admin` 各一个布局壳，通过 `<Outlet>` 渲染子页面

## Data Models

```typescript
// User
User {
  id: number; username: string; password: string;
  role: "user" | "admin" | "operator";
  nickname: string; phone: string; address: string; avatar: string;
}

// Good
Good {
  id: number; name: string; price: number; originalPrice: number;
  categoryId: string; img: string; images: string[];
  desc: string; stock: number; sales: number; isOnSale: boolean;
}

// Category
Category { id: string; name: string; icon: string; parentId: string | null; }

// CartItem
CartItem { goodId: number; count: number; selected: boolean; }

// Order
Order {
  id: number; userId: number; orderNo: string;
  createTime: string; payTime: string | null;
  status: 0|1|2|3; // 0待支付 1已支付 2已发货 3已收货
  items: { goodId:number; count:number; price:number }[];
  total: number; address: string; logistics: string;
}
```

## Route Design

### 前台路由

| Path                        | Component        | Auth |
|-----------------------------|------------------|------|
| `/`                         | HomePage         | -    |
| `/home`                     | HomePage         | -    |
| `/category`                 | CategoryPage     | -    |
| `/category/:categoryId`     | CategoryPage     | -    |
| `/detail/:goodId`           | DetailPage       | -    |
| `/cart`                     | CartPage         | ✓    |
| `/login`                    | LoginPage        | -    |
| `/user`                     | UserPage         | ✓    |
| `/createOrder`              | CreateOrderPage  | ✓    |
| `/createOrder/:goodId`      | CreateOrderPage  | ✓    |
| `/pay/:orderId`             | PayPage          | ✓    |
| `/orderList`                | OrderListPage    | ✓    |
| `/orderDetail/:orderId`     | OrderDetailPage  | ✓    |

### 后台路由

| Path                 | Component       | Auth  |
|----------------------|-----------------|-------|
| `/admin/login`       | AdminLoginPage  | -     |
| `/admin`             | Dashboard       | Admin |
| `/admin/products`    | ProductManage   | Admin |
| `/admin/categories`  | CategoryManage  | Admin |
| `/admin/orders`      | OrderManage     | Admin |

## Implementation Phases

### Phase 1 — 基础设施 & 首页 [P0]

| #   | Task                                   | Effort | Status  |
|-----|----------------------------------------|--------|---------|
| 1.1 | 重构 App.jsx: Header+Outlet+Footer     | 0.5h   | pending |
| 1.2 | CSS Variables 设计系统 (index.css)     | 0.3h   | pending |
| 1.3 | AuthContext (登录态管理)               | 0.5h   | pending |
| 1.4 | CartContext (购物车状态)               | 0.5h   | pending |
| 1.5 | 公共组件: Header (导航/搜索/购物车图标)| 1h     | pending |
| 1.6 | 公共组件: Footer                       | 0.3h   | pending |
| 1.7 | 公共组件: SearchBar                    | 0.3h   | pending |
| 1.8 | 公共组件: Carousel (轮播图)            | 0.5h   | pending |
| 1.9 | 公共组件: ProductCard                  | 0.5h   | pending |
| 1.10| HomePage: 搜索+轮播+热门商品Grid       | 1h     | pending |

### Phase 2 — 商品 & 购物车 [P0]

| #   | Task                                   | Effort | Status  |
|-----|----------------------------------------|--------|---------|
| 2.1 | DetailPage: 完整详情+大图+描述         | 1h     | pending |
| 2.2 | DetailPage: 加购/立即购买              | 0.5h   | pending |
| 2.3 | CategoryPage: 分类树+商品网格+筛选     | 1h     | pending |
| 2.4 | CartPage: 商品列表/数量/删除/全选      | 1.5h   | pending |
| 2.5 | CartPage: 选中结算->跳转下单           | 0.5h   | pending |
| 2.6 | cartService: localStorage 持久化       | 0.5h   | pending |

### Phase 3 — 订单 & 支付 [P0]

| #   | Task                                   | Effort | Status  |
|-----|----------------------------------------|--------|---------|
| 3.1 | 重构 Order 数据模型: 多商品支持        | 0.5h   | pending |
| 3.2 | CreateOrderPage: 地址+清单+生成订单    | 1h     | pending |
| 3.3 | PayPage 增强: 倒计时+二维码模拟        | 1.5h   | pending |
| 3.4 | OrderListPage: 状态筛选+列表           | 1h     | pending |
| 3.5 | OrderDetailPage: 完整状态流+物流       | 1h     | pending |

### Phase 4 — 用户系统 [P0]

| #   | Task                                   | Effort | Status  |
|-----|----------------------------------------|--------|---------|
| 4.1 | userService: 用户 CRUD + localStorage  | 0.5h   | pending |
| 4.2 | LoginPage: 登录/注册+表单验证          | 1.5h   | pending |
| 4.3 | AuthContext 集成: 登录态持久化         | 0.5h   | pending |
| 4.4 | UserPage: 个人信息+订单入口+退出       | 1h     | pending |

### Phase 5 — 后台管理 [P0]

| #   | Task                                   | Effort | Status  |
|-----|----------------------------------------|--------|---------|
| 5.1 | AdminLoginPage: 后台独立登录           | 0.5h   | pending |
| 5.2 | AdminLayout: 侧边栏+顶栏+Outlet        | 1h     | pending |
| 5.3 | AdminLayout: 权限控制(角色可见性)      | 0.5h   | pending |
| 5.4 | Dashboard: 基础数据概览                | 0.5h   | pending |
| 5.5 | ProductManage: 商品CRUD+上下架         | 2h     | pending |

### Phase 6 — 加分项 [P1]

| #   | Task                                   | Effort | Status  |
|-----|----------------------------------------|--------|---------|
| 6.1 | 表单验证增强(登录/注册/商品编辑)       | 1h     | pending |
| 6.2 | 响应式布局(手机/平板/PC)               | 2h     | pending |
| 6.3 | 性能优化(memo/callback/lazy)           | 1h     | pending |
| 6.4 | 支付模拟增强(动画/音效)                | 1h     | pending |
| 6.5 | Vercel 部署上线                        | 0.5h   | pending |

## File Structure Plan

```
LW-01-13/
├── SPEC.md                     <- 本文件
├── src/
│   ├── main.jsx                [已存在]
│   ├── App.jsx                 [重构] 前台根布局
│   ├── App.css                 [重构]
│   ├── index.css               [重构] CSS变量设计系统
│   ├── router.jsx              [重构] 完整路由
│   ├── contexts/
│   │   ├── ServiceContext.jsx  [已存在]
│   │   ├── AuthContext.jsx     [新建]
│   │   └── CartContext.jsx     [新建]
│   ├── services/
│   │   ├── goodService.js      [重构]
│   │   ├── orderService.js     [重构]
│   │   ├── userService.js      [新建]
│   │   └── cartService.js      [新建]
│   ├── pages/
│   │   ├── HomePage.jsx        [重构]
│   │   ├── CategoryPage.jsx    [新建]
│   │   ├── DetailPage.jsx      [重构]
│   │   ├── CartPage.jsx        [新建]
│   │   ├── LoginPage.jsx       [重构]
│   │   ├── UserPage.jsx        [新建]
│   │   ├── CreateOrderPage.jsx [重构]
│   │   ├── PayPage.jsx         [重构]
│   │   ├── OrderListPage.jsx   [重构]
│   │   ├── OrderDetailPage.jsx [重构]
│   │   └── admin/
│   │       ├── AdminLoginPage.jsx  [新建]
│   │       ├── AdminLayout.jsx     [新建]
│   │       ├── Dashboard.jsx       [新建]
│   │       ├── ProductManage.jsx   [新建]
│   │       ├── CategoryManage.jsx  [新建]
│   │       └── OrderManage.jsx     [新建]
│   ├── components/
│   │   ├── Header.jsx          [新建]
│   │   ├── Footer.jsx          [新建]
│   │   ├── SearchBar.jsx       [新建]
│   │   ├── Carousel.jsx        [新建]
│   │   ├── ProductCard.jsx     [新建]
│   │   ├── ProductGrid.jsx     [新建]
│   │   ├── CartItem.jsx        [新建]
│   │   ├── OrderCard.jsx       [新建]
│   │   ├── FormInput.jsx       [新建]
│   │   ├── Toast.jsx           [新建]
│   │   └── ProtectedRoute.jsx  [新建]
│   └── hooks/
│       ├── useForm.js          [新建]
│       └── useLocalStorage.js  [新建]
```

## Dependencies

- **Lucide React**: 图标库, 需 `npm install lucide-react`
- 其余依赖在 package.json 中已有

## Success Criteria

### 硬性验证

- [ ] `npm run dev` 启动成功, 无控制台报错
- [ ] `node tool/check.cjs` 自检全部通过

### 功能验证

- [ ] 首页轮播图可自动播放
- [ ] 商品列表可按分类筛选
- [ ] 购物车可增删改, 选中结算
- [ ] 订单创建->支付->查看状态流转完整
- [ ] 用户可登录注册, 登录态跨页面保持
- [ ] 后台可登录, 管理商品 CRUD

### 加分验证

- [ ] 完成至少 5 项加分项
- [ ] Vercel 部署链接可访问
