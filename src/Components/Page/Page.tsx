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
    {Location: "Annecy", Title: "Incroyable Audi R8", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://www.turbo.fr/sites/default/files/2021-02/audi%20R8.jpg"},
    {Location: "Lyon", Title: "Petite 206", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://i.ytimg.com/vi/aZH5gQez_ZE/maxresdefault.jpg"},
    {Location: "Marseille", Title: "Range rover", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://cdn.motor1.com/images/mgl/gp1Em/s1/land-rover-range-rover-sport-2021.jpg"},
    {Location: "Paris", Title: "Opel astra", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://fr-media.opel.com/sites/default/files/styles/cropping_image/public/field/image/98/Opel-Astra-503773.jpg?itok=PJpZ9hki"},
    {Location: "Montpellier", Title: "Tout terrain", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://www.authentic-roads.com/wp-content/uploads/2019/12/Top-10-des-meilleurs-4x4-et-voitures-tout-terrain-2019.jpg"},
    {Location: "Avignon", Title: "Carrosse pour mariage", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://lh3.googleusercontent.com/proxy/mBWOqfm0zvc9uLY5pK11jxayDf6CJh1D5quUkWPVuNGtJ6OK0HOpZoa94QGRD_N6uQOU9K5_emiRla_iWqs8hsS9oHzcEOTksIbACCqGmZKgUv4F67aXj_1PHzMuh_khgg"},
    {Location: "Valence", Title: "Caravane de luxe", Description: "Beau et pas cher", Type: "Vehicule", Tarif: 20, Photo: "https://www.aquatique-vacances.com/media/8253/initial/vacances-mobil-home-astuce-achat-caravane.jpg"},
  ])

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }

  //const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('products').get();
      /*let (arr: <any>[]) = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        arr.push({doc: doc.data()})
      });
      setData(arr);*/
    };
 
    fetchData();
  });
  return (
    <>
      <Content style={{paddingTop: '10vh', margin: '5%'}}>
        {data.length > 0 ? data.map((row, index) => {
          if(row != null){
            return (
              <div className="listeRechercheBien" key={index}>
                <Button type="primary" onClick={() => clickOnVisualisation(index)} className="buttonVisu" style={{backgroundImage: "url(" + row?.Photo + ")", backgroundSize: "cover"}}>
                  <p className="titleBien">{row?.Location} : {row?.Title}</p>
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
