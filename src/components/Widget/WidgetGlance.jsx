import React from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';

import './WidgetGlance.scss';
const WidgetGlance = ({ data }) => {
  return (
    <>
      <Row>
        {data?.map((widget) => (
          <Col
            xs="6"
            sm="6"
            xl="3"
            key={Math.random() + widget.value + Date.now()}
            lg="6"
            className="widgetGlance"
          >
            <Link to={widget?.url ? widget?.url : '#'}>
              <Col sm="12">
                <Card className="o-hidden">
                  <CardBody className="bg-custom b-r-4 card-body">
                    <div className="media static-top-widget">
                      <div className="align-self-center ">
                        <widget.icon />
                      </div>
                      <div className="media-body">
                        <span className="m-0">{widget.title}</span>
                        <h4 className="mb-0 counter">
                          {/* <CountUp end={widget.value} /> */}
                          <div>{widget.value}</div>
                        </h4>
                        {/* <widget.icon className="icon-bg" /> */}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WidgetGlance;
