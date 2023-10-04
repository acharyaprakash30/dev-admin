import 'antd/dist/antd.css';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
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
import AddTabs from './addTabs';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CreatePlaceholder = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [date, setDate] = useState([]);
  const [tabs, setTabs] = useState([]);

  const { RangePicker } = DatePicker;

  function onChange(value, dateString) {
    setDate([...date, dateString]);
  }

  function onOk(value) {
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

    !date[0]
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
      tabs,
      orderColumn: Number(placeHolderData.orderColumn),
    };

    // console.log({ placeHolderColumn });
    dispatch(actions.addPlaceholderReq(placeHolderColumn));
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Placeholder" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="pb-2">
                <h5>PlaceHolder Details</h5>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      {/* title */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">Title</Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="title"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Placeholder Title"
                          />
                        </Col>
                      </FormGroup>
                      {/* tabs */}
                      <FormGroup className="row">
                        <Label className="col-md-2 col-form-label">Tabs</Label>
                        <Col md="8">
                          <AddTabs
                            options={tabs}
                            handleClose={(delVal) =>
                              setTabs(tabs.filter((tab) => tab !== delVal))
                            }
                            addInputTag={(newTabs) => setTabs(newTabs)}
                            editInputTag={(newTabs) => setTabs(newTabs)}
                          />
                        </Col>
                      </FormGroup>
                      {/* default tabs */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Default Tabs
                        </Label>
                        <Col sm="8">
                          <FormGroup>
                            <Input
                              type="select"
                              name="defaultTab"
                              id="defaultTab"
                              innerRef={register({ required: tabs.length })}
                            >
                              {tabs.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      {/* agent */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">Agent</Label>
                        <Col sm="8">
                          <FormGroup>
                            <Input
                              type="select"
                              name="agent"
                              id="agent"
                              innerRef={register({ required: true })}
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
                            defaultValue={`0`}
                          />
                        </Col>
                      </FormGroup>
                      {/* listing type */}
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
                        <Label className="col-sm-2 col-form-label">Date</Label>
                        <Col sm="8">
                          <Space direction="vertical" size={12}>
                            <RangePicker
                              default
                              format="YYYY-MM-DDTHH:mm:ss[Z]"
                              onChange={onChange}
                              onOk={onOk}
                            />
                          </Space>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Placeholder
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

export default CreatePlaceholder;
