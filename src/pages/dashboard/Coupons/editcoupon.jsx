import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CardFooter,
} from 'reactstrap';
import axios from 'axios';
import actions from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Cascader, message, Tag } from 'antd';
import catActions from '../Category/redux/actions';
import { allCategoryList } from 'utils';
import DealAction from '../Deals/redux/actions';
import { useHistory, useParams } from 'react-router-dom';

const EditCoupon = (props) => {
  const { push } = useHistory();

  const { id } = useParams();

  const [type, setType] = useState('');
  const [couponType, setCouponType] = useState('');
  const [couponData, setCouponData] = useState();

  useEffect(() => {
    dispatch(catActions.getCategoryWithChild());
    dispatch(DealAction.getDealsReq());
  }, []);

  const formattedCategory = useSelector((state) => state.Category.list);
  const [allcategoryList, setallCategory] = useState(null);
  const [selectedCatList, setselectedCatList] = useState([]);

  // current coupon data
  let selectorResult = useSelector((state) => state.Coupons.Coupons);

  useEffect(() => {
    const coupon = selectorResult?.find((value) => value.id === Number(id));
    setCouponData(coupon);

  }, [id]);

  useEffect(() => {
    setType(couponData?.type);
    setCouponType(couponData?.couponType);
    setselectedCatList(couponData?.categoriesId ?? []);
  }, [couponData]);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleForm = (data, e) => {
    data.maxPrice = +data.maxPrice;
    data.minPrice = +data.minPrice;
    data.couponValue = +data.couponValue;
    data.maxCount = +data.maxCount;
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    if (type === 'categoryCoupon') {
      data.categoriesId = selectedCatList;
    }
    dispatch(actions.editCouponsReq(id, data));
  };

  const handleCategorySelection = (data) => {
    console.log('new select ?  ', data);
    if (data?.length > 0) {
      if (!selectedCatList.includes(data[0])) {
        setselectedCatList([...selectedCatList, data[0]]);
      } else {
        return message.error('Category already selected');
      }
    }
  };

  const handleRemoveCat = (e, data) => {
    e.preventDefault();
    setselectedCatList(selectedCatList.filter((item) => item !== data));
  };

  useEffect(() => {
    if (Array.isArray(formattedCategory)) {
      let category = allCategoryList(formattedCategory);
      setallCategory(category);
    }
  }, [formattedCategory]);

  console.log('coupon dat a ? ', couponData);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Edit Coupon" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Edit Coupon Details</h5>
              </CardHeader>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Coupon Code
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={couponData?.code ?? null}
                            className="form-control"
                            type="text"
                            placeholder="Eg: CB20OFF"
                            innerRef={register({
                              required: true,
                            })}
                            name="code"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Reedem Type
                        </Label>
                        <Col sm="9">
                          <Input
                            value={type}
                            type="select"
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                            innerRef={register({
                              required: true,
                            })}
                            className="form-control digits"
                          >
                            <option value="Percent">Percent</option>
                            <option value="Amount">Amount</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Choose Coupon Type
                        </Label>
                        <Col sm="9">
                          <Input
                            value={couponType}
                            type="select"
                            name="couponType"
                            onChange={(e) => setCouponType(e.target.value)}
                            innerRef={register({
                              required: true,
                            })}
                            className="form-control digits"
                          >
                            <option value="">Choose Coupon Type</option>
                            <option value="voucherCoupon">
                              Voucher Coupon
                            </option>
                            <option value="categoryCoupon">
                              Category Coupon
                            </option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Coupon Value
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={couponData?.couponValue ?? null}
                            className="form-control"
                            type="number"
                            placeholder="Eg: 25"
                            innerRef={register({
                              required: true,
                            })}
                            name="couponValue"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Max use of Coupon
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={couponData?.maxCount ?? null}
                            className="form-control"
                            type="number"
                            placeholder="Eg: 100"
                            innerRef={register({
                              required: true,
                            })}
                            name="maxCount"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Start Date
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={
                              couponData?.startDate
                                ? couponData?.startDate?.slice(0, 16)
                                : null
                            }
                            className="form-control"
                            type="datetime-local"
                            name="startDate"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          End Date
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={
                              couponData?.endDate
                                ? couponData?.endDate?.slice(0, 16)
                                : null
                            }
                            className="form-control"
                            type="datetime-local"
                            name="endDate"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Min Price
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={couponData?.minPrice ?? null}
                            className="form-control"
                            type="number"
                            placeholder="Eg: 1000"
                            name="minPrice"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Max Price
                        </Label>
                        <Col sm="9">
                          <Input
                            defaultValue={couponData?.maxPrice ?? null}
                            className="form-control"
                            type="number"
                            placeholder="Eg: 10000"
                            name="maxPrice"
                            innerRef={register({
                              required: true,
                            })}
                          />
                        </Col>
                      </FormGroup>
                      {type == 'categoryCoupon' ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Category
                          </Label>
                          <Col sm="9">
                            <Cascader
                              fieldNames={{
                                label: 'label',
                                value: 'value',
                              }}
                              className="form-control border-0 w-100"
                              onChange={handleCategorySelection}
                              notFoundContent="No category found`"
                              options={allcategoryList}
                              placeholder="Select a category"
                            />
                            {selectedCatList?.length > 0 &&
                              selectedCatList.map((item, i) => (
                                <Tag
                                  className="mt-2"
                                  closable
                                  onClose={(e) => handleRemoveCat(e, item)}
                                >
                                  {
                                    allcategoryList.filter(
                                      (cat) => cat.value === item,
                                    )[0]?.label
                                  }
                                </Tag>
                              ))}
                          </Col>
                        </FormGroup>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="mr-1">
                    Save Coupon
                  </Button>
                  <Button
                    color="light"
                    type="reset"
                    onClick={() => push('../../coupons')}
                  >
                    Cancel
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

export default EditCoupon;
