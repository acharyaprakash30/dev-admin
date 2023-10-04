import React, { Fragment, useEffect, useState } from 'react';
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
import Breadcrumb from '../../../layout/breadcrumb';
import actions from '../CategoryVariants/redux/actions';
import categoryActions from '../Category/redux/actions';

const AddCategoryVariants = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm([]);

  const [categories, setCategories] = useState(false);

  useEffect(() => {
    dispatch(actions.getAllVariants());
    dispatch(categoryActions.getCategoryReq());
  }, []);

  const categoriesList = useSelector((state) => state.Category.Category);

  const variants = useSelector((state) => state.CategoryVariant.Variant);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Variant" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Variant Details</h5>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
                <CardBody>
                  <FormGroup className="row">
                    <Select
                      mode="multiple"
                      size={size}
                      placeholder="Please select"
                      defaultValue={['a10', 'c12']}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    >
                      {children}
                    </Select>
                  </FormGroup>
                  <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label">Variant</Label>
                    <Col sm="8">
                      <Input
                        className="form-control"
                        type="select"
                        name="variants_id"
                        innerRef={register({
                          required: true,
                        })}
                        onChange={(e) => {}}
                        placeholder="Variant Name"
                      >
                        <option value="">--Select a Variant --</option>
                        {variants.map((variant, index) => (
                          <option key={index} value={variant.id}>
                            {variant.name}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Variant
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

export default AddCategoryVariants;
