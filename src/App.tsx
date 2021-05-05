
import Layout from 'antd/lib/layout/layout';
import React, { useState, useEffect } from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';
import { BrowserRouter, Route } from 'react-router-dom';
import { Chat } from './Components/Chat';
import UserProvider from "./Providers/UserProvider";
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { AjoutAnnonce } from './Components/ajoutAnnonce';
import db from './firebase.js';

function App() { 
  const [displayedData, setDiplayedData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('products').get();
      let arr: Array<any>;
      arr = [];
      snapshot.forEach((doc) => {
        let product = doc.data()
        product.productId = doc.id
        arr.push({doc: product})
      });
      setDiplayedData(arr);
    };
 
    fetchData();
  }, []);

  const pageComponent = () =>{
    return (
      <div>
        <MyMenu setDiplayedData={setDiplayedData} data={displayedData}/>;
        <Page displayedData={displayedData}/>;
      </div>
    )
  }

  const ajoutAnnonceComponent = () => {
    return <AjoutAnnonce />;
  }

  const chatComponent = () => {
    return <Chat />;
  }
  
  return (
    //<UserProvider>
      <Layout style={{height:'100vh'}}>
        <BrowserRouter>
          <Route exact path="/" component={pageComponent} />
          <Route path="/ajoutAnnonce" component={ajoutAnnonceComponent} />
          <Route path="/chat" component={chatComponent} />
        </BrowserRouter>
      </Layout>
    //</UserProvider>
  );
}
 
export default App;
