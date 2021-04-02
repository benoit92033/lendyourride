import { Input, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import './menu.style.css';
import logo from '../Images/logo.png';
=======
import { auth, signInWithGoogle } from '../../firebase';
>>>>>>> 7aeb14146f0be671169f2c91ee92fca1a56fdca4

const { Search } = Input;
interface Props {
  data: {
    Location: string;
    Title: string;
    Description: string;
    Type: string;
    Tarif: number; 
    Photo: string;
  }[];
  setData: React.Dispatch<React.SetStateAction<({
    Location: string;
    Title: string;
    Description: string;
    Type: string;
    Tarif: number; 
    Photo: string;
  }| null)[]>>;
}
export const MyMenu = ({setData, data} : Props) => {

  const recherche = (value: string) => {
    let menuBien: (({
      Location: string;
      Title: string;
      Description: string;
      Type: string;
      Tarif: number; 
      Photo: string;
    }| null)[]) = [];
    data.map(function(row) {
      if(value == null || row.Title.toUpperCase().includes(value.toUpperCase())){
        menuBien.push(row)
      }
      return null;
    })
    setData(menuBien);
  }

  const [state, setState] = useState<any>({currentUser: null});

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setState({ currentUser: user });
    });
  }, []);

  return (
    <>
      <Header className='headerMenu'>
        <div className='logo'>
          <img src={logo}/>
        </div>
        <div className='searchBar'>
          <Search className='searchBar2' placeholder="Rechercher un bien" onSearch={(value: string) => recherche(value)} />
        </div>
        <Menu mode="horizontal" theme="dark">
          {state.currentUser ? (
              <div>
                <Menu.Item key="1">
                  <p>{state.currentUser.displayName /*.email*/}</p>
                  <img className="ant-menu-item" src={(state.currentUser.photoURL)} />
                </Menu.Item>
                <Menu.Item key="2"/*icon={}*/>
                  <button onClick={() => auth.signOut()}>Déconnexion</button>
                </Menu.Item>
              </div>
            ) : 
            <Menu.Item key="1"/*icon={}*/>
              <button onClick={signInWithGoogle}>Connexion avec Google</button>
            </Menu.Item>
          }
        </Menu>
      </Header>
    </>
  );
};
