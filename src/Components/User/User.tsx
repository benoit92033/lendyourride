import React, {useState, useEffect} from 'react';
import { Button, Form, Input, Modal, Col } from "antd";
import db from '../../firebase.js';

interface Props {
    user : boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const User = ({ user, setUser }: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <Modal 
        title='Mon Compte'
        centered
        visible={user}
        width={2000}
        onCancel={() => setUser(false)}
        footer={[
          <Button key="back" onClick={() => setUser(false)}>
            Quitter
          </Button>,
        ]}>
        <h2>Mes informations</h2>

        <h2>Mes biens</h2>

        <h2>Mes réservations</h2>
      </Modal>
    </>
  );
};