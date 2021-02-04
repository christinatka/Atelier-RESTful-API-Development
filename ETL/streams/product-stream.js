const { Products } = require('../../server/database');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {

  await db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => Products.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.log(err));

  papa.parse(fs.createReadStream('../data/product.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Products.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();
