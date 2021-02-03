const db = require('../database');


const getAllProducts = (req, res) => {
  return db.Products.findAll({ limit: 10 })
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
    .then(async (styles) => res.status(200).send({
      product_id: req.params.productId,
      results: await Promise.all(styles.map(async style => ({
        style_id: style.id,
        original_price: style.original_price,
        name: style.name,
        sale_price: style.sale_price,
        'default?': !!style.default_style,
        photos: await db.Photos.findAll({
          where: {
            style_id: style.id
          }
        })
      }))),
    }))
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
