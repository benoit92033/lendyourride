
import Layout from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';
import { BrowserRouter, Route } from 'react-router-dom';
import { Chat } from './Components/Chat';
import UserProvider from "./Providers/UserProvider";
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { AjoutAnnonce } from './Components/ajoutAnnonce';

function App() { 
  const supoData = ([
    {Location: "Annecy", Title: "Incroyable Audi R8", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Lyon", Title: "Petite 206", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Marseille", Title: "Range rover", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Paris", Title: "Opel astra", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Montpellier", Title: "Tout terrain", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Avignon", Title: "Carrosse pour mariage", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Valence", Title: "Caravane de luxe", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
  ])
  const [displayedData, setDiplayedData] = useState<({
    Location: string;
    Title: string;
    Description: string;
    Type: string;
    Tarif: number; 
    Photo: string;
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
