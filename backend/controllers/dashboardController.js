const Order = require('../models/Order');
const Product = require('../models/Product');

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    
    // Calcular ingresos totales calculando sumatoria de ordenes aceptadas
    const orders = await Order.find({ status: 'Accepted' });
    const totalRevenue = orders.reduce((acc, current) => acc + current.totalPrice, 0);

    // Calcular productos bajos en stock (menor a 5)
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 5 } });

    res.json({
      totalOrders,
      totalProducts,
      totalRevenue,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
