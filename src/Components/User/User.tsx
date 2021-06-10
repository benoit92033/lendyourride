import React, {useState, useEffect} from 'react';
import { Button, Row, Form, Input, InputNumber, Modal, Col } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import db from '../../firebase.js';
import { Bien } from '../Bien';
import { Annonce } from '../Annonce';

interface Props {
    user : boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const User = ({ user, setUser }: Props) => {

  const [bien, setBien] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [seeBien, setSeeBien] = useState();
  const [editBien, setEditBien] = useState(false);

  const fetchData = async () => {
    const snapshot = await db.collection('products')
      //.where('user', '==', user.id)
      .get();
    let arr: Array<any>;
    arr = [];
    snapshot.forEach((doc) => {
      let bien = doc.data()
      bien.bienId = doc.id
      arr.push({doc: bien})
    });
    setBien(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delBien = (bienId: any) => {
    console.log(bienId);
    db.collection('products').doc(bienId).delete().then(()=> {
      fetchData();
    });
  };

  return (
    <>
      <Modal 
        title='Mon Compte'
        centered
        visible={user}
        width={2000}
        onCancel={() => setUser(false)}
        footer={[
          <Button key="back" onClick={() => setUser(false)}>
            Quitter
          </Button>,
        ]}>
        <h2>Mes informations</h2>
        <h2>Mes biens</h2>
        <Col style={{display: 'inline-block'}}>
          {bien.length != 0 ?
            bien.map(bien => {
              return (
                <Row className="tablebien">
                  <span style={{width: '400px'}}>{bien.doc.titre}</span>
                  <span onClick={() => {setVisible(true); setSeeBien(bien.doc.bienId) }} style={{color: '#DB33FF'}}><EyeOutlined/></span>
                  <span onClick={() => {setEditBien(true); setSeeBien(bien.doc.bienId) }} style={{color: '#007bff'}}><EditOutlined/></span>
                  <span onClick={() => delBien(bien.doc.bienId)} style={{color: 'red'}}><DeleteOutlined/></span>
                  {seeBien && bien.doc.bienId == seeBien ?
                    <Bien data={{
                      Location: bien.doc.localisation.ville, 
                      Title: bien.doc.titre,
                      Type: bien.doc.type,
                      Tarif: bien.doc.tarif,
                      Photo: bien.doc.photo,
                      Description: bien.doc.description,
                      ProductId: bien.doc.bienId,
                    }} visible={visible} setVisible={setVisible}/> :
                    null
                  }

                  {editBien && bien.doc.bienId == seeBien ? 
                    <Annonce addBien={editBien} setAddBien={setEditBien} updateBien={fetchData()}
                      data={{
                        Location: bien.doc.localisation.ville, 
                        Title: bien.doc.titre,
                        Type: bien.doc.type,
                        Tarif: bien.doc.tarif,
                        Photo: bien.doc.photo,
                        Description: bien.doc.description,
                        ProductId: bien.doc.bienId
                      }}
                    /> : null
                  }
                </Row>);
            }) : <p style={{marginRight: "10px"}}>Vous n'avez aucun bien.</p> }
        </Col>

        <h2>Mes réservations</h2>
      </Modal>
    </>
  );
};