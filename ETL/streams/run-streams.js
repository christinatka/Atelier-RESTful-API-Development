const db = require('../../server/database/db.js');

const products = require('./product-stream.js');
const features = require('./features-stream.js');
const photos = require('./photos-stream.js');
const skus = require('./skus-stream.js');
const styles = require('./styles-stream.js');
const related = require('./related-stream.js');

const runScripts = async () => {
  console.log = () => null;
  console.info('STARTING UPLOAD');
  await products();
  console.info('PRODUCTS UPLOADED');
  await features();
  console.info('FEATURES UPLOADED');
  await related();
  console.info('RELATED UPLOADED');
  await styles();
  console.info('STYLES UPLOADED');
  await skus();
  console.info('SKUS UPLOADED');
  await photos();
  console.info('PHOTOS UPLOADED');
};

runScripts();

module.exports = runScripts;
