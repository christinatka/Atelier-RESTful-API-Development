const router = require('express').Router();
const ProductsController = require('./controllers/ProductsController.js');

router.get('/', ProductsController.getAllProducts);

router.get('/:productId', ProductsController.getProductById);

router.get('/:productId/styles', ProductsController.getProductStyles);

router.get('/:productId/related', ProductsController.getRelatedProducts);

module.exports = router;
