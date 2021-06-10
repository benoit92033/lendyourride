import React from 'react';
import { Button, Form, Input, Modal, Row, Col } from "antd";
import db from '../../firebase.js';

interface Props {
  setMyAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setAddBien: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserButtons = ({setMyAccount, setAddBien}: Props) => {

  return (
    <>
      <div style={{display: 'flex'}}>
        <div onClick={() => setAddBien(true)} className='btn-addBien' style={{marginRight: '15px'}}>
          Mettre mon véhicule en location
        </div>
        <div onClick={() => setMyAccount(true)} className='btn-addBien'>
          Mon compte
        </div>
      </div>
    </>
  );
};
