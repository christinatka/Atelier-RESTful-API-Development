const Skus = require('../../server/models/ProductSkus.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {
  await Skus.sync({ force: true });

  papa.parse(fs.createReadStream('../data/skus.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Skus.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();