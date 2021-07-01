import { Button, Card, Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { WechatOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Bien } from '../Bien';
import { Chat } from '../Chat';
import './Page.style.css'
import db from '../../firebase';

const { Meta } = Card;

interface Props {
  setDisplayedData : (data : any[]) => void;
  displayedData : any[];
  cUser: any;
}

export const Page = ({setDisplayedData, displayedData, cUser} : Props) => {
  const [visible, setVisible] = useState(false);
  const [chat, setChat] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(1);

  function clickOnVisualisation(index: number) {
    setClickedIndex(index);
    setVisible(true);
  }
  
  const showChat = (value: boolean) => {
    setChat(value)
  }

  return (
    <>
      <Content>
        <Row gutter={{ xs: 0, sm: 8, md: 16, lg: 32 }}>
        {displayedData.length > 0 ? displayedData.map((row, index) => {
          if(row != null){
            return (
              <Col key={index} xs={24} md={12} xl={8} className="card">
                <Card
                  hoverable
                  style={{ width: 400, height:400 }}
                  cover={<img alt={row?.doc.titre} src={row?.doc.photo} />}
                  onClick={() => clickOnVisualisation(index)}
                  key={index}
                >
                  <Meta title={row?.doc.titre} description={row?.doc.localisation.ville} />
                </Card>
              </Col>
            )
          }
          return null
        }) : <p>Aucun résultat trouvé</p>}
        </Row>


        {visible && displayedData != null ?
          <Bien data={{
            Location: displayedData[clickedIndex]?.doc.localisation.ville, 
            Title: displayedData[clickedIndex]?.doc.titre,
            Type: displayedData[clickedIndex]?.doc.type,
            Tarif: displayedData[clickedIndex]?.doc.tarif,
            Photo: displayedData[clickedIndex]?.doc.photo,
            Description: displayedData[clickedIndex]?.doc.description,
            ProductId: displayedData[clickedIndex]?.doc.productId,
            User: {
              email: displayedData[clickedIndex]?.doc.user.email,
              prenom: displayedData[clickedIndex]?.doc.user.prenom,
            },
          }} visible={visible} setVisible={setVisible} cUser={cUser}/> :
          null
        }
        {
          chat ? 
          <Chat setChat={showChat}  cUser={cUser}/> : null
        }
        <Button type="primary" onClick={() => setChat(true)} className="buttonChat" >
          <WechatOutlined style={{fontSize: '40px'}}/>
        </Button>
      </Content>
    </>
  );
};
