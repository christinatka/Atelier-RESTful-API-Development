const { Photos } = require('../../server/database/index.js');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {

  await db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => Photos.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.log(err));

  papa.parse(fs.createReadStream('../data/photos.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    timestamps: false,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Photos.bulkCreate(results.data.map((o) => ({
        ...o,
        url: o.url === 'null' ? null : o.url,
        thumbnail_url: o.thumbnail_url === 'null' ? null : o.thumbnail_url,
      })));
      parser.resume();
    },
  });
};

parseData();
