import React, { Fragment } from 'react';
import CKEditor from 'react-ckeditor-component';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    Button, Card,
    CardBody,
    CardFooter, CardHeader, Col, Container, Form,
    FormGroup,
    Input,
    Label, Row
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from "./redux/actions";

const Pages = (props) => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const handleForm = (data, e) => {
        dispatch(actions.sendPagesDataReq(data));
    };
    return (
        <Fragment>
            <Breadcrumb parent="Form" title="App Setting" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Page Details</h5>
                            </CardHeader>
                            <Form
                                onSubmit={handleSubmit(handleForm)}
                                className="form theme-form"
                            >
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Form className="theme-form">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-2 col-form-label">
                                                        Title
                                                       </Label>
                                                    <Col sm="8">
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            name="name"
                                                            placeholder="Page Title"
                                                            innerRef={register({
                                                                required: true,
                                                            })}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-2 col-form-label">
                                                        Description
                                                       </Label>
                                                    <CKEditor activeclassName="p10" />
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary" type="submit" className="mr-1">
                                        Save
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

export default Pages;
