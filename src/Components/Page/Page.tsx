import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import db from '../../firebase.js';
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

export const Page = () => {
  const [visible, setVisible] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(1);

  const data = ([
    {Location: "Annecy", Title: "Incroyable Audi R8", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Lyon", Title: "Petite 206", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Marseille", Title: "Range rover", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Paris", Title: "Opel astra", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Montpellier", Title: "Tout terrain", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Avignon", Title: "Carrosse pour mariage", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
    {Location: "Valence", Title: "Caravane de luxe", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "Photo"},
  ])

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }

  //const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('products').get();
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        //setData({docs: doc.data()});
      });
    };
 
    fetchData();
  });
  return (
    <>
      <Content style={{paddingTop: '10vh'}}>
        {/*A remplacer par data.map*/}
        {data.length > 0 ? data.map((row, index) => {
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
        {visible && data != null ?
          <Bien data={{
            Location: data[clickedIndex]?.Location, 
            Title: data[clickedIndex]?.Title,
            Type: data[clickedIndex]?.Type,
            Tarif: data[clickedIndex]?.Tarif,
            Photo: data[clickedIndex]?.Photo,
            Description: data[clickedIndex]?.Description,
          }} visible={visible} setVisible={setVisible}/> :
          null
        }
      </Content>
    </>
  );
};
