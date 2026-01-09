const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/auth'); 
// All routes here are protected (Need to be logged in)
router.route('/')
    .get(protect, getProducts)
    .post(protect, createProduct);

router.route('/:id')
    .delete(protect, deleteProduct);

module.exports = router;