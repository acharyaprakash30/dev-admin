import { Select } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  Row
} from 'reactstrap';
import axios from '../../../api/axios';
import Breadcrumb from '../../../layout/breadcrumb';
import catActions from '../Category/redux/actions';
import varActions from './redux/actions';
// components
import EditVariantOptions from './editVariantOptions';
import ShowMessage from '../../../components/Toast/Toast';
const EditVariants = () => {
  const { Option } = Select;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm([]);
  let orphanCategory = [];

  const [originalState, setOrginalState] = useState({
    name: '',
    variantOptions: [], // changed from tag component
    categories: [],
  });

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

  const updateCategory = async (ids) => {
    // filter original state not in mutatedState ie. formState
    const toDeleteCategoryId = originalState.categories.find(
      (cat_id) => !ids.includes(cat_id),
    );
    if (toDeleteCategoryId) {
      // delete categoryVariant of categoryand variant
      await axios.delete(`category-variants/${toDeleteCategoryId}/${id}`);
    }
    setFormState({
      ...formState,
      categories: [...ids],
    });
  };

  // iterations for variantOptions from child component
  const deleteInputTag = async (removedTag) => {
    const toDeleteRemovedTag = originalState.variantOptions.find(
      (option) => option.name === removedTag,
    );
    if (toDeleteRemovedTag) {
      await axios.delete(`variant-options/${toDeleteRemovedTag.id}`);
    }

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
    dispatch(varActions.editVariantReq(id, formState));
  }

  // get categories with children
  useEffect(() => {
    axios.get(`variants/${id}`).then(({ data }) => {
      setFormState({
        ...formState,
        name: data.name,
        variantOptions: data.variantOptions.map(({ name }) => name),
        categories: data.categories,
      });

      setOrginalState({
        ...formState,
        name: data.name,
        variantOptions: [...data.variantOptions],
        categories: data.categories,
      });
    });

    dispatch(catActions.getCategoryWithChild());
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Edit Variant" />
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
                          <EditVariantOptions
                            options={formState.variantOptions}
                            handleClose={deleteInputTag}
                            addInputTag={addVariantOptions}
                            editInputTag={editVariantOptions}
                          />
                        </Col>
                      </FormGroup>
                      {/* category selection */}
                      <Select
                        mode="multiple"
                        placeholder="Please select"
                        onChange={updateCategory}
                        style={{ width: '100%' }}
                        value={formState.categories}
                      >
                        {formattedCategory.map((category) => (
                          <Option value={category.id} key={category.id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Submit Edit
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

export default EditVariants;
