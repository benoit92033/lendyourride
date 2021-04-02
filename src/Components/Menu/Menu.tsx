import { Input, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import './menu.style.css';
import logo from '../Images/logo.png';

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
  return (
    <>
      <Header className='headerMenu'>
        <div className='logo'>
          <img src={logo}/>
        </div>
        <div className='searchBar'>
          <Search className='searchBar2' placeholder="Rechercher un bien" onSearch={(value: string) => recherche(value)} />
        </div>
        <Menu className='menu' mode="horizontal">
          <Menu.Item key="1"/*icon={}*/>
            <Link to="/login">Connexion</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};
