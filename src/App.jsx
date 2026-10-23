import { useMemo, useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, Star, Truck, ShieldCheck, Headphones, Plus, Minus, Trash2, Sparkles, ChevronDown } from 'lucide-react';
import './App.css';


const products = [
  { id: 1, name: 'Nova Phone Pro', category: 'Tech', price: 279999, oldPrice: 329999, rating: 4.8, badge: '-15%', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=85', color: 'lavender' },
  { id: 2, name: 'CloudBeat Headphones', category: 'Accessories', price: 23999, oldPrice: 29999, rating: 4.6, badge: '-20%', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85', color: 'peach' },
  { id: 3, name: 'AirFlex Sneakers', category: 'Fashion', price: 32999, oldPrice: 36999, rating: 4.9, badge: '-10%', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85', color: 'mint' },
  { id: 4, name: 'Pulse Smart Watch', category: 'Tech', price: 14999, oldPrice: 19999, rating: 4.7, badge: '-25%', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85', color: 'sky' },
  { id: 5, name: 'Everyday Tote', category: 'Fashion', price: 5499, oldPrice: 6999, rating: 4.5, badge: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85', color: 'pink' },
  { id: 6, name: 'Glow Desk Lamp', category: 'Home', price: 7999, oldPrice: 9999, rating: 4.7, badge: '-20%', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85', color: 'yellow' },
  { id: 7, name: 'Studio Camera', category: 'Tech', price: 84999, oldPrice: 94999, rating: 4.8, badge: 'HOT', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85', color: 'lavender' },
  { id: 8, name: 'Soft Knit Sweater', category: 'Fashion', price: 4599, oldPrice: 5999, rating: 4.6, badge: '-23%', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85', color: 'peach' },
];
const categories = [
  { name: 'All', emoji: '✨', subtitle: 'Everything good', tone: 'cat-purple' },
  { name: 'Tech', emoji: '🎧', subtitle: 'Smart little things', tone: 'cat-blue' },
  { name: 'Fashion', emoji: '👟', subtitle: 'Wear your vibe', tone: 'cat-pink' },
  { name: 'Home', emoji: '🏡', subtitle: 'Make it cozy', tone: 'cat-yellow' },
  { name: 'Accessories', emoji: '👜', subtitle: 'Finishing touches', tone: 'cat-green' },
];
const money = n => 'Rs. ' + n.toLocaleString('en-PK');

export default function App() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, query, sort]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const toast = message => { setNotice(message); window.setTimeout(() => setNotice(''), 2200); };
  const addToCart = product => { setCart(current => { const found = current.find(item => item.id === product.id); return found ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }]; }); toast(`${product.name} added to your bag!`); };
  const changeQty = (id, delta) => setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  const toggleWish = product => { setWishlist(current => current.includes(product.id) ? current.filter(id => id !== product.id) : [...current, product.id]); toast(wishlist.includes(product.id) ? 'Removed from your wishlist' : 'Saved to your wishlist 💜'); };
  const jumpToShop = () => { document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  return <div className="site-shell">
    <div className="announcement"><Sparkles size={14} /> Little joys, lovely prices — <strong>free delivery over Rs. 2,000</strong><span className="announce-sparkle">✦</span></div>
    <header className="header">
      <button className="icon-btn mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      <a className="logo" href="#home" aria-label="Shoply home"><span className="logo-mark"><ShoppingBag size={21} strokeWidth={2.5} /></span>shop<span>ly.</span></a>
      <nav className={mobileOpen ? 'nav-links nav-open' : 'nav-links'}>
        <a className="active" href="#home" onClick={() => setMobileOpen(false)}>Home</a><a href="#shop" onClick={() => setMobileOpen(false)}>Shop</a><a href="#categories" onClick={() => setMobileOpen(false)}>Categories</a><a href="#why" onClick={() => setMobileOpen(false)}>Why Shoply?</a>
      </nav>
      <label className="search-box"><Search size={18} /><input aria-label="Search products" placeholder="Find something lovely..." value={query} onChange={e => { setQuery(e.target.value); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} /><kbd>↵</kbd></label>
      <div className="header-actions"><button className="icon-btn wishlist-header" aria-label="View wishlist" onClick={() => { setCategory('All'); setQuery(''); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); toast(`${wishlist.length} item(s) in your wishlist`); }}><Heart />{wishlist.length > 0 && <span className="count-dot">{wishlist.length}</span>}</button><button className="icon-btn bag-button" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag /><span className="bag-count">{cartCount}</span></button></div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-content"><span className="eyebrow"><span className="eyebrow-line"/> THE HAPPY FINDS CLUB</span><h1>Find your<br /><span>happy.</span> Every day.</h1><p>Good things, great prices, and little surprises that make your day. Your next favourite thing is just a click away.</p><div className="hero-buttons"><button className="primary-btn" onClick={jumpToShop}>Explore the shop <ArrowRight size={18} /></button><a className="text-link" href="#categories">Browse categories <span>↗</span></a></div><div className="hero-proof"><div className="avatar-stack"><span>😊</span><span>💜</span><span>🌼</span><span>✨</span></div><div><div className="proof-stars">★★★★★ <b>4.9/5</b></div><small>Loved by 2,000+ happy shoppers</small></div></div></div>
        <div className="hero-art"><div className="art-glow"/><div className="floating-tag tag-top">✦ JUST DROPPED</div><div className="hero-product-card hero-card-back"><span>GOOD<br/>VIBES<br/>ONLY <b>✿</b></span></div><div className="hero-product-card hero-card-front"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90" alt="Bright red sneakers"/><div className="product-sticker">YOUR NEW<br/>FAVOURITE! <span>♡</span></div></div><div className="floating-tag tag-bottom">✨ A little treat for you</div><div className="doodle doodle-one">✳</div><div className="doodle doodle-two">✦</div><div className="hero-mini mini-left">♡</div><div className="hero-mini mini-right">✧</div></div>
        <div className="hero-bottom-note"><span>01</span> / A little colour goes a long way <div className="note-line"/></div>
      </section>

      <section className="categories section-wrap" id="categories"><div className="section-heading"><div><span className="section-kicker">A LITTLE SOMETHING FOR EVERYONE</span><h2>Shop by <span>mood.</span></h2></div><p>Pick your vibe. Find your thing.</p></div><div className="category-grid">{categories.map((cat, i) => <button key={cat.name} className={`category-card ${cat.tone} ${category === cat.name ? 'category-selected' : ''}`} style={{ '--delay': `${i * 80}ms` }} onClick={() => { setCategory(cat.name); setQuery(''); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="category-emoji">{cat.emoji}</span><span className="category-name">{cat.name === 'All' ? 'All the good stuff' : cat.name}</span><small>{cat.subtitle}</small><span className="category-arrow"><ArrowRight size={16}/></span></button>)}</div></section>

      <section className="shop-section section-wrap" id="shop"><div className="section-heading shop-heading"><div><span className="section-kicker">HANDPICKED WITH LOVE <span className="tiny-star">✦</span></span><h2>{query ? 'Search ' : category === 'All' ? 'The good stuff.' : `${category} picks.`} <span className="heading-emoji">♡</span></h2><p className="muted">Cute finds. Fair prices. Zero regrets.</p></div><label className="sort-select">Sort by <ChevronDown size={15}/><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>
        <div className="product-grid">{filtered.map((product, i) => <article className={`product-card product-${product.color}`} key={product.id} style={{ '--delay': `${i * 65}ms` }}><div className="product-image-wrap"><img src={product.image} alt={product.name} loading="lazy"/><span className={`product-badge ${product.badge === 'BESTSELLER' || product.badge === 'HOT' ? 'badge-special' : ''}`}>{product.badge}</span><button className={`wish-btn ${wishlist.includes(product.id) ? 'wish-active' : ''}`} aria-label={`Save ${product.name} to wishlist`} onClick={() => toggleWish(product)}><Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}/></button><button className="quick-add" onClick={() => addToCart(product)}><Plus size={16}/> Quick add</button></div><div className="product-info"><div className="product-category">{product.category}</div><h3>{product.name}</h3><div className="rating"><span>★★★★★</span> <small>{product.rating}</small></div><div className="price-row"><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del></div><button className="add-btn" onClick={() => addToCart(product)}><ShoppingBag size={16}/> Add to bag <ArrowRight size={15}/></button></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><span>🔎</span><h3>No happy finds just yet!</h3><p>Try another search or choose a different category.</p><button className="primary-btn" onClick={() => { setQuery(''); setCategory('All'); }}>Show all products</button></div>}
        <div className="shop-bottom"><span>✿</span> Showing <b>{filtered.length}</b> lovely finds <span>✿</span></div>
      </section>

      <section className="promo section-wrap"><div className="promo-copy"><span className="section-kicker">YOUR LITTLE REMINDER</span><h2>Life's too short<br/>for <span>boring</span> shopping.</h2><p>Give your everyday a little extra colour. Find something that makes you smile.</p><button className="dark-btn" onClick={jumpToShop}>Find your happy <ArrowRight size={17}/></button></div><div className="promo-art"><div className="promo-circle">GOOD<br/><span>things</span><br/>INSIDE <b>✦</b></div><div className="promo-flower">✿</div><div className="promo-spark">✧</div><div className="promo-pill">A LITTLE JOY, DELIVERED ♡</div></div></section>

      <section className="benefits section-wrap" id="why"><div className="benefit-item"><div className="benefit-icon benefit-purple"><Truck size={24}/></div><div><h3>Delivery that delights</h3><p>Free delivery on orders over Rs. 2,000.</p></div></div><div className="benefit-item"><div className="benefit-icon benefit-pink"><ShieldCheck size={24}/></div><div><h3>Checkout with confidence</h3><p>Your shopping experience comes first.</p></div></div><div className="benefit-item"><div className="benefit-icon benefit-yellow"><Headphones size={24}/></div><div><h3>Real human help</h3><p>Questions? We're happy to help.</p></div></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><a className="logo footer-logo" href="#home"><span className="logo-mark"><ShoppingBag size={20}/></span>shop<span>ly.</span></a><p>Little joys for your everyday. <span>Made for your happy.</span></p><a className="back-top" href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>© 2026 Shoply. Made with ♡ and a little colour.</span><div><a href="#shop">Shop</a><a href="#categories">Categories</a><a href="#why">Our promise</a></div></div></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="section-kicker">YOUR HAPPY LITTLE BAG</span><h2>Your bag <span>♡</span></h2></div><button className="icon-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}><X/></button></div>{cart.length === 0 ? <div className="cart-empty"><div className="empty-bag"><ShoppingBag size={36}/></div><h3>Your bag feels lonely.</h3><p>Let's find something lovely to put in it!</p><button className="primary-btn" onClick={() => { setCartOpen(false); jumpToShop(); }}>Start exploring <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><strong>{money(item.price)}</strong><div className="qty-control"><button aria-label="Decrease quantity" onClick={() => changeQty(item.id, -1)}><Minus size={13}/></button><span>{item.qty}</span><button aria-label="Increase quantity" onClick={() => changeQty(item.id, 1)}><Plus size={13}/></button></div></div><button className="remove-item" aria-label="Remove item" onClick={() => setCart(current => current.filter(p => p.id !== item.id))}><Trash2 size={17}/></button></div>)}</div><div className="cart-summary"><div className="summary-line"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><div className="summary-line shipping-line"><span>Delivery</span><strong>{cartTotal >= 2000 ? 'FREE ✨' : 'Calculated at checkout'}</strong></div><div className="summary-total"><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="checkout-btn" onClick={() => toast('Demo checkout — connect a payment provider to accept orders!')}>Continue to checkout <ArrowRight size={17}/></button><small className="demo-note">Demo store · No payment will be taken</small></div></>}</aside></div>}
    {notice && <div className="toast-message"><span>✦</span>{notice}</div>}
    <button className="floating-cart" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag size={20}/><span>{cartCount}</span></button>
  </div>;
}
