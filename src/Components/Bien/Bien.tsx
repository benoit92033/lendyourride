import { Button, Modal, Row, Form, Input, InputNumber, Col, DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import db from '../../firebase.js';

interface Props {
  data: {Title: string | undefined, Location: string | undefined, Type: string | undefined, Tarif: number | undefined, Photo: string | undefined, Description: string | undefined, ProductId: number | undefined};
  visible : boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Bien = ({ data, visible, setVisible }: Props) => {

  const { RangePicker } = DatePicker;
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
  const [showFormReservation, setFormReservation] = useState(false);

  const addAvis = (values: any) => {
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
    setFormAvis(false);
  };

  const setReservation = (values: any) => {
    console.log("Success:", values);
  };

  const dateChange = (date: any) => {
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
          !showFormReservation ?
          <Button key="submit" type="primary" onClick={() => setFormReservation(true)}>
            Réserver
          </Button> : null,
        ]}
      >
        <div style={{display: "flex", marginBottom: "50px"}}>
          <div className="descBien">
            <p><b>Localisation :</b> {data.Location}</p>
            <p><b>Type :</b> {data.Type}</p>
            <p><b>Tarif :</b> {data.Tarif} €</p>
            <p><b>Description :</b> {data.Description}</p>
          </div>
          <img className="imgBien" src={data.Photo} alt="" />
        </div>

        {showFormReservation ?  
          <div>
            <h2>Réservation</h2>
            <Form onFinish={setReservation}>
              <Form.Item label="Période de réservation :">
                <Space direction="vertical" size={12}>
                  <RangePicker name="date" onChange={(date) => dateChange(date)}/>
                </Space>
              </Form.Item>
              <p>Tarif total : </p>
              <Button type="primary" htmlType="submit">
                Valider
              </Button>
            </Form>
          </div> :

          <div>
            <h2>Avis</h2>
            <Row>
              {avis.length != 0 ?
                avis.map(avi => {
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
                  } else if (avi.doc.status == "pending") { // TODO SI C'EST L'AVIS DE L'UTILISATEUR QUI LA ECRIT
                    return (
                      <Col className="avis avisPending">
                          <p style={{fontWeight: 'bold'}}>Votre avis est en attente d'approbation</p>
                          <p>Date: {day + ' ' + month + ' ' + year}</p>
                          <p>Titre: {avi.doc.titre}</p>
                          <p>Contenu: {avi.doc.contenu}</p>
                          <p>Note: {avi.doc.note}</p>
                      </Col>);
                  } else if (avi.doc.status == "refused") { // TODO SI C'EST L'AVIS DE L'UTILISATEUR QUI LA ECRIT
                    return (
                      <Col className="avis avisRefused">
                          <p style={{fontWeight: 'bold'}}>Votre avis a été refusé</p>
                          <p>Date: {day + ' ' + month + ' ' + year}</p>
                          <p>Titre: {avi.doc.titre}</p>
                          <p>Contenu: {avi.doc.contenu}</p>
                          <p>Note: {avi.doc.note}</p>
                      </Col>);
                  }
                }) : <p style={{marginRight: "10px"}}>Aucun avis pour ce bien.</p> }
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
        }
      </Modal>
    </>
  );
};