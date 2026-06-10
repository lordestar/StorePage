import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const CreateOrderPage = lazy(() => import("./pages/CreateOrderPage"));
const PayPage = lazy(() => import("./pages/PayPage"));
const OrderListPage = lazy(() => import("./pages/OrderListPage"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProductManage = lazy(() => import("./pages/admin/ProductManage"));
const CategoryManage = lazy(() => import("./pages/admin/CategoryManage"));
const OrderManage = lazy(() => import("./pages/admin/OrderManage"));
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProtectedRoute from "./components/ProtectedRoute";

function Lazy({ children, skeleton = false }) {
  return (
    <Suspense fallback={skeleton ? <LoadingSkeleton count={4} /> : <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"4rem",color:"var(--color-text-muted)"}}>加载中...</div>}>
      {children}
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, element: <Lazy skeleton><HomePage /></Lazy> },
      { path: "home", element: <Lazy skeleton><HomePage /></Lazy> },
      { path: "category", element: <Lazy skeleton><CategoryPage /></Lazy> },
      { path: "category/:categoryId", element: <Lazy skeleton><CategoryPage /></Lazy> },
      { path: "detail/:goodId", element: <Lazy><DetailPage /></Lazy> },
      { path: "login", element: <Lazy><LoginPage /></Lazy> },
      { path: "cart", element: <ProtectedRoute><Lazy><CartPage /></Lazy></ProtectedRoute> },
      { path: "user", element: <ProtectedRoute><Lazy><UserPage /></Lazy></ProtectedRoute> },
      { path: "createOrder", element: <ProtectedRoute><Lazy><CreateOrderPage /></Lazy></ProtectedRoute> },
      { path: "createOrder/:goodId", element: <ProtectedRoute><Lazy><CreateOrderPage /></Lazy></ProtectedRoute> },
      { path: "pay/:orderId", element: <ProtectedRoute><Lazy><PayPage /></Lazy></ProtectedRoute> },
      { path: "orderList", element: <ProtectedRoute><Lazy><OrderListPage /></Lazy></ProtectedRoute> },
      { path: "orderDetail/:orderId", element: <ProtectedRoute><Lazy><OrderDetailPage /></Lazy></ProtectedRoute> },
    ],
  },
  {
    path: "/admin/login",
    element: <Lazy><AdminLoginPage /></Lazy>,
  },
  {
    path: "/admin",
    element: <Lazy><AdminLayout /></Lazy>,
    children: [
      { index: true, element: <Lazy><Dashboard /></Lazy> },
      { path: "products", element: <Lazy><ProductManage /></Lazy> },
      { path: "categories", element: <Lazy><CategoryManage /></Lazy> },
      { path: "orders", element: <Lazy><OrderManage /></Lazy> },
    ],
  },
]);

export default router;
