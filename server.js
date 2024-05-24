// server.js
const https = require('follow-redirects').https;

let options = {
  'method': 'GET',
  'hostname': 'api.kraken.com',
  'path': '/0/public/Ticker?pair=ETHUSD',
  'headers': {
    'Accept': 'application/json'
  },
  'maxRedirects': 20
};

function getTickerData() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", (chunk) => {
        let body = Buffer.concat(chunks);
        resolve(body.toString());
      });

      res.on("error", (error) => {
        reject(error);
      });
    });

    req.end();
  });
}

module.exports = getTickerData;
