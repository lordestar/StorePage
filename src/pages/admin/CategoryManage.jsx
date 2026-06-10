import { useContext, useState } from "react";
import { ServiceContext } from "../../contexts/ServiceContext";
import { useToast } from "../../components/Toast";
import { Plus, Edit3, Trash2, X } from "lucide-react";

const emptyCat = { name: "", icon: "" };

export default function CategoryManage() {
  const services = useContext(ServiceContext);
  const toast = useToast();
  const [categories, setCategories] = useState(services.category.getAll());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCat);

  const refresh = () => setCategories(services.category.getAll());

  const handleEdit = (cat) => {
    setForm({ ...cat });
    setEditing(cat.id);
  };

  const handleCancel = () => { setEditing(null); setForm(emptyCat); };

  const handleSave = () => {
    if (!form.name.trim()) { toast("请填写分类名称", "warning"); return; }
    if (!form.icon.trim()) { toast("请填写图标（emoji）", "warning"); return; }
    const data = { name: form.name.trim(), icon: form.icon.trim() };

    if (editing) {
      services.category.update({ id: editing, ...data });
      toast("分类已更新", "success");
    } else {
      services.category.add(data);
      toast("分类已添加", "success");
    }
    handleCancel();
    refresh();
  };

  const handleDelete = (id) => {
    services.category.delete(id);
    toast("分类已删除", "success");
    refresh();
  };

  const thStyle = { padding: "0.75rem", textAlign: "left", fontWeight: 600, color: "#6b6b6b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" };
  const tdStyle = { padding: "0.75rem", verticalAlign: "middle" };
  const fieldStyle = { padding: "0.5rem 0.75rem", border: "1px solid var(--color-border)", borderRadius: "6px", fontSize: "0.875rem", outline: "none", width: "100%" };
  const iconBtnStyle = { display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 4, color: "#6b6b6b", border: "1px solid var(--color-border)" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>分类管理</h1>
        <button
          onClick={() => { setForm(emptyCat); setEditing(0); }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "var(--color-info)", color: "white", borderRadius: "6px", fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Plus size={16} /> 添加分类
        </button>
      </div>

      {(editing !== null) && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", width: "100%", maxWidth: 400 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 600 }}>{editing > 0 ? "编辑分类" : "添加分类"}</h3>
              <button onClick={handleCancel}><X size={18} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input style={fieldStyle} placeholder="分类名称" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={fieldStyle} placeholder="图标（emoji）" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} maxLength={4} />
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <button onClick={handleCancel} style={{ padding: "0.5rem 1rem", border: "1px solid var(--color-border)", borderRadius: "6px" }}>取消</button>
                <button onClick={handleSave} style={{ padding: "0.5rem 1.5rem", background: "var(--color-info)", color: "white", borderRadius: "6px", fontWeight: 600 }}>保存</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={thStyle}>ID</th><th style={thStyle}>图标</th><th style={thStyle}>名称</th><th style={thStyle}>操作</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                <td style={tdStyle}>{cat.id}</td>
                <td style={{ ...tdStyle, fontSize: "1.5rem" }}>{cat.icon}</td>
                <td style={tdStyle}>{cat.name}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    <button onClick={() => handleEdit(cat)} style={iconBtnStyle} title="编辑"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(cat.id)} style={{ ...iconBtnStyle, color: "#e53935" }} title="删除"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
