import { describe, it, expect, beforeEach } from "vitest";

class CategoryService {
  constructor(initial = []) { this.data = JSON.parse(JSON.stringify(initial)); }
  getAll() { return [...this.data]; }
  add(cat) { const max = Math.max(...this.data.map(c => parseInt(c.id, 10)), 0); const nc = { ...cat, id: String(max + 1) }; this.data.push(nc); return nc; }
  update(cat) { this.data = this.data.map(c => c.id === cat.id ? cat : c); return cat; }
  delete(id) { this.data = this.data.filter(c => c.id !== id); }
}

const defaults = [
  { id: "1", name: "数码电子", icon: "💻" },
  { id: "2", name: "服饰鞋包", icon: "👗" },
  { id: "3", name: "食品生鲜", icon: "🍎" },
];

describe("categoryService", () => {
  let service;

  beforeEach(() => {
    service = new CategoryService(defaults);
  });

  it("has 3 default categories", () => {
    expect(service.getAll()).toHaveLength(3);
  });

  it("add creates with auto-incremented id", () => {
    const cat = service.add({ name: "测试", icon: "📦" });
    expect(cat.id).toBe("4");
    expect(service.getAll()).toHaveLength(4);
  });

  it("update modifies existing category", () => {
    service.update({ id: "1", name: "数码产品", icon: "📱" });
    const cat = service.getAll().find(c => c.id === "1");
    expect(cat.name).toBe("数码产品");
  });

  it("delete removes category", () => {
    service.delete("2");
    expect(service.getAll()).toHaveLength(2);
    expect(service.getAll().find(c => c.id === "2")).toBeUndefined();
  });
});
