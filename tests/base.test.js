require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { getProducts } = require('../server/controllers/utils.js');

jest.useFakeTimers();
jest.mock('../server/models/Products.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  require('../server/database');
  return dbMock.define('products', {
    id: 1,
    name: 'Red Shirt',
    slogan: 'This shirt is red like strawberrys',
    description: 'Really soft shirt',
    category: 'Shirts',
    default_price: 25.99,
  });
});

describe('Test Products', () => {
  it('Should get value from product', async () => {
    const items = await getProducts();
    expect(items.length).toEqual(1);
    expect(items[0].dataValues.id).toEqual(1);
    expect(items[0].dataValues.name).toEqual('Red Shirt');
    expect(items[0].dataValues.default_price).toEqual(25.99);
  });
});