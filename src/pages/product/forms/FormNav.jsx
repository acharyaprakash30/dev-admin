import React, { Fragment } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Row } from 'reactstrap';

const FormNav = (props) => {
  return (
    <Row className="stepForm-header">
      {Array.from({ length: props.totalSteps }, (step, index) => (
        <Fragment key={`${props.steps[index].name}}`}>
          <span>
            <h6
              className={
                index + 1 === props.currentStep
                  ? 'step-name-active'
                  : 'step-name'
              }
            >
              {props.steps[index].name}
            </h6>
            <span
              className={
                index + 1 < props.currentStep
                  ? 'stepForm-header-icon-checked'
                  : `stepForm-header-icon${
                      index + 1 === props.currentStep ? '-active' : ''
                    }`
              }
            >
              {index + 1 < props.currentStep ? (
                <FiCheckCircle className="check-icon" />
              ) : (
                <span
                  className={
                    props.currentStep === index + 1 ? 'effect-ripple' : 'circle'
                  }
                ></span>
              )}
            </span>
          </span>
          <span
            className={
              index + 1 < props.currentStep
                ? 'stepForm-header-line-checked'
                : 'stepForm-header-line'
            }
          ></span>
        </Fragment>
      ))}
    </Row>
  );
};
export default FormNav;
