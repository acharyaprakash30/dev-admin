const entities = '[review]';

const action = {
  
  GET_REVIEW_REQ: `${entities} GET_REVIEW_REQ`,
  GET_REVIEW_SUC: `${entities} GET_REVIEW_SUC`,
  GET_REVIEW_FAIL: `${entities} GET_REVIEW_FAIL`,

  GET_PRODUCT_REQ: `${entities} GET_PRODUCT_REQ`,
  GET_PRODUCT_SUC: `${entities} GET_PRODUCT_SUC`,
  GET_PRODUCT_FAIL: `${entities} GET_PRODUCT_FAIL`,

  DLT_REVIEW_REQ : `${entities} DLT_REVIEW_REQ`,
  DLT_REVIEW_SUC: `${entities} DLT_REVIEW_SUC`,
  DLT_REVIEW_FAIL : `${entities} DLT_REVIEW_FAIL`,

  getReviewReq: (payload) => ({
    type: action.GET_REVIEW_REQ,
    payload,
  }),

  getProductReq: (payload) => ({
    type: action.GET_PRODUCT_REQ,
    payload,
  }),
  
  dltReviewReq: (payload) => ({
    type : action.DLT_REVIEW_REQ,
    payload,
  })
 
};

export default action;


