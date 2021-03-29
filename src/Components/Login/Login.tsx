import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import './login.style.css';
import React from 'react';


interface Props {
  setToken: React.Dispatch<React.SetStateAction<undefined>>;
}
export const Login = ({setToken} : Props) => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <>
     <div style={{position: 'relative'}}>

      <Content style={{position: 'absolute', height: '500px', width:'500px', margin:'auto', padding:0, top:'50vh'}}>
        <Form 
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="loginContent">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
     </div>
    </>
  );
};
