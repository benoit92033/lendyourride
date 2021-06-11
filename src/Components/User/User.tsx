import React, {useState, useEffect} from 'react';
import { Button, Row, Form, Input, InputNumber, Modal, Col } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import db from '../../firebase.js';
import { Bien } from '../Bien';
import { Annonce } from '../Annonce';

interface Props {
  myAccount : boolean;
  setMyAccount: React.Dispatch<React.SetStateAction<boolean>>;
  cUser: any;
}

export const User = ({ myAccount, setMyAccount, cUser }: Props) => {

  const [visible, setVisible] = useState(false);

  const [bien, setBien] = useState<any[]>([]);
  const [detailBien, setDetailBien] = useState();
  const [editBien, setEditBien] = useState(false);

  const [myRent, setMyRent] = useState<any[]>([]);
  const [bienRent, setBienRent] = useState<any[]>([]);
  const [avis, setAvis] = useState<any[]>([]);

  const [seeBien, setSeeBien] = useState(false);
  const [seeMyRent, setSeeMyRent] = useState(false);
  const [seeRent, setSeeRent] = useState(false);
  const [seeAvis, setSeeAvis] = useState(false);

  const fetchData = async () => {
    if (cUser !== false) {
      const productsSnapshot = await db.collection('products').where('user.email', '==', cUser.currentUser.private.email).get();
      let arr: Array<any>;
      arr = [];
      productsSnapshot.forEach((doc) => {
        let bien = doc.data()
        bien.bienId = doc.id
        arr.push({doc: bien})
      });
      setBien(arr);

      const mySalesSnapshot = await db.collection('sales').where('buyer.email', '==', cUser.currentUser.private.email).get();
      arr = [];
      mySalesSnapshot.forEach((doc) => {
        let sale = doc.data()
        sale.saleId = doc.id
        arr.push({doc: sale})
      });
      setMyRent(arr);

      const salesSnapshot = await db.collection('sales').where('seller.email', '==', cUser.currentUser.private.email).get();
      arr = [];
      salesSnapshot.forEach((doc) => {
        let sale = doc.data()
        sale.saleId = doc.id
        arr.push({doc: sale})
      });
      setBienRent(arr);

      const avisSnapshot = await db.collection('reviews').where('user.email', '==', cUser.currentUser.private.email).get();
      arr = [];
      avisSnapshot.forEach((doc) => {
        let avis = doc.data()
        avis.avisId = doc.id
        arr.push({doc: avis})
      });
      setAvis(arr);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delBien = (bienId: any) => {
    db.collection('products').doc(bienId).delete().then(()=> {
      fetchData();
    });
  };

  const delSale = (saleId: any) => {
    db.collection('sales').doc(saleId).delete().then(()=> {
      fetchData();
    });
  };

  const delAvis = (avisId: any) => {
    db.collection('reviews').doc(avisId).delete().then(()=> {
      fetchData();
    });
  };

  return (
    <>
      <Modal 
        title='Mon Compte'
        centered
        visible={myAccount}
        width={2000}
        onCancel={() => setMyAccount(false)}
        footer={[
          <Button key="back" onClick={() => setMyAccount(false)}>
            Quitter
          </Button>,
        ]}>
        <h2>Mes informations</h2>
        <div style={{display: 'flex', marginBottom: '20px'}}>
          <img style={{marginRight: '10px', width: '100px', height: '100px', borderRadius: '50%'}} src={cUser.currentUser.public.photo} alt="" />
          <div>
            <p>Email : {cUser.currentUser.private.email}</p>
            <p>Téléphone : {cUser.currentUser.private.telephone}</p>
            <p>Prénom : {cUser.currentUser.public.prenom}</p>
          </div>
        </div>

        {seeBien ?
          <div>
            <h2 onClick={() => setSeeBien(false)} style={{marginTop: '25px'}}>Mes biens &nbsp;&nbsp;<UpOutlined/></h2>
            <Col style={{display: 'inline-block'}}>
              {bien.length !== 0 ?
                bien.map(bien => {
                  return (
                    <Row className="tablebien">
                      <span style={{width: '400px'}}>{bien.doc.titre}</span>
                      <span onClick={() => {setVisible(true); setDetailBien(bien.doc.bienId) }} style={{color: '#DB33FF'}}><EyeOutlined/></span>
                      <span onClick={() => {setEditBien(true); setDetailBien(bien.doc.bienId) }} style={{color: '#007bff'}}><EditOutlined/></span>
                      <span onClick={() => delBien(bien.doc.bienId)} style={{color: 'red'}}><DeleteOutlined/></span>
                      {visible && bien.doc.bienId === detailBien ?
                        <Bien cUser={cUser} data={{
                          Location: bien.doc.localisation.ville, 
                          Title: bien.doc.titre,
                          Type: bien.doc.type,
                          Tarif: bien.doc.tarif,
                          Photo: bien.doc.photo,
                          Description: bien.doc.description,
                          ProductId: bien.doc.bienId,
                          User: {
                            email: bien.doc.user.email,
                            prenom: bien.doc.user.prenom,
                          },
                        }} visible={visible} setVisible={setVisible}/> :
                        null
                      }

                      {editBien && bien.doc.bienId === detailBien ? 
                        <Annonce addBien={editBien} setAddBien={setEditBien} cUser={cUser}
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
          </div> : <h2 onClick={() => setSeeBien(true)} style={{marginTop: '25px'}}>Mes biens &nbsp;&nbsp;<DownOutlined/></h2>
        }

        {seeMyRent ?
          <div>
            <h2 onClick={() => setSeeMyRent(false)} style={{marginTop: '50px'}}>Mes réservations &nbsp;&nbsp;<UpOutlined/></h2>
            <Col style={{display: 'inline-block'}}>
              {myRent.length !== 0 ?
                myRent.map(rent => {
                  var date = new Date(rent.doc.startDate * 1000);
                  var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                  var startDate = date.getDate() + ' ' +  months[date.getMonth()] + ' ' + date.getFullYear();
                  date = new Date(rent.doc.endDate * 1000);
                  var endDate = date.getDate() + ' ' +  months[date.getMonth()] + ' ' + date.getFullYear();
                  return (
                    <Row className="tablebien">
                      <span style={{width: '300px'}}>{rent.doc.product.titre + ' de ' + rent.doc.seller.prenom}</span>
                      <span style={{width: '400px'}}>Dates : du {startDate} au {endDate}</span>
                      <span onClick={() => delSale(rent.doc.saleId)} style={{color: 'red'}}><DeleteOutlined/></span>
                    </Row>);
                }) : <p style={{marginRight: "10px"}}>Vous n'avez aucune réservation.</p> }
            </Col>
          </div> : <h2 onClick={() => setSeeMyRent(true)} style={{marginTop: '25px'}}>Mes réservations &nbsp;&nbsp;<DownOutlined/></h2>
        }

        {seeRent ?
          <div>
            <h2 onClick={() => setSeeRent(false)} style={{marginTop: '50px'}}>Réservations de mes véhicules &nbsp;&nbsp;<UpOutlined/></h2>
            <Col style={{display: 'inline-block'}}>
              {bienRent.length !== 0 ?
                bienRent.map(rent => {
                  var date = new Date(rent.doc.startDate * 1000);
                  var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                  var startDate = date.getDate() + ' ' +  months[date.getMonth()] + ' ' + date.getFullYear();
                  date = new Date(rent.doc.endDate * 1000);
                  var endDate = date.getDate() + ' ' +  months[date.getMonth()] + ' ' + date.getFullYear();
                  return (
                    <Row className="tablebien">
                      <span style={{width: '300px'}}>{rent.doc.product.titre}</span>
                      <span style={{width: '400px'}}>Dates : du {startDate} au {endDate}</span>
                      <span onClick={() => delSale(rent.doc.saleId)} style={{color: 'red'}}><DeleteOutlined/></span>
                    </Row>);
                }) : <p style={{marginRight: "10px"}}>Aucun de vos véhicules n'a été loué.</p> }
            </Col>
          </div> : <h2 onClick={() => setSeeRent(true)} style={{marginTop: '25px'}}>Réservations de mes véhicules &nbsp;&nbsp;<DownOutlined/></h2>
        }

        {seeAvis ?
          <div>
            <h2 onClick={() => setSeeAvis(false)} style={{marginTop: '50px'}}>Mes avis &nbsp;&nbsp;<UpOutlined/></h2>
            <Row style={{display: 'flex'}}>
              {avis.length !== 0 ?
                avis.map(avis => {
                  var date = new Date(avis.doc.date.seconds * 1000);
                  var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                  let avisdate = date.getDate() + ' ' +  months[date.getMonth()] + ' ' + date.getFullYear();
                  if (avis.doc.status === "approved") {
                    return (
                      <Col className="avis">
                          <p style={{fontWeight: 'bold', fontSize: '18px'}}>Véhicule: {avis.doc.product.titre}</p>
                          <p>Date: {avisdate}</p>
                          <p>Titre: {avis.doc.titre}</p>
                          <p>Contenu: {avis.doc.contenu}</p>
                          <p>Note: {avis.doc.note}</p>
                          <p onClick={() => delAvis(avis.doc.avisId)}></p>
                      </Col>);
                  } else if (avis.doc.status === "pending") {
                    return (
                      <Col className="avis avisPending">
                          <p style={{fontWeight: 'bold', fontSize: '18px'}}>Véhicule: {avis.doc.product.titre}</p>
                          <p style={{fontWeight: 'bold'}}>Votre avis est en attente d'approbation</p>
                          <p>Date: {avisdate}</p>
                          <p>Titre: {avis.doc.titre}</p>
                          <p>Contenu: {avis.doc.contenu}</p>
                          <p>Note: {avis.doc.note}</p>
                          <p onClick={() => delAvis(avis.doc.avisId)}></p>
                      </Col>);
                  } else if (avis.doc.status === "refused") {
                    return (
                      <Col className="avis avisRefused">
                          <p style={{fontWeight: 'bold', fontSize: '18px'}}>Véhicule: {avis.doc.product.titre}</p>
                          <p style={{fontWeight: 'bold'}}>Votre avis a été refusé</p>
                          <p>Date: {avisdate}</p>
                          <p>Titre: {avis.doc.titre}</p>
                          <p>Contenu: {avis.doc.contenu}</p>
                          <p>Note: {avis.doc.note}</p>
                          <p onClick={() => delAvis(avis.doc.avisId)}></p>
                      </Col>);
                  }
                }) : <p style={{marginRight: "10px"}}>Vous n'avez rédiger aucun avis.</p> }
            </Row>
          </div> : <h2 onClick={() => setSeeAvis(true)} style={{marginTop: '25px'}}>Mes avis &nbsp;&nbsp;<DownOutlined/></h2>
        }
      </Modal>
    </>
  );
};