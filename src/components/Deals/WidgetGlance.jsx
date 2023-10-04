import React from 'react';
import CountUp from 'react-countup';
import { Database, MessageCircle, ShoppingBag, UserPlus } from 'react-feather';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import {
  Earnings,
  Messages,
  NewUser,
  Products,
  Shopping,
} from '../../constant';

const WidgetGlance = ({ data }) => {

  return (
    <>
      <Row>
        {data?.map((widget,index) => (
     <Col md="6" lg="6" xl="2" key={`widget-${widget}-${index}`} className="box-col-6" >
                  
                    
            <div className="product-box">
              <div className="product-img">
       
       <img
         className="img-fluid "
         src={require('../../assets/images/user/10.jpg')}
         alt="" 
       />
      
     </div>
     <div className="product-details">
       <div className="rating">
         <i className="fa fa-star"></i>
         <i className="fa fa-star"></i>
         <i className="fa fa-star"></i>
         <i className="fa fa-star"></i>
         <i className="fa fa-star"></i>
       </div>
       <h4
        
         className="font-primary"
       >
         name
       </h4>
       <p>note</p>
       <div className="product-price">
         200
         <del>
             800
         </del>
       </div>
     </div>
   </div>

                </Col>
                
         
        ))}
      </Row>
    </>
  );
};

export default WidgetGlance;
 