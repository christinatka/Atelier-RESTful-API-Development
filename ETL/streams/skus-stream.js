const { Skus } = require('../../server/database/index.js');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {

  await db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => Skus.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.log(err));

  papa.parse(fs.createReadStream('../data/skus.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    timestamps: false,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Skus.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();
