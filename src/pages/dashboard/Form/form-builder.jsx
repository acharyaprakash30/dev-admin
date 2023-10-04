import React from 'react';
import { Form } from 'react-bootstrap';
import { Col, Input, Label } from 'reactstrap';

//  DONT change first element (default values in state of edit and add formgroup)
const inputTypes = ['text', 'email', 'select', 'textarea'];
const validators = {
  alphanumericWithoutSpace: '/^[a-zA-Z0-9]*$/',
  digits: '/^d+$/',
  decimalNumbers: '/^d*.d+$/',
  alphanumericWithSpace: '/^[a-zA-Z0-9 ]*$/',
  email: '/^[^s@]+@[^s@]+$/',
};
// --

function camelToTitleCase(str) {
  return str ? str.replace(/[0-9]{2,}/g, (match) => ` ${match} `)
    .replace(/[^A-Z0-9][A-Z]/g, (match) => `${match[0]} ${match[1]}`)
    .replace(
      /[A-Z][A-Z][^A-Z0-9]/g,
      (match) => `${match[0]} ${match[1]}${match[2]}`,
    )
    .replace(/[ ]{2,}/g, (match) => ' ')
    .replace(/\s./g, (match) => match.toUpperCase())
    .replace(/^./, (match) => match.toUpperCase())
    .trim() : '';
}

const FormBuilder = (key, i, form, formgroup, onChangeFormSpec) => {
  let render = null;

  switch (key) {
    case 'inputType':
      render = (
        <Form.Group>
          <Label>Input Type</Label>
          <Input
            type="select" name={key} onChange={e => onChangeFormSpec(e, formgroup.id, form.id)}>
            {inputTypes.map((value, index) =>
              <option key={`option-${index}-${value}`} value={value}>
                {camelToTitleCase(value)}
              </option>
            )}
          </Input>
        </Form.Group>
      );
      break;
    case 'validationPattern':
      render = (
        <Form.Group>
          <Label>Validation Pattern</Label>
          <Input type="select" name={key} onChange={e => onChangeFormSpec(e, formgroup.id, form.id)}>
            {Object.keys(validators).map((value, index) => {
              return (
                <option key={`validators-${index}`} value={validators[value]}>
                  {camelToTitleCase(value)}
                </option>
              );
            })}
          </Input>
        </Form.Group>
      );
      break;
    case 'id':
      render = null;
      break;

    default:
      render = (
        <Form.Group>
          <Label>{camelToTitleCase(key)}</Label>
          <Form.Control
            type="text"
            placeholder={camelToTitleCase(key)}
            name={key}
            value={form[key]}
            onChange={(e) => onChangeFormSpec(e, formgroup.id, form.id)}
          />
        </Form.Group>
      );
      break;
  }

  if (render) {
    return (
      <Col xs={12} sm={6} md={6} lg={4} xl={4} key={key + i}>
        {render}
      </Col>
    );
  }
};
export default FormBuilder;
