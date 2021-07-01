import { Button, Modal, Row, Form, Input, InputNumber, Col, DatePicker, Space, Image, Descriptions, Divider, List, Comment, Badge, Typography, ConfigProvider, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import db from '../../firebase.js';
import './Bien.style.css'
import { StarOutlined } from '@ant-design/icons';

const {Text} = Typography;

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
  const [showFormAvis, setFormAvis] = useState(false);

  useEffect(() => {
    Promise.resolve(db.collection('reviews')
      .where('product.id', '==', data.ProductId)
      .get()).then((snapshot) => {
        let arr: Array<any>;
        arr = [];
        snapshot.forEach((doc) => {
          let avis = doc.data()
          avis.avisId = doc.id
          arr.push({doc: avis})
        });
        setData(arr);;
        if (cUser.currentUser != null) {
          setUserLoged(true);
          if (cUser.currentUser.private.email === data.User.email) {
            setUserLoged(false);
          }
        }

      }

      )
  }, [cUser.currentUser, data.ProductId, data.User.email, showFormAvis]);

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
    if (date[0] !== undefined && date[1] !== undefined) {
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
            Terminer
          </Button>
        ]}
      >
        <div className="bien">
          <Image
            width={400}
            src={data.Photo}
            className="imgBien"
          />
          <Descriptions
            className="descBien"
            bordered
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Vendeur">{data.User.prenom}</Descriptions.Item>
            <Descriptions.Item label="Localisation">{data.Location}</Descriptions.Item>
            <Descriptions.Item label="Type">{data.Type}</Descriptions.Item>
            <Descriptions.Item label="Tarif">{data.Tarif} €</Descriptions.Item>
            <Descriptions.Item label="Description">{data.Description}</Descriptions.Item>
          </Descriptions>
        </div>
        {userLoged ? ( showFormReservation ? <div>
              <h2>Réservation</h2>
              <Form onFinish={setReservation}>
                <Row>
                  <Col>
                    <Form.Item label="Période de réservation :">
                      <Space direction="vertical" size={12}>
                        <RangePicker name="date" allowClear onChange={(date) => dateChange(date)}/>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Text>Tarif total : </Text>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col>
                    <Button onClick={() => setFormReservation(false)}>
                      Annuler
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Valider
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>  :
          <Button key="submit" type="primary" onClick={() => setFormReservation(true)}>
            Réserver
          </Button>) : null}
        
        <Divider />

        <div>
            <h2>Avis</h2>
            {showFormAvis ? 
              <Form onFinish={addAvis} 
              layout="vertical">
                <Row gutter={16}>
                  <Col span={20}>
                    <Form.Item className="formItem" label="Titre :" name="title" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item className="formItem" label="Note :" name='note' rules={[{ required: true }]}>
                      <InputNumber min={1} max={5} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col flex={1}>
                    <Form.Item className="formItem" label="Contenu :" name="content" rules={[{ required: true }]}>
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col>
                    <Button onClick={() => setFormAvis(false)}>
                      Annuler
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Ajouter
                    </Button>
                  </Col>
                </Row>
              </Form> : 
                userLoged ?
                <Button type="primary" key="submit" onClick={() => setFormAvis(true) }>
                  Rediger un avis
                </Button> : null}
            
            <ConfigProvider
              renderEmpty={() => (
                <Empty
                  description="Aucun avis sur ce bien"
                />
              )}>
              <List
                header={avis.map((data => data.doc.status === "approved")).length > 0 ? avis.map(data => data.doc.status === "approved").length + " avis" : null}
                itemLayout="horizontal"
                dataSource={avis}
                renderItem={item => (
                  <List.Item>
                    {
                      userLoged && cUser.currentUser.private.email === item.doc.user.email ?

                      <Badge.Ribbon text={item.doc.status === "pending" ? "En attente" : (item.doc.status === "refused" ? "Réfusé" : "Validé")} color={item.doc.status === "pending" ? "blue" : (item.doc.status === "refused" ? "red" : "green")}>
                        <Comment
                          author={<Text>{item.doc.user.prenom + ' : ' + item.doc.titre}</Text>}
                          content={item.doc.contenu}
                          datetime={new Date(item.doc.date.seconds * 1000).toLocaleString()}
                          avatar={<>{item.doc.note} <StarOutlined /></>}
                        />
                      </Badge.Ribbon>
                     :
                     (item.doc.status === "approved" ? 
                     <Comment
                          author={<Text>{item.doc.user.prenom + ' : ' + item.doc.titre}</Text>}
                          content={item.doc.contenu}
                          datetime={new Date(item.doc.date.seconds * 1000).toLocaleString()}
                          avatar={<>{item.doc.note} <StarOutlined /></>}
                        /> : null)
                    }
                  </List.Item>
                )}
              />
            </ConfigProvider>
          </div>
      </Modal>
    </>
  );
};