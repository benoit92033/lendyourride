import React from 'react';
import { Button, Form, Input, Modal, Row, Col } from "antd";
import db from '../../firebase.js';

interface Props {
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminButton = ({setAdmin}: Props) => {

  return (
    <>
      <div onClick={() => setAdmin(true)} className='btn-admin'>
          Admin
      </div>
    </>
  );
};
