import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Alert from '../components/Alert/redux/reducer';
import AuthReducer from '../pages/authentication/redux/reducer';
import AppConfigReducer from '../pages/dashboard/AppConfig/redux/reducer';
import BrandReducer from '../pages/dashboard/Brand/redux/reducer';
import CategoryReducer from '../pages/dashboard/Category/redux/reducer';
import ColorsReducer from '../pages/dashboard/Colors/redux/reducer';
import CouponsReducer from '../pages/dashboard/Coupons/redux/reducer';
import DealsReducer from '../pages/dashboard/Deals/redux/reducer';
import FormReducer from '../pages/dashboard/Form/redux/reducer';
import OrderReducer from '../pages/dashboard/Order/redux/reducer';
import ProfileReducer from '../pages/dashboard/Profile/redux/reducer';
import ReviewsReducer from '../pages/dashboard/Review/redux/reducer';
import RoleReducer from '../pages/dashboard/Role/redux/reducer';
import ShopReducer from '../pages/dashboard/Shop/redux/reducer';
import VariantReducer from '../pages/dashboard/Variants/redux/reducer';
import VendorDocReducer from '../pages/dashboard/vendorDocument/redux/reducer';
import VendorReducer from '../pages/dashboard/Vendors/redux/reducer';
import Customizer from './customizer/reducer';
import PlaceholderGroupReducer from '../pages/dashboard/PlaceholderGroup/redux/reducer';
import PlaceholderItemReducer from '../pages/dashboard/PlaceholderItems/redux/reducer';
import sideNavReducer from '../pages/dashboard/Sidenav/redux/reducer';
import StatisticsReducer from '../pages/dashboard/Dashboard/redux/reducer';
import BannerReducer from '../pages/dashboard/Banner/redux/reducer';
import ProductReducer from '../pages/product/redux/reducer';
import ProductVariantReducer from '../pages/productVariants/redux/reducers';
import ProgressReducer from '../components/ProgressModal/Redux/reducer';
import PushNotificationReducer from 'pages/dashboard/PushNotification/redux/reducer';
import ShippingReducer from 'pages/dashboard/Shipping/redux/reducer';
import { createBrowserHistory } from 'history';
// import { REHYDRATE } from 'redux-persist/lib/constants';
import UserReducer from 'pages/dashboard/Users/redux/reducer';

// export const history = createBrowserHistory();

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    Shop: ShopReducer,
    Auth: AuthReducer,
    // VendorDoc: VendorDocReducer,
    Vendor: VendorReducer,
    Order: OrderReducer,
    Profile: ProfileReducer,
    Category: CategoryReducer,
    Statistics: StatisticsReducer,
    Progress: ProgressReducer,
    Alert,
    Form: FormReducer,
    Brand: BrandReducer,
    Role: RoleReducer,
    Coupons: CouponsReducer,
    AppConfig: AppConfigReducer,
    VariantDashboard: VariantReducer,
    Deal: DealsReducer,
    Colors: ColorsReducer,
    Review: ReviewsReducer,
    PlaceholderGroup: PlaceholderGroupReducer,
    PlaceholderItem: PlaceholderItemReducer,
    PushNotification: PushNotificationReducer,
    SiteNav: sideNavReducer,
    Customizer,
    Banner: BannerReducer,
    Product: ProductReducer,
    Variant: ProductVariantReducer,
    Shipping: ShippingReducer,
    User: UserReducer,
  });

export default reducers;
