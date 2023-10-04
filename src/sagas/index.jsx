import { all } from 'redux-saga/effects';
import AlertSaga from '../components/Alert/redux/saga';
import authSaga from '../pages/authentication/redux/saga';
import AppConfigSaga from '../pages/dashboard/AppConfig/redux/saga';
import BrandSaga from '../pages/dashboard/Brand/redux/saga';
import CategorySaga from '../pages/dashboard/Category/redux/saga';
import ColorSaga from '../pages/dashboard/Colors/redux/saga';
import CouponSaga from '../pages/dashboard/Coupons/redux/saga';
import DealSaga from '../pages/dashboard/Deals/redux/saga';
import FormGroupSaga from '../pages/dashboard/Form/redux/saga';
import OrderSaga from '../pages/dashboard/Order/redux/saga';
import PlaceholderGroupSaga from '../pages/dashboard/PlaceholderGroup/redux/saga';
import placeholderItemsSaga from '../pages/dashboard/PlaceholderItems/redux/saga';
import ProfileSaga from '../pages/dashboard/Profile/redux/saga';
import ReviewSaga from '../pages/dashboard/Review/redux/saga';
import RoleSaga from '../pages/dashboard/Role/redux/saga';
import ShopSaga from '../pages/dashboard/Shop/redux/saga';
import siteNavSaga from '../pages/dashboard/Sidenav/redux/saga';
import VariantSaga from '../pages/dashboard/Variants/redux/saga';
import VendorSaga from '../pages/dashboard/Vendors/redux/saga';
import Dashboard from '../pages/dashboard/Dashboard/redux/saga';
import Banner from '../pages/dashboard/Banner/redux/saga';
import Product from '../pages/product/redux/saga';
import Variants from '../pages/productVariants/redux/saga';
import PushNotification from '../pages/dashboard/PushNotification/redux/saga'
import Shipping from '../pages/dashboard/Shipping/redux/saga';
import UserSaga from '../pages/dashboard/Users/redux/saga';

/**
 * All the sagas will be registerd in this root saga
 */
export default function* rootSagas() {
  yield all([
    authSaga(),
    AlertSaga(),
    FormGroupSaga(),
    VendorSaga(),
    ShopSaga(),
    CategorySaga(),
    BrandSaga(),
    RoleSaga(),
    OrderSaga(),
    ProfileSaga(),
    AppConfigSaga(),
    CouponSaga(),
    VariantSaga(),
    DealSaga(),
    ColorSaga(),
    ReviewSaga(),
    PlaceholderGroupSaga(),
    placeholderItemsSaga(),
    siteNavSaga(),
    Dashboard(),
    Banner(),
    Product(),
    Variants(),
    PushNotification(),
    Shipping(),
    UserSaga(),
  ]);
}
