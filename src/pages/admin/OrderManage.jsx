import { useContext, useState } from "react";
import { ServiceContext } from "../../contexts/ServiceContext";
import { useToast } from "../../components/Toast";
import { formatPrice } from "../../utils/format";

const STATUS_MAP = { "-1": "已取消", 0: "待支付", 1: "已支付", 2: "已发货", 3: "已收货" };

export default function OrderManage() {
  const services = useContext(ServiceContext);
  const toast = useToast();
  const [orders, setOrders] = useState([...services.order.getAllOrders()].sort((a, b) => b.id - a.id));

  const refresh = () => setOrders([...services.order.getAllOrders()].sort((a, b) => b.id - a.id));

  const handleShip = (order) => {
    const ok = services.order.shipOrder(order.id);
    toast(ok ? "已发货" : "操作失败", ok ? "success" : "error");
    if (ok) refresh();
  };

  return (
    <div>
      <h1 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.5rem" }}>订单管理</h1>
      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem" }}>订单号</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem" }}>金额</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem" }}>状态</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem" }}>时间</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                <td style={{ padding: "0.75rem" }}>{o.orderNo}</td>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>{formatPrice(o.total)}</td>
                <td style={{ padding: "0.75rem" }}>
                  <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: "0.75rem", background: o.status === 0 ? "#fff3e0" : o.status === 1 ? "#e3f2fd" : o.status >= 2 ? "#e8f5e9" : "#ffebee", color: o.status === 0 ? "#ff9800" : o.status === 1 ? "#2196f3" : o.status >= 2 ? "#4caf50" : "#e53935" }}>
                    {STATUS_MAP[String(o.status)]}
                  </span>
                </td>
                <td style={{ padding: "0.75rem", fontSize: "0.75rem", color: "#6b6b6b" }}>{o.createTime}</td>
                <td style={{ padding: "0.75rem" }}>
                  {o.status === 1 && (
                    <button onClick={() => handleShip(o)} style={{ padding: "0.25rem 0.75rem", background: "var(--color-info)", color: "white", borderRadius: 4, fontSize: "0.75rem", fontWeight: 600 }}>发货</button>
                  )}
                  {o.status === 0 && <span style={{ fontSize: "0.75rem", color: "#9a9a9a" }}>-</span>}
                  {o.status === -1 && <span style={{ fontSize: "0.75rem", color: "#9a9a9a" }}>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
