import { Input, Menu, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../firebase';

const { Search } = Input;
interface Props {
  data: Array<any>;
  setDiplayedData: any;
}

export const MyMenu = ({setDiplayedData, data} : Props) => {

  const recherche = (value: string) => {
    let menuBien: Array<any>;
    menuBien = [];
    data.map(function(row) {
      if(value == null || row.doc.titre.toUpperCase().includes(value.toUpperCase())){
        menuBien.push(row)
      }
      return null;
    })
    setDiplayedData(menuBien);
  }

  const [state, setState] = useState<any>({currentUser: null});

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setState({ currentUser: user });
    });
  }, []);

  return (
    <>
      <Header 
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100vw',
          height: '12vh',
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between'}}>
            
        <div style={{ display: 'flex', minWidth: '200px', color: 'white' }}>
          <img src="logoLYR.jpg" alt=""/>
        </div>
        <div style={{ display: 'flex', minWidth: '200px', color: 'white', marginRight: '200px', marginTop: '30px' }}>
          <Search placeholder="Rechercher un bien" onSearch={(value: string) => recherche(value)} style={{ width: 500 }} />
        </div>
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
        </div>
      </Header>
    </>
  );
};
