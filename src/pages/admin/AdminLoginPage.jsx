import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast';
import { Shield, Eye, EyeOff } from 'lucide-react';
import './Admin.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username.trim(), password);
    if (result.ok && (result.user.role === 'admin' || result.user.role === 'operator')) {
      toast('管理员登录成功', 'success');
      navigate('/admin');
    } else if (result.ok) {
      setError('您没有后台管理权限');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <Shield size={36} />
          <h1>后台管理</h1>
          <p>轻量商城管理系统</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="admin-login-error">{error}</div>}
          <div className="admin-field">
            <label>管理员账号</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="请输入账号" />
          </div>
          <div className="admin-field">
            <label>密码</label>
            <div className="admin-pwd-wrapper">
              <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="请输入密码" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="admin-login-btn">登录后台</button>
        </form>
        <p className="admin-login-hint">默认账号: admin / admin123</p>
      </div>
    </div>
  );
}
