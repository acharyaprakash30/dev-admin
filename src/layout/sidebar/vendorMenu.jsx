import {
  Award, DollarSign, Gift,
  HardDrive, HelpCircle, Home,
  Package, Paperclip,
  Plus, Star, Truck, User
} from 'react-feather';
export const VENDORMENUITEMS = [
  {
    menutitle: 'General',
    menucontent: 'Dashboards,Widgets',
    Items: [
      {
        title: 'Dashboard',
        icon: Home,
        type: 'link',
        active: true,
        path: '/dashboard',
      },
      {
        title: 'Profile',
        icon: User,
        type: 'link',
        active: false,
        path: '/userprofile',
      },
      {
        title: 'Shops',
        icon: Package,
        type: 'sub',
        active: false,
        path: '/shop',
        children: [
          {
            title: 'Add Shops',
            icon: Plus,
            type: 'link',
            active: false,
            path: '/addshop',
          },
          {
            title: 'All Shops',
            icon: HardDrive,
            type: 'link',
            active: false,
            path: '/allshops',
          },
        ],
      },
      {
        title: 'Manage Orders',
        icon: Truck,
        type: 'link',
        active: false,
        path: '/orders',
      },
      {
        title: 'Manage Coupons',
        icon: Paperclip,
        type: 'sub',
        active: false,
        path: '/coupons',
        children: [
          {
            title: 'Add Coupons',
            icon: Plus,
            type: 'link',
            active: false,
            path: '/addcoupons',
          },
          {
            title: 'All Coupons',
            icon: HardDrive,
            type: 'link',
            active: false,
            path: '/allcoupons',
          },
        ],
      },
      {
        title: 'Users',
        icon: Package,
        type: 'sub',
        active: false,
        path: '/user',
        children: [
          {
            title: 'Add User',
            icon: Plus,
            type: 'link',
            active: false,
            path: '/adduser',
          },
          {
            title: 'All Users',
            icon: HardDrive,
            type: 'link',
            active: false,
            path: '/allusers',
          },
        ],
      },
      {
        title: 'Transactions',
        icon: DollarSign,
        type: 'link',
        active: false,
        path: '/transactions/completed',
      },
      {
        title: 'Vendor Document',
        icon: Home,
        type: 'link',
        active: true,
        path: '/vendor-document',
      },
      {
        title: 'Reviews',
        icon: Star,
        type: 'link',
        active: false,
        path: '/reviews',
      },
      {
        title: 'Deals',
        icon: Gift,
        type: 'link',
        active: false,
        path: '/deals',
      },
      {
        title: 'My Plans',
        icon: Award,
        type: 'link',
        active: false,
        path: '/plans',
      },
      {
        title: 'Support',
        icon: HelpCircle,
        type: 'link',
        active: false,
        path: '/support',
      },
    ],
  },
];
