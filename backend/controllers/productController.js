const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample Product',
      price: 0,
      description: 'Sample description',
      images: ['/placeholder.jpg'],
      category: 'Sample',
      sizes: ['S', 'M', 'L'],
      stock: 10
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product) {
      product.stock = req.body.stock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getProducts, createProduct, updateStock };
