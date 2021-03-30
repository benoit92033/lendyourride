import { Input, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../firebase';

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
      <Header 
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100vw',
          height: '10vh',
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between'}}>
            
        <div style={{ display: 'flex', minWidth: '200px', color: 'white' }}>
          <p>Logo</p>
        </div>
        <div style={{ display: 'flex', minWidth: '200px', color: 'white' }}>
          <Search placeholder="Rechercher un bien" onSearch={(value: string) => recherche(value)} style={{ width: 200 }} />
        </div>
        <Menu mode="horizontal" theme="dark">
          {state.currentUser ? (
            <Menu.Item key="1"/*icon={}*/>
              <p>{state.currentUser.displayName}</p>
              <button onClick={() => auth.signOut()}>Déconnexion</button>
            </Menu.Item>
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
