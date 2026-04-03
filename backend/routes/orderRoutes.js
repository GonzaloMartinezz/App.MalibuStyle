const express = require('express');
const router = express.Router();
const { createOrder, updateOrderToAccepted, getOrders } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id/accept', updateOrderToAccepted);

module.exports = router;
