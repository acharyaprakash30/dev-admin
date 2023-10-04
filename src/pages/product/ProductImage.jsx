import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from 'reactstrap';
import Imageupload from './upload/ImageUpload';
import productAction from './redux/action';

const ProductImage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.Product.editProduct);

  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="shadow-none">
              <CardHeader>
                <h5>Add Media</h5>
                <span>Upload Image</span>
              </CardHeader>
              <CardBody style={{ width: '100%' }}>
                <div>
                  <Imageupload multiple={true} id={product?.id} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductImage;
