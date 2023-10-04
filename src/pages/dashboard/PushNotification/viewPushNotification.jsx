import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';

const ListPushNotification = ({props})=>{

    return (
        <>
        <Row>
        <Col className="col-sm-8" style={{marginTop:'50px'}}>
              <div className='border'>
              <h6 className='p-3'>All Notifications</h6>
              </div>
        </Col>
        </Row>
        </>

    )
}
export default ListPushNotification;