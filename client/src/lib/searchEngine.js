const axios = require('axios');
const { API_TOKEN } = require('../../../env/config.js');
const Authorization = API_TOKEN || process.env.API_KEY;

// TODO: consider deployment_ e.g. process.env.URL
const remoteApi = 'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc';
const localApi = 'http://localhost:3333';
const getUrl = (endPoint) => `${endPoint.startsWith('products') ? localApi : remoteApi }/${endPoint}`;
const searchEngine = {

  get: (endPoint, params = {}) => {
    return axios.get(getUrl(endPoint), {
      headers: { Authorization },
      params: params,
    });
  },

  post: (endPoint, data) => {
    return axios.post(getUrl(endPoint), data, {
      headers: { Authorization },
    });
  },

  put: (endPoint) => {
    return axios.put(getUrl(endPoint), {}, {
      headers: { Authorization },
    });
  },

};

export default searchEngine;
