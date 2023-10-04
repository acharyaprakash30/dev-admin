import React from 'react';
import CountUp from 'react-countup';
import { Database, MessageCircle, ShoppingBag, UserPlus } from 'react-feather';
import { Card, CardBody, CardFooter, CardHeader, Col, Media, Row } from 'reactstrap';
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
        {data?.map((widget) => (
          
          <Col md="6" lg="6" xl="4" className="box-col-6" >
          <Card className="custom-card plans__usercardbody">
         
            <div className="card-profile">
              <Media
                body
                className="rounded-circle"
                src={require('../../assets/images/user/1.jpg')}
                alt=""
              />
            </div>
           
            <div className="text-center profile-details">
              <h4>{widget.Name}</h4>
              <h6>{widget.Plan}</h6>
            </div>
            <CardFooter className="row">
              <Col sm="6 col-6">
                <h6>Total Product</h6>
                <h3>
                <CountUp end={widget.TotalProducts} />
                </h3>
                
              </Col>
              <Col sm="6 col-6">
                <h6>Sold Product</h6>
                <h3>
                <CountUp end={widget.SoldProducts} />
                 
                </h3>
              </Col>
              
            </CardFooter>
          </Card>
        </Col>
     
        ))}
      </Row>
    </>
  );
};

export default WidgetGlance;
