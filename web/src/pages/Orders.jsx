import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // or cookies
      const {data} =  await axios.get("/api/orders", {
        headers: { Authorization: `${token}` },
      });
      console.log(data)
      // const { data } = await axios.get("/api/orders",{ withCredentials: true });
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          // Calculate total price for this order
          const calculatedTotal = order.OrderItems.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
          );

          return (
            <div key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <h2>Order #{order.id} - {order.status}</h2>
              <p>Placed by: {order.User.name} ({order.User.email})</p>
              
              <h3>Items:</h3>
              <ul>
                {order.OrderItems.map((item) => (
                  <li key={item.id}>
                    {item.Product.name} - Qty: {item.qty} - Price: ${item.price} - Subtotal: ${item.price * item.qty}
                  </li>
                ))}
              </ul>

              <h3>Total Price: ${calculatedTotal}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}
