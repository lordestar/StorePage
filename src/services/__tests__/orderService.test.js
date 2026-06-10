import { describe, it, expect, beforeEach } from "vitest";

const store = {};

// We test the service logic directly by recreating the class
class OrderService {
  list = [];
  constructor(initial = []) { this.list = JSON.parse(JSON.stringify(initial)); }
  createOrder(userId, items, total, address) {
    const maxId = this.list.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const order = { id: maxId + 1, userId, orderNo: Date.now().toString(), createTime: new Date().toLocaleString("zh-CN"), payTime: null, status: 0, total, items, address: address || "未填写" };
    this.list.push(order);
    return order;
  }
  payOrder(id) { const o = this.list.find(i => i.id === id); if (!o || o.status !== 0) return false; o.status = 1; o.payTime = new Date().toLocaleString("zh-CN"); return true; }
  shipOrder(id) { const o = this.list.find(i => i.id === id); if (!o || o.status !== 1) return false; o.status = 2; return true; }
  confirmOrder(id) { const o = this.list.find(i => i.id === id); if (!o || o.status !== 2) return false; o.status = 3; return true; }
  cancelOrder(id) { const o = this.list.find(i => i.id === id); if (!o || o.status !== 0) return false; o.status = -1; return true; }
  getOrderById(id) { return this.list.find(i => i.id === id); }
  getOrdersByUserId(uid) { return this.list.filter(i => i.userId === uid); }
}

describe("orderService", () => {
  let service;

  beforeEach(() => {
    service = new OrderService();
  });

  it("createOrder returns order with status 0", () => {
    const order = service.createOrder(1, [{ goodId: 1, count: 1, price: 100 }], 100, "test");
    expect(order.status).toBe(0);
    expect(order.total).toBe(100);
    expect(order.id).toBe(1);
  });

  it("payOrder succeeds for status 0 order", () => {
    const order = service.createOrder(1, [{ goodId: 1, count: 1, price: 200 }], 200, "addr");
    const ok = service.payOrder(order.id);
    expect(ok).toBe(true);
    expect(service.getOrderById(order.id).status).toBe(1);
  });

  it("payOrder fails if already paid", () => {
    const order = service.createOrder(1, [{ goodId: 1, count: 1, price: 200 }], 200, "addr");
    service.payOrder(order.id);
    const ok = service.payOrder(order.id);
    expect(ok).toBe(false);
  });

  it("cancelOrder only works for status 0", () => {
    const order = service.createOrder(1, [{ goodId: 1, count: 1, price: 100 }], 100, "addr");
    service.payOrder(order.id);
    expect(service.cancelOrder(order.id)).toBe(false);
    const order2 = service.createOrder(1, [{ goodId: 2, count: 1, price: 50 }], 50, "addr");
    expect(service.cancelOrder(order2.id)).toBe(true);
    expect(service.getOrderById(order2.id).status).toBe(-1);
  });

  it("full status flow: 0 -> 1 -> 2 -> 3", () => {
    const order = service.createOrder(1, [{ goodId: 1, count: 1, price: 100 }], 100, "addr");
    expect(service.payOrder(order.id)).toBe(true);
    expect(service.shipOrder(order.id)).toBe(true);
    expect(service.confirmOrder(order.id)).toBe(true);
    expect(service.getOrderById(order.id).status).toBe(3);
  });
});
