
import Layout from 'antd/lib/layout/layout';
import React, { useState, useEffect } from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';
import { Legal } from './Components/Legal'
import { Footer } from './Components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import UserProvider from "./Providers/UserProvider";
import { OmitProps } from 'antd/lib/transfer/ListBody';
import db from './firebase.js';

function App() { 
  const pageComponent = () =>{
    return (
      <div>
        <Page />;
        <Footer />
      </div>
    )
  }
  
  return (
    //<UserProvider>
      <Layout style={{height:'100vh'}}>
        <BrowserRouter>
          <Route exact path="/" component={pageComponent} />
          <Route exact path="/legal/CGU" component={Legal} />
        </BrowserRouter>
      </Layout>
    //</UserProvider>
  );
}
 
export default App;
