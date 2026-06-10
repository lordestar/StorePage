import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const USER_KEY = 'currentUser';
const USERS_KEY = 'users';

function getDefaultUsers() {
  return [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', nickname: '管理员', phone: '', address: '', avatar: '' },
    { id: 2, username: 'user', password: 'user123', role: 'user', nickname: '测试用户', phone: '', address: '', avatar: '' },
  ];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      localStorage.setItem(USERS_KEY, JSON.stringify(getDefaultUsers()));
    }
  }, []);

  const login = useCallback((username, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...safe } = found;
      localStorage.setItem(USER_KEY, JSON.stringify(safe));
      setUser(safe);
      return { ok: true, user: safe };
    }
    return { ok: false, error: '用户名或密码错误' };
  }, []);

  const register = useCallback((username, password, nickname) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.username === username)) {
      return { ok: false, error: '用户名已存在' };
    }
    const maxId = users.reduce((max, u) => u.id > max ? u.id : max, 0);
    const newUser = { id: maxId + 1, username, password, role: 'user', nickname: nickname || username, phone: '', address: '', avatar: '' };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      Object.assign(users[idx], updates);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const { password: _, ...safe } = users[idx];
      localStorage.setItem(USER_KEY, JSON.stringify(safe));
      setUser(safe);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
