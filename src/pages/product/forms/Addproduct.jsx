import { Switch } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from 'reactstrap';
import { fetchFormattedCategory } from '../../../api/fetchCategory/index';
import GenerateField from '../../../components/forms/GenerateField';
import LoaderButton from '../../../components/LoaderButton/LoaderButton';
import Breadcrumb from '../../../layout/breadcrumb';
import productActions from '../redux/action';
import draftToHtml from 'draftjs-to-html';
// import ShopActions from '../../Shops/redux/actions';
import TextArea from 'antd/lib/input/TextArea';

const FORM_DATA_VARIABLE = 'xdg123';

const DISCOUNT_DATA_VARIABLE = 'xdiscountz123';

const AddProduct = () => {
  // const params = useParams();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const addProduct = useSelector((state) => state?.Product);
  const brands = useSelector((state) => state?.Product?.brands);
  const shops = useSelector((state) => state?.Shop?.Shop);
  const addedProduct = useSelector(
    (state) => state.Product.addedProduct?.product,
  );
  const [categoriesList, setCategoriesList] = useState([]);
  const [discountStartDate, setDiscountStartDate] = useState(new Date());
  const [discountEndDate, setDiscountEndDate] = useState(new Date());
  const [toggleDiscount, setToggleDiscount] = useState(false);

  const [lDescDraft, setLDescDraft] = useState(EditorState.createEmpty());
  const [sDraft, setSDraft] = useState(EditorState.createEmpty());

  const [longDescription, setLongDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [categoryId, setCategoryId] = useState([]);
  // const [shopId, setShopId] = useState('');
  const [brand_id, setBrandId] = useState('');

  const handleForm = (formData) => {
    let data = formData[FORM_DATA_VARIABLE];
    let discount = formData[DISCOUNT_DATA_VARIABLE];
    // discount.startDate = discountStartDate;
    // discount.endDate = discountEndDate;
    // discount.discount_value = Number(discount.discount_value);
    let addproductDTO = {
      ...data,
      video: {
        link: data.videoLink,
        type: data.videoType,
      },
      salePrice: Number(data.salePrice),
      retailPrice: Number(data.retailPrice),
      category_id: Number(categoryId),
      brand_id: Number(brand_id) || null,
      // shop_id: Number(params.id),
      minQuantity: Number(data.minQuantity),
      // slug: slugify(`${data.name}-${brand_id}-${categoryId}`),
      excerpt: shortDescription,
      description: longDescription,
      discount,
    };

    if (!toggleDiscount) {
      delete addproductDTO.discount;
    }
    delete addproductDTO.videoType;
    delete addproductDTO.videoLink;
    dispatch(productActions.addProduct(addproductDTO));
  };

  const fetchRequiredData = useRef();

  fetchRequiredData.current = () => {
    dispatch(productActions.getCategory());
    dispatch(productActions.getBrand());
    // dispatch(ShopActions.fetchShopReq());
    fetchCategory();
  };

  const fetchCategory = () => {
    fetchFormattedCategory()
      .then(({ data }) => {
        setCategoriesList(data);
      })
      .catch((error) => console.error('Error', error));
  };

  useEffect(() => {
    fetchRequiredData.current();
    return () => {
      dispatch(productActions.clearAddedProduct());
    };
  }, []);

  const handleLongDescription = (data) => {
    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    setLDescDraft(data);
    setLongDescription(html);
  };

  const handleShotDescription = (data) => {
    setShortDescription(data.target.value);
  };

  const config = [
    {
      label: 'Product Name',
      inputType: 'text',
      name: 'name',
      placeholder: 'Enter product name',
      validationPattern: '',
      type: 'static',
      row: 'row',
      required: true,
    },
    {
      label: 'Category',
      inputType: 'muti-select-category',
      name: 'category_id',
      options: categoriesList,
      placeholder: 'Select category',
      validationPattern: '',
      type: 'static',
      form: 'add',
      row: 'row',
      required: true,
      onChange: (id) => setCategoryId(id),
    },
    {
      label: 'Brand',
      inputType: 'select',
      name: 'brand_id',
      placeholder: 'select brand.',
      validationPattern: '',
      options: brands,
      defaultOption: 'none',
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
      defaultValue: '1',
      validationMessage: 'Invalid quantity',
      sm: 12,
    },
  ];
  // const Discount = [
  //   {
  //     label: 'Discount Type',
  //     inputType: 'select',
  //     name: 'discountType',
  //     required: toggleDiscount,
  //     type: 'static',
  //     options: [
  //       {
  //         id: 'percent',
  //         name: 'Percent',
  //       },
  //       {
  //         id: 'flat',
  //         name: 'Flat',
  //       },
  //     ],
  //     isDisabled: !toggleDiscount,
  //     sm: 12,
  //   },
  //   {
  //     label: 'Discount',
  //     inputType: 'number',
  //     name: 'discount_value',
  //     helperText: 'Eg:500 or 5',
  //     placeholder: 'Eg: 5',
  //     validationPattern: /^(\d*([](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
  //     required: toggleDiscount,
  //     type: 'static',
  //     validationMessage: 'Invalid Price',
  //     isDisabled: !toggleDiscount,
  //     defaultValue: 0,
  //     sm: 12,
  //   },
  //   {
  //     label: 'Start Date',
  //     inputType: 'dateWithTime',
  //     name: 'startDate',
  //     required: toggleDiscount,
  //     type: 'static',
  //     defaultValue: '1',
  //     defaultDate: discountStartDate,
  //     handleChange: (date) => setDiscountStartDate(date),
  //     isDisabled: !toggleDiscount,
  //     sm: 12,
  //   },
  //   {
  //     label: 'End Date',
  //     inputType: 'dateWithTime',
  //     name: 'endDate',
  //     helperText: 'Eg: 5',
  //     placeholder: 'Eg: 5',
  //     required: toggleDiscount,
  //     type: 'static',
  //     defaultValue: '1',
  //     defaultDate: discountEndDate,
  //     handleChange: (date) => setDiscountEndDate(date),
  //     isDisabled: !toggleDiscount,
  //     sm: 12,
  //   },
  // ];
  const productPricing = [
    {
      label: 'Purchase Price',
      inputType: 'number',
      name: 'retailPrice',
      placeholder: 'Eg: Rs 350',
      helperText: 'Your price for this product.',
      validationMessage: 'Price is invalid',
      validationPattern: /^(\d*([](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
      required: true,
      type: 'static',
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
      required: true,
      type: 'static',
      sm: 12,
    },
  ];

  return (
    <Fragment>
      <Container className="addProduct-card" fluid={true}>
        <Form onSubmit={handleSubmit(handleForm)}>
          <Breadcrumb parent="Product" title="Add Product" />
          <Row>
            <Col className="col-md-9 col-lg-9">
              <Card>
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                  <h6>Basic Product Information</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      {config.map((field) =>
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
              <Card className="description-short">
                <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                  <h6>Short Description (Max Character=156)</h6>
                </CardHeader>
                <CardBody className="p-0">
                  <Row>
                    <Col sm="12">
                      {/* <Editor
                        editorState={sDraft}
                        wrapperClassName="wizi-editor"
                        toolbarClassName="toolbar-class"
                        className={`form-control`}
                        name="excerpt"
                        onEditorStateChange={handleShortDescription}
                        style={{ overflow: 'hidden' }}
                      /> */}
                      <TextArea
                        className="form-control"
                        name="excerpt"
                        rows={4}
                        maxLength={156}
                        onChange={handleShotDescription}
                      ></TextArea>
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
                        className={`form-control`}
                        name="description"
                        onEditorStateChange={handleLongDescription}
                        style={{ overflow: 'hidden' }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
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
                    defaultChecked={toggleDiscount}
                    onChange={() => setToggleDiscount(!toggleDiscount)}
                  />
                </CardHeader>
                <CardBody
                  className={!toggleDiscount ? 'disabled p-0 pt-3' : 'p-0 pt-3'}
                >
                  {/* <Row>
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
                  </Row> */}
              {/* </CardBody>
              </Card> 
              */}
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
              <LoaderButton
                style={{ width: '100%', height: '3.4em', marginBottom: '2em' }}
                title="Continue"
                type="submit"
                isLoading={addProduct?.adding}
              ></LoaderButton>
            </Col>
          </Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
