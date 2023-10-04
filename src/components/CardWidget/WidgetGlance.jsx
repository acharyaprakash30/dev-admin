import React from 'react';
import { Button, Col, Row } from 'reactstrap';

const WidgetGlance = ({ data }) => {

  return (
    <>
      <Row>
        {data?.map((widget) => (
          <Col md="6" lg="6" xl="3" className="box-col-6" >
            <div className="pricingtable">
              <div className="pricingtable-header">
                <h3 className="title"> {widget.title} </h3>
              </div>
              <div className="price-value">
                <span className="currency">{'$'}</span>
                <span className="amount">{widget.price}</span>
                <span className="duration"> \{widget.plan}</span>
              </div>
              <ul className="pricing-content">
                <li>{widget.advantage}</li>

              </ul>
              <div className="pricingtable-signup">
                <Button color="primary" size="lg">
                  Purchase
                      </Button>
              </div>
            </div>
          </Col>


        ))}
      </Row>
    </>
  );
};

export default WidgetGlance;
