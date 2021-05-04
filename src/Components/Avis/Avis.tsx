import { Col } from 'antd';
import React from 'react';

interface Props {
  data: {Date: string | undefined, Title: string | undefined, Content: string | undefined, Note: number | undefined};
}

export const Avis = ({ data }: Props) => {

  return (
    <>
      <Col>
        <div>
          <p>Date de publication : {data.Date}</p>
          <p>Titre : {data.Title}</p>
          <p>Description : {data.Content}</p>
          <p>Note : {data.Note}</p>
        </div>
      </Col>
    </>
  );
};
