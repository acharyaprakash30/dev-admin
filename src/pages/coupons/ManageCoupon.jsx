import React, { Fragment } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { supportData, supportColumns } from './CouponManageConfig';


const ManageCoupons = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Coupons" title="Manage Coupons" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{'Manage Coupons'}</h5>
                <span>{'Manage and issue coupons for customers'}</span>
              </CardHeader>
              <CardBody>
                <div className="table-responsive support-table">
                  <DataTable
                    columns={supportColumns}
                    data={supportData}
                    striped={true}
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

export default ManageCoupons;
