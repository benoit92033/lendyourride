
import Layout from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { MyMenu } from './Components/Menu';
import { Page } from './Components/Page';

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

  return (
    <Layout>
      <MyMenu setData={setDiplayedData} data={supoData}/>
      <Page displayedData={displayedData}/>
    </Layout>
  );
}
 
export default App;