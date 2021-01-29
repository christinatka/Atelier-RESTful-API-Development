const Styles = require('../../server/models/ProductStyles.js');
const sequelize = require('../../server/database/db.js');
const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

// sequelize.options.logging = false;

const parseData = async () => {
  await Styles.sync({ force: true });

  papa.parse(fs.createReadStream('../data/styles.csv', 'utf8'), {
    header: true,
    skipEmptyLines: true,
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