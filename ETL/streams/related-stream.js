const { Related } = require('../../server/database/index.js');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {

  await db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => Related.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.log(err));

  papa.parse(fs.createReadStream('../data/related.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    timestamps: false,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Related.bulkCreate(results.data);
      parser.resume();
    },
  });
};

parseData();
