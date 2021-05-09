import React, {useState, Component, useEffect} from 'react';
import Pusher from 'pusher';
import Pusher_JS from 'pusher-js';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';

interface Props {
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Chat = ({ setChat }: Props) => {

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    //Pusher_JS.logToConsole = true;

    var pusher_JS = new Pusher_JS('0eb480c8f3021ab3a60e', {
      cluster: 'eu'
    });
  
    var channel = pusher_JS.subscribe('channel-test');
    channel.bind('message', (data:any) => {
      let arr: Array<any>;
      arr = messages;
      arr.push(data.message.message);
      setMessages(arr);
      console.log(messages);
    });
  }, []);

  useEffect(() => {
    /*const fetchData = async () => {
      const result = await axios(
        'http://localhost:5000/',
      );
 
      setMessages([result.data.messages,]);
    };*/
 
    //fetchData();
  });

  const pusher = new Pusher({
    appId: "1180093",
    key: "0eb480c8f3021ab3a60e",
    secret: "e87198ffab263ab6ac89",
    cluster: "eu",
    useTLS: true
  });
  
  const sendMessage = (message: string) => {
    pusher.trigger("channel-test", "message", {
      message
    });
  }

  return (
    <>
      <div className="chat">
        <div style={{backgroundColor: '#007bff', color: 'white', borderRadius: '15px 15px 0px 0px', padding: '2px'}}>
          <p style={{margin: '10px', fontSize: '20px'}}>Chat</p>
          <DownOutlined style={{position: 'absolute', top: '20px', right: '20px', fontSize: '20px'}} onClick={() => setChat(false)}/>
        </div>
        <div style={{display: 'block'}}>
        {messages.map(message => {
            console.log('called')
            return (<p style={{margin: '10px', padding: '3px', backgroundColor: 'lightgray', borderRadius: '5px'}}>{message}</p>)
          })}
        </div>
        <Form onFinish={sendMessage} className="chatForm" style={{display: 'flex'}}>
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
