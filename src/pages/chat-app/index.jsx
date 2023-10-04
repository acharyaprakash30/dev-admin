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
import './style.css';
const ChatBubble = ({ message, isSender }) => {
    return (
      <>
      <Row>
      <Col className="col-sm-8" style={{marginTop:'110px'}}>
            <div className='border'>
            <h6 className='p-3'>Messages</h6>
            </div>
      </Col>

      <Col className="col-sm-4 border p-3" style={{fontSize:'10px',marginTop:'20px'}}>
        
        <h6 className='text-center mb-5'>All Message</h6>
            <a className="media mb-1">
              <img
              style={{width:'50px'}}
                className="img-fluid rounded-circle mr-3"
                src={require('../../assets/images/user/1.jpg')}
                alt=""
              />
              
              <div className="media-body">
                <span style={{fontWeight:'bold'}}>Simpson Thomas</span>
                <p style={{fontSize:'8px',fontWeight:'bold'}}>{'Message content...'}</p>
              </div>
              <p className="f-12 font-success mr-3 small">{'58 mins ago'}</p>
            </a>
            <a className="media mb-1">
              <img
              style={{width:'50px'}}
                className="img-fluid rounded-circle mr-3"
                src={require('../../assets/images/user/1.jpg')}
                alt=""
              />
              
              <div className="media-body">
                <span style={{fontWeight:'bold'}}>Simpson Thomas</span>
                <p style={{fontSize:'8px',fontWeight:'bold'}}>{'Message content...'}</p>
              </div>
              <p className="f-12 font-success mr-3 small">{'58 mins ago'}</p>
            </a>
            <a className="media mb-1">
              <img
              style={{width:'50px'}}
                className="img-fluid rounded-circle mr-3"
                src={require('../../assets/images/user/1.jpg')}
                alt=""
              />
              
              <div className="media-body">
                <span style={{fontWeight:'bold'}}>Simpson Thomas</span>
                <p style={{fontSize:'8px',fontWeight:'bold'}}>{'Message content...'}</p>
              </div>
              <p className="f-12 font-success mr-3 small">{'58 mins ago'}</p>
            </a>
            
            
            
      </Col>
      </Row>
      
      </>
    );
  };
  
  export default ChatBubble;