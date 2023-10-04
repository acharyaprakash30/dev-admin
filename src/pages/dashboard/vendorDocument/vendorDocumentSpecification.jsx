import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    Button, Card,

    CardBody,
    CardFooter, CardHeader, Col, Container,







    Form,
    FormGroup,

    Input, Label, Row
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';





const VendorDocument = (props) => {

    const { register, errors, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const [moreOption, setmoreOption] = useState([]);
    const [show, setShow] = useState(false);

    const handleForm = (data) => {


        dispatch(actions.sendVendorDocReq());



    }
    const handleInputchange = (e) => {
        if (e.target.value === 'Select' || e.target.value === 'Radio') {
            setShow(true);

        } else setShow(false)
        setmoreOption([]);

    };
    const optionClickHandler = () => {
        setmoreOption([...moreOption, { id: uuidv4() }])

    }

    const handleRemoveOption = (id) => {
        setmoreOption(moreOption.filter(option => option.id !== id))
    }


    return (
        <Fragment>
            <Breadcrumb parent="Users" title="vendorDocs" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>VendorDocument details</h5>
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
                                                    <Input type="text"
                                                        name="label"
                                                        className="form-control "
                                                        placeholder="Category"
                                                        innerRef={register({
                                                            required: true,
                                                        })}
                                                    />

                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3 col-form-label">Input Type</Label>
                                                <Col sm="9">
                                                    <Input
                                                        type="select"
                                                        className="form-control digits"
                                                        name="inputType"
                                                        onChange={handleInputchange}
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
                                                        <Button onClick={optionClickHandler} className="btn btn-primary ">
                                                            Add another option
                            </Button>
                                                    </Col>
                                                </FormGroup>
                                            ) : null}
                                            {moreOption.map(option => {

                                                return <FormGroup className="row" key={option.id}>
                                                    <Label className="col-sm-3 col-form-label">Field</Label>
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
                                                                <Button onClick={() => handleRemoveOption(option.id)} className="btn btn-primary">Remove Option</Button>
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

                                            })}

                                            <FormGroup className="row">
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
                                            </FormGroup>







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

            </Container>
        </Fragment>
    );
};

export default VendorDocument;
