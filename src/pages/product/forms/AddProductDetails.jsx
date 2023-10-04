import React from 'react';
import { Col, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import GenerateField from '../../../components/forms/GenerateField';
import productActions from '../redux/action';
import HashLoader from '../../../components/Loaders/HashLoader';

const AddProductDetails = (props) => {
  const formConfig = useSelector((state) => state.Product.formConfig);
  const addProduct = useSelector((state) => state.Product);
  const addedProduct = useSelector(
    (state) => state.Product.addedProduct.product,
  );
  const { errors, register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleUpdate = (data) => {
    const reqObj = {
      data: { ...data },
    };
    dispatch(productActions.addProductDetail(addedProduct.id, reqObj));
  };

  return (
    <>
      {addProduct?.fetching ? <HashLoader /> : null}
      <form>
        {formConfig && formConfig?.length > 0 ? (
          <Col>
            {formConfig.length &&
              formConfig.map((config) => (
                <Card key={config.id}>
                  <CardHeader>
                    <h3>{config.name}</h3>
                  </CardHeader>
                  <CardBody>
                    {config.forms &&
                      config.forms.length &&
                      config.forms.map((field) =>
                        GenerateField(field, register, errors, config.name),
                      )}
                  </CardBody>
                </Card>
              ))}
          </Col>
        ) : null}
        <Col className="d-flex justify-content-end">
          <Button onClick={handleSubmit(handleUpdate)} type="submit">
            {addProduct?.adding ? (
              <Spinner color="primary-color" size="sm" />
            ) : (
              'Save'
            )}
          </Button>
        </Col>
      </form>
    </>
  );
};
export default AddProductDetails;
