import React,{ useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
import useSWR from 'swr';
import { createShipping, editShipping } from '../../api/shipping';
import fetcher from '../../api/fetcher';

const ShippingForm = ({
  isModalOpen,
  dat,
  setShipData,
  isEdit,
  onDiscard,
  onSuccess,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      province: dat?.ward?.municipality?.district?.province?.id,
      district: dat?.ward?.municipality?.district?.id,
      municipality: dat?.ward?.municipality?.id,
      wardId: dat?.ward?.id,
      currency: 'NRS',
      price: dat?.price,
    },
  });

  const province = watch('province');

  const district = watch('district');

  const municipality = watch('municipality');

  const submitButtonRef = useRef();

  const { data: provinces } = useSWR(['/provinces'], fetcher);

  const { data: distrcits } = useSWR(
    province ? [`/provinces/${province}/districts`] : null,
    fetcher,
  );

  const { data: municipalities } = useSWR(
    district ? [`/districts/${district}/municipalities`] : null,
    fetcher,
  );

  const { data: wards } = useSWR(
    municipality ? [`/municipalities/${municipality}/wards`] : null,
    fetcher,
  );

  const onSubmit = (data) => {
    data = {
      currency: 'NRS',
      price: Number(data.price),
      wardId: Number(data.wardId),
    };
    dat.id
      ? editShipping(dat?.id, data).then(() => onSuccess())
      : createShipping(data).then(() => onSuccess());
    setShipData([]);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} size="lg">
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card className="m-3">
              <CardBody>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Province</Label>
                      <Controller
                        name="province"
                        control={control}
                        rules={{ required: 'Province is required' }}
                        as={
                          <Input type="select">
                            <option selected>Select a Province</option>
                            {(provinces ?? []).map((province) => (
                              <>
                                <option
                                  key={province.id}
                                  value={province.id}
                                  defaultValue="Select Province"
                                >
                                  {province.name}
                                </option>
                              </>
                            ))}
                          </Input>
                        }
                      />
                      <small className="text-danger">
                        {errors?.province && errors.province.message}
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>District</Label>
                      <Controller
                        name="district"
                        control={control}
                        rules={{ required: 'District is required' }}
                        as={
                          <Input type="select">
                            {(distrcits ?? []).map((district) => (
                              <option
                                option
                                key={district.id}
                                value={district.id}
                              >
                                {district.name}
                              </option>
                            ))}
                          </Input>
                        }
                      />
                      <small className="text-danger">
                        {errors?.district && errors.district.message}
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Municipality</Label>
                      <Controller
                        name="municipality"
                        control={control}
                        rules={{ required: 'Municipality is required' }}
                        as={
                          <Input type="select">
                            {(municipalities ?? []).map((municipality) => (
                              <option
                                option
                                key={municipality.id}
                                value={municipality.id}
                              >
                                {municipality.name}
                              </option>
                            ))}
                          </Input>
                        }
                      />
                      <small className="text-danger">
                        {errors?.municipality && errors.municipality.message}
                      </small>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Ward</Label>
                      <Controller
                        name="wardId"
                        control={control}
                        rules={{ required: 'Ward is required' }}
                        as={
                          <Input type="select">
                            {(wards ?? []).map((ward) => (
                              <option option key={ward.id} value={ward.id}>
                                {ward.name}
                              </option>
                            ))}
                          </Input>
                        }
                      />
                      <small className="text-danger">
                        {errors?.wardId && errors.wardId.message}
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Currency</Label>
                      <Controller
                        name="currency"
                        control={control}
                        rules={{ required: 'Currency is required' }}
                        as={<Input placeholder="Currency" />}
                      />
                      <small className="text-danger">
                        {errors?.currency && errors.currency.message}
                      </small>
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                      <Label>Price</Label>
                      <Controller
                        name="price"
                        control={control}
                        rules={{ required: 'Price is required' }}
                        as={<Input type="text" />}
                      />
                      <small className="text-danger">
                        {errors.price && errors.price.message}
                      </small>
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
            </Card>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            onClick={() => {
              submitButtonRef.current.click();
            }}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={onDiscard}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ShippingForm;
