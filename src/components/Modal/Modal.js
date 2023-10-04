import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

const ModalForm = ({ show, close, data, save }) => {
  const { register, handleSubmit } = useForm();
  const handleForm = (data) => {
    save(data);
  };
  return (
    <Fragment>
      <Form className="theme-form">
        <Modal isOpen={show}>
          <ModalHeader>{data.title}</ModalHeader>
          <ModalBody>
            {data.dataObj &&
              Object.entries(data.dataObj).map((keyValArr, i) => {
                return keyValArr[0] !== 'id' ? (
                  <div key={i}>
                    {keyValArr[0] === 'status' ? (
                      <FormGroup key={i} className="row">
                        <Label className="col-sm-3 col-form-label">
                          {keyValArr[0]}
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={keyValArr[1]}
                            className="form-control digits"
                            type="select"
                            name={keyValArr[0]}
                            innerRef={register}
                          >
                            <option value={true}>Active</option>
                            <option value={false}>Not-Active</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    ) : keyValArr[0] === 'permissions' ? (
                      <FormGroup key={i} className="row">
                        <Label className="col-sm-3 col-form-label">
                          {keyValArr[0]}
                        </Label>
                        <Col sm="9">
                          {keyValArr[1].map((permission, i) => (
                            <div className="checkbox">
                              <Input
                                id={permission}
                                name="permissions[]"
                                innerRef={register}
                                type="checkbox"
                                value={permission}
                                checked="checked"
                              />
                              <Label for={permission}>{permission}</Label>
                            </div>
                          ))}
                        </Col>
                      </FormGroup>
                    ) : (
                      <FormGroup key={i} className="row">
                        <Label className="col-sm-3 col-form-label">
                          {keyValArr[0]}
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={keyValArr[1]}
                            className="form-control"
                            type="text"
                            name={keyValArr[0]}
                            innerRef={register}
                          />
                        </Col>
                      </FormGroup>
                    )}
                  </div>
                ) : null;
              })}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={close}>
              Close
            </Button>
            <Button
              onClick={handleSubmit(handleForm)}
              type="submit"
              color="secondary"
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </Fragment>
  );
};

export default ModalForm;
