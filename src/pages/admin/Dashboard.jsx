import { useContext } from "react";
import { ServiceContext } from "../../contexts/ServiceContext";
import { formatPrice } from "../../utils/format";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const services = useContext(ServiceContext);
  const goods = services.good.getGoodList();
  const orders = services.order.getAllOrders();

  const stats = [
    { icon: Package, label: "商品总数", value: goods.length, color: "#e07a5f" },
    { icon: ShoppingCart, label: "订单总数", value: orders.length, color: "#3d5a80" },
    { icon: TrendingUp, label: "已上架", value: goods.filter(g => g.isOnSale !== false).length, color: "#4caf50" },
    { icon: Users, label: "销售额", value: formatPrice(orders.filter(o => o.status >= 1).reduce((s, o) => s + o.total, 0)), color: "#ff9800" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem", fontWeight: 700, fontSize: "1.5rem" }}>仪表盘</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "white", borderRadius: "8px", padding: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 48, height: 48, borderRadius: "8px", background: `${s.color}15`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <s.icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: "0.875rem", color: "#6b6b6b" }}>{s.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
