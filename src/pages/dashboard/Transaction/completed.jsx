import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { FaPiggyBank } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { GrAddCircle } from 'react-icons/gr';
import { VscLoading } from 'react-icons/vsc';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import {
  CompletedTransactionTableHeader,
  CompletedTransactionTableTitle,
  Delete,
  Edit,
  Update,
} from '../../../constant';
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import Breadcrumb from '../../../layout/breadcrumb';

const datas = [
  {
    title: 'Total Transactions',
    value: 400,
    icon: FaPiggyBank,
  },
  {
    title: "Today's Transactions",
    value: 10,
    icon: GrAddCircle,
  },
  {
    title: 'Pending ',
    value: 20,
    icon: VscLoading,
  },
  {
    title: 'Completed Transactions',
    value: 100,
    icon: FcCheckmark,
  },
];
const CompletedTransaction = (props) => {
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/CompletedTransaction-edit-table.json`)
      .then((res) => setData(res.data));
  }, []);

  const [data, setData] = useState([]);

  const [modaledit, setModaledit] = useState(false);

  const toggleedit = () => setModaledit(!modaledit);

  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Transaction" />
      <Container fluid={true}>
        <WidgetGlance data={datas} />
        <div className="feature-products">
          <Row>
            <Col xl="3" sm="3">
              <div className={`product-sidebar }`}>
                <div className="filter-section">
                  <Card>
                    <CardHeader>
                      <h6 className="mb-0 f-w-600">
                        Filters
                        <span className="pull-right">
                          <i className="fa fa-chevron-down toggle-data"></i>
                        </span>
                      </h6>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </Col>
            <Col xl="6" sm="6">
              <Form>
                <FormGroup className="m-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="search"
                  />
                  <i className="fa fa-search"></i>
                </FormGroup>
              </Form>
            </Col>

            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select className="form-control btn-square" name="select">
                  <option value="Featured">Featured</option>
                  <option value="LowestPrices">LowestPrices</option>
                  <option value="HighestPrices">HighestPrices</option>
                </select>
              </div>
            </Col>
          </Row>
        </div>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-0 ">
                      {CompletedTransactionTableTitle}
                    </h4>
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
                        {CompletedTransactionTableHeader.map((items, i) => (
                          <th key={i}>{items}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((items, i) => (
                        <tr key={i}>
                          <td>{items.Name}</td>
                          <td>{items.Address}</td>
                          <td>{items.ProductID}</td>
                          <td> {items.PaymentStatus} </td>
                          <td>{items.TransactionID} </td>
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

export default CompletedTransaction;
