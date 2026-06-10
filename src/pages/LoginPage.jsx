import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, Eye, EyeOff, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import './LoginPage.css';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = '请输入用户名';
    else if (username.length < 2) errs.username = '用户名至少2个字符';
    if (!password) errs.password = '请输入密码';
    else if (password.length < 4) errs.password = '密码至少4个字符';
    if (mode === 'register') {
      if (!nickname.trim()) errs.nickname = '请输入昵称';
      if (password !== confirmPassword) errs.confirmPassword = '两次密码不一致';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      const result = login(username.trim(), password);
      if (result.ok) {
        toast('登录成功', 'success');
        navigate(from, { replace: true });
      } else {
        setErrors({ form: result.error });
      }
    } else {
      const result = register(username.trim(), password, nickname.trim());
      if (result.ok) {
        toast('注册成功，请登录', 'success');
        setMode('login');
        setUsername('');
        setPassword('');
        setNickname('');
        setConfirmPassword('');
      } else {
        setErrors({ form: result.error });
      }
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Package size={32} />
          <h1>轻量商城</h1>
          <p>{mode === 'login' ? '欢迎回来' : '创建新账号'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {errors.form && <div className="login-error-banner">{errors.form}</div>}

          <div className="login-field">
            <label>用户名</label>
            <input
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          {mode === 'register' && (
            <div className="login-field">
              <label>昵称</label>
              <input
                type="text"
                placeholder="请输入昵称"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className={errors.nickname ? 'error' : ''}
              />
              {errors.nickname && <span className="field-error">{errors.nickname}</span>}
            </div>
          )}

          <div className="login-field">
            <label>密码</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              <button type="button" className="toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {mode === 'register' && (
            <div className="login-field">
              <label>确认密码</label>
              <input
                type="password"
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="login-submit">
            {mode === 'login' ? <><LogIn size={18} /> 登录</> : <><UserPlus size={18} /> 注册</>}
          </button>
        </form>

        <div className="login-switch">
          {mode === 'login' ? (
            <>还没有账号？<button onClick={switchMode}>立即注册</button></>
          ) : (
            <>已有账号？<button onClick={switchMode}>立即登录</button></>
          )}
        </div>
      </div>
    </div>
  );
}
