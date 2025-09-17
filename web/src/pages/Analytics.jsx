import React, { useEffect, useState } from "react";
import axios from "axios";
import {Slab} from 'react-loading-indicators'

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/analytics/sales", {
        headers: { Authorization: `${token}` },
      });
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return <Slab color="#060706" size="medium" text="fetchig data" textColor="#080707" />;

  return (
    <div>
      <h2>Analytics</h2>
      <ul>
        <li>Total Sales (5 yrs): {stats.totalSales}</li>
        <li>Top Product: {stats.topProduct?.name}</li>
        <li>Orders Count: {stats.orderCount}</li>
      </ul>
    </div>
  );
}
