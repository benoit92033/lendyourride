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

  const pusher = new Pusher({
    appId: "1180093",
    key: "0eb480c8f3021ab3a60e",
    secret: "e87198ffab263ab6ac89",
    cluster: "eu",
    useTLS: true
  });

  const [messages, setMessages] = useState<any[]>([]);

  const fetchData = async () => {
    const snapshot = await db.collection('messages').orderBy("timestamp").get();
    let arr: Array<any>;
    arr = [];
    snapshot.forEach((doc) => {
      arr.push({doc: doc.data()})
    });
    setMessages(arr);
  };

  useEffect(() => {
    //Pusher_JS.logToConsole = true;

    fetchData();

    var pusher_JS = new Pusher_JS('0eb480c8f3021ab3a60e', {
      cluster: 'eu'
    });
  
    var channel = pusher_JS.subscribe('channel-test');
    channel.bind('message', () => {
      fetchData();
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
      fetchData();
    });

    pusher.trigger("channel-test", "message", {});

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
            return (
                <p style={{margin: '10px', padding: '3px 10px 3px 10px', backgroundColor: 'lightgray', borderRadius: '5px', width: 'fit-content' }}>{message.doc.sender.prenom + ' : ' + message.doc.content}</p>
              );
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
