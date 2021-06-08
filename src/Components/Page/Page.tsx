import { Button, Form, Input } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { WechatOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Annonce } from '../Annonce';
import { Bien } from '../Bien';
import { Chat } from '../Chat';
import { Admin } from '../Admin';
import { User } from '../User';

interface Props {
  displayedData: Array<any>;
}

export const Page = ({displayedData} : Props) => {
  const [visible, setVisible] = useState(false);
  const [addBien, setAddBien] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [chat, setChat] = useState(false);
  const [user, setUser] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(1);

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }

  return (
    <>
      <Content style={{paddingTop: '110px', marginLeft: '5%', marginRight: '5%', paddingBottom: '110px'}}>
        <div style={{display: 'flex'}}>
          <div onClick={() => setAddBien(true)} className="btn-addBien" style={{marginRight: '15px'}}>
            Mettre mon véhicule en location
          </div>
          <div onClick={() => setUser(true)} className="btn-addBien">
            Mon compte
          </div>
        </div>
        

        <div onClick={() => setAdmin(true)} className="btn-admin">
          Admin
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
          <Annonce addBien={addBien} setAddBien={setAddBien}/> : null
        }

        {admin ?
          <Admin admin={admin} setAdmin={setAdmin}/> : null
        }

        {user ?
          <User user={user} setUser={setUser}/> : null
        }

        <Button type="primary" onClick={() => setChat(true)} className="buttonChat" >
          <WechatOutlined style={{fontSize: '40px'}}/>
        </Button>
        {chat ?
          <Chat setChat={setChat}/> : null
        }
      </Content>
    </>
  );
};
