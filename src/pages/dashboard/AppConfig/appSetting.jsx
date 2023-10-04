import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card,
  CardBody,
  CardFooter, CardHeader, Col, Container, Form,
  FormGroup,
  Input,
  Label, Row
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import ModalForm from '../../../components/Modal/Modal';
import {
  AppConfigTableHeader,
  Delete, Edit
} from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from "./redux/actions";


const AppSetting = (props) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [moreOption, setmoreOption] = useState([]);
  const [show, setShow] = useState(false);
  const closeModelHandler = () => setShow(false)
  const [modelObj, setModelObj] = useState({ title: 'App Setting' })
  const toggleEdit = AppSetting => {
    setModelObj({
      ...modelObj, dataObj: {
        id: AppSetting.id,
        name: AppSetting.name,
        value: AppSetting.value
      }
    })
    setShow(true);
  }

  const handleForm = (data, e) => {
    dispatch(actions.sendAppSettingReq(data));
  };

  const optionClickHandler = () => {
    setmoreOption([...moreOption, { id: uuidv4() }])

  }
  const handleRemoveOption = (id) => {
    setmoreOption(moreOption.filter(option => option.id !== id))
  }

  useEffect(() => {
    dispatch(actions.getAppSettingReq());
  }, []);
  const AppConfig = useSelector((state) => state.AppConfig.AppSetting);

  const handleSave = (data) => {
    dispatch(actions.editAppSettingReq(modelObj.dataObj.id, data));
    setShow(false);
  }
  const deletebrand = (id) => {
    dispatch(actions.deleteAppSettingReq(id))
  };

  return (
    <Fragment>
      <ModalForm show={show} data={modelObj} close={closeModelHandler} save={handleSave} />
      <Breadcrumb parent="Form" title="App Setting" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className=" d-flex justify-content-between">
                <h5 >Add App Setting</h5>
                <Button onClick={optionClickHandler} className="btn btn-primary ">
                  {''} Add field
                  </Button>
              </CardHeader>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
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
                            placeholder=" Name"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">Value</Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="value"
                            placeholder="Value"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">Save</Button>
                </CardFooter>
              </Form>
              {moreOption.map(option => {
                return <CardFooter>
                  <Form
                    onSubmit={handleSubmit(handleForm)}
                    className="form theme-form"
                  >

                    <FormGroup className="row">
                      <Label className="col-sm-2 col-form-label">
                        Name
                                                    </Label>
                      <Col sm="8">
                        <Input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder=" Name"
                          innerRef={register({
                            required: true,
                          })}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-sm-2 col-form-label">
                        Value
                                                    </Label>
                      <Col sm="8">
                        <Input
                          className="form-control"
                          type="text"
                          name="value"
                          placeholder=" Name"
                          innerRef={register({
                            required: true,
                          })}
                        />
                      </Col>
                    </FormGroup>
                    <Row>
                      <Col>
                        <Button color="primary" type="submit" className="mr-1">
                          Save
                                    </Button>
                      </Col>
                      <Col>
                        <Button onClick={() => handleRemoveOption(option.id)} color="primary" className="mr-1">Remove Option</Button>

                      </Col>
                    </Row>
                  </Form>
                </CardFooter>
              })}
            </Card>
          </Col>
        </Row>
        <Card>
          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  {AppConfigTableHeader.map((items, i) => (
                    <th key={i}>{items}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AppConfig.map((AppConfigData) => (
                  <tr key={AppConfigData.id}>
                    <td>{AppConfigData.name} </td>
                    <td> {AppConfigData.value} </td>

                    <td className="text-right">
                      <Button
                        color="primary"
                        onClick={() => toggleEdit(AppConfigData)}
                        size="sm"
                      >
                        <i className="fa fa-pencil"></i> {Edit}
                      </Button>

                      <Button color="danger" onClick={() => deletebrand(AppConfigData.id)} size="sm">
                        <i className="fa fa-trash"></i> {Delete}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </Container>
    </Fragment>
  );
};

export default AppSetting;
