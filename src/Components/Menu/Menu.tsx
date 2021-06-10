import { Input, Menu, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.style.css';
import logo from '../Images/logo.png';
import { auth, signInWithGoogle } from '../../firebase';
import MenuItem from 'antd/lib/menu/MenuItem';
import db from '../../firebase.js';

const { Search } = Input;
interface Props {
  data: Array<any>;
  setDiplayedData: any;
  setUser: any;
  cUser: any;
}

export const MyMenu = ({setDiplayedData, data, setUser, cUser} : Props) => {

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

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user != undefined) {
        db.collection('users').where('private.email', '==', user?.email).get().then(snapshot => {
          if (!snapshot.empty) {
            const user = snapshot.docs[0];
            const data = user.data();
            setUser({ currentUser: data });
          } else {
            let formattedUser = {
              admin: false,
              public: {
                prenom: user?.displayName,
                photo: user?.photoURL,
              },
              private: {
                email: user?.email,
                telephone: user?.phoneNumber,
              }
            }
            setUser({ currentUser: formattedUser });
          }
        });
      }
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
          {cUser.currentUser ? (
            <div style={{ display: 'inline'}}>
                <img className="ant-menu-item" style={{ borderRadius: '50%', width: '100px', display: 'inline'}} src={(cUser.currentUser.public.photo)} />
                <p style={{ marginRight: '25px', fontSize: '20px', fontWeight: 'bold', display: 'inline'}}>{cUser.currentUser.public.prenom}</p>
                <Button type="primary" onClick={() => {auth.signOut(); setUser({ currentUser: null });}}>
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
