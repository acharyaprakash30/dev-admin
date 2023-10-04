import actions from './action';

const initialState = {
  loading: false,
  message: '',
  addedProduct: [],
  statusCode: null,
  categories: [],
  formConfig: null,
  colors: [],
  products: null,
  brands: [],
  editProduct: [],
  productImages: [],
  variants: [],
  addedVariantList: [],
  formConfigForEdit: [],
  searchResult: [],
  uploading: false,
  productCount: 0
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCT_REQ:
      return {
        ...state,
        adding: true,
      };
    case actions.ADD_PRODUCT_SUC:
      return {
        ...state,
        adding: false,
        addedProduct: action.payload,
        status: action.status,
        message: 'Product added successfully.',
      };
    case actions.ADD_PRODUCT_FAIL:
      return {
        ...state,
        adding: false,
        status: action.status,
        message: action.message,
      };

    //SEARCH QUERY OF PRODUCT

    case actions.SEARCH_QUERY_REQ:
      return {
        ...state,
        loading: true,
      };

    case actions.SEARCH_QUERY_SUC:
      return {
        ...state,
        products: action.data,
        loading: false,
      };

    case actions.SEARCH_QUERY_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actions.BRAND_SELECT_REQ:
      return {
        ...state,
        loading: true,
      };

    case actions.BRAND_SELECT_SUC:
      // let result = state.products.map(())
      return {
        ...state,
        searchResult: action.data,
        loading: false,
      };

    case actions.BRAND_SELECT_FAIL:
      return {
        ...state,
        loading: false,
      };
    /* Get category */
    case actions.GET_CATEGORY_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_CATEGORY_SUC:
      return {
        ...state,
        loading: false,
        categories: action.categories,
      };
    case actions.GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
      };
    /* Get Colors */
    case actions.GET_COLORS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_COLORS_SUC:
      return {
        ...state,
        loading: false,
        colors: action.colors,
      };
    case actions.GET_COLORS_FAIL:
      return {
        ...state,
        loading: false,
      };

    /* Get form config */
    case actions.GET_FORM_CONFIG_REQ:
      return {
        ...state,
        fetching: true,
      };
    case actions.GET_FORM_CONFIG_SUC:
      return {
        ...state,
        fetching: false,
        formConfig: action.payload,
        message: action.message,
        status: action.status,
      };
    case actions.GET_FORM_CONFIG_FAIL:
      return {
        ...state,
        fetching: false,
        message: action.message,
        status: action.status,
      };

    /* GET FORM CONFIG FOR PRODUCT EDIT */

    case actions.GET_FORM_ID_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_FORM_ID_SUC:
      return {
        ...state,
        loading: false,
        formConfigForEdit: action.formConfigForEdit,
        status: action.status,
      };
    case actions.GET_FORM_ID_FAIL:
      return {
        ...state,
        loading: false,
        status: action.status,
        message: action.message,
      };

    /* GET All Products */

    case actions.GET_PRODUCTS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_PRODUCTS_SUC:
      return {
        ...state,
        loading: false,
        products: action.products,
        message: 'Fetched Successfulluy',
        status: action.status,
        productCount: action.count

      };
    case actions.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        status: action.status,
      };

    /* GET Brands */
    case actions.GET_BRAND_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_BRAND_SUC:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        status: action.status,
      };
    case actions.GET_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        status: action.status,
      };
    /* ADD Product DETAIL */
    case actions.ADD_PRODUCT_DETAIL_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_PRODUCT_DETAIL_SUC:
      return {
        ...state,
        loading: false,
        message: action.message,
        status: action.status,
      };
    case actions.ADD_PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        message: action.message,
        status: action.status,
      };

    /* EDIT PRODUCT */
    case actions.EDIT_PRODUCT_REQ:
      return {
        ...state,
        editing: true,
      };
    case actions.EDIT_PRODUCT_SUC:
      return {
        ...state,
        editing: false,
        message: action.message,
        status: action.status,
      };
    case actions.EDIT_PRODUCT_FAIL:
      return {
        ...state,
        editing: false,
        message: action.message,
        status: action.status,
      };
    /* Delete Product */
    case actions.DELETE_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.DELETE_PRODUCT_SUC:
      return {
        ...state,
        loading: false,
        goTo: state.addedProduct?.product?.id === action.id ? 1 : state.goTo,
        addedProduct:
          state.addedProduct?.id === action.id ? null : state.addedProduct,
        products: state.products.filter((product) => product.id !== action.id),
        message: action.message,
        status: action.status,
      };
    case actions.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        status: action.status,
      };
    /* Clear added product */
    case actions.CLEAR_ADDED_PRODUCT:
      return {
        ...state,
        addedProduct: [],
      };
    /* Get products by id */
    case actions.GET_PRODUCT_ID_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_PRODUCT_ID_SUC:
      return {
        ...state,
        loading: false,
        message: action.message,
        editProduct: action.payload,
      };
    case actions.GET_PRODUCT_ID_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        status: action.status,
      };
    /* Add Product Image */

    case actions.UPLOAD_IMAGE_REQ:
      return {
        ...state,
        uploading: true,
      };
    case actions.UPLOAD_IMAGE_SUC:
      let addedArray = [];
      addedArray.push(action.data);
      return {
        ...state,
        uploading: false,
        message: action.message,
        status: action.status,
        productImages: [...state.productImages, ...addedArray]
      };
    case actions.UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        uploading: false,
        message: action.message,
        status: action.status,
      };
    /* Add Publish Detail */
    case actions.ADD_PUBLISH_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_PUBLISH_SUC:
      return {
        ...state,
        goTo: 1,
      };
    case actions.ADD_PUBLISH_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    /* fetch product image */
    case actions.FETCH_PRODUCT_IMAGES_REQ:
      return {
        ...state,
        fetchingImage: true,
      };
    case actions.FETCH_PRODUCT_IMAGES_SUC:
      return {
        ...state,
        fetchingImage: false,
        // productImages: state.productImages.push(action.productImages),
        productImages: action.productImages,
        message: action.message,
      };
    case actions.FETCH_PRODUCT_IMAGES_FAIL:
      return {
        ...state,
        fetchingImage: false,
        message: action.message,
      };
    /* Delete Product Image  */
    case actions.DELETE_PRODUCT_IMAGES_REQ:
      return {
        ...state,
        deleting: true,
      };
    case actions.DELETE_PRODUCT_IMAGES_SUC:
      return {
        ...state,
        deleting: false,
        productImages: state.productImages.filter(
          (image) => image.id !== action.id,
        ),
      };
    case actions.DELETE_PRODUCT_IMAGES_FAILED:
      return {
        ...state,
        deleting: false,
      };

    /* GET variants */
    case actions.GET_VARIANTS_REQ:
      return {
        ...state,
        fetchingVariants: true,
      };
    case actions.GET_VARIANTS_SUC:
      return {
        ...state,
        fetchingVariants: false,
        variants: action.variants,
      };
    case actions.GET_VARIANTS_FAIL:
      return {
        ...state,
        fetchingVariants: false,
        message: action.message,
      };
    case actions.GO_TO_NEXT_STEP:
      return {
        ...state,
        goTo: state.goTo + 1,
      };
    // Clear edited product
    case actions.CLEAR_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
