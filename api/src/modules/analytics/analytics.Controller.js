// controllers/analyticsController.js
export async function getSalesAnalytics(req, res) {
  try {
    // Example: query MySQL for last 5 years sales
    const [rows] = await req.db.query(`
      SELECT YEAR(order_date) AS year, SUM(total_amount) AS total_sales
      FROM orders
      WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 5 YEAR)
      GROUP BY YEAR(order_date)
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
