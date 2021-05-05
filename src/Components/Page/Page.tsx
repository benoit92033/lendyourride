import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AjoutAnnonce } from '../AjoutAnnonce';
import { Bien } from '../Bien';

interface Props {
  displayedData: Array<any>;
}

export const Page = ({displayedData} : Props) => {
  const [visible, setVisible] = useState(false);
  const [addBien, setAddBien] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(1);

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }

  return (
    <>
      <Content style={{paddingTop: '110px', marginLeft: '5%', marginRight: '5%'}}>
        <div onClick={() => setAddBien(true)} className="btn-addBien">
          Louer mon véhicule
        </div>

        {displayedData.length > 0 ? displayedData.map((row, index) => {
          if(row != null){
            return (
              <div className="listeRechercheBien" key={index}>
                <Button type="primary" onClick={() => clickOnVisualisation(index)} className="buttonVisu" style={{backgroundImage: "url(" + row?.doc.photo + ")", backgroundSize: "cover"}}>
                  <p className="titleBien">{row?.doc.localisation.ville} : {row?.doc.titre}</p>
                </Button>
              </div>
            )}
            return null
          }) : <p>Aucun résultat trouvé</p>}
        {visible && displayedData != null ?
          <Bien data={{
            Location: displayedData[clickedIndex]?.doc.localisation.ville, 
            Title: displayedData[clickedIndex]?.doc.titre,
            Type: displayedData[clickedIndex]?.doc.type,
            Tarif: displayedData[clickedIndex]?.doc.tarif,
            Photo: displayedData[clickedIndex]?.doc.photo,
            Description: displayedData[clickedIndex]?.doc.description,
            ProductId: displayedData[clickedIndex]?.doc.productId,
          }} visible={visible} setVisible={setVisible}/> :
          null
        }

        {addBien ?
          <AjoutAnnonce addBien={addBien} setAddBien={setAddBien}/> : null
        }
      </Content>
    </>
  );
};
