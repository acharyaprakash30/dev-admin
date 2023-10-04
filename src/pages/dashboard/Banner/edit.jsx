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
import { useParams } from 'react-router';
import { BannerPosition } from 'constant/BannerPosition';
import Imageupload from 'components/upload/ImageUploader';
import paths from 'route/paths';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import action from "./redux/actions";
import DealAction from '../Deals/redux/actions'
import ShowMessage from 'components/Toast/Toast';
import { Cascader, message, Select } from 'antd';
import "antd/dist/antd.css";
import catActions from '../Category/redux/actions';
import { allCategoryList } from 'utils';


 const EditBanner=() => {
  const { id } = useParams();
  let dispatch = useDispatch();
  const [fileList, setFileList] = useState(false);
  const [allcategoryList, setallCategory] = useState(null);
  const { register, handleSubmit } = useForm();
  const [bannerRedirect, setBannerRedirect] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [bannerRedirectOption, setBannerRedirectOption] = useState(null);
  const [directURLValue, setDirectURLValue] = useState(null);
  const [currentDeal, setCurrentDeal] = useState(null);
  const [currentCategory, setCurrentCategory] = useState([]);
  /**For edit */
  useEffect(() => {
    dispatch(action.readBanner());
    dispatch(DealAction.getDealsReq())
  }, []);


  const readBannerState = useSelector((state) => state.Banner.readBanner);
  let currentBanner = readBannerState ? readBannerState.data.filter(banner => parseInt(banner.id) === parseInt(id)) : [];
  currentBanner = currentBanner[0];
  const [form, setForm] = useState();

  console.log(currentBanner);

  useEffect(() => {
    if (currentBanner) {
      setForm({
        ...form,
        section: !!currentBanner ? currentBanner?.section : 'top-section',
        position: !!currentBanner ? currentBanner?.position : 'top-section-link',
        agent: !!currentBanner ? currentBanner?.agent : 'web',
        isActive: !!currentBanner ? currentBanner?.isActive === "Yes" : false,
        modelUrl: !!currentBanner && currentBanner?.modelUrl ? currentBanner?.modelUrl : {},
        buttonTitle: !!currentBanner ? currentBanner?.buttonTitle : '',
        //directUrl: !!currentBanner ? currentBanner?.directUrl : ''
      });
      let Images = currentBanner?.images ? currentBanner?.images.map(image => {
        return {url: image}
      }) : []
      setFileList(Images);

      setBannerRedirect((!!currentBanner?.directUrl || !!(currentBanner?.modelUrl?.modelId)));
      setIsActive(currentBanner?.isActive === true);
      setBannerRedirectOption(!!currentBanner.modelUrl?.modelName ? currentBanner.modelUrl?.modelName : "direct");
    }
  }, [currentBanner])

  useEffect(()=> {
    if(bannerRedirectOption){
      if (currentBanner?.id && bannerRedirectOption === "deal") setCurrentDeal(currentBanner?.modelUrl?.modelId ? parseInt(currentBanner?.modelUrl?.modelId) : -1);
      if (currentBanner?.id && bannerRedirectOption === "category"){
        console.log(currentBanner?.modelUrl?.modelId);
        setCurrentCategory(currentBanner?.modelUrl?.modelId ? [parseInt(currentBanner?.modelUrl?.modelId)] : [-1]);
      } 
      if (bannerRedirectOption === "direct") setDirectURLValue(currentBanner?.directUrl ? currentBanner?.directUrl : '');
    }
  },[bannerRedirectOption,currentBanner])

  const changeHandler = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  }



  const submitForm = (e) => {
    e.preventDefault();
    form.isActive = isActive;
    if (bannerRedirect && bannerRedirectOption === "deal" && currentDeal) {
      form.modelUrl.modelName = 'deal';
      form.modelUrl.modelId = currentDeal;
    }

    if (bannerRedirect && bannerRedirectOption === "category" && currentCategory) {
      form.modelUrl.modelName = 'category';
      form.modelUrl.modelId = currentCategory[0];
    }

    if (bannerRedirect && bannerRedirectOption === "direct" && directURLValue) {
      form.modelUrl = {}
      form.directUrl = directURLValue === null ? '' : directURLValue;
    }

    if (bannerRedirect && !form?.modelUrl?.modelId && !form?.directUrl) {
      ShowMessage(500, 'Please Enter Valid Redirect Value.');
      return;
    }

    if(fileList && fileList.length){
      form.images = fileList.map(image=> image?.url);
    } else{
      form.images = [];
    }
    dispatch(action.updateBanner(id, form));
  }

  // --- Handle Category selector 
  const handleCategorySelection = (data) => {
    // console.log(data);
    if (data?.length > 0) {
      let currentCat = data[data?.length-1]
      setCurrentCategory([currentCat]);
    }
  }

  const getBannerPosition = (value) => {
    if (!BannerPosition) return [];
    let section = BannerPosition.find(section => section.value === value);
    if (!section || !section?.Types) return [];
    return section?.Types;
  }

  useEffect(() => {
    if (bannerRedirect && bannerRedirectOption === "deal") dispatch(action.getDealsReq());
  }, [bannerRedirect, bannerRedirectOption]);

  const DealData = useSelector(state => state?.Deal);
  const Deals = DealData?.Deals;
  const formattedCategory = useSelector((state) => state?.Category?.list);
  useEffect(() => dispatch(catActions.getCategoryWithChild()), [])

  useEffect(() => {
    if (Array.isArray(formattedCategory)) {
      let category = allCategoryList(formattedCategory);
      setallCategory(category);
    }
  }, [formattedCategory])

  const updateBannerState = useSelector(state => state.Banner?.updateBanner);


  return (
    <>
      <Breadcrumb parent="Form" title="Edit Banner" />
      <Container fluid={true}>
        {
          currentBanner && currentCategory ? 
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Edit Banner</h5>
              </CardHeader>
              <Form className="form theme-form" onSubmit={submitForm}>
                <CardBody>
                  <Row>
                    <Col>
                      {/* agent */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Section</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="select"
                            placeholder="Page"
                            name="section"
                            onChange={changeHandler}
                            value={form?.section}
                          >
                            {BannerPosition.map((section) => {
                              return <option value={section.value}>{section.name}</option>
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      {/* page */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Position</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="select"
                            placeholder="Position"
                            name="position"
                            required="true"
                            value={form?.position}
                            onChange={changeHandler}
                            disabled={!getBannerPosition(form?.section) || getBannerPosition(form?.section).length === 0}
                          >
                            <option value="">Select Value</option>
                            {form?.section && getBannerPosition(form?.section)?.map((position) => {
                              return <option value={position.value}>{position.name}</option>
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      {/* agent */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Agent
                        </Label>
                        <Col sm="9">
                          <FormGroup >
                            <Input
                              className="form-control"
                              type="select"
                              placeholder="Page"
                              name="agent"
                              value={form?.agent}
                              onChange={changeHandler}
                            >
                              <option value="web">Web</option>
                              <option value="mobile">Mobile</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      {/* button title */}
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Button Title
                        </Label>
                        <Col sm="9">
                          <FormGroup >
                            <Input
                              className="form-control"
                              type="text"
                              placeholder="'upto 30% off, Big Sale'"
                              name="buttonTitle"
                              value={form?.buttonTitle}
                              onChange={changeHandler}
                            >
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
                                value={form?.isActive}
                                checked={isActive}
                                onChange={() => { setIsActive(!isActive) }}
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
                                onChange={() => { setBannerRedirect(!bannerRedirect); }}
                              />
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      {bannerRedirect ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">Choose Redirect Options</Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="select"
                              placeholder="Position"
                              name="generateURL"
                              value={bannerRedirectOption}
                              onChange={(e) => setBannerRedirectOption(e.target.value)}
                            >
                              <option value="deal">Deals</option>
                              <option value="category">Category</option>
                              <option value="direct">Input URL</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      ) : null}

                      {bannerRedirect && bannerRedirectOption === "direct" ? (
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
                              onChange={(e) => setDirectURLValue(e.target.value)}
                            />
                          </Col>
                        </FormGroup>
                      ) : null}

                      {bannerRedirect && bannerRedirectOption === "category"  ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Choose Category
                          </Label>
                          <Col sm="9">
                            {
                             currentCategory?.length >0 &&  Array.isArray(allcategoryList) && allcategoryList?.length>0  ?
                                 <Cascader
                                 fieldNames={{
                                    label: 'label',
                                    value: 'value',
                                    // children: 'children'
                                  }}
                                  className="form-control border-0 w-100"
                                  onChange={handleCategorySelection}
                                  notFoundContent="No category found`"
                                  options={[{label:"Select Category",value:-1},...allcategoryList]}
                                  placeholder="Select a category"
                                  showSearch
                                  defaultValue={currentCategory}
                                  />:
                                  <Spinner></Spinner>
                                
                            }
                          </Col>
                        </FormGroup>
                      ) : null}

                      {bannerRedirect && bannerRedirectOption === "deal" ? (
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Choose Deals
                          </Label>
                          <Col sm="9">
                            {DealData?.loading ? <Spinner color="primary" /> : null}
                            {DealData?.error ? "Error Loading Deals Data" : null}
                            {DealData?.success && !Deals ? "No Deals Aviable" : null}
                            {Deals ? (

                              <Input
                                className="form-control"
                                type="select"
                                placeholder="Position"
                                name="position"
                                value={currentDeal}
                                onChange={(e) => { setCurrentDeal(e.target.value) }}
                              >
                                <option value={-1}>Please choose a deal</option>
                                {Deals?.length> 0 && Deals?.map((deal) => {
                                  return <option value={deal?.id}>{deal?.name}</option>
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
                  <Button color="primary" className="mr-1" type="submit" onClick={handleSubmit}>
                    {updateBannerState?.loading ? <Spinner color="light mr-1" /> : "Update Banner"}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
        : <Spinner></Spinner>
        }
      </Container>
    </>
  );
};

export default EditBanner;
