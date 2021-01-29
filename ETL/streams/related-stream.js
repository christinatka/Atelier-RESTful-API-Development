const Related = require('../../server/models/RelatedProducts.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {
  await Related.sync({ force: true });

  papa.parse(fs.createReadStream('../data/related.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Related.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();