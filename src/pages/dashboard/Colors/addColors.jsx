import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Button, Card,
  CardBody,
  CardFooter, CardHeader, Col, Container,
  Form,
  FormGroup,
  Input,
  Label, Row
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';

export default () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const handleForm = (data, e) => {
    dispatch(actions.sendColorReq(data));
    reset();
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Colors" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Color Details</h5>
          </CardHeader>
          <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
            <CardBody>
              <Row>
                {/* name */}
                <Col md="5">
                  <FormGroup className="row">
                    <Label className="col-sm-4 col-form-label">
                      Color Name
                        </Label>
                    <Col sm="6">
                      <Input
                        className="form-control"
                        type="text"
                        name="name"
                        innerRef={register({
                          required: true,
                        })}
                        placeholder="Color Name"
                      />
                    </Col>
                  </FormGroup>
                </Col>
                {/* color code */}
                <Col md="5">
                  <FormGroup className="row">
                    <Label className="col-sm-4 col-form-label">
                      Select Color
                        </Label>
                    <Col sm="4">
                      <Input
                        className="form-control"
                        type="color"
                        name="hexCode"
                        innerRef={register({
                          required: true,
                        })}
                        placeholder="Color Name"
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">
                Add Color
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};
