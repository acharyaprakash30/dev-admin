import React from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { Button as ButtonStrap, Container, Row } from 'reactstrap';
import formBuilder from './form-builder';
function FormSpecAccordion({
  formgroup,
  onChangeFormSpec,
  addFormSpec,
  deleteFormSpec,
}) {
  return (
    <Accordion defaultActiveKey="0">
      <Card className="bg-dark no-border">
        <Accordion.Toggle
          as={Button}
          variant=""
          eventKey="0"
          className="text-left"
        >
          <h6 className="text-white mt-1">{`${formgroup.name.toUpperCase()}_`}Fields</h6>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="bg-light text-dark">
            {/* take each form object */}
            {formgroup.forms &&
              formgroup.forms.map((form, i) => (
                <div className="p-1" key={form.id}>
                  {/* numbering and delete btn */}
                  <div className="d-flex">
                    <h6>{form[i]}</h6>
                  </div>
                  {/* form specification */}
                  <Row className="active-form p-4 border mb-2">
                    {Object.keys(form).map((key) =>
                      formBuilder(key, i, form, formgroup, onChangeFormSpec),
                    )}
                    <div className="ml-auto mr-2 my-2">
                      <ButtonStrap
                        color="danger"
                        onClick={() => deleteFormSpec(formgroup.id, form.id)}
                      >
                        <i className="fa fa-trash"></i> {'  '}
                        Delete
                      </ButtonStrap>
                    </div>
                  </Row>
                </div>
              ))}

            {/* Add Form Button */}
            <div className="mb-2 text-center">
              <ButtonStrap
                color="success"
                onClick={() => addFormSpec(formgroup.id)}
              >
                <i className="fa fa-plus"></i> Add Field
              </ButtonStrap>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default React.memo(FormSpecAccordion);
