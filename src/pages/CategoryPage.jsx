import { useContext, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";
import ProductGrid from "../components/ProductGrid";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const services = useContext(ServiceContext);
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    let list = services.good.getGoodList().filter(g => g.isOnSale !== false);
    if (categoryId) list = list.filter(g => g.categoryId === categoryId);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(g => g.name.toLowerCase().includes(q));
    }
    setGoods(list);
    setCategories(services.category.getAll());
  }, [categoryId, searchQuery, services]);

  return (
    <div className="category-page container">
      <div className="category-sidebar">
        <h3 className="category-sidebar-title">商品分类</h3>
        <Link to="/category" className={`category-link ${!categoryId ? "active" : ""}`}>全部分类</Link>
        {categories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className={`category-link ${categoryId === cat.id ? "active" : ""}`}>
            <span>{cat.icon}</span> {cat.name}
          </Link>
        ))}
      </div>
      <div className="category-main">
        <div className="category-header">
          <h2>
            {searchQuery ? `搜索: "${searchQuery}"` : categoryId ? categories.find(c => c.id === categoryId)?.name || "分类" : "全部分类"}
          </h2>
          <span className="category-count">{goods.length} 件商品</span>
        </div>
        <ProductGrid goods={goods} />
      </div>
    </div>
  );
}
