const { Styles } = require('../../server/database/index.js');
const db = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {

  await db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => Styles.sync({ force: true }))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch(err => console.log(err));

  papa.parse(fs.createReadStream('../data/styles.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
    timestamps: false,
    chunkSize: 10,
    dynamicTyping: true,
    chunk: (results, parser) => {
      parser.pause();
      Styles.bulkCreate(results.data.map((o) => ({
        ...o,
        sale_price: isNaN(o.sale_price) ? null : o.sale_price,
      })));
      parser.resume();
    },
  });
};

parseData();
