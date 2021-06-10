import { Button, Modal, Row, Form, Input, InputNumber, Col, Alert, DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import db from '../../firebase.js';

interface Props {
  data: any;
  visible : boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cUser: any;
}

export const Bien = ({ data, visible, setVisible, cUser }: Props) => {

  const { RangePicker } = DatePicker;
  const [avis, setData] = useState<any[]>([]);
  const [userLoged, setUserLoged] = useState(false);

  const fetchData = async () => {
    const snapshot = await db.collection('reviews')
      .where('product.id', '==', data.ProductId)
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
    if (cUser.currentUser != null) {
      setUserLoged(true);
    }
  }, []);

  const [showFormAvis, setFormAvis] = useState(false);
  const [showFormReservation, setFormReservation] = useState(false);
  const [showReservationDone, setReservationDone] = useState(false);

  const addAvis = (values: any) => {
    db.collection('reviews').add({
      contenu: values.content,
      date: {
        nanoseconds: 0,
        seconds: Date.now() / 1000 | 0,
      },
      note: values.note,
      product: {
        description: data.Description,
        location: data.Location,
        tarif: data.Tarif,
        titre: data.Title,
        type: data.Type,
        id: data.ProductId,
      },
      status: "pending",
      titre: values.title,
      user: {
        email: cUser.currentUser.private.email,
        prenom: cUser.currentUser.public.prenom,
      }
    }).then(()=> {
      fetchData();
    });
    setFormAvis(false);
  };

  const [dateDebut, setDateDebut] = useState<any[]>([]);
  const [dateFin, setDateFin] = useState<any[]>([]);

  const setReservation = () => {
    db.collection('sales').add({
      buyer: {
        email: cUser.currentUser.private.email,
        prenom: cUser.currentUser.public.prenom,
      },
      seller: {
        email: data.User.email,
        prenom: data.User.prenom,
      },
      date: {
        nanoseconds: 0,
        seconds: Date.now() / 1000 | 0,
      },
      startDate: dateDebut,
      endDate: dateFin,
      product: {
        description: data.Description,
        location: data.Location,
        tarif: data.Tarif,
        titre: data.Title,
        type: data.Type,
      }
    }).then(()=> {
      setFormReservation(false);
      setReservationDone(true);
    });
  };

  const dateChange = (date: any) => {
    if (date[0] != undefined && date[1] != undefined) {
      setDateDebut(date[0].format('X'))
      setDateFin(date[1].format('X'))
    }
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
          userLoged ?
          !showFormReservation ?
          <Button key="submit" type="primary" onClick={() => setFormReservation(true)}>
            Réserver
          </Button> : null : null
        ]}
      >
        <div style={{display: "flex", marginBottom: "50px"}}>
          <div className="descBien">
            <p><b>Vendeur :</b> {data.User.prenom}</p>
            <p><b>Localisation :</b> {data.Location}</p>
            <p><b>Type :</b> {data.Type}</p>
            <p><b>Tarif :</b> {data.Tarif} €</p>
            <p><b>Description :</b> {data.Description}</p>
          </div>
          <img className="imgBien" src={data.Photo} alt="" />
        </div>

        {showReservationDone ?
          <div>
            <Alert style={{marginBottom: '20px'}} message="Réservation validée" type="success" />
          </div> : null
        }

        {showFormReservation ?  
          <div>
            <h2>Réservation</h2>
            <Form onFinish={setReservation}>
              <Form.Item label="Période de réservation :">
                <Space direction="vertical" size={12}>
                  <RangePicker name="date" onChange={(date) => dateChange(date)}/>
                </Space>
              </Form.Item>
              {/*<p>Tarif total : </p>*/}
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
                          <p>{avi.doc.user.prenom + ' : ' + day + ' ' + month + ' ' + year}</p>
                          <p>Titre: {avi.doc.titre}</p>
                          <p>Contenu: {avi.doc.contenu}</p>
                          <p>Note: {avi.doc.note}</p>
                      </Col>);
                  } else if (avi.doc.status == "pending" && userLoged && cUser.currentUser.private.email == avi.doc.user) {
                    return (
                      <Col className="avis avisPending">
                          <p style={{fontWeight: 'bold'}}>Votre avis est en attente d'approbation</p>
                          <p>{avi.doc.user.prenom + ' : ' + day + ' ' + month + ' ' + year}</p>
                          <p>Titre: {avi.doc.titre}</p>
                          <p>Contenu: {avi.doc.contenu}</p>
                          <p>Note: {avi.doc.note}</p>
                      </Col>);
                  } else if (avi.doc.status == "refused" && userLoged && cUser.currentUser.private.email == avi.doc.user) {
                    return (
                      <Col className="avis avisRefused">
                          <p style={{fontWeight: 'bold'}}>Votre avis a été refusé</p>
                          <p>{avi.doc.user.prenom + ' : ' + day + ' ' + month + ' ' + year}</p>
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
                userLoged ?
                <Button type="primary" key="submit" onClick={() => setFormAvis(true) }>
                  Rediger un avis
                </Button> : null}
            </Row>
          </div>
        }
      </Modal>
    </>
  );
};