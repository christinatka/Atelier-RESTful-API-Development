const Product = require('../../server/models/Products.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {
  await Product.sync({ force: true });

  papa.parse(fs.createReadStream('../data/product.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Product.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();