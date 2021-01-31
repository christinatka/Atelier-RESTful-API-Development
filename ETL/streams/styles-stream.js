const { Styles } = require('../../server/database/index.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

const parseData = async () => {
  await Styles.sync({ force: true });

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
