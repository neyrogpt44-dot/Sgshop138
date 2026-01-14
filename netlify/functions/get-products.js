const fetch = require('node-fetch');
const xml2js = require('xml2js');

const XML_URL = 'https://fireboxstore.ru/link/b2427725d518f7884093a2a43dd8702bae53552b.xml';

let cachedItems = null;

exports.handler = async (event) => {
  const page = parseInt(event.queryStringParameters.page || '1');
  const limit = parseInt(event.queryStringParameters.limit || '20');

  if (!cachedItems) {
    const response = await fetch(XML_URL);
    const xml = await response.text();

    const parser = new xml2js.Parser({ explicitArray: false });
    const json = await parser.parseStringPromise(xml);

    cachedItems = json.yml_catalog.shop.offers.offer;
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const slice = cachedItems.slice(start, end).map(item => ({
    name: item.name,
    price: item.price,
    url: item.url,
    image: item.picture
  }));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(slice)
  };
};
