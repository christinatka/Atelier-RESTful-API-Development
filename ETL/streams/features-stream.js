const { Features } = require('../../server/database/index.js');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');
const dirPath = path.join(__dirname, '../data/features.csv');

module.exports = async () => {
  db.options.logging = false;
  await db.query('SET FOREIGN_KEY_CHECKS = 0', { logging: false })
    .then(() => Features.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.error(err));

  papa.parse(fs.createReadStream(dirPath, 'utf8'), {
    header: true,
    skipEmptyLines: true,
    chunkSize: 10,
    chunk: (results, parser) => {
      parser.pause();
      Features.bulkCreate(results.data.map((o) => ({
        ...o,
        value: o.value === 'null' ? null : o.value,
      }))).catch(err => console.error(err));
      parser.resume();
    },
  });
  db.options.logging = true;
};
