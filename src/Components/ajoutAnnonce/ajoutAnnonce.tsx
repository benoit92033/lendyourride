import { Button, Checkbox, Form, Input, InputNumber, Modal, Upload, Select } from "antd";
import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import db from '../../firebase.js';
import ImageUploader from 'react-images-upload';
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface Props {
  addBien : boolean;
  setAddBien: React.Dispatch<React.SetStateAction<boolean>>;
}

/*function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}*/

export const AjoutAnnonce = ({ addBien, setAddBien }: Props) => {

  const { Option } = Select;

  const onFinish = (values: any) => {

    console.log(images);

    db.collection('products').add({
      description: values.description,
      localisation: {
        ville: values.ville,
      },
      photo: "https://cdn.motor1.com/images/mgl/gp1Em/s1/land-rover-range-rover-sport-2021.jpg",
      tarif: values.prix,
      titre: values.title,
      type: values.type,
    });
    setAddBien(false);
  };

  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <>
      <Modal
        title="Louer mon véhicule"
        centered
        visible={addBien}
        width={1000}
        onCancel={() => setAddBien(false)}
        footer={[
          <Button key="back" onClick={() => setAddBien(false)}>
            Retour
          </Button>,
        ]}
      >
      <Form className="formAddBien" name="nest-messages" onFinish={onFinish}>
        <Form.Item name={'title'} label="Titre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'type'} label="Type de véhicule" rules={[{ required: true }]}>
          <Select style={{ width: 120 }}>
            <Option value="Voiture">Voiture</Option>
            <Option value="Moto">Moto</Option>
            <Option value="Caravane">Caravane</Option>
            <Option value="Autre">Autre</Option>
          </Select>
        </Form.Item>
        <Form.Item name={'ville'} label="Ville" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <div style={{display: 'flex'}}>
          <Form.Item label="Prix :" name='prix' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <span style={{margin: '5px'}} className="ant-form-text"> euros</span>
        </div>
      
        <Form.Item name={'description'} label="Description">
          <Input.TextArea />
        </Form.Item>

        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
          {({imageList, onImageUpload, onImageRemove, isDragging, dragProps}) => (
            <div className="upload__image-wrapper">
              <button style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>
                Cliquer ou glisser ici
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageRemove(index)}>Supprimer la photo</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Publier
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};
