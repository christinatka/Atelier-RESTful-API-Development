const Features = require('../../server/models/ProductFeatures.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {
  await Features.sync({ force: true });

  papa.parse(fs.createReadStream('../data/features.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Features.bulkCreate(results.data.map((o) => ({
        ...o,
        value: o.value === 'null' ? null : o.value,
      })));
      parser.resume();
    },
  });
};

parseData();
