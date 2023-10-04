import React from 'react';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

export default React.memo(({ preview, toggle, formState }) => (
  <Modal isOpen={preview} toggle={toggle}>
    <ModalHeader toggle={toggle}>FormGroup Preview</ModalHeader>
    <ModalBody>
      {formState.formgroups.map((formgroup, i) => (
        <div key={formgroup.id}>
          <Label>
            <h6>
              {i + 1}) {formgroup.name || 'Form is empty'}
            </h6>
          </Label>
          <br />
          {formgroup.forms &&
            formgroup.forms.map((form) => (
              <div className="ml-4" key={form.id}>
                <Label>
                  {form.label ? `-> ${form.label} (${form.inputType})` : null}
                </Label>
              </div>
            ))}
        </div>
      ))}
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle} outline={true}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
));
