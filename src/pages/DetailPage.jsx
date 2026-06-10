import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Zap, Package, Shield } from "lucide-react";
import { ServiceContext } from "../contexts/ServiceContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/Toast";
import ProductGrid from "../components/ProductGrid";
import { formatPrice } from "../utils/format";
import "./DetailPage.css";

export default function DetailPage() {
  const { goodId } = useParams();
  const parsedId = parseInt(goodId, 10);
  const services = useContext(ServiceContext);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const good = services.good.getGoodById(parsedId);
  const [relatedGoods, setRelatedGoods] = useState([]);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    if (good) {
      setMainImg(good.img);
      const related = services.good.getGoodList()
        .filter(g => g.categoryId === good.categoryId && g.id !== good.id && g.isOnSale !== false)
        .slice(0, 4);
      setRelatedGoods(related);
    }
  }, [good, services]);

  if (!good) {
    return (
      <div className="container detail-not-found">
        <h2>商品不存在</h2>
        <Link to="/" className="detail-back-link">返回首页</Link>
      </div>
    );
  }

  const discount = good.originalPrice
    ? Math.round((1 - good.price / good.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!user) { navigate("/login"); return; }
    const ok = addToCart(good.id, 1, good);
    if (ok) toast("已加入购物车", "success");
  };

  const handleBuyNow = () => {
    if (!user) { navigate("/login"); return; }
    navigate(`/createOrder/${good.id}`);
  };

  return (
    <div className="detail-page container">
      <Link to="/" className="detail-back">
        <ArrowLeft size={18} /> 返回
      </Link>

      <div className="detail-content">
        <div className="detail-gallery">
          <div className="detail-main-img">
            <img src={mainImg || good.img} alt={good.name} />
            {discount > 0 && <span className="detail-badge">-{discount}%</span>}
          </div>
          {good.images && good.images.length > 0 && (
            <div className="detail-thumbs">
              <div
                className={`detail-thumb ${(mainImg || good.img) === good.img ? "active" : ""}`}
                onClick={() => setMainImg(good.img)}
              >
                <img src={good.img} alt={good.name} />
              </div>
              {good.images.map((src, i) => (
                <div
                  key={i}
                  className={`detail-thumb ${mainImg === src ? "active" : ""}`}
                  onClick={() => setMainImg(src)}
                >
                  <img src={src} alt={`${good.name} ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-name">{good.name}</h1>
          <div className="detail-price-row">
            <span className="detail-price">{formatPrice(good.price)}</span>
            {good.originalPrice && (
              <span className="detail-original">{formatPrice(good.originalPrice)}</span>
            )}
          </div>

          <div className="detail-meta">
            <span className="detail-meta-item"><Zap size={14} /> 已售 {good.sales || 0}</span>
            <span className="detail-meta-item"><Package size={14} /> 库存 {good.stock || 0} 件</span>
          </div>

          <div className="detail-desc">
            <h3>商品描述</h3>
            <p>{good.desc || "暂无描述"}</p>
          </div>

          <div className="detail-actions">
            <button className="detail-btn-cart" onClick={handleAddToCart}>
              <ShoppingCart size={18} /> 加入购物车
            </button>
            <button className="detail-btn-buy" onClick={handleBuyNow}>立即购买</button>
          </div>

          <div className="detail-guarantees">
            <div className="guarantee-item"><Shield size={16} /> 正品保证</div>
            <div className="guarantee-item"><Package size={16} /> 7天退换</div>
          </div>
        </div>
      </div>

      {relatedGoods.length > 0 && (
        <section className="detail-related">
          <h2 className="detail-related-title">相关推荐</h2>
          <ProductGrid goods={relatedGoods} />
        </section>
      )}
    </div>
  );
}
