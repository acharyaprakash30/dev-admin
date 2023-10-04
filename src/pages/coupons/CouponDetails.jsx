import React, { Fragment } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { supportData, supportColumns } from './couponDetailConfig';
import WidgetGlance from '../../components/Widget/WidgetGlance';
import { Paperclip } from 'react-feather';
import { GiTripleScratches, GiMoneyStack } from 'react-icons/gi';
import { FcExpired } from 'react-icons/fc';

const data = [
  {
    title: 'Issued Coupons',
    value: 45000,
    icon: Paperclip
  },
  {
    title: 'Redeemed Coupons',
    value: 20000,
    icon: GiTripleScratches
  },
  {
    title: 'Expired Coupons',
    value: 1200,
    icon: FcExpired
  },
  {
    title: 'Total Discounted',
    value: 50000,
    icon: GiMoneyStack
  },
]

const CouponDetails = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Coupons" title="Coupons Details" />
      <Container fluid={true}>
          <WidgetGlance data={data}/>
        <Row>
          <Col sm="12">
            <Card className="p-0">
              <CardHeader>
                <h5>{'Coupon List'}</h5>
                <span>{'List of coupon redeemed by customers'}</span>
              </CardHeader>
              <CardBody>
                <div className="table-responsive support-table noPadding noMargin">
                  <DataTable
                    columns={supportColumns}
                    data={supportData}
                    striped={false}
                    center={true}
                    pagination
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CouponDetails;
