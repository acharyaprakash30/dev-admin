import React, { useEffect, useState } from 'react';
import { BsHouseDoor, BsHouseDoorFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card,
  CardHeader, Col, Container,
  Form,
  FormGroup,
  Input, Row
} from 'reactstrap';
import {
  VariantTableHeader, 
  VariantTableTitle,
  Delete,
  Edit
} from '../../../constant';
import ModalForm from "../../../components/Modal/Modal";
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';

const AllCategoryVariants = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCategoryVariantReq());
  }, []);
  const variants = useSelector((state) => state.CategoryVariant.Variant);

  const [data, setData] = useState([]);

  const deleteVariant = (id) => {
    dispatch(actions.dltVariantReq(id));
  };

  const [show, setShow] = useState(false);
  const closeModelHandler = () => setShow(false)
  const [modelObj, setModelObj] = useState({
    title: 'Variant',
  })

  const toggleEdit = variantData => {
    // set formodal
    setModelObj({
      ...modelObj,
      dataObj: {
        id: variantData.id,
        name: variantData.name,
      }
    })
    setShow(true);
  }
  const handleSave = (data) => {
    dispatch(actions.editVariantReq(modelObj.dataObj.id, data));
    dispatch(actions.getVariantReq());
  }

  return (
    <>
      <Breadcrumb parent="Users" title="Edit Variant" />
      <Container fluid={true}>

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
                    <h4 className="card-title mb-0 ">{VariantTableTitle}</h4>
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
                        {VariantTableHeader.map((items, i) => (
                          <th key={i}>{items}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((variant) => (
                        <tr key={variant.id}>
                          <td>{variant.name} </td>
                          <td> {variant.variantOptions.map((variant) => (
                            variant.name + ' | '
                          ))} </td>
                          <td className="text-right  ">
                            <Button
                              className="mr-1"
                              color="primary"
                              onClick={() => toggleEdit(variant)}
                              size="sm"
                            >
                              <i className="fa fa-pencil "></i> {Edit}
                            </Button>

                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => deleteVariant(variant.id)}
                            >
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
    </>
  );
};

export default AllCategoryVariants;
