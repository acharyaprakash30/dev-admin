import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import allPermission from './permissions';

const Addroles = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleForm = (data, e) => {
    dispatch(actions.sendRolesReq(data));
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Role" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Role</h5>
              </CardHeader>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Role Type
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="select"
                            name="type"
                            innerRef={register({
                              required: true,
                            })}
                          >
                            <option value="application">Application</option>
                            <option value="vendor">Vendor</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Roles Name
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Roles Name"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                      {allPermission.map((item, index) => (
                        <FormGroup className="row" key={index}>
                          <Label className="col-sm-2 col-form-label">
                            {item.name}
                          </Label>
                          <Col sm="8">
                            {item.value.map((value, i) => (
                              <div className="checkbox">
                                <Input
                                  id={value}
                                  name="permissions[]"
                                  innerRef={register}
                                  type="checkbox"
                                  value={value}
                                />
                                <Label for={value}>{value}</Label>
                              </div>
                            ))}
                          </Col>
                        </FormGroup>
                      ))}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Role
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

export default Addroles;
