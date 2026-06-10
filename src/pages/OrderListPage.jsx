import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { ServiceContext } from "../contexts/ServiceContext";
import { useAuth } from "../contexts/AuthContext";
import Pagination from "../components/Pagination";
import "./OrderListPage.css";

const STATUS_MAP = { "-1": "已取消", 0: "待支付", 1: "已支付", 2: "已发货", 3: "已收货" };
const STATUS_COLORS = { "-1": "#e53935", 0: "#ff9800", 1: "#3d5a80", 2: "#2196f3", 3: "#4caf50" };
const PAGE_SIZE = 5;

export default function OrderListPage() {
  const services = useContext(ServiceContext);
  const { user } = useAuth();
  const [filter, setFilter] = useState(-1);
  const [page, setPage] = useState(1);

  const orders = user
    ? services.order.getOrdersByUserId(user.id).sort((a, b) => b.id - a.id)
    : [];

  const filtered = filter === -1 ? orders : orders.filter(o => o.status === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filter changes
  const handleFilter = (s) => { setFilter(s); setPage(1); };

  return (
    <div className="order-list-page container">
      <h1 className="ol-title">我的订单</h1>

      <div className="ol-filters">
        {[-1, -2, 0, 1, 2, 3].map(s => (
          <button
            key={s}
            className={`ol-filter-btn ${filter === s ? "active" : ""}`}
            onClick={() => handleFilter(s)}
          >
            {s === -2 ? "全部" : s === -1 ? "已取消" : STATUS_MAP[String(s)]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="ol-empty">
          <ShoppingBag size={48} />
          <h3>暂无订单</h3>
          <Link to="/">去购物</Link>
        </div>
      ) : (
        <>
          <div className="ol-list">
            {paged.map(order => (
              <Link key={order.id} to={`/orderDetail/${order.id}`} className="ol-card">
                <div className="ol-card-header">
                  <span className="ol-order-no">订单号：{order.orderNo}</span>
                  <span className="ol-status" style={{ color: STATUS_COLORS[String(order.status)] || "#9a9a9a" }}>
                    {STATUS_MAP[String(order.status)] || "未知"}
                  </span>
                </div>
                <div className="ol-card-items">
                  {order.items.map((item, idx) => {
                    const good = services.good.getGoodById(item.goodId);
                    return (
                      <div key={idx} className="ol-card-item">
                        <div className="ol-item-img">
                          <img src={good?.img || ""} alt={good?.name} />
                        </div>
                        <div className="ol-item-info">
                          <span>{good?.name || "已下架"}</span>
                          <span>×{item.count}</span>
                        </div>
                        <span className="ol-item-price">¥{item.price * item.count}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="ol-card-footer">
                  <span>{order.createTime}</span>
                  <span className="ol-total">合计 ¥{order.total}</span>
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
          <Pagination current={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
