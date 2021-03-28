
import Layout from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './Components/Login';

function App() { 
  const supoData = ([
    {Location: "Annecy", Title: "Incroyable Audi R8"},
    {Location: "Lyon", Title: "Chiche?"},
    {Location: "Montcuq", Title: "Direct dans"},
    {Location: "Carnival", Title: "Opel astra"},
    {Location: "Oasis", Title: "Tout terrain"},
    {Location: "Tropical", Title: "Pourri"},
    {Location: "Eau", Title: "LALALLA"},
  ])
  const [displayedData, setDiplayedData] = useState<({
    Location: string;
    Title: string;
  }| null)[]>(supoData);
  
  const [token, setToken] = useState();

  const pageComponent = () =>{
    return (
      <div>
        <MyMenu setData={setDiplayedData} data={supoData}/>;
        <Page displayedData={displayedData}/>;
      </div>
    )
  }

  const loginComponent = () => {
    return <Login setToken={setToken} />;
  }

  return (
    <Layout style={{height:'100vh'}}>
      <BrowserRouter>
        <Route exact path="/" component={pageComponent} />
        <Route path="/login" component={loginComponent} />
      </BrowserRouter>
    </Layout>
  );
}
 
export default App;