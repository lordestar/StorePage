const defaultList = [
  { id: 1, name: "无线蓝牙耳机 Pro", price: 299, originalPrice: 499, categoryId: "1", img: "https://picsum.photos/seed/earbuds-pro/400/400", images: ["https://picsum.photos/seed/earbuds-pro-1/400/400", "https://picsum.photos/seed/earbuds-pro-2/400/400"], desc: "主动降噪 | 30小时续航 | IPX5防水 | 蓝牙5.3芯片，低延迟游戏模式，入耳舒适稳固。", stock: 328, sales: 2890 },
  { id: 2, name: "机械键盘 K8 青轴", price: 459, originalPrice: 659, categoryId: "1", img: "https://picsum.photos/seed/mech-keyboard/400/400", images: ["https://picsum.photos/seed/mech-keyboard-1/400/400"], desc: "87键紧凑布局 | Cherry MX 青轴 | RGB 背光 | 全键无冲，铝合金面板，Type-C 可拆卸线缆。", stock: 156, sales: 4320 },
  { id: 3, name: "4K 便携显示器 15.6寸", price: 1299, originalPrice: 1799, categoryId: "1", img: "https://picsum.photos/seed/portable-monitor/400/400", images: ["https://picsum.photos/seed/portable-monitor-1/400/400"], desc: "3840×2160 分辨率 | 100% sRGB | USB-C 一线连 | 超薄 5mm 机身，笔记本副屏首选。", stock: 73, sales: 1560 },
  { id: 4, name: "智能手表 S3 运动版", price: 899, originalPrice: 1199, categoryId: "1", img: "https://picsum.photos/seed/smartwatch-s3/400/400", images: ["https://picsum.photos/seed/smartwatch-s3-1/400/400"], desc: "1.43寸 AMOLED | 150+ 运动模式 | 血氧/心率监测 | 14天续航，5ATM 防水。", stock: 210, sales: 6750 },
  { id: 5, name: "春季新款牛仔外套", price: 259, originalPrice: 399, categoryId: "2", img: "https://picsum.photos/seed/denim-jacket/400/400", images: ["https://picsum.photos/seed/denim-jacket-1/400/400", "https://picsum.photos/seed/denim-jacket-2/400/400"], desc: "纯棉水洗牛仔面料 | 宽松版型 | 复古做旧工艺 | 百搭不挑人，春季出街必备。", stock: 480, sales: 3210 },
  { id: 6, name: "真皮斜挎小方包", price: 369, originalPrice: 529, categoryId: "2", img: "https://picsum.photos/seed/leather-bag/400/400", images: ["https://picsum.photos/seed/leather-bag-1/400/400"], desc: "头层牛皮 | 磁吸翻盖 | 可调节肩带 | 6色可选，轻巧能装，通勤约会皆宜。", stock: 195, sales: 4890 },
  { id: 7, name: "复古跑鞋 老爹鞋", price: 329, originalPrice: 459, categoryId: "2", img: "https://picsum.photos/seed/retro-sneakers/400/400", images: ["https://picsum.photos/seed/retro-sneakers-1/400/400", "https://picsum.photos/seed/retro-sneakers-2/400/400"], desc: "网面透气 | EVA 缓震中底 | 橡胶防滑大底 | 90年代复古设计，舒适与颜值兼得。", stock: 620, sales: 12300 },
  { id: 8, name: "纯棉圆领短袖 T 恤", price: 79, originalPrice: 129, categoryId: "2", img: "https://picsum.photos/seed/cotton-tee/400/400", images: ["https://picsum.photos/seed/cotton-tee-1/400/400"], desc: "280g 重磅纯棉 | 宽松落肩 | 不变形不缩水 | 12色可选，基础款百搭之王。", stock: 1500, sales: 25700 },
  { id: 9, name: "云南高山蓝莓 4盒装", price: 69, originalPrice: 99, categoryId: "3", img: "https://picsum.photos/seed/blueberry/400/400", images: ["https://picsum.photos/seed/blueberry-1/400/400"], desc: "云南直供 | 单果 18mm+ | 现摘现发 | 顺丰冷链直达，脆甜爆汁。", stock: 890, sales: 15600 },
  { id: 10, name: "进口牛排套餐 10片装", price: 189, originalPrice: 259, categoryId: "3", img: "https://picsum.photos/seed/steak-set/400/400", images: ["https://picsum.photos/seed/steak-set-1/400/400", "https://picsum.photos/seed/steak-set-2/400/400"], desc: "澳洲谷饲安格斯 | 眼肉+西冷+菲力 | 独立真空包装 | 顺丰冷链，送黑胡椒酱。", stock: 340, sales: 8920 },
  { id: 11, name: "有机坚果礼盒 1.2kg", price: 128, originalPrice: 188, categoryId: "3", img: "https://picsum.photos/seed/nuts-gift/400/400", images: ["https://picsum.photos/seed/nuts-gift-1/400/400"], desc: "6种坚果混装 | 每日坚果 | 轻烘非油炸 | 送礼自用两相宜，春节年货首选。", stock: 550, sales: 20100 },
  { id: 12, name: "北海道牛乳吐司面包", price: 36, originalPrice: 48, categoryId: "3", img: "https://picsum.photos/seed/milk-toast/400/400", images: ["https://picsum.photos/seed/milk-toast-1/400/400"], desc: "100% 北海道鲜奶油 | 手工揉制 | 48小时低温发酵 | 一箱 800g，松软拉丝。", stock: 2000, sales: 34500 },
  { id: 13, name: "北欧简约落地灯", price: 259, originalPrice: 399, categoryId: "4", img: "https://picsum.photos/seed/floor-lamp/400/400", images: ["https://picsum.photos/seed/floor-lamp-1/400/400", "https://picsum.photos/seed/floor-lamp-2/400/400"], desc: "实木灯杆 + 麻布灯罩 | 三档色温调光 | 脚踏开关 | 卧室客厅氛围神器。", stock: 126, sales: 5430 },
  { id: 14, name: "纯棉四件套 1.8m床", price: 289, originalPrice: 459, categoryId: "4", img: "https://picsum.photos/seed/bedding-set/400/400", images: ["https://picsum.photos/seed/bedding-set-1/400/400"], desc: "60支长绒棉 | 亲肤透气 | 不起球不褪色 | 被套+床单+枕套×2，8色可选。", stock: 380, sales: 18900 },
  { id: 15, name: "日式收纳箱 3件套", price: 89, originalPrice: 139, categoryId: "4", img: "https://picsum.photos/seed/storage-box/400/400", images: ["https://picsum.photos/seed/storage-box-1/400/400"], desc: "PP材质 | 可折叠 | 大容量 66L | 带盖防尘，衣柜/床底/阳台通用。", stock: 720, sales: 23400 },
  { id: 16, name: "陶瓷香薰加湿器", price: 149, originalPrice: 219, categoryId: "4", img: "https://picsum.photos/seed/aroma-diffuser/400/400", images: ["https://picsum.photos/seed/aroma-diffuser-1/400/400", "https://picsum.photos/seed/aroma-diffuser-2/400/400"], desc: "500ml 大水箱 | 超声波静音雾化 | 7色氛围灯 | 赠 3 瓶天然精油。", stock: 265, sales: 11200 },
  { id: 17, name: "氨基酸洁面泡沫 150ml", price: 79, originalPrice: 119, categoryId: "5", img: "https://picsum.photos/seed/face-cleanser/400/400", images: ["https://picsum.photos/seed/face-cleanser-1/400/400"], desc: "日本进口氨基酸表活 | 温和不紧绷 | 按压即出泡沫 | 敏感肌可用，回购率 TOP1。", stock: 630, sales: 45000 },
  { id: 18, name: "防晒霜 SPF50+ PA++++", price: 129, originalPrice: 179, categoryId: "5", img: "https://picsum.photos/seed/sunscreen/400/400", images: ["https://picsum.photos/seed/sunscreen-1/400/400"], desc: "物化结合 | 轻薄不泛白 | 防水防汗 | 养肤型防晒，含烟酰胺+维E。", stock: 410, sales: 32000 },
  { id: 19, name: "玻尿酸补水面膜 20片", price: 69, originalPrice: 109, categoryId: "5", img: "https://picsum.photos/seed/sheet-mask/400/400", images: ["https://picsum.photos/seed/sheet-mask-1/400/400"], desc: "三重玻尿酸 | 超薄蚕丝膜布 | 精华液 28ml/片 | 妆前急救 + 睡前补水。", stock: 880, sales: 67000 },
  { id: 20, name: "哑光口红 6色套装", price: 99, originalPrice: 169, categoryId: "5", img: "https://picsum.photos/seed/lipstick-set/400/400", images: ["https://picsum.photos/seed/lipstick-set-1/400/400", "https://picsum.photos/seed/lipstick-set-2/400/400"], desc: "丝绒哑光质地 | 不拔干不显唇纹 | 6支热门色号 | 礼盒包装，送礼首选。", stock: 340, sales: 28300 },
  { id: 21, name: "专业瑜伽垫 6mm", price: 89, originalPrice: 149, categoryId: "6", img: "https://picsum.photos/seed/yoga-mat/400/400", images: ["https://picsum.photos/seed/yoga-mat-1/400/400"], desc: "TPE 环保材质 | 双面防滑纹理 | 含体位线 | 送收纳绑带+背包，初学进阶通用。", stock: 510, sales: 9800 },
  { id: 22, name: "碳素羽毛球拍 双支装", price: 199, originalPrice: 329, categoryId: "6", img: "https://picsum.photos/seed/badminton-racket/400/400", images: ["https://picsum.photos/seed/badminton-racket-1/400/400", "https://picsum.photos/seed/badminton-racket-2/400/400"], desc: "全碳素中杆 | 4U 轻量 | 已穿线 | 送3只球+手胶+拍套，双打入门套装。", stock: 280, sales: 6400 },
  { id: 23, name: "户外折叠椅 超轻款", price: 119, originalPrice: 179, categoryId: "6", img: "https://picsum.photos/seed/camping-chair/400/400", images: ["https://picsum.photos/seed/camping-chair-1/400/400"], desc: "7075铝合金骨架 | 仅重 0.98kg | 承重 150kg | 一秒速开，露营/钓鱼/排队神器。", stock: 440, sales: 13500 },
  { id: 24, name: "运动速干短裤 男女同款", price: 69, originalPrice: 109, categoryId: "6", img: "https://picsum.photos/seed/sports-shorts/400/400", images: ["https://picsum.photos/seed/sports-shorts-1/400/400"], desc: "四面弹力面料 | 吸湿速干 | 内衬防走光 | 跑步/健身/篮球多场景，5色可选。", stock: 930, sales: 22100 },
];

const SEED_VERSION = 2;

class GoodService {
  list = [];

  constructor (){
    this._loadData();
  }

  getGoodById(id) {
    return this.list.find(item => item.id === id);
  }

  getGoodList() {
    return this.list;
  }

  addGood(good) {
    this.list.push(good);
    this._saveData();
  }

  deleteGood(id) {
    this.list = this.list.filter(item => item.id !== id);
    this._saveData();
  }

  updateGood(good) {
    this.list = this.list.map(item => {
      if (item.id === good.id) {
        return good;
      }
      return item;
    });
    this._saveData();
  }

  _saveData() {
    localStorage.setItem("goodList", JSON.stringify(this.list));
    localStorage.setItem("goodListSeedVersion", String(SEED_VERSION));
  }

  _loadData() {
    const seedVersion = localStorage.getItem("goodListSeedVersion");
    if (seedVersion && parseInt(seedVersion, 10) >= SEED_VERSION) {
      const list = localStorage.getItem("goodList");
      if (list) {
        this.list = JSON.parse(list);
        return;
      }
    }
    this.list = JSON.parse(JSON.stringify(defaultList));
    this._saveData();
  }
}

const goodService = new GoodService()
export default goodService;
