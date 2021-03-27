import { Button, Modal } from 'antd';
import React from 'react';

interface Props {
  data: {Title: string | undefined, Location: string | undefined};
  visible : boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Bien = ({ data, visible, setVisible }: Props) => {

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
      </Modal>
    </>
  );
};
