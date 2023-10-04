import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import productAction from './redux/action';
import variantActions from '../productVariants/redux/actions';
import Breadcrumb from '../../layout/breadcrumb';
import progressAction from '../../components/ProgressModal/Redux/actions';
import {
  Col,
  Container,
  Row,
  Spinner,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import EditBaseProduct from './EditBaseProduct';
import AddVarinats from '../productVariants/AddVariant';
import EditProduct from './EditProduct';
import Imageupload from './upload/ImageUpload';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import LoaderButton from '../../components/LoaderButton/LoaderButton';
import ProgressModal from '../../components/ProgressModal/Progress';
import { getDeepLinkedCategoryByIdApi } from 'api/fetchCategory';
import variantReducer from 'pages/productVariants/redux/reducers';

const FORM_DATA_VARIABLE = 'xdg123';

const DISCOUNT_DATA_VARIABLE = 'xdiscountz123';

const WARRANTY_DATA_VARIABLE = 'xwWarranty123z';

const ProductDetails = () => {
  const [categoryId, setCategoryId] = useState('');
  const [brand_id, setBrandId] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [videoType, setVideotype] = useState('');
  const [discountStartDate, setDiscountStartDate] = useState(new Date());
  const [discountEndDate, setDiscountEndDate] = useState(new Date());

  const [toggleDiscount, setToggleDiscount] = useState(false);

  const [lDescDraft, setLDescDraft] = useState(EditorState.createEmpty());
  const [sDraft, setSDraft] = useState(EditorState.createEmpty());

  const [longDescription, setLongDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  const [toggleService, setToggleService] = useState(false);
  const [toggleProductVideo, setToggleProductVideo] = useState(false);
  const {
    register: editBaseRegister,
    handleSubmit: editBaseHandleForm,
    errors: editBaseErrors,
    getValues: editBaseGetValues,
    trigger: editBaseTrigger,
  } = useForm();
  const {
    register: editProductRegister,
    errors: editProductErrors,
    getValues: editProductGetValues,
    trigger: editProductTrigger,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.Product.editProduct);

  const fetchRequiredData = useRef();

  const VariantReducer = useSelector((state) => state.Variant);

  fetchRequiredData.current = () => {
    dispatch(productAction.getCategory());
    dispatch(productAction.getBrand());
    dispatch(productAction.getProductById(id));
  };
  useEffect(() => {
    fetchRequiredData.current();
    return () => {
      dispatch(productAction.clearEditProduct());
    };
  }, []);

  useEffect(() => {
    if (product?.category_id) {
      dispatch(productAction.getFormById(product.category_id));
    }
    dispatch(variantActions.addCurrentProduct(product));
  }, [product?.category_id, product]);

  const handleProductData = async (status, e) => {
    e.preventDefault();
    const triggerError = await editBaseTrigger();
    const triggerEditProductError = await editProductTrigger();

    const formData = await editBaseGetValues();

    if (triggerError && triggerEditProductError) {
      let data = formData[FORM_DATA_VARIABLE];
      let discount = formData[DISCOUNT_DATA_VARIABLE];
      let warrantyInfo = formData[WARRANTY_DATA_VARIABLE];
      let editProductData = await editProductGetValues();
      // if (product?.discount?.id) {
      //   discount.id = product.discount?.id;
      // }
      // discount.startDate = discountStartDate;
      // discount.endDate = discountEndDate;
      // discount.discountValue = +discount.discountValue;
      // discount.discountType = discount.discountType;
      let isActive = status === 'publish' ? true : false;
      let productData = {
        ...data,
        // isActive,
        video: {
          link: data?.videoLink,
          type: videoType ? videoType : product?.video?.type,
        },
        warrantyInfo: {
          title: title ? title : product?.warrantyInfo?.title,
          duration: duration ? duration : product?.warrantyInfo?.duration,
          policy: warrantyInfo?.policy,
        },
        salePrice: Number(data.salePrice),
        retailPrice: Number(data.retailPrice),
        category_id: Number(categoryId),
        brand_id: Number(brand_id) || 0,
        minQuantity: Number(data.minQuantity),
        excerpt: shortDescription,
        description: longDescription,
        discount,
        // data: editProductData,
      };

      if (!toggleService) {
        productData.warrantyInfo = {};
      }
      if (!toggleProductVideo) {
        productData.video = {};
      }
      delete productData.videoLink;
      delete productData.videoType;

      dispatch(progressAction.setShowModal(true));
      const progressMessage = isActive ? 'Publishing...' : 'Saving...';
      dispatch(progressAction.setProgressName(progressMessage));
      dispatch(
        productAction.editProduct(
          product.id,
          productData,
          VariantReducer.toggleVariant,
        ),
      );
      if (VariantReducer.toggleVariant) {
        let variantsUpdated = VariantReducer.variants.map((variant) => {
          delete variant.id;
          return variant;
        });
        dispatch(
          variantActions.editProductVariant(
            product.id,
            variantsUpdated,
            isActive,
          ),
        );
      }
    }
  };

  const editBaseprops = {
    sDraft,
    editBaseHandleForm,
    discountEndDate,
    discountStartDate,
    setDiscountStartDate,
    setDiscountEndDate,
    setToggleDiscount,
    toggleDiscount,
    setLDescDraft,
    lDescDraft,
    setSDraft,
    errors: editBaseErrors,
    longDescription,
    setLongDescription,
    shortDescription,
    setShortDescription,
    setToggleProductVideo,
    toggleProductVideo,
    setToggleService,
    toggleService,
    register: editBaseRegister,
    FORM_DATA_VARIABLE,
    DISCOUNT_DATA_VARIABLE,
    WARRANTY_DATA_VARIABLE,
    product,
    categoryId,
    setCategoryId,
    setBrandId,
    brand_id,
    setTitle,
    setDuration,
    setVideotype,
    videoType,
    title,
    duration,
  };

  const editProductProps = {
    register: editProductRegister,
    errors: editProductErrors,
  };

  return (
    <>
      <ProgressModal />
      <Container className="addProduct-card" fluid={true}>
        <Breadcrumb parent="Product" title="Product Specification" />
        <Row>
          <div className="col-md-12 col-lg-12">
            {product.id ? (
              <>
                <Row>
                  {product && (
                    <EditBaseProduct {...editBaseprops} product={product} />
                  )}
                </Row>
                <Row>
                  <Col className="col-md-9 col-lg-9">
                    <EditProduct {...editProductProps} />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-9 col-lg-9">
                    <Card>
                      <CardHeader className="d-flex w-100 py-0 pb-1 pt-3">
                        <h6>Upload product Image</h6>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col sm="12">
                            <Imageupload id={id} multiple={true} />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <AddVarinats product={product} />
                <Row className="w-100 d-flex justify-content-end">
                  <LoaderButton
                    size="lg"
                    color="success"
                    style={{ marginBottom: '2em', marginLeft: '2em' }}
                    onClick={(e) => handleProductData('publish', e)}
                    title="Save & Publish"
                  />
                </Row>
              </>
            ) : (
              <div className="centered-box-fh">
                <Spinner />
              </div>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
