const defaultList = [
  {
    id: 1, userId: 1, orderNo: "202401010001",
    createTime: "2024-01-01 10:00:00", payTime: null,
    status: 0, total: 300,
    items: [{ goodId: 1, count: 2, price: 100 }, { goodId: 2, count: 1, price: 100 }],
    address: "北京市朝阳区测试路1号",
  },
  {
    id: 2, userId: 1, orderNo: "202401020001",
    createTime: "2024-01-02 14:30:00", payTime: "2024-01-02 14:35:00",
    status: 1, total: 200,
    items: [{ goodId: 2, count: 1, price: 200 }],
    address: "北京市朝阳区测试路1号",
  },
];

class OrderService {
  list = [];

  constructor() { this._loadData(); }

  createOrder(userId, items, total, address) {
    const maxId = this.list.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const order = {
      id: maxId + 1,
      userId,
      orderNo: Date.now().toString(),
      createTime: new Date().toLocaleString("zh-CN"),
      payTime: null,
      status: 0,
      total,
      items,
      address: address || "未填写",
    };
    this.list.push(order);
    this._saveData();
    return order;
  }

  payOrder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order || order.status !== 0) return false;
    order.status = 1;
    order.payTime = new Date().toLocaleString("zh-CN");
    this._saveData();
    return true;
  }

  shipOrder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order || order.status !== 1) return false;
    order.status = 2;
    this._saveData();
    return true;
  }

  confirmOrder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order || order.status !== 2) return false;
    order.status = 3;
    this._saveData();
    return true;
  }

  cancelOrder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order || order.status !== 0) return false;
    order.status = -1;
    this._saveData();
    return true;
  }

  getOrderById(orderId) {
    return this.list.find(item => item.id === orderId);
  }

  getOrdersByUserId(userId) {
    return this.list.filter(item => item.userId === userId);
  }

  getAllOrders() {
    return [...this.list];
  }

  getOrdersByStatus(status) {
    return status === undefined ? this.list : this.list.filter(o => o.status === status);
  }

  _saveData() { localStorage.setItem("orderList", JSON.stringify(this.list)); }

  _loadData() {
    const data = localStorage.getItem("orderList");
    this.list = data ? JSON.parse(data) : [...defaultList];
    if (!data) this._saveData();
  }
}

const orderService = new OrderService();
export default orderService;
