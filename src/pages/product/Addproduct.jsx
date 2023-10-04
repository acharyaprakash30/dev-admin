import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CardFooter,
} from 'reactstrap';
import UploadImage from '../../components/upload/UploadImage';

const AddProduct = (props) => {
  const getFiles = (files) => {};

  return (
    <Fragment>
      <Breadcrumb parent="Products" title="Add Product" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Product Details</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Product Name
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            placeholder="Product Name"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          description
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            placeholder="description"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Price</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="number"
                            placeholder="Price"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Category
                        </Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            name="select"
                            className="form-control digits"
                            defaultValue="1"
                          >
                            <option>shoes</option>
                            <option>clothes</option>
                            <option>watch</option>
                            <option>grocery</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <div>
                          <UploadImage
                            height={200}
                            width="100%"
                            getUploadData={getFiles}
                            title="Upload product Thumbnail"
                            isMultiple={true}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="mr-1">
                    Add Product
                  </Button>
                  <Button color="light" type="reset">
                    Cancel
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

export default AddProduct;
