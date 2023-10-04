import React, { useState } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import utility from '../../utils/Utility';

import { Editor } from 'react-draft-wysiwyg';
import { Switch, AutoComplete, Spin } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DateWithTime from './DateWithTime';
import Dropzone from 'react-dropzone-uploader';
import { Cascader, Select } from 'antd';

const { Option } = Select;

const GenerateField = (field, register, errors, id, item) => {
  const errorStyle =
    errors && errors[id] && Object.keys(errors[id])?.includes(field.name)
      ? 'input-danger'
      : '';
  const RequiredMessage = ({ field }) =>
    errors[id] && errors[id][field.name]?.type === 'required' ? (
      <div className="text-danger p-2">This field is required.</div>
    ) : null;

  const PatternMessage = ({ field }) =>
    errors[id] && errors[id][field.name]?.type === 'pattern' ? (
      <div className="text-danger p-2">{field.validationMessage}</div>
    ) : null;

  let defaultValue = field.defaultValue || null;

  if (item && item.data && item.data[id] && item?.data[id][field.label]) {
    defaultValue =
      item !== null ? item?.data[id][field.label] : field.defaultValue;
  }

  const formLabels = (
    <Label
      className={`${field.row === 'row' ? 'col-sm-3 col-form-label' : null}`}
    >
      {' '}
      {/* {utility.capitaliseEachInitial(field?.label)} */}
      {field.label}
    </Label>
  );

  switch (field.inputType.toLowerCase()) {
    case 'text':
      let myData = {};
      if (typeof item == 'undefined') {
        myData.defaultValue =
          (item?.data && item.data[id][field.label]) || field.defaultValue;
      }
      return (
        <>
          <FormGroup
            key={`${field.label}-${field.id}-${JSON.stringify(field.label)})}`}
            className={`${field.row || ''}`}
          >
            {field.row === 'row' ? formLabels : ''}

            <Col sm={field.sm ? field.sm : '9'}>
              {field.row !== 'row' ? formLabels : ''}

              <Input
                className={`form-control ${errorStyle}`}
                name={
                  field.type === 'static'
                    ? `${id}.${field.name}`
                    : `${id}.${field.label}`
                }
                type={field.inputType}
                defaultValue={defaultValue}
                placeholder={field.placeholder}
                innerRef={register({
                  required: field.required,
                  pattern: field.pattern,
                })}
                disabled={field.isDisabled || false}
                {...myData}
              />
              <RequiredMessage field={field} />
              <PatternMessage field={field} />
              <p className="pl-2 text-muted font-italic">{field.helperText}</p>
            </Col>
          </FormGroup>
        </>
      );
    case 'number':
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className={`${field.row || ''}`}
        >
          {field.row === 'row' ? formLabels : ''}
          <Col sm={field.sm ? field.sm : '9'}>
            {field.row !== 'row' ? formLabels : ''}
            <Input
              className={`form-control ${errorStyle}`}
              name={
                field.type === 'static'
                  ? `${id}.${field.name}`
                  : `${id}.${field.label}`
              }
              type={field.inputType}
              placeholder={field.placeholder}
              defaultValue={item?.data[id][field.label] || field.defaultValue}
              innerRef={register({
                required: field.required,
                pattern: field.validationPattern,
              })}
              disabled={field.isDisabled || false}
            />
            <RequiredMessage field={field} />
            <PatternMessage field={field} />
            <p className="pl-2 text-muted font-italic">{field.helperText}</p>
          </Col>
        </FormGroup>
      );
    case 'select':
      // console.log(field.name, field.isDisabled);
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className={`${field.row || ''}`}
        >
          {field.row === 'row' ? formLabels : ''}
          <Col sm={field.sm ? field.sm : '9'}>
            {field.row !== 'row' ? formLabels : ''}
            <Select
              // type={field.inputType}
              name={
                field.type === 'static'
                  ? `${id}.${field.name}`
                  : `${id}.${field.label}`
              }
              style={{ width: '100%' }}
              innerRef={register({
                required: field.required,
              })}
              disabled={field.isDisabled || false}
              placeholder={field.placeholder}
              onChange={(e) => field.onChange(e)}
              defaultValue={field.defaultValue}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {/* {!!field.defaultValue ? (
                <option value={field.defaultValue} selected>
                  {
                    field.options.filter(
                      (option) => option.id === field.defaultValue,
                    )[0]?.name
                  }
                </option>
              ) : (
                <option value="" disabled selected hidden>
                  Please select an option
                </option>
              )} */}
              {field?.options?.map((option) => (
                <Option key={option?.id} value={option?.id}>
                  {option?.name}
                </Option>
              ))}
            </Select>
            <RequiredMessage field={field} />
            <PatternMessage field={field} />
          </Col>
        </FormGroup>
      );
    case 'muti-select-category':
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className={`${field.row || ''}`}
        >
          {field.row === 'row' ? formLabels : ''}

          <Col sm={field.sm ? field.sm : '9'}>
            {field.row !== 'row' ? formLabels : ''}
            {field.form === 'add' && (
              <Cascader
                className="cascader-input w-100"
                defaultValue={field.defaultValue}
                fieldNames={{
                  label: 'name',
                  value: 'id',
                  children: 'children',
                }}
                showSearch={true}
                name={
                  field.type === 'static'
                    ? `${id}.${field.name}`
                    : `${id}.${field.label}`
                }
                onChange={(e) =>
                  field.onChange(e?.length ? e[e?.length - 1] : null)
                }
                notFoundContent="No category found`"
                options={field.options}
                placeholder={'Select a category'}
              />
            )}
            {field.form === 'edit' && field?.defaultValue?.length ? ( // antd cascader loads only on first render so when default value comes al ittle late, it doesnot re-renders
              // so to prevent that we are using loader until the data comes
              <Cascader
                className="cascader-input w-100"
                defaultValue={field?.defaultValue}
                fieldNames={{
                  label: 'name',
                  value: 'id',
                  children: 'children',
                }}
                name={
                  field.type === 'static'
                    ? `${id}.${field.name}`
                    : `${id}.${field.label}`
                }
                onChange={(e) =>
                  field.onChange(e?.length ? e[e?.length - 1] : null)
                }
                notFoundContent="No category found`"
                options={field.options}
                placeholder={'Select a category'}
              />
            ) : (
              field.form === 'edit' && <Spin></Spin>
            )}
          </Col>
        </FormGroup>
      );
    case 'textarea':
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className={`${field.row || ''}`}
        >
          {field.row === 'row' ? formLabels : ''}
          <Col sm={field.sm ? field.sm : '9'}>
            {field.row !== 'row' ? formLabels : ''}
            <div
              style={{
                border: '1px solid #dddddd',
                borderRadius: '3px',
                padding: '10px',
              }}
            >
              <Editor
                wrapperClassName="wizi-editor"
                editorClassName=""
                toolbarClassName="toolbar-class"
                className={`form-control ${errorStyle}`}
                defaultValue={item?.data[id][field.label] || field.defaultValue}
                name={
                  field.type === 'static'
                    ? `${id}.${field.name}`
                    : `${id}.${field.label}`
                }
                type={field.inputType}
                onEditorStateChange={field.handleChange}
                placeholder={field.placeholder}
                innerRef={register({
                  required: field.required,
                  pattern: field.pattern,
                })}
                style={{ overflow: 'hidden' }}
              />
            </div>
            <RequiredMessage field={field} />
            <PatternMessage field={field} />
          </Col>
        </FormGroup>
      );
    case 'checkbox':
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml"
        >
          <div className="checkbox checkbox-primary">
            <Input
              id="inline-1"
              type="checkbox"
              name={
                field.type === 'static'
                  ? `${id}.${field.name}`
                  : `${id}.${field.label}`
              }
              innerRef={register({
                required: field.required,
                pattern: field.pattern,
              })}
              defaultChecked={field.defaultValue || true}
              disabled={field.isDisabled || false}
            />
            <Label for="inline-1">
              {utility.capitaliseEachInitial(field.label)}
            </Label>
          </div>
        </FormGroup>
      );
    case 'toggle':
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className={`${
            field.row || ''
          } mt-4 d-flex px-2 flex-row justify-content-between w-100`}
        >
          <Label
            className={`${
              field.row === 'row' ? 'col-sm-3 col-form-label' : ''
            }`}
          >
            {utility.capitaliseEachInitial(field.label)}
          </Label>
          <Switch
            id="inline-1"
            name={
              field.type === 'static'
                ? `${id}.${field.name}`
                : `${id}.${field.label}`
            }
            defaultChecked={field.defaultValue}
            onChange={field.onChange}
            disabled={field.isDisabled || false}
          />
        </FormGroup>
      );
    case 'dateWithTime'.toLowerCase():
      return (
        <DateWithTime
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          field={field}
          formLabels={formLabels}
          register={register}
          id={id}
          disabled={field.isDisabled || false}
        />
      );
    case 'file':
      return (
        <FormGroup
          key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
          className={`${
            field.row || ''
          } mt-4 d-flex px-2 flex-row justify-content-between w-100`}
        >
          <Label
            className={`${
              field.row === 'row' ? 'col-sm-3 col-form-label' : ''
            }`}
          >
            {utility.capitaliseEachInitial(field.label)}
          </Label>
          <Dropzone
            accept={field.fileType}
            ref={register}
            name={
              field.type === 'static'
                ? `${id}.${field.name}`
                : `${id}.${field.label}`
            }
          />
        </FormGroup>
      );
    case 'autoComplete'.toLowerCase():
      return (
        <>
          <AutoComplete
            key={`${field.label}-${field.id}-${JSON.stringify(field.label)}`}
            ref={register}
          />
        </>
      );
    default:
      return <></>;
  }
};

export default GenerateField;
