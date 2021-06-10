import { Button, Form, Input } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import db from '../../firebase.js';
import React, { useEffect, useState } from 'react';
import { Annonce } from '../Annonce';
import { Bien } from '../Bien';
import { Chat } from '../Chat';
import { Admin } from '../Admin';
import { User } from '../User';
import { AdminButton } from '../AdminButton';
import { UserButtons } from '../UserButtons';
import { MyMenu } from '../Menu';
import { ChatButton } from '../ChatButton';

interface Props {}

export const Page = () => {
  const [visible, setVisible] = useState(false);
  const [addBien, setAddBien] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [chat, setChat] = useState(false);
  const [myAccount, setMyAccount] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(1);

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }
  
  const [displayedData, setDiplayedData] = useState<any[]>([]);
  const [cUser, setUser] = useState<any>({currentUser: null});

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('products').get();
      let arr: Array<any>;
      arr = [];
      snapshot.forEach((doc) => {
        let product = doc.data()
        product.productId = doc.id
        arr.push({doc: product})
      });
      setDiplayedData(arr);
    };
 
    fetchData();
  }, []);

  const renderUserButtons = () => {
    if (cUser.currentUser != null && cUser.currentUser?.private.email != false) {
      return <UserButtons setMyAccount={setMyAccount} setAddBien={setAddBien}/>
    }
  }

  const renderAdminButton = () => {
    if (cUser.currentUser != null && cUser.currentUser?.private.email != false && cUser.currentUser?.admin) {
      return <AdminButton setAdmin={setAdmin}/>
    }
  }

  const renderChatButton = () => {
    if (cUser.currentUser != null && cUser.currentUser?.private.email != false) {
      return <ChatButton setChat={setChat} />
    }
  }
    



  return (
    <>
      <MyMenu setDiplayedData={setDiplayedData} data={displayedData} setUser={setUser} cUser={cUser} />
      <Content style={{paddingTop: '130px', marginLeft: '5%', marginRight: '5%', paddingBottom: '110px'}}>
        {renderUserButtons()}
        {renderAdminButton()}

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
            User: {
              email: displayedData[clickedIndex]?.doc.user.email,
              prenom: displayedData[clickedIndex]?.doc.user.prenom,
            },
          }} visible={visible} setVisible={setVisible} cUser={cUser}/> :
          null
        }

        {addBien ?
          <Annonce addBien={addBien} setAddBien={setAddBien} cUser={cUser} data={undefined}/> : null
        }

        {admin ?
          <Admin admin={admin} setAdmin={setAdmin}/> : null
        }

        {myAccount ?
          <User myAccount={myAccount} setMyAccount={setMyAccount} cUser={cUser}/> : null
        }

        {renderChatButton()}
        {chat ?
          <Chat setChat={setChat} cUser={cUser}/> : null
        }
      </Content>
    </>
  );
};
