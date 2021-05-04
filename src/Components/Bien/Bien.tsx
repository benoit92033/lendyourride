import { Button, Modal, Row, Form, Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { Avis } from '../Avis';

interface Props {
  data: {Title: string | undefined, Location: string | undefined, Type: string | undefined, Tarif: number | undefined, Photo: string | undefined, Description: string | undefined};
  visible : boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Bien = ({ data, visible, setVisible }: Props) => {

  const avis = ([
    {Date: "01/05/2021", Title: "Mouais", Content: "C'est pas ouf", Note: 3},
    {Date: "05/04/2021", Title: "Trop cool", Content: "Chanmé la bagnole des keufs", Note: 5},
    {Date: "06/05/2021", Title: "Nul", Content: "Gneu gneu gneu c'est de la merde", Note: 1},
  ])

  const [showFormAvis, setFormAvis] = useState(false);

  const addAvis = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Modal
        title={data.Title}
        centered
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Retour
          </Button>,
          <Button key="submit" type="primary" onClick={() => setVisible(false)}>
            Réserver
          </Button>,
        ]}
      >
        <p>Titre : {data.Title}</p>
        <p>Localisation : {data.Location}</p>
        <p>Type : {data.Type}</p>
        <p>Tarif : {data.Tarif}</p>
        <p>Photo : {data.Photo}</p>
        <p>Description : {data.Description}</p>

        <div>
          <h2>Avis</h2>
          <Row>
            {avis.map(avi => {
              <Avis data={{ 
                Date: avi.Date,
                Title: avi.Title,
                Content: avi.Content,
                Note: avi.Note,
              }}/>
            })}
            {showFormAvis ? 
              <Form onFinish={addAvis}>
                <Form.Item label="Titre :" name="title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Contenu :" name="content" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Note :" rules={[{ required: true, min: 1, max: 5 }]}>
                  <InputNumber />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Ajouter
                </Button>
              </Form> : 
              <Button type="primary" key="submit" onClick={() => setFormAvis(true) }>
                Rediger un avis
              </Button>}
          </Row>
        </div>
      </Modal>
    </>
  );
};
