import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';

export const MyMenu = () => {

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
          <p>Img</p>
        </div>
        <div style={{ display: 'flex', minWidth: '200px', color: 'white' }}>
          <p>Recherche</p>
        </div>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="1" /*icon={}*/>
              Connexion
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};
