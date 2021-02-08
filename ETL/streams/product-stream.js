const { Products } = require('../../server/database');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');
const dirPath = path.join(__dirname, '../data/product.csv');

module.exports = async () => {
  db.options.logging = false;
  await db.query('SET FOREIGN_KEY_CHECKS = 0', { logging: false })
    .then(() => Products.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.error(err));

  papa.parse(fs.createReadStream(dirPath, 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Products.bulkCreate(results.data).catch(err => console.error(err));
      parser.resume();
    },
  });
  db.options.logging = true;
};
