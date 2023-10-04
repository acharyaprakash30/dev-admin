import React, { lazy } from 'react';
import paths from './paths';
import ListPushNotification from 'pages/dashboard/PushNotification/viewPushNotification';

// dashbaord
const AdminDashboard = lazy(() =>
  import('../pages/dashboard/Dashboard/Dashboard.view'),
);
//app-setting
const AppSetting = lazy(() =>
  import('../pages/dashboard/AppConfig/appSetting'),
);

const Page = lazy(() => import('../pages/dashboard/AppConfig/pages'));
// Brands
const Addbrand = lazy(() => import('../pages/dashboard/Brand/addbrand'));
const Allbrand = lazy(() => import('../pages/dashboard/Brand/allbrand'));
const Editbrand = lazy(() => import('../pages/dashboard/Brand/editBrand'));
// Banner
const AddBanner = lazy(() => import('../pages/dashboard/Banner/create'));
const AllBanner = lazy(() => import('../pages/dashboard/Banner'));
const EditBanner = lazy(() => import('../pages/dashboard/Banner/edit'));

// Category
const CreateCategory = lazy(() => import('../pages/dashboard/Category/create'));
const EditCategory = lazy(() => import('../pages/dashboard/Category/edit'));
const CategoriesList = lazy(() => import('../pages/dashboard/Category'));
// Category
const AddColors = lazy(() => import('../pages/dashboard/Colors/addColors'));
const AllColors = lazy(() => import('../pages/dashboard/Colors/allColors'));

// Placeholders
const CreatePlaceholder = lazy(() =>
  import('../pages/dashboard/PlaceholderGroup/create'),
);
const EditPlaceholderGrp = lazy(() =>
  import('../pages/dashboard/PlaceholderGroup/edit'),
);
const ShowPlaceholderGrp = lazy(() =>
  import('../pages/dashboard/PlaceholderGroup/view'),
);
const PlaceholderList = lazy(() =>
  import('../pages/dashboard/PlaceholderGroup'),
);

// placeholder items
const PlaceholderItemList = lazy(() =>
  import('../pages/dashboard/PlaceholderItems/index'),
);
const EditPlaceholderItem = lazy(() =>
  import('../pages/dashboard/PlaceholderItems/edit'),
);

// site nav
const AddSiteNav = lazy(() => import('../pages/dashboard/Sidenav/addSiteNav'));
const EditSiteNav = lazy(() => import('../pages/dashboard/Sidenav/edit'));
const SiteNavList = lazy(() => import('../pages/dashboard/Sidenav/index'));

// coupons
const Addcoupons = lazy(() => import('../pages/dashboard/Coupons/addcoupons'));
const EditCoupon = lazy(() => import('../pages/dashboard/Coupons/editcoupon'));
const Allcoupons = lazy(() => import('../pages/dashboard/Coupons/allcoupons'));

//Deals
const AddDeals = lazy(() => import('../pages/dashboard/Deals/addDeals'));
const AllDeals = lazy(() => import('../pages/dashboard/Deals/allDeals'));
const EditDeals = lazy(() => import('../pages/dashboard/Deals/editDeal'));

//form
const AddFormGroup = lazy(() =>
  import('../pages/dashboard/Form/add-formgroup'),
);
const EditFormGroup = lazy(() =>
  import('../pages/dashboard/Form/edit-formgroup'),
);

// orders
const Orders = lazy(() => import('../pages/dashboard/Order/manageorder'));
const EditOrders = lazy(() => import('../pages/dashboard/Order/edit'));

// Plans
const Plan = lazy(() => import('../pages/dashboard/Plans/plans'));

// Profile
const UserProfile = lazy(() =>
  import('../pages/dashboard/Profile/userprofile'),
);
const UpdateUserProfile = lazy(() =>
  import('../pages/dashboard/Profile/updateUserProfile'),
);

// Review
const CustomerReview = lazy(() =>
  import('../pages/dashboard/Review/CustomerReview'),
);
const ReviewProducts = lazy(() =>
  import('../pages/dashboard/Review/reviewProducts'),
);

//Products

const AddProduct = lazy(() => import('../pages/product/forms/Addproduct'));
const ViewProducts = lazy(() => import('../pages/product/ViewProducts'));
const ProductDetails = lazy(() => import('../pages/product/ProductDetails'));
const EditProduct = React.lazy(() => import('../pages/product/ProductDetails'));

//Roles
const Addroles = lazy(() => import('../pages/dashboard/Role/addroles'));
const Allroles = lazy(() => import('../pages/dashboard/Role/allroles'));
// shops
const Addshops = lazy(() => import('../pages/dashboard/Shop/addshop'));
const Allshops = lazy(() => import('../pages/dashboard/Shop/allshops'));
const Active = lazy(() => import('../pages/dashboard/Transaction/active'));
//transaction
const Completed = lazy(() =>
  import('../pages/dashboard/Transaction/completed'),
);
// bonus-ui

// Users
const Adduser = lazy(() => import('../pages/dashboard/Users/adduser'));
const Allusers = lazy(() => import('../pages/dashboard/Users/allusers'));

// Variants
const AddVariants = lazy(() =>
  import('../pages/dashboard/Variants/addVariants'),
);
const AllVariants = lazy(() =>
  import('../pages/dashboard/Variants/allVariants'),
);
const EditVariants = lazy(() => import('../pages/dashboard/Variants/edit'));
//vendor-Document
const VendorDocument = lazy(() =>
  import('../pages/dashboard/vendorDocument/vendorDocumentSpecification'),
);
// vendors
const Addvendors = lazy(() => import('../pages/dashboard/Vendors/addvendor'));
const Allvendors = lazy(() => import('../pages/dashboard/Vendors/allvendors'));
const VendorCatalogs = lazy(() =>
  import('../pages/dashboard/Vendors/vendorDetailed'),
);
const TrackMe = lazy(() => import('../components/GPSTracker'));

const EmailTemplate = lazy(() =>
  import('../components/Email/pages/EmailTemplate'),
);
const PushNotificationTemplate = lazy(() =>
  import('../pages/dashboard/PushNotification/PushNotificationTemplate'),
);

const AddPushNotification = lazy(() =>
  import('../pages/dashboard/PushNotification/addPushNotification'),
);
const Province = lazy(() => import('../pages/dashboard/Shipping/Provinces'));
const Disctrict = lazy(() => import('../pages/dashboard/Shipping/Districts'));
const Municipality = lazy(() =>
  import('../pages/dashboard/Shipping/Municipalities'),
);
const Areas = lazy(() => import('../pages/dashboard/Shipping/Areas'));

const ViewShop = lazy(() => import('../pages/dashboard/Shop/viewShop'));

const ChatApp = lazy(() => import('../pages/chat-app'));
const NotificationList = lazy(() =>
  import('../pages/dashboard/PushNotification/viewPushNotification'),
);

export const routes = [
  /**
   * Custom Routes
   */
  { path: paths.Dashboard, exact: true, Component: AdminDashboard },
  { path: '/tracker', Component: TrackMe },
  // VENDORS
  { path: '/dashboard/vendor/create', Component: Addvendors },
  { path: '/dashboard/vendors', Component: Allvendors },
  { path: '/dashboard/catalogs/:id', Component: VendorCatalogs },
  // USERS
  { path: paths.addUser, Component: Adduser },
  { path: paths.listAllUsers, Component: Allusers },
  //SHOPS
  { path: '/dashboard/shop/create', Component: Addshops },
  { path: '/dashboard/shops', Component: Allshops },

  //BRAND
  { path: paths.Brands, Component: Allbrand },
  { path: paths.createBrand, Component: Addbrand },
  { path: paths.editBrand, Component: Editbrand },

  // Placeholders
  { path: '/dashboard/placeholders', Component: PlaceholderList },
  { path: '/dashboard/placeholder/create', Component: CreatePlaceholder },
  { path: '/dashboard/placeholder/:id/edit', Component: EditPlaceholderGrp },
  { path: '/dashboard/placeholder/:id/show', Component: ShowPlaceholderGrp },

  // Placeholder items
  { path: '/dashboard/placeholder-items', Component: PlaceholderItemList },
  {
    path: '/dashboard/placeholder-item/:id/edit',
    Component: EditPlaceholderItem,
  },

  //Products
  //Product
  { path: paths.AddProduct, Component: AddProduct },
  { path: paths.ViewProduct, Component: ViewProducts },
  { path: '/product/edit/:id', Component: EditProduct },
  {
    path: '/product/:id/details',
    Component: ProductDetails,
    title: 'Product Details',
  },

  //  SiteNav
  { path: '/dashboard/site-navs', Component: SiteNavList },
  { path: '/dashboard/site-nav/create', Component: AddSiteNav },
  { path: '/dashboard/site-nav/:id/edit', Component: EditSiteNav },

  { path: paths.addBanner, Component: AddBanner },
  { path: paths.allBanner, Component: AllBanner },
  { path: paths.editBanner, Component: EditBanner },

  { path: paths.Categories, Component: CategoriesList },
  { path: paths.createCategories, Component: CreateCategory },
  { path: paths.editCategory, Component: EditCategory },

  { path: '/dashboard/colors', Component: AllColors },
  { path: '/dashboard/color/create', Component: AddColors },

  { path: '/dashboard/variant/create', Component: AddVariants },
  { path: '/dashboard/variant/:id/edit', Component: EditVariants },
  { path: '/dashboard/variants', Component: AllVariants },

  { path: '/dashboard/role/create', Component: Addroles },
  { path: '/dashboard/roles', Component: Allroles },

  { path: '/dashboard/form-group/create', Component: AddFormGroup },
  { path: '/dashboard/form-group/edit', Component: EditFormGroup },

  { path: '/dashboard/userprofile/edit', Component: UpdateUserProfile },
  { path: '/dashboard/userprofile', Component: UserProfile },

  { path: '/dashboard/app-setting', Component: AppSetting },
  { path: '/dashboard/pages', Component: Page },

  { path: '/dashboard/vendor-document', Component: VendorDocument },

  { path: '/dashboard/transactions/completed', Component: Completed },
  { path: '/dashboard/transactions/active', Component: Active },

  { path: '/dashboard/coupons', Component: Allcoupons },
  { path: '/dashboard/coupon/create', Component: Addcoupons },
  { path: '/dashboard/coupon/:id/edit', Component: EditCoupon },

  { path: '/dashboard/orders/:id/edit', Component: EditOrders },
  { path: '/dashboard/orders', Component: Orders },

  { path: '/dashboard/reviews', Component: ReviewProducts },
  { path: '/dashboard/reviews-list/:id', Component: CustomerReview },

  { path: '/dashboard/plans', Component: Plan },

  { path: paths.Deals, Component: AllDeals },
  { path: paths.AddDeal, Component: AddDeals },
  { path: paths.EditDeal, Component: EditDeals },

  { path: '/push-notification-templates', Component: PushNotificationTemplate },
  { path: '/push-notification/add', Component: AddPushNotification },
  { path: '/email-templates', Component: EmailTemplate },
  { path: '/viewShop/:id', Component: ViewShop },
  { path: paths.provinces, Component: Province },
  { path: paths.municipality, Component: Municipality },
  { path: paths.district, Component: Disctrict },
  { path: paths.areas, Component: Areas },
  { path: '/app/chat-app', Component: ChatApp },
  { path: '/app/notification-list', Component: NotificationList },
];
