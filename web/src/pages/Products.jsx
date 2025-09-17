import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products?filter=${filter}`);
      console.log(data)
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="mb-3">
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Products</option>
          <option value="top-sales">Top Sales (last 5 years)</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>Price: ${p.price}</p>
                <p>Stock: {p.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// category: "Electronics"
// createdAt: "2025-09-03T19:38:49.000Z"
// id: 1
// name: "Laptop Pro"
// price: "1299.99"
// sku: "LTP-001"
// stock: 20
// updatedAt: "2025-09-03T19:38:49.000Z"
