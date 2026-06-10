import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, ClipboardList, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.css';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: '仪表盘' },
  { path: '/admin/products', icon: Package, label: '商品管理' },
  { path: '/admin/categories', icon: FolderTree, label: '分类管理' },
  { path: '/admin/orders', icon: ClipboardList, label: '订单管理' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!user || (user.role !== 'admin' && user.role !== 'operator')) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2>轻量管理</h2>
        </div>
        <nav className="admin-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span className="admin-user-info">{user.nickname || user.username}</span>
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={16} /> 退出
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="admin-breadcrumb">{location.pathname}</span>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
