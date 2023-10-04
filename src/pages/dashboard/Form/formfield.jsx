import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
  Row
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { Edit, FormsTableHeader } from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
import Categoryaction from '../Category/redux/actions';
import actions from './redux/actions';


const CategoryForm = (props) => {
  const [currentCategoryId, setcurrentCategoryId] = useState();
  const [category, setCategory] = useState(['Electronics']);
  const [currentFormGroupId, setcurrentFormGroupId] = useState();
  const formcategories = useSelector((state) => state.Form.form);
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();

  const [formConfig, setFormConfig] = useState([]);

  const [modaledit, setModaledit] = useState(false);
  const [show, setShow] = useState(false);

  const [moreOption, setmoreOption] = useState([]);

  const toggleedit = () => setModaledit(!modaledit);
  const user_id = useSelector((state) => state.Auth.currentUser.id);
  const formgroup = useSelector((state) => state.Form.formgroup);

  const handleForm = (data, e) => {
    setFormConfig([...formConfig, data]);
    const option = data.options;

    data.user_id = user_id;
    data.category_id = parseInt(data.category_id);
    data.category_form_group_id = parseInt(data.category_form_group_id);
    let formdata = {
      ...data,
      options: { option },
    };
    dispatch(actions.sendFormDataReq(formdata));
  };

  useEffect(() => {
    setCategory(
      formcategories.filter((field) => field.category_id === currentCategoryId),
    );
  }, [currentCategoryId, formcategories]);

  const handleCategoryChange = (e, data) => {
    setcurrentCategoryId(e.target.value);
  };

  useEffect(() => {
    dispatch(actions.getFormDataReq());
  }, []);

  useEffect(() => {
    dispatch(actions.getFormgroupReq(currentCategoryId));
  }, [currentCategoryId]);

  useEffect(() => {
    dispatch(Categoryaction.getCategoryReq());
  }, [currentFormGroupId]);
  const categories = useSelector((state) => state.Category.Category);

  const handleFormgroupChange = (e, data) => {
    setcurrentFormGroupId(e.target.value);
  };
  //options
  const handleInputchange = (e) => {
    if (e.target.value === 'Select' || e.target.value === 'Radio') {
      setShow(true);
    } else setShow(false);
    setmoreOption([]);
  };
  //adding field
  const optionClickHandler = () => {
    setmoreOption([...moreOption, { id: uuidv4() }]);
  };

  const handleRemoveOption = (id) => {
    setmoreOption(moreOption.filter((option) => option.id !== id));
  };
  const handleEdit = (data, index) => {
    let a = formConfig;

    a[index] = data;
    setFormConfig(a);
  };

  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Edit Formfields" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Formfields Details</h5>
              </CardHeader>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Category
                        </Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            name="category_id"
                            className="form-control "
                            placeholder="Category"
                            onChange={handleCategoryChange}
                            innerRef={register({
                              required: 'Please select an option.',
                            })}
                          >
                            <option value="" disabled selected hidden>
                              Please select category
                            </option>
                            {categories.map((option) => (
                              <option key={option.name} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Label</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="label"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Label"
                          />
                          {errors?.label ? (
                            <span className="text-danger pt-5 mt-5">
                              {' '}
                              This field is required.
                            </span>
                          ) : (
                            ''
                          )}
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Input Type
                        </Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            name="inputType"
                            onChange={handleInputchange}
                            className="form-control digits"
                            innerRef={register({
                              required: true,
                            })}
                          >
                            <option>Text</option>
                            <option>Email</option>
                            <option>Password</option>
                            <option>File</option>
                            <option>Number</option>
                            <option>Date</option>
                            <option>Select</option>
                            <option>Radio</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      {show ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Options
                          </Label>
                          <Col sm="6">
                            <Input
                              className="form-control"
                              type="text"
                              name="options"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="options"
                            />
                            {errors?.label ? (
                              <span className="text-danger pt-5 mt-5">
                                {' '}
                                This field is required.
                              </span>
                            ) : (
                              ''
                            )}
                          </Col>
                          <Col sm="3" className="d-flex justify-content-end">
                            <Button
                              onClick={optionClickHandler}
                              className="btn btn-primary "
                            >
                              Add another option
                            </Button>
                          </Col>
                        </FormGroup>
                      ) : null}

                      {moreOption.map((option) => {
                        return (
                          <FormGroup className="row" key={option.id}>
                            <Label className="col-sm-3 col-form-label">
                              Field
                            </Label>
                            <Col sm="9">
                              <Row>
                                <Col>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="options"
                                    innerRef={register({
                                      required: true,
                                    })}
                                    placeholder="Label"
                                  />
                                </Col>
                                <Col>
                                  <Button
                                    onClick={() =>
                                      handleRemoveOption(option.id)
                                    }
                                    className="btn btn-primary"
                                  >
                                    Remove Option
                                  </Button>
                                </Col>
                              </Row>

                              {errors?.label ? (
                                <span className="text-danger pt-5 mt-5">
                                  {' '}
                                  This field is required.
                                </span>
                              ) : (
                                ''
                              )}
                            </Col>
                          </FormGroup>
                        );
                      })}

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Form Group
                        </Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            name="category_form_group_id"
                            className="form-control "
                            placeholder="Category"
                            onChange={handleFormgroupChange}
                            innerRef={register({
                              required: 'Please select an option.',
                            })}
                          >
                            <option value="" disabled selected hidden>
                              Please select formgroup
                            </option>
                            {formgroup.map((option) => (
                              <option key={option.name} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>

                      {/* <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Helper Text
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="text"
                              placeholder="helper text"
                              name="helperText"
                              innerRef={register({
                                required: true,
                              })}
                            />

                            {errors?.helperText ? (
                              <span className="text-danger m-1">
                                {' '}
                                This field is required.
                              </span>
                            ) : (
                              ''
                            )}
                          </Col>
                        </FormGroup> */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          placeholder
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            name="placeholder"
                            placeholder="placeholder"
                            innerRef={register({
                              required: true,
                            })}
                          />
                          {errors?.placeholder ? (
                            <span className="text-danger m-1">
                              {' '}
                              This field is required.
                            </span>
                          ) : (
                            ''
                          )}
                        </Col>
                      </FormGroup>
                      {/* <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Required
                          </Label>
                          <Col sm="9">
                            <Input
                              type="select"
                              name="select"
                              className="form-control digits"
                              name="required"
                              innerRef={register({
                                required: true,
                              })}
                            >
                              <option>Yes</option>
                              <option>Not Compulsory</option>
                            </Input>
                          </Col>
                        </FormGroup> */}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Generate Form
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>

        <div className="table-responsive mt-5">
          <table className="table card-table table-vcenter text-nowrap ">
            <thead>
              <tr>
                {FormsTableHeader.map((items, i) => (
                  <th key={i}>{items}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {category.map((categorydata) => (
                <tr key={categorydata.id}>
                  <td>{categorydata.category} </td>
                  <td>{categorydata.inputType}</td>
                  <td>{categorydata.label}</td>
                  <td> {categorydata.placeholder} </td>
                  {/* {formgroup.map((formgroupdata) => (
                    <td> {formgroupdata.name} </td>
                  ))} */}

                  <td className="text-right">
                    <Button onClick={toggleedit} color="danger" size="sm">
                      <i className="fa fa-pencil"></i> {Edit}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Fragment>
  );
};

export default CategoryForm;
