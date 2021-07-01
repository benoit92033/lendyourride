import { Input, Button, Row, Col, Typography, Avatar, List } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import './Menu.style.css';
import logo from '../Images/logo.png';
import db, { auth, signInWithGoogle } from '../../firebase';

const {Text} = Typography;


const { Search } = Input;
interface Props {
  data: Array<any>;
  setDiplayedData: (tab : any[]) => void;
  setAdmin: (value: boolean) => void;
  setAddBien: (value: boolean) => void;
  setMyAccount: (user : boolean) => void;
  setUser: (user : any) => void;
  cUser: any;
}

export const MyMenu = ({setDiplayedData, data, setAdmin, setAddBien, setMyAccount, setUser, cUser} : Props) => {

  const recherche = (value: string) => {
    let menuBien: Array<any>;
    menuBien = [];
    data.map(function(row) {
      if (value == null || row.doc.titre.toUpperCase().includes(value.toUpperCase())){
        menuBien.push(row)
      }
      return null;
    })
    setDiplayedData(menuBien);
  }

  return (
    <>
      {/*<Header className='headerMenu'>
        <div className='logo'>
          <img src={logo}/>
        </div>
        <div className='searchBar'>
  <Search className='searchBar2' placeholder="Rechercher un bien" onSearch={(value: string) => recherche(value)} />*/}
      <Header className="headerMenu">
        <Row>
          <Col flex={1}>
            <Button className="buttonLogo" type="link" href="/">
              <img
                className="logo"
                src={logo}
                alt='logo'
              />
            </Button>
            {cUser.currentUser !== null && cUser.currentUser?.private.email !== false && (
                <>
                  <Button onClick={() => setAddBien(true)}>
                    Ajouter un bien
                  </Button>
                  <Button onClick={() => setMyAccount(true)}>
                    Mon compte
                  </Button>
                </>
              )
            }
          </Col>
          <Col flex={1} className="search">
            <Search className="searchBar" placeholder="Rechercher un bien" allowClear onSearch={(value: string) => recherche(value)} />
          </Col>
          <Col flex={1}>
            {cUser.currentUser !== null && cUser.currentUser?.private.email !== false ? (
              //Connecter
              <>
                <List
                  itemLayout="vertical"
                  className="avatarList"
                >
                  <List.Item className="avatarItem" extra={<Button type="primary" onClick={() => {auth.signOut(); setUser({ currentUser: null });}}>
                        Déconnexion
                      </Button>}>
                      <List.Item.Meta className="avatarMeta"
                        avatar={<Avatar src={cUser.currentUser.public.photo} />}
                        title={<Text className="avatarNom">{cUser.currentUser.public.prenom}</Text>}
                        description={cUser.currentUser !== null && cUser.currentUser?.private.email !== false && cUser.currentUser?.admin && (<Button type="link" onClick={() => setAdmin(true)}>Admin</Button>)}
                      /> 
                    </List.Item>
                </List>
                </>
              ): 
              //Deconnecter
                <Button style={{marginTop: '30px'}} type="primary" onClick={signInWithGoogle}>
                  Connexion avec Google
                </Button>
              /*<div className="" style={{ display: 'inline'}}>
                  <img className="ant-menu-item" style={{ borderRadius: '50%', width: '100px', display: 'inline'}} 
                  src={(state.currentUser.photoURL)} />
                  <p style={{ marginRight: '25px', fontSize: '20px', fontWeight: 'bold', display: 'inline'}}>
                  {state.currentUser.displayName}</p>
                  
                  <Button type="primary" onClick={() => auth.signOut()}>
                    Déconnexion
                  </Button>
              </div>
              ) 
            */}
          </Col>
        </Row>
        


        {/*
        <div style={{ display: 'flex', minWidth: '500px', color: 'white' }}>
          {state.currentUser ? (
            <div style={{ display: 'inline'}}>
                <img className="ant-menu-item" style={{ borderRadius: '50%', width: '100px', display: 'inline'}} src={(state.currentUser.photoURL)} />
                <p style={{ marginRight: '25px', fontSize: '20px', fontWeight: 'bold', display: 'inline'}}>{state.currentUser.displayName}</p>
                <Button type="primary" onClick={() => auth.signOut()}>
                  Déconnexion
                </Button>
            </div>
            ) : 
              <Button style={{marginTop: '30px'}} type="primary" onClick={signInWithGoogle}>
                Connexion avec Google
              </Button>
          }
        </div>*/}
      </Header>
    </>
  );
};
