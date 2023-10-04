import utility from '../../../utils/Utility';
import variantActions from './actions';
const initialState = {
  toggleVariant: false,
  product: {},
  colors: [],
  productVariants: [],
  attributes: [],
  variants: [],
  generatedVariants: [],
  combinations: [],
  selectedColors: [],
  selectedAttributes: [],
  attributeFields: [],
  currentVariant: {},
  selectedImage: [],
  showModal: false,
  originalVariants: [],
  error: false,
};

const getVariantName = (variant) => {
  let name = '';
  for (let attr of variant) {
    name = `${attr.name}-${name}`;
  }
  return name;
};

const variantReducer = (state = initialState, action) => {
  switch (action.type) {
    case variantActions.TOGGLE_VARIANT:
      return {
        ...state,
        toggleVariant: !state.toggleVariant,
      };
    case variantActions.SET_TOGGLE_VARIANT:
      return {
        ...state,
        toggleVariant: action.payload,
      };
    case variantActions.ADD_CURRENT_PRODUCT:
      const productVariant = action.payload.variants || [];
      let variantArray =
        productVariant &&
        productVariant.map((attribute) => {
          if (attribute?.stock) {
            attribute.stock = Number(attribute.stock);
          }
          if (attribute?.price) {
            attribute.price = Number(attribute.price);
          }
          if (!attribute?.properties) {
            attribute.properties = {};
          }
          return attribute;
        });
      return {
        ...state,
        product: action.payload,
        variants: variantArray,
        // originalVariants: variantArray,
        toggleVariant: variantArray.length ? true : state.toggleVariant,
      };
    case variantActions.GET_VARIANT_COLOR_REQ:
      return {
        ...state,
        fetchingColors: true,
      };
    case variantActions.GET_VARIANT_COLOR_SUC:
      return {
        ...state,
        fetchingColors: false,
        colors: action.colors,
      };
    case variantActions.GET_VARIANT_COLOR_FAIL:
      return {
        ...state,
        fetchingColors: false,
      };

    /* get variant attributes */
    case variantActions.GET_VARIANT_ATTRIBUTES_REQ:
      return {
        ...state,
        fetchingAttrbutes: true,
      };
    case variantActions.GET_VARIANT_ATTRIBUTES_SUC:
      let array = action.attributes;
      let newArray = array.filter((item, index, self) => (self.findIndex(a => a.id === item.id) === index))
      return {
        ...state,
        fetchingAttrbutes: false,
        attributes: newArray,
      };
    case variantActions.GET_VARIANT_ATTRIBUTES_FAIL:
      return {
        ...state,
        fetchingAttrbutes: false,
      };
    case variantActions.ADD_SELECTED_COLOR:
      const selectedColor = state.colors.filter(
        (color) => color.id === action.payload,
      );
      state.selectedColors.push(...selectedColor);
      return {
        ...state,
      };
    case variantActions.ADD_SELECTED_ATTRIBUTE:
      let selectedAttr = state.attributes
        .filter((attr) => attr)
        .filter((attr) => attr.id === action.payload)[0];
      selectedAttr.selectedOptions = [];
      let selectedAttributes = [...state.selectedAttributes, selectedAttr];
      return {
        ...state,
        selectedAttributes,
      };
    case variantActions.REMOVE_SELECTED_COLOR:
      const colors = state.selectedColors.filter(
        (color) => color.id !== action.payload,
      );
      return {
        ...state,
        selectedColors: colors,
      };
    case variantActions.REMOVE_SELECTED_ATTRIBUTE:
      const attributes = state.selectedAttributes.filter(
        (attr) => attr.id !== action.payload,
      );
      return {
        ...state,
        selectedAttributes: attributes,
      };
    case variantActions.HANDLE_SELECTED_ATTRIBUTE:
      for (let attr of state.selectedAttributes) {
        if (attr.id === action.payload?.attribute?.id) {
          let selectedAttr = attr?.variantOptions.filter(
            (item) => item.id === action.payload.option,
          );
          attr.selectedOptions.push(...selectedAttr);
        }
      }
      return {
        ...state,
      };
    case variantActions.HANDLE_DESELECTED_ATTRIBUTE:
      for (let attr of state.selectedAttributes) {
        if (attr.id === action.payload?.attribute?.id) {
          let selectedAttr = attr?.selectedOptions.filter(
            (item) => item.id !== action.payload.option,
          );
          attr.selectedOptions = selectedAttr;
        }
      }
      return {
        ...state,
      };
    case variantActions.GENERATE_COMBINATION:
      let allAttr = state.selectedAttributes.map(
        (attr) => attr.selectedOptions,
      );
      const combinations = utility.getCobinations(
        state.selectedColors,
        ...allAttr,
      );
      let newCombinations = combinations.map((combination) =>
        getVariantName(combination),
      );
      let resultCombinations = [];

      newCombinations.map((combo) => {
        const foundCombo = state.variants.find(
          (variant) => variant.name === combo,
        );
        if (!foundCombo)
          return resultCombinations.push({
            name: combo,
            images: [],
            price: state.product.salePrice,
            sku: '',
            stock: 0,
            properties: {},
            adminProductId: +action?.id
          });
        return {};
      });
      return {
        ...state,
        variants: [...state.originalVariants, ...resultCombinations],
      };

    case variantActions.HANDLE_INPUT_CHANGE:
      for (let variant of state.variants) {
        if (variant.name === action.id) {
          if (action.field === 'price') {
            variant[action.field] = Number(action.value);
          }
          if (action.field === 'stock') {
            variant[action.field] = Number(action.value);
          }
          if (action.field === 'sku') {
            variant[action.field] = action.value;
          }
        }
        variant['properties'] = {};
      }
      return {
        ...state,
      };
    case variantActions.REMOVE_VARIANT:
      let filteredVariants = state.variants.filter(
        (variant) => variant.name !== action.name,
      );
      return {
        ...state,
        variants: filteredVariants,
      };
    case variantActions.SET_CURRENT_VARIANT:
      return {
        ...state,
        currentVariant: action.payload,
      };
    case variantActions.ADD_SELECTED_IMAGE:
      if (!state.selectedImage.includes(action.payload)) {
        return {
          ...state,
          selectedImage: [...state.selectedImage, action.payload],
        };
      }
      if (state.selectedImage.includes(action.payload)) {
        let filteredImages = state.selectedImage.filter(
          (image) => image !== action.payload,
        );
        return {
          ...state,
          selectedImage: filteredImages,
        };
      }
      return {
        ...state,
      };

    case variantActions.SHOW_MODAL:
      let updateImage =
        state.currentVariant && state.currentVariant.images
          ? state.currentVariant.images
          : [];
      return {
        ...state,
        showModal: true,
        selectedImage: updateImage,
      };
    case variantActions.HIDE_MODAL:
      return {
        ...state,
        selectedImage: [],
        showModal: false,
      };

    case variantActions.CLEAR_SELECTED_IMAGE:
      return {
        ...state,
        selectedImage: [],
      };
    case variantActions.SAVE_SELECTED_IMAGE:
      for (let variant of state.variants) {
        if (variant.name === state.currentVariant.name) {
          variant.images = state.selectedImage;
        }
      }
      return {
        ...state,
        selectedImage: [],
        showModal: false,
      };
    case variantActions.DELETE_PRODUCT_VARIANT_REQ:
      return {
        ...state,
        deletingVariant: true,
      };
    case variantActions.DELETE_PRODUCT_VARIANT_SUC:
      return {
        ...state,
        deletingVariant: false,
        variants: state.variants.filter(
          (variant) => variant.id !== action.payload,
        ),
        originalVariants: state.originalVariants.filter((variant) => variant.id !== action.payload)
      };
    case variantActions.DELETE_PRODUCT_VARIANT_FAIL:
      return {
        ...state,
        deletingVariant: false,
      };

    case variantActions.EDIT_PRODUCT_VARIANT_REQ:
      return {
        ...state,
        addingVariant: true,
        error: false,
      };
    case variantActions.EDIT_PRODUCT_VARIANT_SUC:
      return {
        ...state,
        addingVariant: false,
        variants: [action.payload],
        error: false,
      };
    case variantActions.EDIT_PRODUCT_VARIANT_FAIL:
      return {
        ...state,
        addingVariant: false,
        error: true,
      };

    case variantActions.FETCH_PRODUCT_VARIANT_REQ:
      return {
        ...state,
        fetching: true,
      };
    case variantActions.FETCH_PRODUCT_VARIANT_SUC:
      return {
        ...state,
        fetching: false,
        originalVariants: [...action.productVariant],
        variants: [...action.productVariant]
      };
    case variantActions.FETCH_PRODUCT_VARIANT_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return { ...state };
  }
};

export default variantReducer;
