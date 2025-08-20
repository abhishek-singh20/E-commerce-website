import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState("home"); // Navigation state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null); // For product details

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeOne = (id) => {
    const existing = cart.find((item) => item.id === id);
    if (existing.qty > 1) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );

  return (
    <div style={styles.app}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => setPage("home")}>
          🛍 MyStore
        </h2>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => setPage("home")}>
            Home
          </button>
          <button style={styles.navBtn} onClick={() => setPage("about")}>
            About
          </button>
          <button style={styles.navBtn} onClick={() => setPage("details")}>
            Details
          </button>
        </div>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchBtn}>🔍</button>
          <button style={styles.cartBtn} onClick={() => setShowCart(!showCart)}>
            Cart ({cart.reduce((sum, i) => sum + i.qty, 0)})
          </button>
        </div>
      </nav>

      {/* Pages */}
      {page === "home" && !selectedProduct && (
        <>
          <div style={styles.categoryBar}>
            <button style={styles.catBtn} onClick={() => setSelectedCategory("all")}>
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                style={styles.catBtn}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.card}>
                <div style={styles.imageWrap}>
                  <img src={product.image} alt={product.title} style={styles.cardImg} />
                </div>
                <h3>{product.title.slice(0, 30)}...</h3>
                <p>₹{product.price}</p>
                <button style={styles.addBtn} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                <button style={styles.detailsBtn} onClick={() => setSelectedProduct(product)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedProduct && (
        <div style={styles.page}>
          <button style={styles.navBtn} onClick={() => setSelectedProduct(null)}>
            ← Back
          </button>
          <h2>{selectedProduct.title}</h2>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{ width: 200, height: 200, objectFit: "contain" }}
          />
          <p>{selectedProduct.description}</p>
          <p>₹{selectedProduct.price}</p>
          <button style={styles.addBtn} onClick={() => addToCart(selectedProduct)}>
            Add to Cart
          </button>
        </div>
      )}

      {page === "about" && (
        <div style={styles.page}>
          <h1>About Us</h1>
          <p>Welcome to MyStore! 🛍 This is a demo e-commerce site built with React.</p>
        </div>
      )}

      {page === "details" && (
        <div style={styles.page}>
          <h1>Details</h1>
          <p>Here you can add product details or company info.</p>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div style={styles.cartDrawer}>
          <button style={styles.closeBtn} onClick={() => setShowCart(false)}>
            ❌
          </button>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>No items added</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.title} style={styles.cartImg} />
                <div style={{ flex: 1, marginLeft: 10 }}>
                  <p>{item.title.slice(0, 25)}...</p>
                  <p>₹{item.price}</p>
                  <div>
                    <button style={styles.qtyBtn} onClick={() => removeOne(item.id)}>
                      -
                    </button>
                    <span style={{ margin: "0 6px" }}>{item.qty}</span>
                    <button style={styles.qtyBtn} onClick={() => addToCart(item)}>
                      +
                    </button>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>📧 Contact us: <a href="mailto:contact@mystore.com" style={styles.footerLink}>contact@mystore.com</a></p>
        <p>💬 Feedback: <a href="/feedback" style={styles.footerLink}>Give Feedback</a></p>
        <p>© 2025 MyStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  app: { fontFamily: "sans-serif", padding: 20 },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: 12,
    flexWrap: "wrap",
    gap: 10,
  },
  navLinks: { display: "flex", gap: 12 },
  navBtn: {
    background: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  searchBox: { display: "flex", gap: 8, alignItems: "center" },
  searchInput: { padding: 6, borderRadius: 6, border: "1px solid #ccc" },
  searchBtn: {
    padding: "4px 8px",
    background: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  cartBtn: {
    padding: "6px 10px",
    background: "#facc15",
    color: "#000",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  categoryBar: { display: "flex", flexWrap: "wrap", gap: 10, margin: "20px 0" },
  catBtn: {
    padding: "6px 12px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: 16,
    marginTop: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  imageWrap: {
    height: 200,
    width: "100%",
    display: "grid",
    placeItems: "center",
    background: "#f9fafb",
    borderRadius: 12,
  },
  cardImg: { width: 120, height: 120, objectFit: "contain" },

  addBtn: {
    marginTop: 8,
    padding: "2px 6px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 12,
    marginRight: 6,
  },
  detailsBtn: {
    marginTop: 8,
    padding: "2px 6px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 12,
  },

  cartDrawer: {
    position: "fixed",
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
    maxWidth: 400,
    background: "#fff",
    boxShadow: "-2px 0 6px rgba(0,0,0,0.1)",
    padding: 20,
    overflowY: "auto",
    transition: "0.3s ease",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    background: "transparent",
    fontSize: 20,
    cursor: "pointer",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  cartImg: {
    width: 60,
    height: 60,
    objectFit: "contain",
    borderRadius: 8,
    background: "#f9fafb",
  },
  qtyBtn: {
    margin: "0 4px",
    padding: "3px 6px",
    background: "#ddd",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  removeBtn: {
    padding: "3px 6px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginLeft: 6,
  },

  page: { padding: 20, textAlign: "center" },

  footer: {
    marginTop: 40,
    padding: "20px",
    background: "#1e40af",
    color: "#fff",
    textAlign: "center",
    borderRadius: 12,
  },
  footerLink: {
    color: "#facc15",
    textDecoration: "none",
    marginLeft: 4,
  },
};

export default App;
