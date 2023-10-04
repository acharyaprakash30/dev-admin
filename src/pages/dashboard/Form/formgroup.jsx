import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import { v4 as uuid } from 'uuid';
import Breadcrumb from '../../../layout/breadcrumb';
import catActions from '../Category/redux/actions';
import PreviewModal from './form-preview-modal';
// components
import FormAccordion from './form-specification-accordion';
import actions from './redux/actions';

export default () => {

  const formSpecInitial = {
    id: uuid(),
    label: '',
    placeholder: '',
    inputType: '',
    helperText: '',
    defaultValue: '',
    validationPattern: '',
    validationMessage: '',
  };

  const formGroupInitial = {
    id: uuid(),
    name: '',
    order_position: 0,
    forms: [formSpecInitial],
  };

  const dispatch = useDispatch();
  const { errors, getValues } = useForm();
  // category
  const formattedCategory = useSelector(state => state.Category.list);

  const [categoryId, setCategoryId] = useState(null);

  // form
  const [formState, setFormState] = useState({
    category_id: 0,
    formgroups: [formGroupInitial],
  });
  // preview modal
  const [preview, setPreview] = useState(false);
  const toggle = () => setPreview(!preview);


  useEffect(() => dispatch(catActions.getCategoryWithChild()), [])


  // Form Group Actions

  const addFormGroup = () =>
    setFormState({
      ...formState,
      formgroups: [...formState.formgroups, formGroupInitial],
    });

  const deleteFormGroup = (id) =>
    setFormState({
      ...formState,
      formgroups: formState.formgroups.filter(
        (formgroup) => formgroup.id !== id,
      ),
    });

  const onChangeFormGroup = ({ target: { name, value } }, id) =>
    setFormState({
      ...formState,
      formgroups: formState.formgroups.map((formgroup) => {
        if (formgroup.id === id) {
          return {
            ...formgroup,
            [name]: value,
          };
        } else {
          return formgroup;
        }
      }),
    });

  // --

  // Form Spec Actions
  const addFormSpec = (formgroup_id) =>
    setFormState({
      ...formState,
      formgroups: formState.formgroups.map((formgroup) => {
        if (formgroup.id === formgroup_id) {
          // add a form spec in formgroup_id
          return {
            ...formgroup,
            forms: [...formgroup.forms, formSpecInitial],
          };
        } else {
          return formgroup;
        }
      }),
    });

  const deleteFormSpec = (formgroup_id, formSpec_id) =>
    setFormState({
      ...formState,
      formgroups: formState.formgroups.map((formgroup) => {
        if (formgroup.id === formgroup_id) {
          // delete formSpec with id
          return {
            ...formgroup,
            forms: formgroup.forms.filter(
              (formSpec) => formSpec.id !== formSpec_id,
            ),
          };
        } else {
          return formgroup;
        }
      }),
    });

  const onChangeFormSpec = (
    { target: { name, value } },
    formgroup_id,
    formSpec_id,
  ) =>
    setFormState({
      ...formState,
      formgroups: formState.formgroups.map((formgroup) => {
        if (formgroup.id === formgroup_id) {
          return {
            ...formgroup,
            // map through all forms of formgroup_id
            forms: formgroup.forms.map((form) => {
              if (form.id === formSpec_id) {
                return {
                  ...form,
                  [name]: value,
                };
              } else {
                return form;
              }
            }),
          };
        } else {
          return formgroup;
        }
      }),
    });


  // --

  const submitForm = async (e) => {
    e.preventDefault();
    // from useForm hook
    const category_id = await getValues();

    const reobj = {
      ...formState,
      category_id: category_id.parentId,
    };
    dispatch(actions.createFormgroupReq(reobj.category_id, reobj));
  };


  // --- Handle cascader

  const handleCategorySelection = (data) => {
    if (data.length > 0) {
      let lastIndex = data.length - 1;
      setCategoryId(data[lastIndex])
    }
  }


  return (
    <>
      <Breadcrumb parent="Users" title="FormGroup Details" />
      <Container fluid={true}>
        {/* category cascade menu */}
        <Card className="pt-4 px-4">
          <h5>Select Category</h5>
          <div className="my-4" style={{ width: '20em' }}>
            <Cascader
              fieldNames={{
                label: 'name',
                value: 'id',
                children: 'children'
              }}
              defaultValue={categoryId}
              className="form-control border-0"
              onChange={handleCategorySelection}
              notFoundContent="No category found`"
              options={formattedCategory}
              placeholder="Select a category"
            />
          </div>

        </Card>
        {/* formgroup details */}
        <Row>
          <Col sm="12">
            <Card className="pt-4 px-4">
              <h5>Add Formgroup</h5>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      {/* render form from state */}
                      {formState.formgroups.map((formgroup, i) => {
                        return (
                          <div key={formgroup.id}>
                            {/* formgroup name */}
                            <FormGroup className="row">
                              <Label className="col-sm-3 col-form-label">
                                FormGroup Name
                              </Label>
                              <Col sm="9">
                                <Row>
                                  <Col sm="10">
                                    <Input
                                      className="form-control"
                                      type="text"
                                      name="name"
                                      value={formgroup.name}
                                      onChange={(e) =>
                                        onChangeFormGroup(e, formgroup.id)
                                      }
                                      placeholder="eg. Dimension / Size"
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
                                  <Col sm="2">
                                    <Button
                                      color="danger"
                                      className="mr-1"
                                      onClick={() =>
                                        deleteFormGroup(formgroup.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </FormGroup>
                            {/* formgroup order */}
                            <FormGroup className="row">
                              <Label className="col-sm-3 col-form-label">
                                Order
                              </Label>
                              <Col sm="9">
                                <Input
                                  className="form-control"
                                  type="number"
                                  name="order_position"
                                  value={formgroup.order_position || i + 1}
                                  onChange={(e) =>
                                    onChangeFormGroup(e, formgroup.id)
                                  }
                                  placeholder="order"
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
                            </FormGroup>
                            {/* form specification */}
                            <FormAccordion
                              formgroup={formgroup}
                              addFormSpec={addFormSpec}
                              deleteFormSpec={deleteFormSpec}
                              onChangeFormSpec={onChangeFormSpec}
                            />
                            <hr />
                          </div>
                        );
                      })}
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button className="py-3" color="success" onClick={addFormGroup} size="lg">
                      <i className="fa fa-plus"></i> {'  '}
                      Add FormGroup
                    </Button>
                  </div>
                </CardBody>
                {/* footer */}
                <CardFooter>
                  <Button className="mr-4" color="dark" outline={true} onClick={toggle}>
                    Preview FormGroup
                  </Button>
                  <Button color="primary" type="submit" onClick={submitForm}>
                    Submit Form
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
        <PreviewModal toggle={toggle} preview={preview} formState={formState} />
      </Container>
    </>
  );
}
