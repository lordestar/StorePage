# 第四次作业报告

**姓名**：周一航（组长）
**学号**：23301174
**作业名称**：React 商城系统

---

## 1. 组员分工

| 姓名 | 学号 | 分工与产出 | 贡献占比 |
|------|------|-----------|---------|
| 周一航（组长） | 23301174 | 产品设计、前端编码、文档撰写 | 30% |
| 罗督星 | 23301159 | 前端编码、后台管理 | 25% |
| 张喆 | 23301170 | 前端编码、UI 设计 | 20% |
| 周锐 | 23301173 | 测试、文档撰写 | 15% |
| 王艺晓 | 21301167 | 产品设计、PPT 制作 | 10% |

## 2. 项目结构

```
App (根组件, 含 <Outlet /> 渲染子路由)
├── HomePage            → 商城主页面 (搜索框、轮播图、热门商品)
├── LoginPage           → 用户登录/注册页
├── DetailPage          → 商品详情页
├── CreateOrderPage     → 创建订单页
├── PayPage             → 支付页面
├── OrderListPage       → 订单列表页
├── OrderDetailPage     → 订单详情页
├── CartPage            → 购物车
├── UserPage            → 我的
├── CategoryPage        → 分类页

└── Admin (后台)
    ├── AdminLoginPage  → 后台登录
    ├── AdminLayout     → 后台布局
    ├── Dashboard       → 仪表盘
    ├── ProductManage   → 商品管理
    ├── CategoryManage  → 分类管理
    └── OrderManage     → 订单管理

## 3. 前台功能实现说明

| 功能模块 | 实现方式 |
|----------|----------|
| 商城主页面（搜索框/轮播图/热门商品） | 搜索：SearchBar 组件 + 分类页 query 参数；轮播：Carousel 自动播放；热门：按销量排序 Top8 |
| 商品详情页 | DetailPage，展示大图/描述/价格/库存/销量，支持加入购物车和立即购买 |
| 购物车 | CartContext 全局管理，支持数量修改、全选、删除、选中结算，localStorage 持久化 |
| 创建订单 | CreateOrderPage，确认收货地址和商品清单后提交，含库存校验 |
| 支付页面 | PayPage，模拟支付：15分钟倒计时、二维码展示、超时自动取消 |
| 订单列表 | OrderListPage，按状态筛选（全部/待支付/已支付/已发货/已收货/已取消），分页显示 |
| 订单详情 | OrderDetailPage，展示物流步骤、商品清单、金额汇总，待支付订单可跳转支付 |
| 用户登录/注册 | LoginPage，含完整表单验证，未登录用户操作受限 |

## 4. 后台管理端功能实现说明

| 功能模块 | 实现方式 |
|----------|----------|
| 后台登录 | AdminLoginPage，独立登录，仅 admin/operator 角色可进入 |
| 权限管理 | AuthContext 角色控制，非管理员无法访问后台 |
| 商品管理 | ProductManage，完整 CRUD + 上下架，价格千分位显示 |
| 分类管理 | CategoryManage，分类增删改查，数据与前台联动 |
| 订单管理 | OrderManage，查看所有订单、发货操作，列表即时刷新 |

## 5. 路由设计

| 路由 | 组件 | 认证 |
|------|------|------|
| / | HomePage | - |
| /category | CategoryPage | - |
| /detail/:goodId | DetailPage | - |
| /login | LoginPage | - |
| /cart | CartPage | ✓ |
| /user | UserPage | ✓ |
| /createOrder | CreateOrderPage | ✓ |
| /pay/:orderId | PayPage | ✓ |
| /orderList | OrderListPage | ✓ |
| /orderDetail/:orderId | OrderDetailPage | ✓ |
| /admin/login | AdminLoginPage | - |
| /admin | Dashboard | Admin |
| /admin/products | ProductManage | Admin |
| /admin/categories | CategoryManage | Admin |
| /admin/orders | OrderManage | Admin |

## 6. 状态管理与数据存储

- **全局状态管理方式**：Context + Service 模式 (AuthContext / CartContext / ServiceContext)
- **数据存储方式**：全量 localStorage 持久化 (商品/用户/订单/购物车均不丢失)
- **前后台数据联动方式**：共享 localStorage，同一份数据源

## 7. 加分项完成情况

- [x] **数据持久化**：localStorage 全覆盖，刷新后购物车/登录态/商品数据不丢失
- [x] **表单验证**：登录/注册/商品编辑表单前端验证 + 错误提示
- [x] **支付模拟优化**：15分钟倒计时 + 二维码展示 + 超时自动取消订单
- [x] **分页**：商品列表每页12件、订单列表每页5条，通用 Pagination 组件
- [x] **响应式布局**：手机/平板/PC 三端适配，Header 全屏遮罩导航
- [x] **性能优化**：React.memo, lazy loading, useCallback
- [x] **单元测试**：orderService 状态流转测试 + categoryService CRUD 测试 (vitest)
- [x] **部署上线**：Vercel 部署 + GitHub 自动部署

## 8. 技术栈

| 层面 | 技术 |
|------|------|
| 构建 | Vite 8 |
| 框架 | React 19 (Hooks) |
| 路由 | React Router 7 (createBrowserRouter + lazy loading) |
| 状态管理 | Context + useReducer |
| 样式 | CSS Variables 设计系统 |
| 数据存储 | localStorage (Service 层封装) |
| 图标 | Lucide React |
| 测试 | Vitest |
| 部署 | Vercel / Gerrit |

## 9. 遇到的问题与解决方案

| 问题 | 解决方案 |
|------|----------|
| 分类导航导致整页刷新 | 将 `<a href>` 替换为 `<Link to>`，实现 SPA 内导航 |
| 支付超时未处理订单状态 | 新增 orderService.cancelOrder()，倒计时归零自动取消 |
| 后台发货后列表不刷新 | 添加 useState refresh 机制，操作后即时更新视图 |
| 商品数据不足 | 种子数据扩展至24个商品，使用 picsum.photos 真实图片 |
| 种子版本不一致 | 添加 SEED_VERSION 版本号检查，自动覆盖旧缓存 |
| localStorage 缓存旧数据 | goodListSeedVersion 机制自动检测并更新 |
