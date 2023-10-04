import React, { Fragment } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import SelectCreatable from 'react-select/creatable';
import { cities } from './cities';
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

const Addshops = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm();

  const handleForm = (data) => {
    let reqObj = {
      ...data,
      id: data.id,
    };
    dispatch(actions.sendShopReq({ ...reqObj })); //isActive: true
  };

  const state = [
    { value: 'Province 1', label: 'Province 1' },
    { value: 'Province 2', label: 'Province 2' },
    { value: 'Province 3', label: 'Province 3' },
    { value: 'Province 4', label: 'Province 4' },
    { value: 'Province 3', label: 'Province 5' },
    { value: 'Province 6', label: 'Province 6' },
    { value: 'Province 7', label: 'Province 7' },
  ];

  const country = [
    { value: 'Nepal', label: 'Nepal' },
    // { value: 'India', label: 'India' },
  ];

  const {
    field: { value: stateValue, onChange: stateOnChange, ...restStateField },
  } = useController({ name: 'state', control });

  const {
    field: {
      value: countryValue,
      onChange: countryOnChange,
      ...restCountryField
    },
  } = useController({ name: 'country', control });

  const {
    field: { value: cityValue, onChange: cityOnChange, ...restCityField },
  } = useController({ name: 'city', control });

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Shops" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
                <CardHeader>
                  <h5>Shop Details</h5>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Shop Name
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            name="name"
                            type="text"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Shop Name"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Description
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="description"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Description"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Address1
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="address1"
                            innerRef={register}
                            placeholder="Address1"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Address2
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="address2"
                            innerRef={register}
                            placeholder="Address2"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Address3
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="address3"
                            innerRef={register}
                            placeholder="Address3"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Address4
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="address4"
                            innerRef={register}
                            placeholder="Address4"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Country
                        </Label>
                        <Col sm="9">
                          <Select
                            className="select-input"
                            placeholder="Select Country"
                            isClearable
                            options={country}
                            value={
                              countryValue
                                ? country.find((x) => x.value === countryValue)
                                : countryValue
                            }
                            onChange={(option) =>
                              countryOnChange(option ? option.value : option)
                            }
                            {...restCountryField}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">State</Label>
                        <Col sm="9">
                          <Select
                            className="select-input"
                            placeholder="Select State"
                            isClearable
                            options={state}
                            value={
                              stateValue
                                ? state.find((x) => x.value === stateValue)
                                : stateValue
                            }
                            onChange={(option) =>
                              stateOnChange(option ? option.value : option)
                            }
                            {...restStateField}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">City</Label>
                        <Col sm="9">
                          <SelectCreatable
                            className="select-input"
                            placeholder="Select City"
                            isClearable
                            options={cities}
                            value={
                              cityValue
                                ? cities.find((x) => x.value === cityValue)
                                : cityValue
                            }
                            onChange={(option) =>
                              cityOnChange(option ? option.value : option)
                            }
                            {...restCityField}
                          />{' '}
                        </Col>
                      </FormGroup>
                      {/* <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Status</Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            className="form-control digits"
                            name="isActive"
                            innerRef={register}

                          >
                            <option value={true}>Active</option>
                            <option value={false}>not-Active</option>

                          </Input>
                        </Col>
                      </FormGroup> */}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Shop
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

export default Addshops;
