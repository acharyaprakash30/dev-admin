import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WidgetGlance from './../../../components/Widget/WidgetGlance';
import {
  FaUserAlt,
  FaStoreAlt,
  FaOutdent,
  FaFirstOrder,
  FaStore,
  FaTags,
  FaGifts,
  FaShippingFast,
  FaImages,
  FaUsers,
} from 'react-icons/fa';

import { MdCancelScheduleSend } from 'react-icons/md';
import { BsFillCartCheckFill, BsInboxFill } from 'react-icons/bs';
import actions from './redux/actions';

const Statistics = (props) => {
  let dispatch = useDispatch();

  let apiCalledTimes = localStorage.getItem('apicall');

  useEffect(() => {
    if(!apiCalledTimes){
    dispatch(actions.countBanner());
    dispatch(actions.countBrand());
    dispatch(actions.countCategory());
    dispatch(actions.countDeal());
    dispatch(actions.countOrder());
    dispatch(actions.countShop());
    dispatch(actions.countCoupon());
    dispatch(actions.countUser());
    dispatch(actions.countVendor());
    dispatch(actions.countPendingOrder())
    dispatch(actions.countActiveOrder())
    dispatch(actions.countCancelledOrder())
    dispatch(actions.countDeliveredOrder())
    dispatch(actions.countProcessingOrder())
    dispatch(actions.countoutForDeliveryOrder())
    dispatch(actions.countPaidOrder())
    localStorage.setItem('apicall',1);
  }
  }, [apiCalledTimes]);

  const AllStates = useSelector((state) => state.Statistics);
  let totalUsers = AllStates?.user?.data?.count ? AllStates.user.data.count : 0;
  let totalVendor = AllStates?.vendor?.data ? AllStates.vendor.data.length : 0;
  let totalCategory = AllStates?.category?.data?.count
    ? AllStates.category.data.count
    : 0;
  let totalCoupon = AllStates?.coupon?.data?.count
    ? AllStates.coupon.data.count
    : 0;
  let totalDeal = AllStates?.deal?.data?.count ? AllStates.deal.data.count : 0;
  let totalOrder = AllStates?.order?.data?.count
    ? AllStates.order.data.count
    : 0;
  let totalShop = AllStates?.shop?.data?.count ? AllStates.shop.data.count : 0;
  let totalBanner = AllStates?.banner?.data?.count
    ? AllStates.banner.data.count
    : 0;
  let totalBrand = AllStates?.brand?.data?.count
    ? AllStates.brand.data.count
    : 0;

  let totalPendingOrder = AllStates?.pendingOrder?.data?.count ? AllStates?.pendingOrder?.data?.count : 0
  let totalDeliveredOrder = AllStates?.deliveredOrder?.data?.count ? AllStates?.deliveredOrder?.data?.count : 0
  let totalActiveOrder = AllStates?.activeOrder?.data?.count ? AllStates?.activeOrder?.data?.count : 0
  let totalCancelledOrder = AllStates?.cancelledOrder?.data?.count ? AllStates?.cancelledOrder?.data?.count : 0

  let currentStatistics = [
    {
      title: 'Pending Orders',
      value: totalPendingOrder,
      icon: BsInboxFill,
      url: 'dashboard/orders',
    },
    {
      title: 'Active Orders',
      value: totalActiveOrder,
      icon: FaStoreAlt,
      url: 'dashboard/orders',
    },
    {
      title: 'Delivered Orders',
      value: totalDeliveredOrder,
      icon: BsFillCartCheckFill,
      url: 'dashboard/orders',
    },
    {
      title: 'Cancelled Orders',
      value: totalCancelledOrder,
      icon: MdCancelScheduleSend,
      url: 'dashboard/orders',
    },
    {
      title: 'Users',
      value: totalUsers,
      icon: FaUserAlt,
      url: 'dashboard/users',
    },
    // {
    //     title: 'Vendors',
    //     value: totalVendor,
    //     icon: FaStoreAlt,
    //     url:'dashboard/vendors'
    // },

    {
      title: 'Categories',
      value: totalCategory,
      icon: FaOutdent,
      url: 'dashboard/categories',
    },
    {
      title: 'Brands',
      value: totalBrand,
      icon: FaFirstOrder,
      url: 'dashboard/brands',
    },
    {
      title: 'Shops',
      value: totalShop,
      icon: FaStore,
      url: 'dashboard/shops',
    },
    {
      title: 'Coupons',
      value: totalCoupon,
      icon: FaTags,
      url: 'dashboard/coupons',
    },
    {
      title: 'Deals',
      value: totalDeal,
      icon: FaGifts,
      url: 'dashboard/deals',
    },
    {
      title: 'Orders',
      value: totalOrder,
      icon: FaShippingFast,
      url: 'dashboard/orders',
    },
    {
      title: 'Banners',
      value: totalBanner,
      icon: FaImages,
      url: 'banners/all',
    },
    {
      title: 'Vendor',
      value: totalVendor,
      icon: FaUsers,
      url: 'dashboard/vendors',
    },
  ];

  return (
    <div className="dash-wrap">
      <WidgetGlance data={currentStatistics} />
    </div>
  );
};

export default Statistics;
