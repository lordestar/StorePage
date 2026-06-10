import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Package, CheckCircle, Clock } from "lucide-react";
import { ServiceContext } from "../contexts/ServiceContext";
import { formatPrice } from "../utils/format";
import "./OrderDetailPage.css";

const STATUS_MAP = { "-1": "已取消", 0: "待支付", 1: "已支付", 2: "已发货", 3: "已收货" };
const STATUS_COLORS = { "-1": "#e53935", 0: "#ff9800", 1: "#3d5a80", 2: "#2196f3", 3: "#4caf50" };

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const parsedId = parseInt(orderId, 10);
  const services = useContext(ServiceContext);
  const navigate = useNavigate();

  const order = services.order.getOrderById(parsedId);
  if (!order) {
    return (
      <div className="od-not-found container">
        <h2>订单不存在</h2>
        <Link to="/orderList">返回订单列表</Link>
      </div>
    );
  }

  const steps = [
    { label: "下单", done: true, time: order.createTime },
    { label: "支付", done: order.status >= 1, time: order.payTime },
    { label: "发货", done: order.status >= 2, time: "" },
    { label: "收货", done: order.status >= 3, time: "" },
  ];

  if (order.status === -1) steps[1] = { ...steps[1], label: "取消", done: false, time: "" };

  return (
    <div className="od-page container">
      <Link to="/orderList" className="od-back">
        <ArrowLeft size={18} /> 返回订单列表
      </Link>

      <div className="od-status-bar">
        <span className="od-status-text" style={{ color: STATUS_COLORS[String(order.status)] || "#9a9a9a" }}>
          {STATUS_MAP[String(order.status)] || "未知"}
        </span>
      </div>

      <div className="od-steps">
        {steps.map((step, idx) => (
          <div key={idx} className={`od-step ${step.done ? "done" : ""}`}>
            <div className="od-step-dot">
              {step.done ? <CheckCircle size={16} /> : <Clock size={16} />}
            </div>
            <div className="od-step-label">{step.label}</div>
            {step.time && <div className="od-step-time">{step.time}</div>}
          </div>
        ))}
      </div>

      <div className="od-address card">
        <div className="od-section-title"><MapPin size={16} /> 收货地址</div>
        <p>{order.address}</p>
      </div>

      <div className="od-items card">
        <div className="od-section-title"><Package size={16} /> 商品清单</div>
        {order.items.map((item, idx) => {
          const good = services.good.getGoodById(item.goodId);
          return (
            <div key={idx} className="od-item">
              <div className="od-item-img">
                <img src={good?.img} alt={good?.name} />
              </div>
              <div className="od-item-info">
                <span>{good?.name || "已下架"}</span>
                <span className="od-item-meta">×{item.count}</span>
              </div>
              <span className="od-item-price">{formatPrice(item.price * item.count)}</span>
            </div>
          );
        })}
      </div>

      <div className="od-summary card">
        <div className="od-summary-row">
          <span>订单编号</span><span>{order.orderNo}</span>
        </div>
        <div className="od-summary-row">
          <span>创建时间</span><span>{order.createTime}</span>
        </div>
        <div className="od-summary-row">
          <span>支付时间</span><span>{order.payTime || "未支付"}</span>
        </div>
        <div className="od-summary-row">
          <span>合计金额</span>
          <span className="od-summary-total">{formatPrice(order.total)}</span>
        </div>
      </div>

      {order.status === 0 && (
        <div className="od-actions">
          <button className="od-btn-pay" onClick={() => navigate(`/pay/${order.id}`)}>
            去支付
          </button>
        </div>
      )}
    </div>
  );
}
