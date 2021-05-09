import React, {useState, useEffect} from 'react';
import { Button, Form, Input, Modal, Row, Col } from "antd";
import db from '../../firebase.js';

interface Props {
    admin : boolean;
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Admin = ({ admin, setAdmin }: Props) => {

  const [avis, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const snapshot = await db.collection('reviews')
      .where('status', '==', 'pending').get();
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
    }).then(()=> {
      fetchData();
    });
  };

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
            {avis.length != 0 ?
                avis.map(avi => {
                    var date = new Date(avi.doc.date.seconds * 1000);
                    var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                    var year = date.getFullYear();
                    var month = months[date.getMonth()];
                    var day = date.getDate();
                    return(
                        <Col className="avis">
                            <p>Date: {day + ' ' + month + ' ' + year}</p>
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
