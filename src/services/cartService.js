const CART_KEY = 'cartItems';

class CartService {
  getItems() {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  }

  addItem(goodId, count = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.goodId === goodId);
    if (existing) {
      existing.count += count;
    } else {
      items.push({ goodId, count, selected: true });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  }

  removeItem(goodId) {
    const items = this.getItems().filter(i => i.goodId !== goodId);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  }

  updateCount(goodId, count) {
    const items = this.getItems().map(i =>
      i.goodId === goodId ? { ...i, count: Math.max(1, count) } : i
    );
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  }

  toggleSelected(goodId) {
    const items = this.getItems().map(i =>
      i.goodId === goodId ? { ...i, selected: !i.selected } : i
    );
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  }

  toggleAll(selected) {
    const items = this.getItems().map(i => ({ ...i, selected }));
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  }

  clearSelected() {
    const items = this.getItems().filter(i => !i.selected);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  }

  getSelectedItems() {
    return this.getItems().filter(i => i.selected);
  }
}

export const cartService = new CartService();
export default cartService;
