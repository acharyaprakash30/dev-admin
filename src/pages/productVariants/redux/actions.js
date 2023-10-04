const entities = '[Product Variant]';

const actions = {
  GET_VARIANT_COLOR_REQ: `${entities} GET_VARIANT_COLORS_REQ`,
  GET_VARIANT_COLOR_SUC: `${entities} GET_VARIANT_COLORS_SUC`,
  GET_VARIANT_COLOR_FAIL: `${entities} GET_VARIANT_COLORS_FAIL`,

  GET_VARIANT_ATTRIBUTES_REQ: `${entities} GET_VARIANT_ATTRIBUTES_REQ`,
  GET_VARIANT_ATTRIBUTES_SUC: `${entities} GET_VARIANT_ATTRIBUTES_SUC`,
  GET_VARIANT_ATTRIBUTES_FAIL: `${entities} GET_VARIANT_ATTRIBUTES_FAIL`,

  ADD_SELECTED_COLOR: `${entities} ADD_SELECTED_COLOR`,
  ADD_SELECTED_COLOR_REQ: `${entities} ADD_SELECTED_COLOR_REQ`,

  ADD_SELECTED_ATTRIBUTE_REQ: `${entities} ADD_SELECTED_ATTRIBUTE_REQ`,
  ADD_SELECTED_ATTRIBUTE: `${entities} ADD_SELECTED_ATTRIBUTE`,

  REMOVE_SELECTED_COLOR_REQ: `${entities} REMOVE_SELECTED_COLOR_REQ`,
  REMOVE_SELECTED_COLOR: `${entities} REMOVE_SELECTED_COLOR`,

  REMOVE_SELECTED_ATTRIBUTE_REQ: `${entities} REMOVE_SELECTED_ATTRIBUTE_REQ`,
  REMOVE_SELECTED_ATTRIBUTE: `${entities} REMOVE_SELECTED_ATTRIBUTE`,

  HANDLE_SELECTED_ATTRIBUTE_REQ: `${entities} HANDLE_SELECTED_ATTRIBUTE_REQ`,
  HANDLE_SELECTED_ATTRIBUTE: `${entities} HANDLE_SELECTED_ATTRIBUTE`,

  HANDLE_DESELECTED_ATTRIBUTE_REQ: `${entities} HANDLE_DESELECTED_ATTRIBUTE_REQ`,
  HANDLE_DESELECTED_ATTRIBUTE: `${entities} HANDLE_DESELECTED_ATTRIBUTE`,

  FETCH_PRODUCT_VARIANT_REQ: `${entities} FETCH_PRODUCT_VARIANT_REQ`,
  FETCH_PRODUCT_VARIANT_SUC: `${entities} FETCH_PRODUCT_VARIANT_SUC`,
  FETCH_PRODUCT_VARIANT_FAIL: `${entities} FETCH_PRODUCT_VARIANT_FAIL`,

  GENERATE_COMBINATION: `${entities} GENERATE_COMBINATION`,

  ADD_CURRENT_PRODUCT: `${entities} ADD_CURRENT_PRODUCT`,

  HANDLE_INPUT_CHANGE: `${entities} HANDLE_INPUT_CHANGE`,

  REMOVE_VARIANT: `${entities} REMOVE_VARIANT`,

  SET_CURRENT_VARIANT: `${entities} SET_CURRENT_VARIANT`,

  ADD_SELECTED_IMAGE: `${entities} ADD_SELECTED_IMAGE`,

  SHOW_MODAL: `${entities} SHOW_MODAL`,
  HIDE_MODAL: `${entities} HIDE_MODAL`,

  CLEAR_SELECTED_IMAGE: `${entities} CLEAR_SELECTED_IMAGE`,

  SAVE_SELECTED_IMAGE: `${entities} SAVE_SELCTED_IMAGE`,

  DELETE_PRODUCT_VARIANT_REQ: `${entities} DELETE_PRODUCT_VARIANT_REQ`,
  DELETE_PRODUCT_VARIANT_SUC: `${entities} DELETE_PRODUCT_VARIANT_SUC`,
  DELETE_PRODUCT_VARIANT_FAIL: `${entities} DELETE_PRODUCT_VARIANT_FAIL`,

  EDIT_PRODUCT_VARIANT_REQ: `${entities} EDIT_PRODUCT_VARIANT_REQ`,
  EDIT_PRODUCT_VARIANT_SUC: `${entities} EDIT_PRODUCT_VARIANT_SUC`,
  EDIT_PRODUCT_VARIANT_FAIL: `${entities} EDIT_PRODUCT_VARIANT_FAIL`,

  TOGGLE_VARIANT: `${entities} TOGGLE_VARIANT`,

  SET_TOGGLE_VARIANT: `${entities} SET_TOGGLE_VARIANT`,

  setToggleVariant: (payload) => ({
    type: actions.SET_TOGGLE_VARIANT,
    payload,
  }),

  toggleVariant: () => ({
    type: actions.TOGGLE_VARIANT,
  }),

  editProductVariant: (id, data, isPublished) => ({
    type: actions.EDIT_PRODUCT_VARIANT_REQ,
    id,
    data,
    isPublished,
  }),

  deleteProductVariant: (payload) => ({
    type: actions.DELETE_PRODUCT_VARIANT_REQ,
    payload,
  }),

  saveSelectedImage: () => ({
    type: actions.SAVE_SELECTED_IMAGE,
  }),

  clearSelectedImage: () => ({
    type: actions.CLEAR_SELECTED_IMAGE,
  }),

  showModal: () => ({
    type: actions.SHOW_MODAL,
  }),

  hideModal: () => ({
    type: actions.HIDE_MODAL,
  }),

  addSelectedImage: (payload) => ({
    type: actions.ADD_SELECTED_IMAGE,
    payload,
  }),

  setCurrentVariant: (payload) => ({
    type: actions.SET_CURRENT_VARIANT,
    payload,
  }),

  removeVariant: (name) => ({
    type: actions.REMOVE_VARIANT,
    name,
  }),

  handleInput: (id, value, field) => ({
    type: actions.HANDLE_INPUT_CHANGE,
    id,
    value,
    field,
  }),

  addCurrentProduct: (payload) => ({
    type: actions.ADD_CURRENT_PRODUCT,
    payload,
  }),
  handleSelectedAttribute: (payload, id) => ({
    type: actions.HANDLE_SELECTED_ATTRIBUTE_REQ,
    payload,
    id
  }),

  handleDeselectedAttribute: (payload) => ({
    type: actions.HANDLE_DESELECTED_ATTRIBUTE_REQ,
    payload,
  }),

  addSelectedColor: (payload, id) => ({
    type: actions.ADD_SELECTED_COLOR_REQ,
    payload,
    id
  }),

  addSelectedAttribute: (payload, id) => ({
    type: actions.ADD_SELECTED_ATTRIBUTE_REQ,
    payload,
    id
  }),

  removeSelectedColor: (payload) => ({
    type: actions.REMOVE_SELECTED_COLOR_REQ,
    payload,
  }),

  removeSelectedAttribute: (payload) => ({
    type: actions.REMOVE_SELECTED_ATTRIBUTE_REQ,
    payload,
  }),

  getVariantColors: () => ({
    type: actions.GET_VARIANT_COLOR_REQ,
  }),

  getVariantAttributes: (id) => ({
    type: actions.GET_VARIANT_ATTRIBUTES_REQ,
    id,
  }),
  fetchProductVariant: (id) => ({
    type: actions.FETCH_PRODUCT_VARIANT_REQ,
    id,
  }),
};

export default actions;
