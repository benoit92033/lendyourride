import React, {useState, useEffect} from 'react';
import { Button, Modal, Row, Col } from "antd";
import db from '../../firebase.js';
import './Admin.style.css';

interface Props {
    admin : boolean;
    setAdmin: (value: boolean) => void;
}

export const Admin = ({ admin, setAdmin }: Props) => {

  const [avis, setData] = useState<any[]>([]);

  const fetchData = async () => {
    // Promise.resolve(db.collection('reviews')
    //   .where('status', '==', 'pending').get()).then((snapshot)=>{
    //     let arr: Array<any>;
    //     arr = [];
    //     snapshot.forEach((doc) => {
    //       let aviss = doc.data()
    //       aviss.avisId = doc.id
    //       arr.push({doc: aviss})
    //     });
    //     setData(arr);
    //   });
  };

  const approveAvis = (avisId: any, approve: boolean) => {
    let doc = db.collection('reviews').doc(avisId);
    let status = '';
    if (approve) {
        status = 'approved'
    } else {
        status = 'refused'
    }
    doc.update({
      status: status
    });
  };

  useEffect(() => {
    fetchData();
  }, [admin, avis]);


  return (
    <>
      <Modal 
        title='Administration du site'
        centered
        visible={admin}
        width={2000}
        onCancel={() => setAdmin(false)}
        footer={[
          <Button key="back" onClick={() => setAdmin(false)}>
            Quitter
          </Button>,
        ]}>

        <h2>Gestion des avis</h2>
        <Row>
            {avis.length !== 0 ?
                avis.map(avi => {
                    var date = new Date(avi.doc.date.seconds * 1000);
                    var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                    var year = date.getFullYear();
                    var month = months[date.getMonth()];
                    var day = date.getDate();
                    return(
                        <Col className="avis">
                            <p>{avi.doc.user?.prenom + ' : ' + day + ' ' + month + ' ' + year}</p>
                            <p>Titre: {avi.doc.titre}</p>
                            <p>Contenu: {avi.doc.contenu}</p>
                            <p>Note: {avi.doc.note}</p>
                            <Button onClick={() => approveAvis(avi.doc.avisId, false)} style={{backgroundColor: '#dc3545', color: 'white', borderRadius: '5px' }}>
                                Refuser
                            </Button>
                            <Button type="primary" onClick={() => approveAvis(avi.doc.avisId, true)} style={{borderRadius: '5px'}}>
                                Approuver
                            </Button>
                        </Col>
                    );
                }) : <p style={{marginRight: "10px"}}>Aucun avis.</p> }
        </Row>
      </Modal>
    </>
  );
};
