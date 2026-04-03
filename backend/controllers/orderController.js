const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No hay productos en la orden' });
    return;
  } else {
    // asumiendo req.user configurado por jwt en futuro, mock usuario x ahora para test
    const order = new Order({
      user: "60b8c6a2e4b0b1478c5d9a0d", // MOCK id
      orderItems,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// Admin acepta la orden => Resta el stock de inventario
const updateOrderToAccepted = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order && order.status !== 'Accepted') {
      // Bajar el stock
      for(const item of order.orderItems) {
         const product = await Product.findById(item.product);
         if(product) {
           product.stock = product.stock - item.qty;
           await product.save();
         }
      }
      
      order.status = 'Accepted';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Orden no encontrada o ya aceptada' });
    }
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, updateOrderToAccepted, getOrders };
