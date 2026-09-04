import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { products, emiPlans, monthlyEmi } from "./data";
import "./styles.css";

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    bag: <><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
    close: <><path d="M6 6l12 12M18 6 6 18"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    refresh: <><path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ProductArt({ type, large = false }) {
  return <div className={`product-art ${type} ${large ? "large" : ""}`}>
    {type === "phone" && <><div className="phone-camera"></div><div className="phone-screen"><span>1Fi</span></div></>}
    {type === "laptop" && <><div className="laptop-screen"><span>1Fi</span></div><div className="laptop-base"></div></>}
    {type === "tv" && <><div className="tv-screen"><span>4K</span></div><div className="tv-stand"></div></>}
    {type === "watch" && <><div className="watch-strap"></div><div className="watch-face"><span>1Fi</span></div></>}
  </div>;
}

function Header({ onHome }) {
  return <header className="header">
    <button className="brand" onClick={onHome}><span className="brand-mark">1</span><span>1Fi</span></button>
    <div className="header-right"><span className="secure">● Secure marketplace</span><button className="icon-btn"><Icon name="bag"/></button></div>
  </header>;
}

function ShopHome({ navigate }) {
  return <main className="shop-shell">
    <div className="eyebrow">SHOP</div>
    <h1>Choose how you want to shop</h1>
    <p className="lead">Explore brands, nearby stores or shop products with flexible EMI options.</p>
    <div className="shop-options">
      <button className="option-card" onClick={() => navigate("blank", "Top Brands")}>
        <div><span className="option-icon">✦</span><h2>Top Brands</h2><p>Discover products from popular brands.</p></div><Icon name="arrow"/>
      </button>
      <button className="option-card" onClick={() => navigate("blank", "Nearby Stores")}>
        <div><span className="option-icon">⌖</span><h2>Nearby Stores</h2><p>Find stores around you.</p></div><Icon name="arrow"/>
      </button>
      <button className="option-card featured" onClick={() => navigate("marketplace")}>
        <div><span className="option-icon">◈</span><h2>1Fi Marketplace</h2><p>Browse products and choose an EMI plan that works for you.</p><span className="pill">Explore marketplace</span></div><Icon name="arrow"/>
      </button>
    </div>
  </main>;
}

function BlankPage({ title, back }) {
  return <main className="center-page">
    <button className="back-link" onClick={back}><Icon name="back" size={18}/> Back to Shop</button>
    <div className="empty-card"><div className="empty-icon">○</div><h1>{title}</h1><p>This section is intentionally left blank as specified in the assignment.</p></div>
  </main>;
}

function Marketplace({ onProduct, back }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  return <main className="market-shell">
    <button className="back-link" onClick={back}><Icon name="back" size={18}/> Shop</button>
    <section className="market-hero">
      <div><div className="eyebrow">1FI MARKETPLACE</div><h1>Shop now. Pay in easy EMIs.</h1><p>Browse products and choose a plan that fits your monthly budget.</p></div>
      <div className="hero-badge"><strong>Flexible EMI</strong><span>Plans up to 18 months</span></div>
    </section>
    <div className="market-tools">
      <label className="search-box"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products"/></label>
      <div className="chips">{categories.map(c => <button key={c} className={category === c ? "chip active" : "chip"} onClick={() => setCategory(c)}>{c}</button>)}</div>
    </div>
    <div className="section-head"><div><h2>Featured products</h2><p>{filtered.length} products available</p></div></div>
    <div className="product-grid">
      {filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => onProduct(p)}/>)}
    </div>
    {!filtered.length && <div className="no-results"><h3>No products found</h3><p>Try another search or category.</p></div>}
  </main>;
}

function ProductCard({ product, onClick }) {
  const emi = monthlyEmi(product.price, 12, 2);
  return <button className="product-card" onClick={onClick}>
    <ProductArt type={product.image}/>
    <div className="product-info">
      <span className="category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="short">{product.short}</p>
      <div className="rating"><Icon name="star" size={14}/> {product.rating}</div>
      <div className="price">{money(product.price)}</div>
      <div className="emi">EMI from <strong>{money(emi)}/mo</strong></div>
      <span className="view">View details <Icon name="arrow" size={16}/></span>
    </div>
  </button>;
}

function ProductDetails({ product, back, finish }) {
  const [variant, setVariant] = useState(Object.fromEntries(Object.entries(product.variants).map(([k, v]) => [k, v[0]])));
  const [selectedPlan, setSelectedPlan] = useState(12);
  const plan = emiPlans.find(p => p.months === selectedPlan);
  const emi = monthlyEmi(product.price, plan.months, plan.fee);

  return <main className="details-shell">
    <button className="back-link" onClick={back}><Icon name="back" size={18}/> Marketplace</button>
    <div className="details-grid">
      <div className="detail-visual"><ProductArt type={product.image} large/></div>
      <div className="detail-content">
        <span className="category">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="rating"><Icon name="star" size={15}/> {product.rating} · 120+ ratings</div>
        <div className="detail-price">{money(product.price)}</div>
        <p className="detail-copy">{product.short}</p>

        <div className="divider"></div>
        <h3>Product details</h3>
        <ul className="details-list">{product.details.map(d => <li key={d}><span>✓</span>{d}</li>)}</ul>

        {Object.entries(product.variants).map(([key, values]) => <div className="variant-block" key={key}>
          <div className="variant-title">{key}</div>
          <div className="variant-options">{values.map(v => <button key={v} className={variant[key] === v ? "variant active" : "variant"} onClick={() => setVariant(x => ({...x, [key]: v}))}>{v}</button>)}</div>
        </div>)}

        <div className="divider"></div>
        <div className="emi-heading"><div><h3>Choose your EMI plan</h3><p>Select a plan that suits your monthly budget.</p></div><span className="emi-tag">Easy EMI</span></div>
        <div className="plans">
          {emiPlans.map(p => {
            const amount = monthlyEmi(product.price, p.months, p.fee);
            return <button key={p.months} className={selectedPlan === p.months ? "plan active" : "plan"} onClick={() => setSelectedPlan(p.months)}>
              <span className="radio">{selectedPlan === p.months ? <span></span> : null}</span>
              <span><strong>{p.months} months</strong><small>{p.fee ? `${p.fee}% plan fee` : "No plan fee"}</small></span>
              <b>{money(amount)}<small>/ month</small></b>
            </button>;
          })}
        </div>

        <div className="summary">
          <div><span>Product</span><strong>{money(product.price)}</strong></div>
          <div><span>Selected EMI</span><strong>{money(emi)} / month × {plan.months}</strong></div>
        </div>
        <button className="primary-btn" onClick={() => finish({ product, variant, plan, emi })}>Proceed with selected plan <Icon name="arrow" size={18}/></button>
        <p className="fine-print">EMI figures are illustrative mock data for this assignment.</p>
      </div>
    </div>
  </main>;
}

function Success({ order, restart }) {
  return <main className="success-page">
    <div className="success-icon"><Icon name="check" size={32}/></div>
    <div className="eyebrow">PLAN SELECTED</div>
    <h1>You're ready to proceed.</h1>
    <p>Your selected product and EMI plan have been saved for the next step.</p>
    <div className="success-card">
      <div className="mini-art"><ProductArt type={order.product.image}/></div>
      <div><strong>{order.product.name}</strong><span>{Object.values(order.variant).join(" · ")}</span></div>
      <div className="success-emi"><strong>{money(order.emi)}/mo</strong><span>{order.plan.months} months</span></div>
    </div>
    <button className="primary-btn" onClick={restart}>Back to Marketplace <Icon name="arrow" size={18}/></button>
    <p className="fine-print">This is a frontend assignment flow; no real purchase or loan is created.</p>
  </main>;
}

function App() {
  const [page, setPage] = useState("shop");
  const [blankTitle, setBlankTitle] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [order, setOrder] = useState(null);

  const navigate = (next, title = "") => {
    setPage(next);
    setBlankTitle(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "shop") return <><Header onHome={() => navigate("shop")}/><ShopHome navigate={navigate}/></>;
  if (page === "blank") return <><Header onHome={() => navigate("shop")}/><BlankPage title={blankTitle} back={() => navigate("shop")}/></>;
  if (page === "marketplace") return <><Header onHome={() => navigate("shop")}/><Marketplace back={() => navigate("shop")} onProduct={p => {setSelectedProduct(p); navigate("details")}}/></>;
  if (page === "details") return <><Header onHome={() => navigate("shop")}/><ProductDetails product={selectedProduct} back={() => navigate("marketplace")} finish={data => {setOrder(data); navigate("success")}}/></>;
  return <><Header onHome={() => navigate("shop")}/><Success order={order} restart={() => navigate("marketplace")}/></>;
}

createRoot(document.getElementById("root")).render(<App />);
