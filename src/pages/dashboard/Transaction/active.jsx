import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, CardHeader, Col, Container, Row } from 'reactstrap';
import {
  Delete,
  Edit,
  Update,
  UsersTableHeader,
  UsersTableTitle,
} from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
const ActiveTransaction = (props) => {
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/user-edit-table.json`)
      .then((res) => setData(res.data));
  }, []);

  const [data, setData] = useState([]);

  const [modaledit, setModaledit] = useState(false);

  const toggleedit = () => setModaledit(!modaledit);

  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Completed Transactions" />
      <Container fluid={true}>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-0 ">{UsersTableTitle}</h4>
                  </div>

                  <div className="card-options">
                    <a
                      className="card-options-collapse"
                      href="#javascript"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                    <a
                      className="card-options-remove"
                      href="#javascript"
                      data-toggle="card-remove"
                    >
                      <i className="fe fe-x"></i>
                    </a>
                  </div>
                </CardHeader>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                      <tr>
                        {UsersTableHeader.map((items, i) => (
                          <th key={i}>{items}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((items, i) => (
                        <tr key={i}>
                          <td>{items.FirstName} </td>
                          <td>{items.MiddleName}</td>
                          <td>{items.LastName}</td>
                          <td>{items.Email}</td>
                          <td> {items.Roles} </td>
                          <td className="text-right">
                            <Button
                              color="primary"
                              onClick={toggleedit}
                              size="sm"
                            >
                              <i className="fa fa-pencil"></i> {Edit}
                            </Button>
                            <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> {Update}
                            </Button>
                            <Button color="danger" size="sm">
                              <i className="fa fa-trash"></i> {Delete}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default ActiveTransaction;
