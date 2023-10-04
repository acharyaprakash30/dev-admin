import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
// components
import RenderFormGroup from '.'
// redux
import actions from './redux/actions';
import { getFormReq } from '../../../api/fetchForm';
import axios from '../../../api/axios'

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
  function checkAndAddForms(formgroups) {
    const newArr = formgroups.map(formgroup => {
      if (!formgroup.forms) {
        return { ...formgroup, forms: [formSpecInitial] }
      } else {
        return formgroup
      }
    })
    return newArr;
  }

  const dispatch = useDispatch();
  const { errors } = useForm();

  // preview modal
  const [preview, setPreview] = useState(false);
  const toggle = () => setPreview(!preview);
  // category
  const [categoryId, setCategoryId] = useState(null);
  // form
  const [formState, setFormState] = useState({
    category_id: 0,
    formgroups: [],
  });
  const deleteFormGroup = id => setFormState({
    ...formState,
    formgroups: formState.formgroups.filter(
      (formgroup) => formgroup.id !== id,
    ),
  })
  const deleteFormSpec = (formgroup_id, formSpec_id) => setFormState({
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

  // to compare original form list with mutated state
  const [originalFormGroups, setOriginalFormGroups] = useState({
    formgroups: [],
  })

  // --- Handle Category selector 
  const handleCategorySelection = async (cat_data) => {
    let lastIndex;
    if (cat_data.length > 0) {
      lastIndex = cat_data.length - 1;
      setCategoryId(cat_data[lastIndex]);
      // --- api call
      dispatch(actions.getFormDataByCategory(cat_data[lastIndex]));
    }
    const { data } = await getFormReq(cat_data[lastIndex]);

    // save for comparison on delete trigger
    setOriginalFormGroups({
      ...formState,
      formgroups: [...data],
    })

    const newArr = checkAndAddForms(data);
    // save for iteration
    setFormState({
      ...formState,
      formgroups: [...newArr],
    });


  };

  // Form Group Actions
  const addFormGroup = () =>
    setFormState({
      ...formState,
      formgroups: [...formState.formgroups, formGroupInitial],
    });
  const deleteFormGroupHandler = (id) => {
    const findFormGroupInOriginal = originalFormGroups.formgroups.find(formgroup => id === formgroup.id);
    if (findFormGroupInOriginal) {
      // delete in db
      axios.delete(`category-form-groups/${id}`)
        .then(res => deleteFormGroup(id))
        .catch(error => alert('some error deleting formgroup'))
    }
    else {  // mutate only state
      deleteFormGroup(id);
    }
  }
  const onChangeFormGroup = ({ target: { name, value } }, id) => setFormState({
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
  const addFormSpec = (formgroup_id) => setFormState({
    ...formState,
    formgroups: formState.formgroups.map((formgroup) => {
      if (formgroup.id === formgroup_id) {
        // add a form spec in formgroup_id
        if (formgroup.forms) {
          // if form exists
          return {
            ...formgroup,
            forms: [...formgroup.forms, formSpecInitial],
          };
        } else {
          formgroup.forms = formSpecInitial;
        }
      } else {
        return formgroup;
      }
    }),
  });
  const deleteFormSpecHandler = (formgroup_id, formSpec_id) => {
    const findOriginalFormGroup = originalFormGroups.formgroups.find(formgroup => formgroup_id === formgroup.id);
    const findOriginalForm = findOriginalFormGroup && findOriginalFormGroup.forms
      ? findOriginalFormGroup.forms.find(form => form.id === formSpec_id)
      : null;

    if (findOriginalFormGroup && findOriginalForm) {
      // delete in db
      axios.delete(`/category-form/${formSpec_id}`)
        .then(res => deleteFormSpec(formgroup_id, formSpec_id))
        .catch(error => alert('some error deleting form specification'))
    } else {
      // mutate only in state
      deleteFormSpec(formgroup_id, formSpec_id);
    }
  }
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

  const submitEditForm = async (e) => {
    e.preventDefault();
    const { formgroups } = formState;
    dispatch(actions.editFormgroupReq({ formgroups, category_id: categoryId }));
  };

  return (
    <RenderFormGroup
      title="Edit"
      preview={preview}
      toggle={toggle}
      formState={formState}
      errors={errors}
      addFormGroup={addFormGroup}
      addFormSpec={addFormSpec}
      deleteFormGroupHandler={deleteFormGroupHandler}
      deleteFormSpecHandler={deleteFormSpecHandler}
      handleCategorySelection={handleCategorySelection}
      onChangeFormGroup={onChangeFormGroup}
      deleteFormSpecHandler={deleteFormSpecHandler}
      onChangeFormSpec={onChangeFormSpec}
      submitForm={submitEditForm}
      editBtnDisabled={categoryId}
    />
  );
};
