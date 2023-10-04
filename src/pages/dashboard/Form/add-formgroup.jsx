import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
// component
import RenderFormGroup from '.'
// redux
import actions from './redux/actions';

export default () => {
  const formSpecInitial = {
    id: uuid(),
    label: '',
    placeholder: '',
    inputType: 'text',
    helperText: '',
    defaultValue: '',
    validationPattern: 'alphanumericWithoutSpace',
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

  // preview modal
  const [preview, setPreview] = useState(false);
  const toggle = () => setPreview(!preview);
  // category
  const [categoryId, setCategoryId] = useState(null);
  // form
  const [formState, setFormState] = useState({
    category_id: 0,
    formgroups: [formGroupInitial],
  });
  // --- Handle Category selector 
  const handleCategorySelection = (data) => {
    if (data.length > 0) {
      let lastIndex = data.length - 1;
      setCategoryId(data[lastIndex])
    }
  }

  // Form Group Actions
  const addFormGroup = () =>
    setFormState({
      ...formState,
      formgroups: [...formState.formgroups, formGroupInitial],
    });
  const deleteFormGroupHandler = (id) =>
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
  const deleteFormSpecHandler = (formgroup_id, formSpec_id) =>
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

  const submitAddForm = async (e) => {
    e.preventDefault();
    // from useForm hook
    const category_id = await getValues();
    const reobj = {
      ...formState,
      category_id: category_id.parentId,
    };
    // console.log("reobj.category_id: ", reobj.category_id, categoryId);
    dispatch(actions.createFormgroupReq(categoryId, reobj));
  };


  return (
    <RenderFormGroup
      title="Add"
      preview={preview}
      toggle={toggle}
      formState={formState}
      errors={errors}
      editBtnDisabled={categoryId}
      addFormGroup={addFormGroup}
      addFormSpec={addFormSpec}
      deleteFormGroupHandler={deleteFormGroupHandler}
      handleCategorySelection={handleCategorySelection}
      onChangeFormGroup={onChangeFormGroup}
      deleteFormSpecHandler={deleteFormSpecHandler}
      onChangeFormSpec={onChangeFormSpec}
      submitForm={submitAddForm}
    />
  );
}
