import { Button, Modal, Row, Form, Input, InputNumber, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import db from '../../firebase.js';

interface Props {
  data: {Title: string | undefined, Location: string | undefined, Type: string | undefined, Tarif: number | undefined, Photo: string | undefined, Description: string | undefined, ProductId: number | undefined};
  visible : boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Bien = ({ data, visible, setVisible }: Props) => {

  const [avis, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const snapshot = await db.collection('reviews')
      .where('product', '==', data.ProductId)
      .get();
    let arr: Array<any>;
    arr = [];
    snapshot.forEach((doc) => {
      let avis = doc.data()
      avis.avisId = doc.id
      arr.push({doc: avis})
    });
    setData(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [showFormAvis, setFormAvis] = useState(false);

  const addAvis = (values: any) => {
    console.log("Success:", values);

    db.collection('reviews').add({
      contenu: values.content,
      date: {
        nanoseconds: 0,
        seconds: Date.now() / 1000 | 0,
      },
      note: values.note,
      product: data.ProductId,
      status: "pending",
      titre: values.title,
      // user: user.id
    }).then(()=> {
      fetchData();
    });

    
  };

  const approveAvis = (avisId: any) => {
    let doc = db.collection('reviews').doc(avisId);
    doc.update({
      status: 'approved'
    }).then(()=> {
      fetchData();
    });
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
        <img src={data.Photo} alt="" width="400px" />
        <p>Localisation : {data.Location}</p>
        <p>Type : {data.Type}</p>
        <p>Tarif : {data.Tarif}</p>
        <p>Description : {data.Description}</p>

        <div>
          <h2>Avis</h2>
          <Row>
            {avis.map(avi => {
              var date = new Date(avi.doc.date.seconds * 1000);
              var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
              var year = date.getFullYear();
              var month = months[date.getMonth()];
              var day = date.getDate();
              if (avi.doc.status == "approved") {
                return (
                  <Col className="avis">
                      <p>Date: {day + ' ' + month + ' ' + year}</p>
                      <p>Titre: {avi.doc.titre}</p>
                      <p>Contenu: {avi.doc.contenu}</p>
                      <p>Note: {avi.doc.note}</p>
                  </Col>);
              } else if (avi.doc.status == "pending") { //and ADMIN
                return (
                  <Col className="avisPending">
                      <p>Date: {day + ' ' + month + ' ' + year}</p>
                      <p>Titre: {avi.doc.titre}</p>
                      <p>Contenu: {avi.doc.contenu}</p>
                      <p>Note: {avi.doc.note}</p>
                      <Button type="primary" onClick={() => approveAvis(avi.doc.avisId)}>
                        Approuver
                      </Button>
                  </Col>);
              }
            })}
            {showFormAvis ? 
              <Form onFinish={addAvis}>
                <Form.Item label="Titre :" name="title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Contenu :" name="content" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Note :" name='note' rules={[{ required: true }]}>
                  <InputNumber min={1} max={5} />
                </Form.Item>
                <Button style={{marginRight: '5px'}} onClick={() => setFormAvis(false)}>
                  Annuler
                </Button>
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