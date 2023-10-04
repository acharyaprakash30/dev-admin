import React from 'react';
import { Col, FormGroup } from 'reactstrap';
import Datepicker from 'react-datepicker';

const DateWithTime = ({
  field,
  formLabels,
  register,
  id,
  disabled,
  defaultValue,
}) => {
  const handleChange = (date) => {
    field.handleChange(date);
  };
  return (
    <>
      <FormGroup
        key={`${field.label}-${field.id}`}
        className={`${field.row || ''}`}
      >
        {field.row === 'row' ? formLabels : ''}

        <Col sm={field.sm ? field.sm : '9'}>
          {field.row !== 'row' ? formLabels : ''}

          <Datepicker
            className="form-control digits date-picker-width"
            showPopperArrow={false}
            selected={field.defaultDate}
            onChange={handleChange}
            name={
              field.type === 'static'
                ? `${id}.${field.name}`
                : `${id}.${field.label}`
            }
            showTimeSelect
            dateFormat="Pp"
            disabled={disabled}
            defaultValue={defaultValue}
          />
        </Col>
      </FormGroup>
    </>
  );
};

export default DateWithTime;
