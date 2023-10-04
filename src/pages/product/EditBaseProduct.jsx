/* eslint-disable no-empty-character-class */
import { Switch } from 'antd';
import {
  convertToRaw,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from 'reactstrap';
// import { fetchFormattedCategory } from '../../api/fetchCategory';
import GenerateField from '../../components/forms/GenerateField';
import draftToHtml from 'draftjs-to-html';
import { getCategoryTree } from '../../helper/utility';
import { getDeepLinkedCategoryByIdApi } from '../../api/fetchCategory';
// import action from './redux/action';
import variantAction from '../productVariants/redux/actions';
import { useParams } from 'react-router-dom';

const EditBaseProduct = (props) => {
  const {
    sDraft,

    setDiscountStartDate,
    setDiscountEndDate,
    setToggleDiscount,
    setLDescDraft,
    lDescDraft,
    setSDraft,
    errors,
    setLongDescription,
    setShortDescription,
    setToggleProductVideo,
    toggleProductVideo,
    setToggleService,
    toggleService,
    register,
    FORM_DATA_VARIABLE,
    WARRANTY_DATA_VARIABLE,
    product,
    setCategoryId,
    setBrandId,
    setTitle,
    setDuration,
    setVideotype,
    videoType,
    title,
    duration,
  } = props;
  const dispatch = useDispatch();
  const params = useParams();
  // const categories = useSelector((state) => state.Product.categories);
  const brands = useSelector((state) => state.Product.brands);
  const variant = useSelector((state) => state.Variant);

  const [categoriesList, setCategoriesList] = useState([]);

  const [categoryTree, setCategoryTree] = useState([]);

  const getEditorState = (data) => {
    const blocksFromHTML = convertFromHTML(data);
    const raw = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    return EditorState.createWithContent(raw);
  };

  useEffect(() => {
    dispatch(variantAction.fetchProductVariant(params.id));
    getDeepLinkedCategoryByIdApi()
      .then(({ data }) => {
        setCategoriesList(data);
      })
      .catch((error) => console.error('ERRORRRR', error));
    if (product?.description) {
      setLongDescription(product.description);
      setLDescDraft(getEditorState(product?.description));
    }
    if (product?.excerpt) {
      setShortDescription(product.excerpt);
      setSDraft(getEditorState(product?.excerpt));
    }
    if (product?.discount) {
      setToggleDiscount(true);
      setDiscountStartDate(new Date(product?.discount?.startDate));
      setDiscountEndDate(new Date(product?.discount?.endDate));
    }
    if (product?.video?.link) {
      setToggleProductVideo(true);
    }
    if (product?.warrantyInfo?.title) {
      setToggleService(true);
    }
  }, []);

  useEffect(() => {
    if (product.id) {
      setCategoryId(product.category_id);
      setBrandId(product.brand_id);
      const tree = getCategoryTree(product.category_id, categoriesList);
      setCategoryTree(tree);
    }
  }, [categoriesList, product]);

  const handleLongDescription = (data) => {
    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    setLDescDraft(data);
    setLongDescription(html);
  };

  const handleShortDescription = (data) => {
    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    setSDraft(data);
    setShortDescription(html);
  };

  let config = [
    {
      label: 'Product Name',
      inputType: 'text',
      name: 'name',
      placeholder: 'Enter product name',
      validationPattern: '',
      type: 'static',
      row: 'row',
      required: true,
      defaultValue: product.name,
    },
    {
      label: 'Category',
      inputType: 'muti-select-category',
      name: 'category_id',
      options: categoriesList,
      placeholder: 'Select category',
      validationPattern: '',
      type: 'static',
      row: 'row',
      form: 'edit',
      required: true,
      defaultValue: categoryTree,
      onChange: (id) => setCategoryId(id),
    },
    {
      label: 'Brand',
      inputType: 'select',
      name: 'brand_id',
      placeholder: 'select brand.',
      validationPattern: '',
      options: brands,
      defaultValue: product.brand_id,
      required: true,
      type: 'static',
      row: 'row',
      onChange: (id) => setBrandId(id),
    },
  ];

  const orderAndVisibility = [
    {
      label: 'Minimum Order Quantity',
      inputType: 'number',
      name: 'minQuantity',
      helperText: 'Eg: 5',
      placeholder: 'Eg: 5',
      validationPattern: /^(\d*([](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
      required: false,
      type: 'static',
      validationMessage: 'Invalid quantity',
      sm: 12,
      defaultValue: product?.minQuantity,
    },
  ];
  //   const Discount = [
  //     {
  //       label: 'Discount Type',
  //       inputType: 'select',
  //       name: 'discountType',
  //       required: toggleDiscount,
  //       type: 'static',
  //       options: [
  //         {
  //           id: 'percent',
  //           name: 'Percent',
  //         },
  //         {
  //           id: 'flat',
  //           name: 'Flat',
  //         },
  //       ],
  //       isDisabled: !toggleDiscount,
  //       sm: 12,
  //       defaultValue: product?.discount?.discountType,
  //     },
  //     {
  //       label: 'Discount',
  //       inputType: 'number',
  //       name: 'discountValue',
  //       helperText: 'Eg:500 or 5',
  //       placeholder: 'Eg: 5',
  //       // validationPattern: /^(\d*([](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
  //       required: false,
  //       type: 'static',
  //       validationMessage: 'Invalid Price',
  //       isDisabled: !toggleDiscount,
  //       defaultValue: product?.discount?.discountValue || 0,
  //       sm: 12,
  //     },
  //     {
  //       label: 'Start Date',
  //       inputType: 'dateWithTime',
  //       name: 'startDate',
  //       required: false,
  //       type: 'static',
  //       defaultDate: discountStartDate,
  //       handleChange: (date) => setDiscountStartDate(date),
  //       isDisabled: !toggleDiscount,
  //       sm: 12,
  //       defaultValue: product?.discount?.startDate,
  //     },
  //     {
  //       label: 'End Date',
  //       inputType: 'dateWithTime',
  //       name: 'endDate',
  //       helperText: 'Eg: 5',
  //       placeholder: 'Eg: 5',
  //       required: false,
  //       type: 'static',
  //       defaultValue: '1',
  //       defaultDate: discountEndDate,
  //       handleChange: (date) => setDiscountEndDate(date),
  //       isDisabled: !toggleDiscount,
  //       sm: 12,
  //     },
  //   ];
  const productPricing = [
    {
      label: 'Purchase Price',
      inputType: 'number',
      name: 'retailPrice',
      placeholder: 'Eg: Rs 350',
      helperText: 'Your price for this product.',
      validationMessage: 'Price is invalid',
      validationPattern: /^(\d*([](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
      required: false,
      type: 'static',
      defaultValue: product?.retailPrice,
      sm: 12,
    },
    {
      label: 'MRP',
      inputType: 'number',
      name: 'salePrice',
      helperText: 'Customer buying price.',
      placeholder: 'Eg: Rs 500',
      validationPattern: /^(\d*([](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
      validationMessage: 'Price is invalid',
      required: false,
      type: 'static',
      defaultValue: product?.salePrice,
      sm: 12,
    },
  ];

  // const PdfSpecification = [
  //   {
  //     inputType: 'file',
  //     name: 'pdf',
  //     validationPattern: '',
  //     type: 'static',
  //     row: 'row',
  //     required: false,
  //     sm: 12,
  //     fileType: '.pdf',
  //   },
  // ];

  const ProductVideos = [
    {
      label: 'Video Provider',
      inputType: 'select',
      name: 'videoType',
      options: [
        {
          id: 'youtube',
          name: 'Youtube',
        },
        {
          id: 'vimeo',
          name: 'Vimeo',
        },
      ],
      validationPattern: '',
      type: 'static',
      row: 'row',
      required: false,
      isDisabled: !toggleProductVideo,
      onChange: (id) => setVideotype(id),
      defaultValue: product?.video?.type,
    },
    {
      label: 'Link',
      inputType: 'text',
      name: 'videoLink',
      helperText: '',
      required: false,
      type: 'static',
      placeholder: 'http://youtube.com/..',
      row: 'row',
      defaultValue: product?.video?.link,
      isDisabled: !toggleProductVideo,
    },
  ];

  const Services = [
    {
      label: 'Warranty Type',
      inputType: 'select',
      name: 'title',
      placeholder: 'Select Warranty type',
      options: [
        {
          id: 'local',
          name: 'Local Seller Warranty',
        },
        {
          id: 'none',
          name: 'No Warranty',
        },
        {
          id: 'brand',
          name: 'Brand Warranty',
        },
      ],
      validationPattern: '',
      type: 'static',
      row: 'row',
      required: false,
      defaultValue: product?.warrantyInfo?.title,
      onChange: (id) => setTitle(id),
      isDisabled: !toggleService,
    },
    {
      label: 'Warranty Period',
      inputType: 'select',
      name: 'duration',
      helperText: '',
      required: false,
      type: 'static',
      placeholder: 'Select warranty period',
      row: 'row',
      isDisabled: !toggleService,
      options: [
        {
          id: '1',
          name: '1 Months',
        },
        {
          id: '2',
          name: '2 Months',
        },
        {
          id: '3',
          name: '3 Months',
        },
        {
          id: '4',
          name: '6 Months',
        },
        {
          id: '5',
          name: '12 Months',
        },
      ],
      onChange: (id) => setDuration(id),
      defaultValue: product?.warrentyInfo?.duration,
    },
    {
      label: 'Warranty Policy',
      inputType: 'Text',
      name: 'policy',
      helperText: '',
      required: false,
      type: 'static',
      isDisabled: !toggleService,
      defaultValue: product?.warrantyInfo?.policy,
      placeholder: 'Type Policy here',
      row: 'row',
    },
  ];

  return (
    <Fragment>
      <Container className="addProduct-card" fluid={true}>
        <Form>
          <Row>
            <Col className="col-md-9 col-lg-9">
              <Card>
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                  <h6>Basic Product Information</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      {
                        // categoryTree.length &&
                        brands.length &&
                          config.map((field) =>
                            GenerateField(
                              field,
                              register,
                              errors,
                              FORM_DATA_VARIABLE,
                            ),
                          )
                      }
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card className="description-short">
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                  <h6>Short Description</h6>
                </CardHeader>
                <CardBody className="p-0">
                  <Row>
                    <Col sm="12">
                      <Editor
                        editorState={sDraft}
                        wrapperClassName="wizi-editor"
                        toolbarClassName="toolbar-class"
                        className={`form-control`}
                        name="excerpt"
                        onEditorStateChange={handleShortDescription}
                        style={{ overflow: 'hidden' }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card className="description-long">
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                  <h6>Long Description</h6>
                </CardHeader>
                <CardBody className="p-0">
                  <Row>
                    <Col sm="12">
                      <Editor
                        editorState={lDescDraft}
                        wrapperClassName="wizi-editor"
                        toolbarClassName="toolbar-class"
                        editorClassName={'editor-long'}
                        className={`form-control`}
                        name="description"
                        onEditorStateChange={handleLongDescription}
                        style={{ overflow: 'hidden' }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card id="videoCard">
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3 justify-content-between">
                  <h6>Product Video</h6>
                  <Switch
                    checked={toggleProductVideo}
                    onChange={() => setToggleProductVideo(!toggleProductVideo)}
                  />
                </CardHeader>
                <CardBody className={toggleProductVideo ? '' : 'disabled'}>
                  <Row>
                    <Col sm="12">
                      {ProductVideos.map((field) =>
                        GenerateField(
                          field,
                          register,
                          errors,
                          FORM_DATA_VARIABLE,
                        ),
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader
                  className={`d-flex w-100 py-0 pb-1 pt-3 justify-content-between`}
                >
                  <h6>Services</h6>
                  <Switch
                    checked={toggleService}
                    onChange={() => setToggleService(!toggleService)}
                  />
                </CardHeader>
                <CardBody className={toggleService ? '' : 'disabled'}>
                  <Row>
                    <Col sm="12">
                      {Services.map((field) =>
                        GenerateField(
                          field,
                          register,
                          errors,
                          WARRANTY_DATA_VARIABLE,
                        ),
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* <Card>
              <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                <h6>PDF Specification</h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    {PdfSpecification.map((field) =>
                      GenerateField(
                        field,
                        register,
                        errors,
                        FORM_DATA_VARIABLE,
                      ),
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card> */}
            </Col>
            <Col md="3" lg="3">
              <Card>
                <CardBody className="px-0 pt-3">
                  <CardHeader className="py-0 pb-1">
                    <h6>Product Pricing</h6>
                  </CardHeader>
                  <CardBody className="p-0 pt-3">
                    {productPricing.map((field) =>
                      GenerateField(
                        field,
                        register,
                        errors,
                        FORM_DATA_VARIABLE,
                      ),
                    )}
                  </CardBody>
                </CardBody>
              </Card>
              {/* <Card>
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3 justify-content-between">
                  <h6>Discount</h6>
                  <Switch
                    checked={toggleDiscount}
                    onChange={() => setToggleDiscount(!toggleDiscount)}
                  />
                </CardHeader>
                <CardBody
                  className={!toggleDiscount ? 'disabled p-0 pt-3' : 'p-0 pt-3'}
                >
                  <Row>
                    <Col sm="12">
                      {Discount.map((field) =>
                        GenerateField(
                          field,
                          register,
                          errors,
                          DISCOUNT_DATA_VARIABLE,
                        ),
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>*/}
              <Card>
                <CardBody className="px-0 pt-3">
                  <CardHeader className="py-0 pb-3">
                    <h6>Order Quantity & visibility</h6>
                  </CardHeader>
                  <CardBody className="p-0 pt-3">
                    {orderAndVisibility.map((field) =>
                      GenerateField(
                        field,
                        register,
                        errors,
                        FORM_DATA_VARIABLE,
                      ),
                    )}
                  </CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default EditBaseProduct;
