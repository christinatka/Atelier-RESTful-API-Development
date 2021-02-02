const db = require('../database');
const { getProducts } = require('./utils');

const getAllProducts = (req, res) => {
  return getProducts()
    .then((products) => res.status(200).send(products))
    .catch(() => res.sendStatus(500));
};

const getProductById = (req, res) => {
  return db.Products.findByPk(req.params.productId)
    .then((product) => res.status(200).send(product))
    .catch(() => res.sendStatus(500));
};

const getProductStyles = (req, res) => {
  return db.Styles.findAll({
    where: {
      product_id: req.params.productId,
    }
  })
    .then((styles) => res.status(200).send(styles))
    .catch(() => res.sendStatus(500));
};

const getRelatedProducts = (req, res) => {
  return db.Related.findAll({
    where: {
      current_product_id: req.params.productId,
    }
  })
    .then((related) => res.status(200).send(related.map(r => r.related_product_id)))
    .catch(() => res.sendStatus(500));
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductStyles,
  getRelatedProducts
};
