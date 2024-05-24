import Layout from "@/components/Layout.js";
import React, { useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [firstCypto, setFirstCrypto] = useState("");
  const [secondCrypto, setSecondCrypto] = useState("");
  const getTickerDataKraken = require("../server.js");

  const submitHandler = (event) => {
    event.preventDefault();

    try {
      getTickerDataKraken(firstCypto, secondCrypto).then((response) => {
        setData(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const displayData = () => {
    if (data.length > 0) {
      return (
        <div className="ml-6 p-6 rounded overflow-hidden shadow-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-blue-600">
          <div className="divide-y divide-blue-700">
            <h1 className="text-center text-4xl">Kraken</h1>

            <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-black">
              High - O preço mais alto nas últimas 24 horas:
              {<p className="text-red-800">{`${data[4]} ${secondCrypto}`}</p>}
            </h1>
            
            <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-black">
              Low - O preço mais baixo nas últimas 24 horas:
              {
                <p className="text-emerald-800">{`${data[3]} ${secondCrypto}`}</p>
              }
            </h1>

            <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-black">
              Ask Price - Preço da Oferta Atual:
              {
                <p className="text-emerald-800">{`${data[0]} ${secondCrypto}`}</p>
              }
            </h1>

            <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-black">
              Bid Price - Preço do Lance Atual:
              {<p className="text-blue-800">{`${data[1]} ${secondCrypto}`}</p>}
            </h1>

            <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-black">
              Last Trade - Última negociação:
              {<p className="text-blue-800">{`${data[2]} ${secondCrypto}`}</p>}
            </h1>

            <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-black">
              Open - O preço de abertura nas últimas 24 horas:{" "}
              {<p className="text-blue-800">{`${data[5]} ${secondCrypto}`}</p>}
            </h1>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-blue-600">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Kraken</div>
            <p class="text-gray-700 text-base mb-2">
              Query your favorite pair and get the latest price.
            </p>

            <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
              <div>
                <input
                  type="text"
                  id="small-input"
                  class="block w-full p-2 text-gray-900 border border-blue-300 rounded-lg bg-blue-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-300 dark:bg-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First Crypto"
                  value={firstCypto}
                  onChange={(e) => setFirstCrypto(e.target.value)}
                  required="required"
                />
                <input
                  type="text"
                  id="small-input"
                  class="block w-full p-2 text-gray-900 border border-blue-300 rounded-lg bg-blue-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-300 dark:bg-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                  placeholder="Second Crypto"
                  value={secondCrypto}
                  onChange={(e) => setSecondCrypto(e.target.value)}
                  required="required"
                />
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="px-8 py-2 bg-blue-400 hover:bg-blue-800 text-white rounded mt-2"
                  >
                    Get
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>{displayData()}</div>
      </div>
    </Layout>
  );
}

export default Home;
