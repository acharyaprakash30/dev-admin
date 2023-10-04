import React, { Fragment, useState, useEffect } from 'react';
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
import catActions from '../Category/redux/actions';
import varActions from './redux/actions';
import { Select } from 'antd';
import AddVariantOptions from './addVariantOptions';
import ShowMessage from '../../../components/Toast/Toast';

const AddVariants = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { handleSubmit } = useForm([]);
  let orphanCategory = [];

  function getAllCategoryChildren(categorylist) {
    categorylist.map((category) => {
      if (category.children) {
        getAllCategoryChildren(category.children);
      } else {
        orphanCategory = [...orphanCategory, category];
      }
    });
    return orphanCategory;
  }

  const formattedCategory = getAllCategoryChildren(
    useSelector((state) => state.Category.list),
  );

  const [formState, setFormState] = useState({
    name: '',
    variantOptions: [], // changed from tag component
    categories: [],
  });
  // state iterations
  const changeNameHandler = ({ target: { value } }) =>
    setFormState({ ...formState, name: value });
  const addCategory = (valueId) =>
    setFormState({
      ...formState,
      categories: [...formState.categories, ...valueId],
    });
  // iterations for variantOptions from child component
  const deleteInputTag = (removedTag) => {
    const variantOptions = formState.variantOptions.filter(
      (option) => option !== removedTag,
    );
    setFormState({ ...formState, variantOptions });
  };
  const addVariantOptions = (variantOptions) =>
    setFormState({ ...formState, variantOptions });
  const editVariantOptions = (variantOptions) =>
    setFormState({ ...formState, variantOptions });

  // --

  function submitForm() {
    if (
      !formState.name ||
      !formState.variantOptions.length ||
      !formState.categories.length
    ) {
      throw ShowMessage(500, 'All fields are required');
    }
    dispatch(varActions.addVariantReq(formState));
  }

  // get categories with children
  useEffect(() => {
    dispatch(catActions.getCategoryWithChild());
  }, []);

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
              <Form onSubmit={handleSubmit(submitForm)} className="theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      {/* variant name */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Variant
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={changeNameHandler}
                            placeholder="Variant Name"
                          />
                        </Col>
                      </FormGroup>
                      {/* variant option selection */}
                      <FormGroup className="row">
                        <Label className="col-md-2 col-form-label">
                          Variant Options
                        </Label>
                        <Col md="8">
                          <AddVariantOptions
                            options={formState.variantOptions}
                            handleClose={deleteInputTag}
                            addInputTag={addVariantOptions}
                            editInputTag={editVariantOptions}
                          />
                        </Col>
                      </FormGroup>
                      {/* category selection */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Category
                        </Label>
                        <Col sm="8">
                          <Select
                            mode="multiple"
                            placeholder="Please select"
                            onChange={addCategory}
                            style={{ width: '100%' }}
                          >
                            {formattedCategory.map((category) => (
                              <Option value={category.id} key={category.id}>
                                {category.name}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
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

export default AddVariants;
