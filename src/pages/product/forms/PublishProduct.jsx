import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productAction from '../redux/action';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { useHistory } from 'react-router';

const PublishProduct = (props) => {
  const [status, setStatus] = useState(true);
  const product = useSelector((state) => state.Product);
  const history = useHistory();
  const dispatch = useDispatch();
  const handlePublish = () => {
    dispatch(
      productAction.editProduct(product?.addedProduct?.product?.id, {
        isActive: status,
      }),
    );
  };
  if (product?.message === 'Product Updated Successfully') {
    props.goToStep(product.goTo);
    history.push('/products');
  }

  return (
    <>
      <Form className="theme-form">
        <Card>
          <CardHeader title="Product Image" />
        </Card>
        <Card>
          <CardBody>
            <FormGroup className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
              <div className="checkbox checkbox-primary">
                <Input
                  id="inline-1"
                  type="checkbox"
                  onChange={() => setStatus(!status)}
                  defaultChecked={status}
                />
                <Label for="inline-1">Publish Product</Label>
              </div>
            </FormGroup>
            <div className="w-100 d-flex justify-content-end">
              <Button onClick={handlePublish} color="primary" className="mr-1">
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </Form>
    </>
  );
};

export default PublishProduct;
