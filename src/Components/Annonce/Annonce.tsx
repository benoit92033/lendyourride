import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import db from '../../firebase.js';
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface Props {
  addBien : boolean;
  data: {Title: string | undefined, Location: string | undefined, Type: string | undefined, Tarif: number | undefined, Photo: string | undefined, Description: string | undefined, ProductId: string | undefined} | undefined;
  setAddBien: React.Dispatch<React.SetStateAction<boolean>>;
  cUser: any;
}

export const Annonce = ({ addBien, setAddBien, data, cUser }: Props) => {

  const { Option } = Select;

  const onFinish = (values: any) => {
    if (image != undefined) {
      db.app.storage().ref('images/' + image.name).put(image).then(()=> {
        db.app.storage().ref('images').child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
          db.collection('products').add({
            description: values.description,
            localisation: {
              ville: values.ville,
            },
            photo: fireBaseUrl,
            tarif: values.prix,
            titre: values.title,
            type: values.type,
            user: cUser.currentUser.private.email,
          });
        })
      })
      setAddBien(false);
    } else if (data != undefined) {
      db.collection('products').doc(data.ProductId).update({
        description: values.description,
        localisation: {
          ville: values.ville,
        },
        tarif: values.prix,
        titre: values.title,
        type: values.type,
        user: cUser.currentUser.private.email,
      });
      setAddBien(false);
    }
  };

  const [image, setImage] = useState<File>();
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(false);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType) => {
    if (imageList.length != 0) {
      setImage(imageList[0].file as File);
    } else {
      setImage(undefined);
    }
    setImages(imageList as never[]);
  };

  useEffect(() => {
    if (data != undefined) {
      setEdit(true)
      if (data.Photo != undefined) {
        let image = {
          dataURL: data.Photo
        }
        setImages([image] as never[]);
      }
    }
  }, []);

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
      <Form className="formAddBien" name="nest-messages" onFinish={onFinish} 
        initialValues={{
          title: data?.Title,
          type: data?.Type,
          prix: data?.Tarif,
          description: data?.Description,
          ville: data?.Location,
        }}
      >
        <Form.Item name={'title'} label="Titre" rules={[{ required: true }]}>
          <Input defaultValue={data?.Title} />
        </Form.Item>
        <Form.Item name={'type'} label="Type de véhicule" rules={[{ required: true }]}>
          <Select defaultValue={data?.Type} style={{ width: 120 }}>
            <Option value="Voiture">Voiture</Option>
            <Option value="Moto">Moto</Option>
            <Option value="Caravane">Caravane</Option>
            <Option value="Autre">Autre</Option>
          </Select>
        </Form.Item>
        <Form.Item name={'ville'} label="Ville" rules={[{ required: true }]}>
          <Input defaultValue={data?.Location} />
        </Form.Item>
        
        <div style={{display: 'flex'}}>
          <Form.Item label="Prix :" name='prix' rules={[{ required: true }]}>
            <InputNumber defaultValue={data?.Tarif} min={0} />
          </Form.Item>
          <span style={{margin: '5px'}} className="ant-form-text"> euros</span>
        </div>
      
        <Form.Item name={'description'} label="Description" rules={[{ required: true }]}>
          <Input.TextArea defaultValue={data?.Description} />
        </Form.Item>

        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
          {({imageList, onImageUpload, onImageRemove, isDragging, dragProps}) => (
            <div className="upload__image-wrapper">
              {imageList.length == 0 ?
              <button style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>
                Cliquez pour ajouter une image ou glisser une image ici
              </button> : null}
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" />
                  <Button className="image-btn-del" type="primary" danger onClick={() => onImageRemove(index)}>
                    <DeleteOutlined />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>

        <Form.Item>
          {edit ?
            <Button type="primary" htmlType="submit">
              Editer
            </Button> : 
            <Button type="primary" htmlType="submit">
              Publier
            </Button> 
          }
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};
