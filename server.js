// server.js
const https = require("follow-redirects").https;

async function getTickerDataKraken(firstCypto, secondCrypto) {
    let options = {
      method: "GET",
      hostname: "api.kraken.com",
      path: `/0/public/Ticker?pair=${firstCypto}${secondCrypto}`,
      headers: {
        Accept: "application/json",
      },
      maxRedirects: 20,
    };
  
    try {
      const data = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let chunks = [];
  
          res.on("data", (chunk) => {
            chunks.push(chunk);
          });
  
          res.on("end", () => {
            let body = Buffer.concat(chunks);
            let json = JSON.parse(body.toString());
  
            if (!json || !json.result) {
              reject(new Error("Invalid API response"));
              return;
            }
  
            // transform the json to a list of strings
            let result = [];
            for (let key in json.result) {
              result.push(json.result[key].a[0]);
              result.push(json.result[key].b[0]);
              result.push(json.result[key].t[0]);
              result.push(json.result[key].l[0]);
              result.push(json.result[key].h[0]);
              result.push(json.result[key].o);
            }
  
            // for each value in results, format in dollars
            for (let i = 0; i < result.length; i++) {
              result[i] = parseFloat(result[i]).toLocaleString("en-US", {"currency": "USD", "style": "currency"});
            }
  
            resolve(result);
          });
  
          res.on("error", (error) => {
            reject(error);
          });
        });
  
        req.on('error', (error) => {
          reject(error);
        });
  
        // handle the request timeout
        try {
            req.end();
        } catch (error) {
            console.error(`Error sending request: ${error.message}`);
        }
      });
  
      return data;
    } catch (error) {
      console.error(`Error fetching ticker data: ${error.message}`);
      throw error;  // re-throw the error to be handled by the calling code
    }
  }
  

module.exports = getTickerDataKraken;
