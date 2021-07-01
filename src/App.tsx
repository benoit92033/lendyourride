
import Layout, { Content } from 'antd/lib/layout/layout';
import React, { useState, useEffect } from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';
import { Legal } from './Components/Legal'
import { MyFooter } from './Components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import UserProvider from "./Providers/UserProvider";
import db, { auth } from './firebase.js';
import { Admin } from './Components/Admin';
import { Annonce } from './Components/Annonce';
import { User } from './Components/User';

function App() { 
  const [displayedData, setDiplayedData] = useState<any[]>([]);

  useEffect(() => {
    console.log("lol")
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
  
  const [admin, setAdmin] = useState(false);
  const [addBien, setAddBien] = useState(false);
  const [myAccount, setMyAccount] = useState(false);

  const showAdmin = (value: boolean) => {
    setAdmin(value)
  }

  const showAddBien = (value: boolean) => {
    setAddBien(value)
  }

  const showUser = (value: any) => {
    setUser(value)
  }

  const showData = (value: any[]) => {
    setDiplayedData(value);
  }

  const showMyAccount = (value: boolean) => {
    setMyAccount(value);
  }
  
  const [cUser, setUser] = useState<any>({currentUser: null});

  const pageComponent = () =>{
    return (
      <Content>
        <MyMenu cUser={cUser} setDiplayedData={showData} data={displayedData} setAdmin={showAdmin} setAddBien={showAddBien} setUser={showUser} setMyAccount={showMyAccount}/>;
        
        <Annonce addBien={addBien} setAddBien={showAddBien} cUser={cUser} data={undefined}/>
        {cUser.currentUser !== null && cUser.currentUser?.private.email !== false &&(<>
          <User myAccount={myAccount} setMyAccount={showMyAccount} cUser={cUser} />
          <Admin admin={admin} setAdmin={showAdmin}/>
        </>)
        }
        <Page setDisplayedData={showData} displayedData={displayedData} cUser={cUser}/>;
        <MyFooter />
      </Content>
    )
  }
  
  return (
    //<UserProvider>
      <Layout>
        <BrowserRouter>
          <Route exact path="/" component={pageComponent} />
          <Route path="/legal/CGU" component={Legal} />
        </BrowserRouter>
      </Layout>
    //</UserProvider>
  );
}
 
export default App;
