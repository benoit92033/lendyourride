import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Page = () => {
  const [data, setData] = useState({ Location: "", Title: "" });
  const [supoData, setSupoData] = useState([
    {Location: "Annecy", Title: "Incroyable Audi R8"},
    {Location: "Lyon", Title: "Chiche?"},
    {Location: "Montcuq", Title: "Direct dans"},
    {Location: "Carnival", Title: "Opel astra"},
    {Location: "Oasis", Title: "Tout terrain"},
    {Location: "Tropical", Title: "Pourri"},
    {Location: "Eau", Title: "LALALLA"},
  ])
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:5000/',
      );
 
      setData({Location: result.data.Location, Title: result.data.Title});
    };
 
    fetchData();
  });
  return (
    <>
      <Content style={{paddingTop: '10vh'}}>
        {supoData.map((row) => (
          <div style={{background: 'white', color: 'black', height: '300px', marginLeft: '20px', marginRight: '20px', border: 'solid 1px', borderBlockColor: 'grey', borderBottom:'grey'}}>
            {row.Location} : {row.Title}
          </div>
        )) }
      </Content>
    </>
  );
};
