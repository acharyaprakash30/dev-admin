const paths = {
  Dashboard: '/dashboard',
  AddProduct: '/dashboard/addProduct',
  ViewProduct: '/dashboard/viewProducts',
  Deals: '/dashboard/deals',
  EditDeal: '/dashboard/deal/:id/edit',
  AddDeal: '/dashboard/deal/create',

  Categories: '/dashboard/categories',
  createCategories: '/dashboard/category/create',
  editCategory: '/dashboard/category/:id/edit',
  addCategoryImage: '/category/:id/upload',

  Brands: '/dashboard/brands',
  createBrand: '/dashboard/brand/create',
  editBrand: '/dashboard/brand/edit/:id',
  addBrandImage: '/brand/:id/upload',

  assetManager: '/asset-manager/upload-image',

  addBanner: '/banners/add',
  allBanner: '/banners/all',
  editBanner: '/banners/:id',

  provinces: '/dashboard/provinces',
  district: '/dashboard/district',
  municipality: '/dashboard/municipality',
  areas: '/dashboard/areas',

  addUser:'/dashboard/user/create',
  listAllUsers:'/dashboard/users',
};

export default paths;