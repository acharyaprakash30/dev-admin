import React,{useRef} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { createPushNotification, editPushNotifications } from '../../../components/Push-Notification/services/template';

const PushNotificationTemplateForm = ({
  isModalOpen,
  onDiscard,
  dat,
  setPushData,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      title:dat?.title,
      code:dat?.code,
      status:dat?.status,
      value:dat?.value
    }
  });

  const submitButtonRef = useRef(null);

  const onSubmit = (data) => {
    dat.id ? editPushNotifications(dat?.id,data).then(() => onSuccess()) : createPushNotification(data).then(() => onSuccess());
  };

  const status = [
    {
      id: 1,
      name: 'Active',
    },
    {
      id: 2,
      name: 'InActive',
    },
  ];

  return (
    <>
      <Modal isOpen={isModalOpen} size="xl">
        <ModalBody>
          <Card>
            <CardHeader>Add Push Notification Template</CardHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Title</Label>
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Title is required' }}
                        render={({ field }) => <Input {...field} />}
                      />
                      <small className="text-danger">
                        {errors.title && errors.title.message}
                      </small>
                    </FormGroup>
                  </Col>

                  <Col xs={6}>
                    <FormGroup>
                      <Label>Code</Label>
                      <Controller
                        name="code"
                        control={control}
                        rules={{ required: 'Code is required' }}
                        render={({ field }) => <Input {...field} />}
                      />
                      <small className="text-danger">
                        {errors.code && errors.code.message}
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Value [English]</Label>
                      <Controller
                        name="value"
                        control={control}
                        rules={{ required: 'Value is required' }}
                        render={({ field }) => <Input {...field} />}
                      />
                      <small className="text-danger">
                        {errors.value && errors.value.message}
                      </small>
                    </FormGroup>
                  </Col>

                  <Col xs={6}>
                    <FormGroup>
                      <Label>Status</Label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Status is required' }}
                        render={({ field }) => (
                          <Input type="select" {...field}>
                            {status.map((status) => (
                              <option key={status.id} value={status.id}>
                                {status.name}
                              </option>
                            ))}
                          </Input>
                        )}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <FormGroup>
                  <Button type="submit" innerRef={submitButtonRef} hidden>
                    Submit
                  </Button>
                </FormGroup>
              </CardFooter>
            </Form>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => submitButtonRef.current.click()}
            color="primary"
          >
            Submit
          </Button>
          <Button onClick={onDiscard}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PushNotificationTemplateForm;
