const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateStock } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct); // En prod, proteger con middleware admin
router.put('/:id/stock', updateStock);

module.exports = router;
