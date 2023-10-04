import 'antd/dist/antd.css';
import React, { Fragment, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { DatePicker, Space } from 'antd';
import actions from './redux/actions';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import { ConsoleSqlOutlined } from '@ant-design/icons';

function EditPlaceholderGrp(props) {
  const dispatch = useDispatch();

  const placeHolderGrpId = props.match.params.id;

  const { register, handleSubmit } = useForm();

  const pGroups = useSelector((state) => state.PlaceholderGroup.data);

  const filterPlaceholders = pGroups.filter(
    (value) => value.id == placeHolderGrpId,
  ); /// filter current id with initital state banner data

  const callCurrentPlaceholderGroup =
    filterPlaceholders[filterPlaceholders.length - 1]; // get first index data

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(callCurrentPlaceholderGroup?.description),
      ),
    ),
  );

  const [convertedContent, setConvertedContent] = useState(null);
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState(callCurrentPlaceholderGroup?.isActive);

  const { RangePicker } = DatePicker;

  function onDateChange(value, dateString) {
    setDate([...date, dateString]);
  }

  const typeOptions = [
    {
      label: 'Brand',
      value: 'brand',
    },
    {
      label: 'Product',
      value: 'product',
    },
    {
      label: 'Category',
      value: 'category',
    },
  ];

  const agentOptions = [
    {
      label: 'Web',
      value: 'web',
    },
    {
      label: 'Mobile',
      value: 'mobile',
    },
  ];

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  //remove html tags from a string, leaving only the inner text
  function removeHTML(str) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  }

  const handleForm = (data) => {
    let description = removeHTML(convertedContent);

    const placeHolderData = { ...data, description: description };

    !date[0] || typeof date[0][1] === NaN
      ? (function () {
          delete placeHolderData.startDate;
          delete placeHolderData.endDate;
        })()
      : (function () {
          placeHolderData.startDate = date[0][0];
          placeHolderData.endDate = date[0][1];
        })();

    var placeHolderColumn = {
      ...placeHolderData,
      orderColumn: Number(placeHolderData.orderColumn),
    };

    dispatch(actions.updatePlaceholderReq(placeHolderGrpId, placeHolderColumn));
  };

  return (
    <div>
      <Fragment>
        <Breadcrumb parent="Form" title="Update Placeholder" />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader className="pb-2">
                  <h5>PlaceHolder Details</h5>
                </CardHeader>
                <Form
                  onSubmit={handleSubmit(handleForm)}
                  className="theme-form"
                >
                  <CardBody>
                    <Row>
                      <Col>
                        {/* title */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Title
                          </Label>
                          <Col sm="8">
                            <Input
                              className="form-control"
                              type="text"
                              name="title"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="Placeholder Title"
                              defaultValue={callCurrentPlaceholderGroup?.title}
                            />
                          </Col>
                        </FormGroup>
                        {/* agent */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Agent
                          </Label>
                          <Col sm="8">
                            <FormGroup>
                              <Input
                                type="select"
                                name="agent"
                                id="agent"
                                innerRef={register({ required: true })}
                                defaultValue={
                                  callCurrentPlaceholderGroup?.agent
                                }
                              >
                                {agentOptions.map((item, index) => {
                                  return (
                                    <option key={index} value={item.value}>
                                      {item.label}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                        {/* description */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Description
                          </Label>
                          <Col sm="8">
                            <Editor
                              editorState={editorState}
                              onEditorStateChange={handleEditorChange}
                              defaultEditorState={editorState}
                            />
                          </Col>
                        </FormGroup>
                        {/* is active */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Active
                          </Label>
                          <Col sm="8">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="isActive"
                                  innerRef={register}
                                  defaultChecked={status}
                                  onChange={() => setStatus(!status)}
                                />
                              </Label>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                        {/* order */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Order Column
                          </Label>
                          <Col sm="8">
                            <Input
                              className="form-control"
                              type="number"
                              name="orderColumn"
                              innerRef={register}
                              placeholder="Order Position eg. 1,2 ..."
                              defaultValue={
                                callCurrentPlaceholderGroup?.orderColumn
                              }
                            />
                          </Col>
                        </FormGroup>
                        {/* listing tyope */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Listing Type
                          </Label>
                          <Col sm="8">
                            <FormGroup>
                              <Input
                                type="select"
                                name="type"
                                id="type"
                                innerRef={register({ required: true })}
                                defaultValue={callCurrentPlaceholderGroup?.type}
                              >
                                {typeOptions.map((item, index) => {
                                  return (
                                    <option key={index} value={item.value}>
                                      {item.label}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                        {/* date */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Date
                          </Label>
                          <Col sm="8">
                            <Space direction="vertical" size={12}>
                              <RangePicker
                                format="YYYY-MM-DDTHH:mm:ss[Z]"
                                defaultValue={[
                                  moment(
                                    callCurrentPlaceholderGroup?.startDate,
                                  ),
                                  moment(callCurrentPlaceholderGroup?.endDate),
                                ]}
                                // value={date.map((dat) => moment(dat))}
                                onChange={onDateChange}
                              />
                            </Space>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" type="submit" className="mr-1">
                      Update Placeholder
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default EditPlaceholderGrp;
