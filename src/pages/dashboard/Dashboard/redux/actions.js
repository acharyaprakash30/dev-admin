const entities = '[Statistics]';

const action = {
  COUNT_USER: `${entities} COUNT_USER`,
  COUNT_USER_SUC: `${entities} COUNT_USER_SUC`,
  COUNT_USER_FAIL: `${entities} COUNT_USER_FAIL`,

  COUNT_VENDOR: `${entities} COUNT_VENDOR`,
  COUNT_VENDOR_SUC: `${entities} COUNT_VENDOR_SUC`,
  COUNT_VENDOR_FAIL: `${entities} COUNT_VENDOR_FAIL`,

  COUNT_CATEGORY: `${entities} COUNT_CATEGORY`,
  COUNT_CATEGORY_SUC: `${entities} COUNT_CATEGORY_SUC`,
  COUNT_CATEGORY_FAIL: `${entities} COUNT_CATEGORY_FAIL`,

  COUNT_BRAND: `${entities} COUNT_BRAND`,
  COUNT_BRAND_SUC: `${entities} COUNT_BRAND_SUC`,
  COUNT_BRAND_FAIL: `${entities} COUNT_BRAND_FAIL`,

  COUNT_SHOP: `${entities} COUNT_SHOP`,
  COUNT_SHOP_SUC: `${entities} COUNT_SHOP_SUC`,
  COUNT_SHOP_FAIL: `${entities} COUNT_SHOP_FAIL`,

  COUNT_COUPON: `${entities} COUNT_COUPON`,
  COUNT_COUPON_SUC: `${entities} COUNT_COUPON_SUC`,
  COUNT_COUPON_FAIL: `${entities} COUNT_COUPON_FAIL`,

  COUNT_DEAL: `${entities} COUNT_DEAL`,
  COUNT_DEAL_SUC: `${entities} COUNT_DEAL_SUC`,
  COUNT_DEAL_FAIL: `${entities} COUNT_DEAL_FAIL`,

  COUNT_ORDER: `${entities} COUNT_ORDER`,
  COUNT_ORDER_SUC: `${entities} COUNT_ORDER_SUC`,
  COUNT_ORDER_FAIL: `${entities} COUNT_ORDER_FAIL`,

  COUNT_BANNER: `${entities} COUNT_BANNER`,
  COUNT_BANNER_SUC: `${entities} COUNT_BANNER_SUC`,
  COUNT_BANNER_FAIL: `${entities} COUNT_BANNER_FAIL`,

  COUNT_ACTIVE_ORDER: `${entities} COUNT_ACTIVE_ORDER`,
  COUNT_ACTIVE_ORDER_SUC: `${entities} COUNT_ACTIVE_ORDER_SUC`,
  COUNT_ACTIVE_ORDER_FAIL: `${entities} COUNT_ACTIVE_ORDER_FAIL`,

  COUNT_DELIVERED_ORDER: `${entities} COUNT_DELIVERED_ORDER`,
  COUNT_DELIVERED_ORDER_SUC: `${entities} COUNT_DELIVERED_ORDER_SUC`,
  COUNT_DELIVERED_ORDER_FAIL: `${entities} COUNT_DELIVERED_ORDER_FAIL`,

  COUNT_PENDING_ORDER: `${entities} COUNT_PENDING_ORDER`,
  COUNT_PENDING_ORDER_SUC: `${entities} COUNT_PENDING_ORDER_SUC`,
  COUNT_PENDING_ORDER_FAIL: `${entities} COUNT_PENDING_ORDER_FAIL`,

  COUNT_CANCELLED_ORDER: `${entities} COUNT_CANCELLED_ORDER`,
  COUNT_CANCELLED_ORDER_SUC: `${entities} COUNT_CANCELLED_ORDER_SUC`,
  COUNT_CANCELLED_ORDER_FAIL: `${entities} COUNT_CANCELLED_ORDER_FAIL`,

  COUNT_OUTFORDELIVERY_ORDER: `${entities} COUNT_OUTFORDELIVERY_ORDER`,
  COUNT_OUTFORDELIVERY_ORDER_SUC: `${entities} COUNT_OUTFORDELIVERY_ORDER_SUC`,
  COUNT_OUTFORDELIVERY_ORDER_FAIL: `${entities} COUNT_OUTFORDELIVERY_ORDER_FAIL`,

  COUNT_PROCESSING_ORDER: `${entities} COUNT_PROCESSING_ORDER`,
  COUNT_PROCESSING_ORDER_SUC: `${entities} COUNT_PROCESSING_ORDER_SUC`,
  COUNT_PROCESSING_ORDER_FAIL: `${entities} COUNT_PROCESSING_ORDER_FAIL`,

  COUNT_PAID_ORDER: `${entities} COUNT_PAID_ORDER`,
  COUNT_PAID_ORDER_SUC: `${entities} COUNT_PAID_ORDER_SUC`,
  COUNT_PAID_ORDER_FAIL: `${entities} COUNT_PAID_ORDER_FAIL`,

  countUser: () => ({
    type: action.COUNT_USER,
  }),
  countVendor: () => ({
    type: action.COUNT_VENDOR,
  }),
  countCategory: () => ({
    type: action.COUNT_CATEGORY,
  }),
  countBrand: () => ({
    type: action.COUNT_BRAND,
  }),
  countDeal: () => ({
    type: action.COUNT_DEAL,
  }),
  countCoupon: () => ({
    type: action.COUNT_COUPON,
  }),
  countOrder: () => ({
    type: action.COUNT_ORDER,
  }),
  countShop: () => ({
    type: action.COUNT_SHOP,
  }),
  countBanner: () => ({
    type: action.COUNT_BANNER,
  }),

  countActiveOrder: () => ({
    type: action.COUNT_ACTIVE_ORDER,
  }),
  countDeliveredOrder: () => ({
    type: action.COUNT_DELIVERED_ORDER,
  }),
  countPendingOrder: () => ({
    type: action.COUNT_PENDING_ORDER,
  }),
  countCancelledOrder: () => ({
    type: action.COUNT_CANCELLED_ORDER,
  }),
  countoutForDeliveryOrder: () => ({
    type: action.COUNT_OUTFORDELIVERY_ORDER,
  }),
  countProcessingOrder: () => ({
    type: action.COUNT_PROCESSING_ORDER,
  }),
  countPaidOrder: () => ({
    type: action.COUNT_PAID_ORDER,
  }),
};

export default action;


