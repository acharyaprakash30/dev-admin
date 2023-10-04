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

const AddCoupons = (props) => {
  useEffect(() => {
    dispatch(catActions.getCategoryWithChild());
    dispatch(DealAction.getDealsReq());
  }, []);

  const formattedCategory = useSelector((state) => state.Category.list);
  const [allcategoryList, setallCategory] = useState(null);
  const [selectedCatList, setselectedCatList] = useState([]);
  const [type, setType] = useState('');
  const [couponType, setCouponType] = useState('');

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
    dispatch(actions.sendCouponsReq(data));
  };

  const handleCategorySelection = (data) => {
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

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Coupons" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Coupon Details</h5>
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
                            {/* <option value="productCoupon">
                              Product Coupon
                            </option> */}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Coupon Value
                        </Label>
                        <Col sm="9">
                          <Input
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
                            className="form-control"
                            type="number"
                            placeholder="Eg: 100"
                            defaultValue={1}
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
                    Add Coupon
                  </Button>
                  <Button color="light" type="reset">
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

export default AddCoupons;
