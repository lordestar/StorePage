import { useContext, useState } from "react";
import { ServiceContext } from "../../contexts/ServiceContext";
import { useToast } from "../../components/Toast";
import { formatPrice } from "../../utils/format";
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight, X } from "lucide-react";

const emptyGood = { id: 0, name: "", price: "", originalPrice: "", categoryId: "1", img: "", desc: "", stock: "", sales: 0, isOnSale: true };

export default function ProductManage() {
  const services = useContext(ServiceContext);
  const toast = useToast();
  const [goods, setGoods] = useState(services.good.getGoodList());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyGood);

  const refresh = () => setGoods(services.good.getGoodList());

  const handleEdit = (good) => {
    setForm({ ...good, price: String(good.price), originalPrice: String(good.originalPrice || ""), stock: String(good.stock || "") });
    setEditing(good.id);
  };

  const handleCancel = () => { setEditing(null); setForm(emptyGood); };

  const handleSave = () => {
    const price = parseFloat(form.price);
    const originalPrice = parseFloat(form.originalPrice) || null;
    const stock = parseInt(form.stock) || 0;
    if (!form.name.trim() || isNaN(price) || price <= 0) { toast("请填写商品名称和有效价格", "warning"); return; }
    const data = {
      name: form.name.trim(), price, originalPrice, categoryId: form.categoryId,
      img: form.img.trim() || "https://placehold.co/400x400/e8e5e0/a0a0a0?text=No+Image",
      desc: form.desc.trim(), stock, sales: form.sales || 0, isOnSale: form.isOnSale,
    };
    if (editing) { services.good.updateGood({ id: editing, ...data }); toast("商品已更新", "success"); }
    else { const maxId = goods.reduce((max, g) => (g.id > max ? g.id : max), 0); services.good.addGood({ id: maxId + 1, ...data }); toast("商品已添加", "success"); }
    handleCancel(); refresh();
  };

  const handleDelete = (id) => { services.good.deleteGood(id); toast("商品已删除", "success"); refresh(); };
  const handleToggle = (good) => { services.good.updateGood({ ...good, isOnSale: !good.isOnSale }); toast(good.isOnSale ? "已下架" : "已上架", "info"); refresh(); };

  const thStyle = { padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" };
  const tdStyle = { padding: "0.75rem", verticalAlign: "middle" };
  const fieldStyle = { padding: "0.5rem 0.75rem", border: "1px solid var(--color-border)", borderRadius: "6px", fontSize: "0.875rem", outline: "none", width: "100%" };
  const iconBtnStyle = { display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 4, color: "#6b6b6b", border: "1px solid var(--color-border)" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>商品管理</h1>
        <button onClick={() => { setForm(emptyGood); setEditing(0); }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "var(--color-info)", color: "white", borderRadius: "6px", fontWeight: 600, fontSize: "0.875rem" }}><Plus size={16} /> 添加商品</button>
      </div>

      {(editing !== null) && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", width: "100%", maxWidth: 500, maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}><h3 style={{ fontWeight: 600 }}>{editing > 0 ? "编辑商品" : "添加商品"}</h3><button onClick={handleCancel}><X size={18} /></button></div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input style={fieldStyle} placeholder="商品名称" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <div style={{ display: "flex", gap: "0.5rem" }}><input style={fieldStyle} placeholder="价格" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /><input style={fieldStyle} placeholder="原价" type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} /></div>
              <select style={fieldStyle} value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}><option value="1">数码电子</option><option value="2">服饰鞋包</option><option value="3">食品生鲜</option><option value="4">家居生活</option><option value="5">美妆个护</option><option value="6">运动户外</option></select>
              <input style={fieldStyle} placeholder="图片URL" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} />
              <textarea style={{ ...fieldStyle, minHeight: 80, resize: "vertical" }} placeholder="商品描述" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
              <div style={{ display: "flex", gap: "0.5rem" }}><input style={fieldStyle} placeholder="库存" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></div>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}><button onClick={handleCancel} style={{ padding: "0.5rem 1rem", border: "1px solid var(--color-border)", borderRadius: "6px" }}>取消</button><button onClick={handleSave} style={{ padding: "0.5rem 1.5rem", background: "var(--color-info)", color: "white", borderRadius: "6px", fontWeight: 600 }}>保存</button></div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead><tr style={{ borderBottom: "2px solid var(--color-border)" }}><th style={thStyle}>ID</th><th style={thStyle}>图片</th><th style={thStyle}>名称</th><th style={thStyle}>价格</th><th style={thStyle}>库存</th><th style={thStyle}>状态</th><th style={thStyle}>操作</th></tr></thead>
          <tbody>
            {goods.map(g => (
              <tr key={g.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                <td style={tdStyle}>{g.id}</td>
                <td style={tdStyle}><img src={g.img} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }} /></td>
                <td style={tdStyle}>{g.name}</td>
                <td style={tdStyle}>{formatPrice(g.price)}</td>
                <td style={tdStyle}>{g.stock || 0}</td>
                <td style={tdStyle}><span style={{ padding: "2px 8px", borderRadius: 99, fontSize: "0.75rem", background: g.isOnSale !== false ? "#e8f5e9" : "#ffebee", color: g.isOnSale !== false ? "#4caf50" : "#e53935" }}>{g.isOnSale !== false ? "上架" : "下架"}</span></td>
                <td style={tdStyle}><div style={{ display: "flex", gap: "0.25rem" }}><button onClick={() => handleEdit(g)} style={iconBtnStyle} title="编辑"><Edit3 size={14} /></button><button onClick={() => handleToggle(g)} style={iconBtnStyle} title="上下架">{g.isOnSale !== false ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}</button><button onClick={() => handleDelete(g.id)} style={{ ...iconBtnStyle, color: "#e53935" }} title="删除"><Trash2 size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
