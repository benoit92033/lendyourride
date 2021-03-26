
import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';

function App() { 
  return (
    <Layout>
      <MyMenu/>
      <Page />
    </Layout>
  );
}
 
export default App;