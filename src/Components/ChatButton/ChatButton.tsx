import React from 'react';
import { Button, Form, Input, Modal, Row, Col } from "antd";
import { WechatOutlined } from '@ant-design/icons';
import db from '../../firebase.js';

interface Props {
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatButton = ({setChat}: Props) => {

  return (
    <>
      <Button type="primary" onClick={() => setChat(true)} className="buttonChat" >
        <WechatOutlined style={{fontSize: '40px'}}/>
      </Button>
    </>
  );
};
