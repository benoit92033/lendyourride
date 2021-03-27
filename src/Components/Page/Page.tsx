import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bien } from '../Bien';

interface Props {
  displayedData: ({
    Location: string;
    Title: string;
  }| null)[];
}

export const Page = ({displayedData} : Props) => {
  const [visible, setVisible] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(1);

  const [data, setData] = useState({ Location: "", Title: "" });
  //A supp après l'api prête

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:5000/',
      );
 
      setData({Location: result.data.Location, Title: result.data.Title});
      console.log(data)
    };
 
    fetchData();
  });
  return (
    <>
      <Content style={{paddingTop: '10vh'}}>
        {/*A remplacer par data.map*/}
        {displayedData.length > 0 ? displayedData.map((row, index) => {
          if(row != null){
            return (
              <div key={index} style={{background: 'white', color: 'black', height: '300px', marginLeft: '20px', marginRight: '20px', border: 'solid 1px', borderBlockColor: 'grey', borderBottom:'grey'}}>
                {row?.Location} : {row?.Title}
                <Button type="primary" onClick={() => clickOnVisualisation(index)} className="buttonVisu">
                  Visualisation d'un bien
                </Button>
              </div>
            )}
            return null
          }) : <p>No data</p>}
        {visible && displayedData != null ?
          <Bien data={{Location: displayedData[clickedIndex]?.Location, Title: displayedData[clickedIndex]?.Title}} visible={visible} setVisible={setVisible}/> :
          null
        }
      </Content>
    </>
  );
};
