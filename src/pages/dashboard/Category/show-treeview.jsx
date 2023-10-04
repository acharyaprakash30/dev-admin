import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
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
  Row,
} from 'reactstrap';
import { fetchFormattedCategory } from '../../../api/fetchCategory';

import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';

const ShowCategoryTreeView = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [formattedCategory, setFormattedCategory] = useState([]);

  useEffect(() => {
    fetchFormattedCategory().then((res) => {
      setFormattedCategory(res.data);
    });
  }, []);
  useEffect(() => {
    dispatch(actions.getCategoryReq());
  }, []);
  const handleForm = (data) => {
    const reqObj = {
      ...data,
      parentId: Number(data.parentId),
    };
    if (!reqObj.parentId) {
      delete reqObj.parentId;
    }
    dispatch(actions.addCategoryReq(reqObj));
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Category" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="pb-2">
                <h5>Category Details</h5>
                <p>
                  Fill the form to create a new category.{' '}
                  <small>
                    {' '}
                    Select a parent of the category to create a sub-categories
                  </small>
                </p>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Category Name
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Category Name"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Description
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="description"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="description"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Col sm="8">
                          <div style={{ minHeight: '10vh' }}></div>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Category
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

export default ShowCategoryTreeView;
