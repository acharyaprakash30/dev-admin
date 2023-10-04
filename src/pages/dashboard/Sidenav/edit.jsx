import 'antd/dist/antd.css';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card,
  CardBody, CardFooter, CardHeader,
  Col, Container,
  Form, FormGroup,
  Input, Label,
  Row
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';



const EditSiteNav = ({ match }) => {


  const id = Number(match.params.id)

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();


  const siteNavs = useSelector(state => state.SiteNav.siteNav);

  const [featured, setFeatured] = useState(false);


  const filterSiteNav = siteNavs.filter((item) => item.id == id);

  const currentSiteNav = filterSiteNav[filterSiteNav.length - 1];




  const handleEditForm = (data) => {

    let request = { ...data };


    let formatSiteNavFormRequest = {
      "name": request.name,
      "url": request.url,
      "order_position": parseInt(request.order_position),
      "icon": request.icon,
      "status": request.status,
      "type": request.type
    }


    dispatch(actions.updateSideNavReq(id, formatSiteNavFormRequest));

  };


  const handleChange = () => {
    setFeatured(!featured);
  }


  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Edit SiteNav" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="pb-2">
                <h5>SiteNav Details</h5>
                <p>{`Fill the form to Edit a ${currentSiteNav.name} SiteNav.`}</p>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleEditForm)} className="theme-form">
                <CardBody>
                  <Row>

                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">Name</Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Enter Name"
                            defaultValue={currentSiteNav.name}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">URL</Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="url"
                            name="url"
                            innerRef={register()}
                            placeholder="Enter URL"
                            defaultValue={currentSiteNav.url}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">Icon</Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="icon"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Enter Icon"
                            defaultValue={currentSiteNav.icon}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">Type</Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="type"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Enter type"
                            defaultValue={currentSiteNav.type}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Status
                      </Label>

                        <Col sm="8">
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                name="status"
                                innerRef={register()}
                                defaultChecked={currentSiteNav.status || false}
                                onChange={() => handleChange}

                              />
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          order Position
                       </Label>
                        <Col sm="8">

                          <Input
                            className="form-control"
                            type="number"
                            min="0"
                            name="order_position"
                            innerRef={register}
                            placeholder="Order Position eg. 1,2 ..."
                            defaultValue={`${currentSiteNav.order_position}`}
                          />
                        </Col>

                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="secondary" type="submit" className="mr-1">
                    Update SiteNav
                  </Button>
                  <Button color="primary" type="reset" className="mr-1">
                    Reset SiteNav
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default EditSiteNav;
