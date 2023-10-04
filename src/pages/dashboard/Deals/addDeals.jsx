import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Redirect, useParams } from 'react-router-dom';
import paths from 'route/paths';
import Loading from 'components/ProgressModal/Progress';
import { getDealApi } from 'api/fetchDeals';
import Moment from 'react-moment';

const AddDeals = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  const [dailyFeatured, setDailyFeatured] = useState(false);
  const [onKtmMart, setOnKtmMart] = useState(false);
  const [defineDate, setDefineDate] = useState(false);
  const [defineDiscount, setDefineDiscount] = useState(false);
  const [defineActive, setdefineActive] = useState(false);
  const dealStates = useSelector((state) => state.Deal);
  const [data, setData] = useState(null);

  useEffect(() => {
    getDealApi(id).then((response) => {
      setData(response.data);
    });
  }, [id]);

  useEffect(() => {
    if (data?.dailyFeatured) setDailyFeatured(data?.dailyFeatured);
    if (data?.setDate) setDefineDate(data.setDate);
    if (data?.setDiscount) setDefineDiscount(data.setDiscount);
    if (data?.isActive) setdefineActive(data.isActive);
    if (data?.onKtmMart) setOnKtmMart(data.onKtmMart);
  }, [data]);

  const handleForm = (data) => {
    let newData = {
      name: data.name,
      description: data.description,
      dailyFeatured,
      onKtmMart,
      setDate: defineDate,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      setDiscount: defineDiscount,
      discountValue: Number(data.discountValue),
      discountType: data.discountType,
      isActive: data.isActive,
    };

    const { discountValue, discountType, startDate, endDate, ...rest } =
      newData;

    let finalData = (function (rest) {
      let filteredData = { ...rest };
      if (defineDate) filteredData = { startDate, endDate, ...filteredData };
      if (defineDiscount)
        filteredData = { discountValue, discountType, ...filteredData };
      return filteredData;
    })(rest); //immdieteley invoking anynomous function

    if (id) {
      dispatch(
        actions.updateDealsReq(
          { ...finalData, orderColumn: data.orderColumn },
          id,
        ),
      );
    } else {
      dispatch(actions.sendDealsReq(finalData));
    }
  };

  return (
    <Fragment>
      <Loading
        show={dealStates?.sendDeal?.loading}
        title={'Creating Deal....'}
        type="info"
      />
      <Breadcrumb parent="Form" title={id ? 'Edit Deals' : 'Add Deals'} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Deals Details</h5>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      {/* name */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Deal Name*
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            innerRef={register({
                              required: true,
                            })}
                            placeholder="Deal Name"
                            defaultValue={id ? data?.name : null}
                          />
                        </Col>
                      </FormGroup>
                      {/* description */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Description
                        </Label>
                        <Col sm="8">
                          <Input
                            className="form-control"
                            type="textarea"
                            name="description"
                            innerRef={register({
                              required: true,
                            })}
                            defaultValue={id ? data?.description : null}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          onKtmMart (optional)
                        </Label>
                        <Col sm="8">
                          <Input
                            className="ml-2"
                            type="checkbox"
                            checked={onKtmMart}
                            onChange={() => setOnKtmMart(!onKtmMart)}
                            name="onKtmMart"
                            innerRef={register({})}
                            // defaultChecked={id ? data?.dailyFeatured : false}
                          />
                        </Col>
                      </FormGroup>

                      {/* daily featured */}
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Daily Featured (optional)
                        </Label>
                        <Col sm="8">
                          <Input
                            className="ml-2"
                            type="checkbox"
                            checked={dailyFeatured}
                            onChange={() => setDailyFeatured(!dailyFeatured)}
                            name="dailyFeatured"
                            innerRef={register({})}
                            disabled={onKtmMart}
                            // defaultChecked={id ? data?.dailyFeatured : false}
                          />
                        </Col>
                      </FormGroup>

                      {/* definables */}
                      <div className="border p-3 mb-3 bg-light text-dark">
                        <FormText className="mb-3" color="danger">
                          If not checked, set by Vendor in each product.
                        </FormText>
                        {/* define date */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Set Date(optional)
                          </Label>
                          <Col sm="8">
                            <Input
                              className="ml-2"
                              disabled={dailyFeatured || onKtmMart}
                              checked={!dailyFeatured && defineDate}
                              onChange={() => setDefineDate(!defineDate)}
                              type="checkbox"
                              name="defineDate"
                              innerRef={register({})}
                            />
                          </Col>
                        </FormGroup>
                        {defineDate && !dailyFeatured && (
                          <div className="d-flex justify-content-center bg-white p-3 border mb-4">
                            {/* start date */}
                            <FormGroup className="row">
                              <Label className="col-sm-4 col-form-label">
                                Start Date
                              </Label>
                              <Col sm="8">
                                <Input
                                  className="form-control"
                                  type="datetime-local"
                                  name="startDate"
                                  innerRef={register({
                                    required: defineDate,
                                  })}
                                  defaultValue={
                                    data?.startDate
                                      ? data?.startDate
                                          .toString()
                                          .substring(0, 16)
                                      : null
                                  }
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup className="row ml-4">
                              <Label className="col-sm-4 col-form-label">
                                End Date
                              </Label>
                              <Col sm="8">
                                <Input
                                  className="form-control"
                                  type="datetime-local"
                                  name="endDate"
                                  innerRef={register({ required: defineDate })}
                                  defaultValue={
                                    data?.endDate
                                      ? data?.endDate
                                          .toString()
                                          .substring(0, 16)
                                      : null
                                  }
                                />
                              </Col>
                            </FormGroup>
                          </div>
                        )}

                        {/* define discount */}
                        <FormGroup className="row">
                          <Label className="col-sm-2 col-form-label">
                            Set Discount (optional)
                          </Label>
                          <Col sm="8">
                            <Input
                              className="ml-2"
                              disabled={dailyFeatured}
                              checked={!dailyFeatured && defineDiscount}
                              onChange={() =>
                                setDefineDiscount(!defineDiscount)
                              }
                              type="checkbox"
                              name="defineDiscount"
                              innerRef={register({})}
                            />
                          </Col>
                        </FormGroup>
                        {defineDiscount && !dailyFeatured && (
                          <div className="d-flex justify-content-center bg-white p-3 border">
                            {/* type */}
                            <FormGroup className="row">
                              <Label className="col-sm-4 col-form-label">
                                Type
                              </Label>
                              <Col sm="8">
                                <Input
                                  className="form-control"
                                  type="select"
                                  name="discountType"
                                  innerRef={register({
                                    required: defineDiscount,
                                  })}
                                  defaultValue={data?.discountType}
                                >
                                  <option value="percent">Percent</option>
                                  <option value="flat">Flat</option>
                                </Input>
                              </Col>
                            </FormGroup>
                            {/* discount value */}
                            <FormGroup className="row ml-4">
                              <Label className="col-sm-4 col-form-label">
                                Value
                              </Label>
                              <Col sm="8">
                                <Input
                                  className="form-control"
                                  type="number"
                                  placeholder="discount value"
                                  name="discountValue"
                                  innerRef={register({
                                    required: defineDiscount,
                                  })}
                                  defaultValue={data?.discountValue}
                                />
                              </Col>
                            </FormGroup>
                          </div>
                        )}
                      </div>
                      <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label">
                          Active
                        </Label>
                        <Col sm="8">
                          <Input
                            className="ml-2"
                            type="checkbox"
                            name="isActive"
                            innerRef={register({})}
                            checked={data && defineActive}
                            onChange={() => setdefineActive(!defineActive)}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    {id ? 'Edit Deal' : 'Add Deal'}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddDeals;
