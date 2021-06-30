import React, {useState, Component, useEffect} from 'react';
import Pusher from 'pusher';
import Pusher_JS from 'pusher-js';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import db from '../../firebase.js';

interface Props {
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  cUser: any;
}

export const Chat = ({ setChat, cUser }: Props) => {

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    db.collection("messages").orderBy("timestamp").onSnapshot((querySnapshot) => {
      let arr: Array<any>;
      arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({doc: doc.data()})
      });
      setMessages(arr);
    });
  }, []);
  
  const sendMessage = (values: any) => {
    db.collection('messages').add({
      content: values.message,
      timestamp: Date.now(),
      sender: {
        email: cUser.currentUser.private.email,
        prenom: cUser.currentUser.public.prenom,
      }
      //receiver: user.id
    }).then(()=> {
    });

    form.resetFields();
  }

  const [form] = Form.useForm();

  return (
    <>
      <div className="chat">
        <div style={{backgroundColor: '#007bff', color: 'white', borderRadius: '15px 15px 0px 0px', padding: '2px'}}>
          <p style={{margin: '10px', fontSize: '20px'}}>Chat</p>
          <DownOutlined style={{position: 'absolute', top: '20px', right: '20px', fontSize: '20px'}} onClick={() => setChat(false)}/>
        </div>
        <div style={{display: 'block'}}>
        {messages.map(message => {
            console.log(message);
            console.log(cUser);
            if (message.doc.sender.email == cUser.currentUser.private.email) {
              return (
                <div>
                  <p className="chatMessage" style={{backgroundColor: 'rgba(0, 123, 255, 0.3)'}}>{message.doc.content}</p>
                  <p className="chatUser">{message.doc.sender.prenom}</p>
                </div>
              );
            } else {
              return (
                <div>
                  <p className="chatMessage">{message.doc.content}</p>
                  <p className="chatUser">{message.doc.sender.prenom}</p>
                </div>
              );
            }
          })}
        </div>
        <Form onFinish={sendMessage} form={form} className="chatForm" style={{display: 'flex'}}>
          <Form.Item name="message" style={{marginLeft: '10px', width: '275px' }}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginLeft: '10px'}}>
              Envoyer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
