import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { SendMessage } from 'constant';
import { Redirect } from 'react-router-dom';
import { BannerPosition } from 'constant/BannerPosition';
import Imageupload from 'components/upload/ImageUploader';
import paths from 'route/paths';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import action from './redux/actions';
import ShowMessage from 'components/Toast/Toast';
import { Cascader, message } from 'antd';
import 'antd/dist/antd.css';
import catActions from '../Category/redux/actions';
import { allCategoryList } from 'utils';
import DealAction from '../Deals/redux/actions';

export default React.memo(() => {
  let dispatch = useDispatch();
  const [redirect, setredirect] = useState(false);
  const [fileList, setFileList] = useState(false);
  const [allcategoryList, setallCategory] = useState(null);
  const [bannerRedirect, setBannerRedirect] = useState(false);
  const [bannerRedirectOption, setBannerRedirectOption] = useState('deal');
  const [directURLValue, setDirectURLValue] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { register, handleSubmit } = useForm();
  const [currentDeal, setCurrentDeal] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [form, setForm] = useState({
    section: 'top-section',
    position: 'top-section-link',
    buttonTitle: '',
    agent: 'web',
    isActive: false,
    modelUrl: {},
  });

  const changeHandler = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  let Images = [];

  const submitForm = (e) => {
    e.preventDefault();
    form.isActive = isActive;
    if (bannerRedirect && bannerRedirectOption === 'deal' && currentDeal) {
      form.modelUrl.modelName = 'deal';
      form.modelUrl.modelId = currentDeal;
    }

    if (
      bannerRedirect &&
      bannerRedirectOption === 'category' &&
      currentCategory
    ) {
      form.modelUrl.modelName = 'category';
      form.modelUrl.modelId = currentCategory;
    }

    if (bannerRedirect && bannerRedirectOption === 'direct' && directURLValue) {
      form.modelUrl = {};
      form.directUrl = directURLValue;
    }

    if (bannerRedirect && !form.modelUrl.modelId && !form.directUrl) {
      ShowMessage(500, 'Please Enter Valid Redirect Value.');
      return;
    }
    dispatch(
      action.createBanner({
        ...form,
        images: fileList?.length > 0 ? fileList.map((image) => image.url) : [],
      }),
    );
    setredirect(true);
  };

  // --- Handle Category selector
  const handleCategorySelection = (data) => {
    if (data.length > 0) {
      let lastIndex = data.length - 1;
      setCurrentCategory(data[lastIndex]);
    }
  };

  const getBannerPosition = (value) => {
    if (!BannerPosition) return [];
    let section = BannerPosition.find((section) => section.value === value);

    if (!section.Types) return [];

    return section.Types;
  };

  useEffect(() => {
    if (bannerRedirect && bannerRedirectOption === 'deal')
      dispatch(action.getDealsReq());
  }, [bannerRedirect, bannerRedirectOption]);

  const DealData = useSelector((state) => state.Deal);
  const Deals = DealData?.Deals;
  const formattedCategory = useSelector((state) => state.Category.list);

  useEffect(() => {
    dispatch(catActions.getCategoryWithChild());
    dispatch(DealAction.getDealsReq());
  }, []);

  useEffect(() => {
    if (Array.isArray(formattedCategory)) {
      let category = allCategoryList(formattedCategory);
      setallCategory(category);
    }
  }, [formattedCategory]);

  const addBannerState = useSelector((state) => state.Banner?.createBanner);
  // console.log("addBannerState: ", {addBannerState});
  if (addBannerState?.success && redirect) {
    return <Redirect to={paths.allBanner} />;
  }

  return (
    <>
      <Breadcrumb parent="Form" title="Add Banner" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Banner</h5>
              </CardHeader>
              <Form className="form theme-form" onSubmit={submitForm}>
                <CardBody>
                  <Row>
                    <Col>
                      {/* agent */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Section
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="select"
                            placeholder="Page"
                            name="section"
                            onChange={changeHandler}
                          >
                            {BannerPosition.map((section) => {
                              return (
                                <option value={section.value}>
                                  {section.name}
                                </option>
                              );
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      {/* page */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Position
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="select"
                            placeholder="Position"
                            name="position"
                            required={true}
                            value={form.position}
                            onChange={changeHandler}
                            disabled={
                              !getBannerPosition(form.section) ||
                              getBannerPosition(form.section).length === 0
                            }
                          >
                            <option value="">Select Position</option>
                            {getBannerPosition(form.section)?.map(
                              (position) => {
                                return (
                                  <option value={position.value}>
                                    {position.name}
                                  </option>
                                );
                              },
                            )}
                          </Input>
                        </Col>
                      </FormGroup>
                      {/* button title */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Button Title
                        </Label>
                        <Col sm="9">
                          <FormGroup>
                            <Input
                              className="form-control"
                              type="text"
                              placeholder="'upto 30% off, Big Sale'"
                              name="buttonTitle"
                              value={form.buttonTitle}
                              onChange={changeHandler}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      {/* agent */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Agent</Label>
                        <Col sm="9">
                          <FormGroup>
                            <Input
                              className="form-control"
                              type="select"
                              placeholder="Page"
                              name="agent"
                              value={form.agent}
                              onChange={changeHandler}
                            >
                              <option value="web">Web</option>
                              <option value="mobile">Mobile</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      {/* active */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Active
                        </Label>
                        <Col sm="9">
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                name="isActive"
                                value={isActive}
                                checked={isActive}
                                onChange={() => {
                                  setIsActive(!isActive);
                                }}
                              />
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      {/* image */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Image</Label>
                        <Col sm="9">
                          <Imageupload
                            maxImageUpload={5}
                            url={paths.assetManager} //url
                            editImg={false}
                            aspectRatioX={786}
                            aspectRatioY={500}
                            setFileList={setFileList} //state to set all uploaded file
                            Images={fileList ? fileList : []} // send currnt images if there are any
                          />
                        </Col>
                      </FormGroup>

                      {/* redirect */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Redirect
                        </Label>
                        <Col sm="9">
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                value={bannerRedirect}
                                checked={bannerRedirect}
                                onChange={() => {
                                  setBannerRedirect(!bannerRedirect);
                                }}
                              />
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      {bannerRedirect ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Choose Redirect Options
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="select"
                              placeholder="Position"
                              name="generateURL"
                              value={bannerRedirectOption}
                              onChange={(e) =>
                                setBannerRedirectOption(e.target.value)
                              }
                            >
                              <option value="deal">Deals</option>
                              <option value="category">Category</option>
                              <option value="direct">Input URL</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      ) : null}

                      {bannerRedirect && bannerRedirectOption === 'direct' ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Direct URL
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="text"
                              name="directURL"
                              innerRef={register}
                              placeholder="Enter a URL"
                              onChange={(e) =>
                                setDirectURLValue(e.target.value)
                              }
                            />
                          </Col>
                        </FormGroup>
                      ) : null}

                      {bannerRedirect && bannerRedirectOption === 'category' ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Choose Category
                          </Label>
                          <Col sm="9">
                            {Array.isArray(formattedCategory) &&
                            formattedCategory?.length > 0 ? (
                              <Cascader
                                fieldNames={{
                                  label: 'label',
                                  value: 'value',
                                  // children: 'children'
                                }}
                                className="form-control border-0 w-100"
                                onChange={handleCategorySelection}
                                notFoundContent="No category found`"
                                options={allcategoryList}
                                placeholder="Select a category"
                                showSearch
                                defaultValue={currentCategory}
                              />
                            ) : (
                              <Spinner></Spinner>
                            )}
                          </Col>
                        </FormGroup>
                      ) : null}

                      {bannerRedirect && bannerRedirectOption === 'deal' ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Choose Deals
                          </Label>
                          <Col sm="9">
                            {DealData?.loading ? (
                              <Spinner color="primary" />
                            ) : null}
                            {DealData?.error
                              ? 'Error Loading Deals Data'
                              : null}
                            {DealData?.success && !Deals
                              ? 'No Deals Aviable'
                              : null}

                            {Deals ? (
                              <Input
                                className="form-control"
                                type="select"
                                placeholder="Position"
                                name="position"
                                value={currentDeal}
                                onChange={(e) => {
                                  setCurrentDeal(e.target.value);
                                }}
                              >
                                <option>Please choose a deal</option>

                                {Deals?.map((deal) => {
                                  return (
                                    <option value={deal?.id}>
                                      {deal?.name}
                                    </option>
                                  );
                                })}
                              </Input>
                            ) : null}
                          </Col>
                        </FormGroup>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button
                    color="primary"
                    className="mr-1"
                    type="submit"
                    style={{ width: '150px', height: '42px' }}
                  >
                    {addBannerState?.loading ? (
                      <Spinner color="light mr-1" />
                    ) : (
                      'Add Banner'
                    )}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
});
