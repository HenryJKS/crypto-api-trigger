import Layout from "@/components/Layout.js";
import React, { useEffect, useState } from "react";

function Home() {
    const [data, setData] = useState([])
    const getTickerData = require('../server.js')

    useEffect(() => {
        getTickerData().then(data => {
          setData(data);
        }).catch(error => {
          console.error(error);
        });
      }, []);

  return(
    <Layout>
        <p>{data}</p>
    </Layout>
  )
}

export default Home;