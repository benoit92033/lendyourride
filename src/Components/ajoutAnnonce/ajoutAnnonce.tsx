import { Button, Checkbox, Form, Input, InputNumber, Modal, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";
import "./ajoutAnnonce.style.css";
import React, {useContext, useEffect, useState} from "react";
import { signInWithGoogle } from "../../firebase";
import { UserContext } from '../../Providers/UserProvider';
import { Redirect } from 'react-router-dom';


export const AjoutAnnonce = () => {

/*  const user = useContext(UserContext)
  
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

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        <Form name="nest-messages" onFinish={onFinish}>
          <Form.Item name={'title'} label="Title">
            <Input />
          </Form.Item>
          <Form.Item name={'type'} label="Type">
            <Input />
          </Form.Item>
          
          <Form.Item label="Prix">
          <Form.Item name={'prix'} noStyle>
            <InputNumber  />
          </Form.Item>
          <span className="ant-form-text"> euros</span>
        </Form.Item>
        
          <Form.Item name={['description']} label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Dragger">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Cliquez ou faites glisser le fichier dans cette zone pour télécharger.</p>
              <p className="ant-upload-hint">Prise en charge d'un téléchargement unique ou groupé.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Ajout cette image
          </Button>
        </Form.Item>

        <Form.Item >
            <Button type="primary" htmlType="submit">
              Publier
            </Button>
          </Form.Item>

        </Form>
        </Content>
      </div>
      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Login with Google</span>
       </button>
      </div>
    </>
  );
};
