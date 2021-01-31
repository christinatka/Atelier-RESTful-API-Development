const { Products } = require('../../server/database');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {
  await Products.sync({ force: true });

  papa.parse(fs.createReadStream('../data/product.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    timestamps: false,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Products.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();
