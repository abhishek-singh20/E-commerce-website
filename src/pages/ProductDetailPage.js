import React, { Component } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useParams } from "react-router-dom";

// ✅ Wrapper for using useParams in class component
function withRouter(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}

class ProductDetailPage extends Component {
  static contextType = CartContext;

  state = {
    product: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    const id = this.props.params?.id; // react-router-dom v6
    if (!id) {
      this.setState({ error: "Invalid Product ID", loading: false });
      return;
    }

    // ✅ API se ek product fetch
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ product: data, loading: false }))
      .catch(() =>
        this.setState({ error: "Failed to load product", loading: false })
      );
  }

  render() {
    const { product, loading, error } = this.state;

    if (loading) return <div style={{ padding: 16 }}>Loading product...</div>;
    if (error) return <div style={{ padding: 16, color: "red" }}>{error}</div>;
    if (!product) return <div style={{ padding: 16 }}>Product not found.</div>;

    return (
      <div style={{ padding: 16 }}>
        <Link
          to="/"
          style={{
            color: "#007bff",
            textDecoration: "underline",
            marginBottom: 16,
            display: "inline-block",
          }}
        >
          ⬅ Back to Home
        </Link>

        <h2>{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: 300, maxWidth: "100%", borderRadius: 8 }}
        />
        <p style={{ marginTop: 12 }}>{product.description}</p>
        <p style={{ fontWeight: "bold", fontSize: 18 }}>
          Price: ${product.price?.toFixed(2)}
        </p>

        <button
          onClick={() => this.context.addToCart(product)}
          style={{
            padding: "10px 18px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: 12,
          }}
        >
          Add to MyCart
        </button>
      </div>
    );
  }
}

export default withRouter(ProductDetailPage);
