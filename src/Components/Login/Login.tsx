import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Content } from "antd/lib/layout/layout";
import "./login.style.css";
import React, {useContext, useEffect, useState} from "react";
import { signInWithGoogle } from "../../firebase";
import { UserContext } from '../../Providers/UserProvider';
import { Redirect } from 'react-router-dom';

interface Props {
  setToken: React.Dispatch<React.SetStateAction<undefined>>;
}
export const Login = ({ setToken }: Props) => {

  /*const user = useContext(UserContext)
  const [redirect, setredirect] = useState(null)

  useEffect(() => {
    if (user) {
      setredirect('/')
    }
  }, [user])
  if (redirect) {
    <Redirect to={redirect}/>
  }*/

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <Content
          style={{
            position: "absolute",
            height: "500px",
            width: "500px",
            margin: "auto",
            padding: 0,
            top: "50vh",
          }}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
      </div>
    </>
  );
};
