const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

const defaultUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', nickname: '管理员', phone: '', address: '', avatar: '' },
  { id: 2, username: 'user', password: 'user123', role: 'user', nickname: '测试用户', phone: '', address: '', avatar: '' },
];

class UserService {
  constructor() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  getUserById(id) {
    return this.getUsers().find(u => u.id === id);
  }

  login(username, password) {
    const user = this.getUsers().find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...safe } = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safe));
      return safe;
    }
    return null;
  }

  register(username, password, nickname) {
    const users = this.getUsers();
    if (users.find(u => u.username === username)) return null;
    const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
    const newUser = { id: maxId + 1, username, password, role: 'user', nickname: nickname || username, phone: '', address: '', avatar: '' };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  }

  getCurrentUser() {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  }

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  updateUser(id, updates) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      Object.assign(users[idx], updates);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const current = this.getCurrentUser();
      if (current && current.id === id) {
        const { password: _, ...safe } = users[idx];
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safe));
      }
      return users[idx];
    }
    return null;
  }
}

export const userService = new UserService();
export default userService;
