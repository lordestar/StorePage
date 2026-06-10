const CATEGORY_KEY = "categoryList";

const defaultCategories = [
  { id: "1", name: "数码电子", icon: "💻" },
  { id: "2", name: "服饰鞋包", icon: "👗" },
  { id: "3", name: "食品生鲜", icon: "🍎" },
  { id: "4", name: "家居生活", icon: "🏠" },
  { id: "5", name: "美妆个护", icon: "💄" },
  { id: "6", name: "运动户外", icon: "⚽" },
];

class CategoryService {
  constructor() {
    if (!localStorage.getItem(CATEGORY_KEY)) {
      localStorage.setItem(CATEGORY_KEY, JSON.stringify(defaultCategories));
    }
  }

  getAll() {
    return JSON.parse(localStorage.getItem(CATEGORY_KEY) || "[]");
  }

  getById(id) {
    return this.getAll().find(c => c.id === id);
  }

  _save(list) {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(list));
  }

  add(cat) {
    const list = this.getAll();
    const maxId = Math.max(...list.map(c => parseInt(c.id, 10)), 0);
    const nextId = String(maxId + 1);
    const newCat = { ...cat, id: nextId };
    list.push(newCat);
    this._save(list);
    return newCat;
  }

  update(cat) {
    const list = this.getAll().map(c => c.id === cat.id ? cat : c);
    this._save(list);
    return cat;
  }

  delete(id) {
    const list = this.getAll().filter(c => c.id !== id);
    this._save(list);
    return list;
  }
}

const categoryService = new CategoryService();
export default categoryService;
