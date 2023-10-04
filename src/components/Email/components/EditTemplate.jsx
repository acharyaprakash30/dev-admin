import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
 
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap';
import { message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { editEmailApi, singleEmailApi } from 'api/emailTemplate/emailTemplate';

import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import './WYSIWYG.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditTemplateForm = ({ isEditModel, onDiscard, onSuccess, id }) => {
    
  const [singleTemp, setSingleTemp] = useState('');
  const [data1, setData] = useState('');

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    singleEmailApi({ id })
      .then((response) => {
        setSingleTemp(response.data);
      })
      .catch((err) => {
        // console.log('Email Fetching Issue');
      });
  }, [id]);
  const [editorState, setEditorState] = useState("");


  useEffect(()=> {
    const desc = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`${singleTemp.description}`)
        ),
      );
    setEditorState(desc)
  },[singleTemp.description])


  const handleForm = (data) => {
    const payload = {
      title: data.title,
      code: data.code,
      fromname: data.fromName,
      fromEmail: data.fromEmail,
      emailSubject: data.emailSubject,
      description: data1.html1,
    };

    editEmailApi({ id, payload })
      .then((response) => {
        message.success('Email Template Edited Successfully');
        onSuccess();
      })
      .catch((err) => {
        message.error('Failed To Edit Email Template');
      });
  };

  return (
    <>
      <Container fluid>
        <Modal isOpen={isEditModel} size="xl">
          <ModalBody>
            <Card className="mt-3">
              <Form onSubmit={handleSubmit(handleForm)}>
                <CardHeader className="m-3">
                  <h6>Edit Email Template</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <Label for="title">Title</Label>

                        <Input
                          type="text"
                          defaultValue={singleTemp?.title}
                          name="title"
                          id="title"
                          placeholder="Title"
                          innerRef={register({ required: true })}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        <small className="text-danger">
                          {errors.title &&
                            errors.title.type === 'required' &&
                            'Please input title'}
                        </small>
                      </FormGroup>
                    </Col>
                    <Col xs={6}>
                      <FormGroup>
                        <Label for="code">Code</Label>

                        <Input
                          type="text"
                          defaultValue={singleTemp?.code}
                          name="code"
                          id="code"
                          placeholder="Code"
                          innerRef={register({ required: true })}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        <small className="text-danger">
                          {errors.code &&
                            errors.code.type === 'required' &&
                            'Please input code'}
                        </small>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <Label for="fromName">From Name</Label>
                        <Input
                          type="text"
                          defaultValue={singleTemp?.fromname}
                          name="fromName"
                          id="fromName"
                          placeholder="From Name"
                          innerRef={register({ required: true })}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        <small className="text-danger">
                          {errors.fromName &&
                            errors.fromName.type === 'required' &&
                            'Please input from name'}
                        </small>
                      </FormGroup>
                    </Col>
                    <Col xs={6}>
                      <FormGroup>
                        <Label for="fromEmail">From Email</Label>
                        <Input
                          type="email"
                          defaultValue={singleTemp?.fromEmail}
                          name="fromEmail"
                          id="fromEmail"
                          placeholder="From Email"
                          innerRef={register({ required: true })}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        <small className="text-danger">
                          {errors.fromEmail &&
                            errors.fromEmail.type === 'required' &&
                            'Please input from email'}
                        </small>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <Label for="emailSubject">Email Subject</Label>

                        <Input
                          type="text"
                          defaultValue={singleTemp?.emailSubject}
                          name="emailSubject"
                          id="emailSubject"
                          placeholder="Email Subject"
                          innerRef={register({ required: true })}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        <small className="text-danger">
                          {errors.emailSubject &&
                            errors.emailSubject.type === 'required' &&
                            'Please input title'}
                        </small>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <FormGroup>
                      <Label>Description</Label>

                      <Editor
                        name="description"
                        id="description"
                        editorState={editorState}
                        onEditorStateChange={(data1) => {
                          const html1 = draftToHtml(
                            convertToRaw(data1.getCurrentContent()),
                          );
                          setEditorState(data1);
                          setData({ html1 });
                        }}
                      />

                      <small className="text-danger">
                        {errors.description &&
                          errors.description.type === 'required' &&
                          'Please input descriptioin'}
                      </small>
                    </FormGroup>
                  </Row>
                </CardBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={handleSubmit(handleForm)}
                  >
                    Submit
                  </Button>
                  <Button color="secondary" onClick={onDiscard}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Card>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};

export default EditTemplateForm;
