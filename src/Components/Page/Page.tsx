import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bien } from '../Bien';

interface Props {
  displayedData: ({
    Location: string;
    Title: string;
    Description: string;
    Type: string;
    Tarif: number; 
    Photo: string;
  }| null)[];
}

export const Page = ({displayedData} : Props) => {
  const [visible, setVisible] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(1);

  const [data, setData] = useState({ Location: "", Title: "",  Description:"", Type: "", Tarif: "",  Photo:""});
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
 
      setData({
        Location: result.data.Location, 
        Title: result.data.Title,
        Type: result.data.Type,
        Tarif: result.data.Tarif,
        Photo: result.data.Photo,
        Description: result.data.Description,
      });
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
              <div className="listeRechercheBien" key={index}>
                {row?.Location} : {row?.Title}
                <Button type="primary" onClick={() => clickOnVisualisation(index)} className="buttonVisu">
                  Visualisation d'un bien
                </Button>
              </div>
            )}
            return null
          }) : <p>Aucun résultat trouvé</p>}
        {visible && displayedData != null ?
          <Bien data={{
            Location: displayedData[clickedIndex]?.Location, 
            Title: displayedData[clickedIndex]?.Title,
            Type: displayedData[clickedIndex]?.Type,
            Tarif: displayedData[clickedIndex]?.Tarif,
            Photo: displayedData[clickedIndex]?.Photo,
            Description: displayedData[clickedIndex]?.Description,
          }} visible={visible} setVisible={setVisible}/> :
          null
        }
      </Content>
    </>
  );
};
