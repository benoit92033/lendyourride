import React, {useState, Component, useEffect} from 'react';
import Pusher from 'pusher';
import Pusher_JS from 'pusher-js';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';

interface Props {

}

export const Chat = () => {

  const [messages, setMessages] = useState<string[]>([]);
  console.log(messages)
  // Use effect is called only after mounting. 
  useEffect(() => {
    //Pusher_JS.logToConsole = true;

    var pusher_JS = new Pusher_JS('0eb480c8f3021ab3a60e', {
      cluster: 'eu'
    });
  
    var channel = pusher_JS.subscribe('channel-test');
    channel.bind('message', (data:any) => {
      setMessages([...messages, data.message.message]);
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
      <p>CHAT</p>
      <Content style={{paddingTop: '10vh'}}>
        {messages.map(message => {
            return (<p style={{margin: '2em'}}>{message}</p>)
          })}
      </Content>
      <Content style={{position: 'absolute', width:'500px', margin:'auto', padding:0, top:'90%'}}>
        <Form
          name="basic"
          onFinish={sendMessage}
          //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Type message"
            name="message"
            rules={[{ message: 'You can send a message here!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Envoyer
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
