import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ActionButton from '../../components/ActionButtons/ActionButtons';
import productAction from './redux/action';
import { Tag, Typography, Avatar, Skeleton, Switch, Pagination } from 'antd';
import Breadcrumb from '../../layout/breadcrumb';
import { APP_CONFIG } from '../../app/config';
import Filter from '../../components/Filter/Filter';
import { getDeepLinkedCategoryByIdApi } from '../../api/fetchCategory';

const { Text } = Typography;

const ViewProducts = () => {
  const dispatch = useDispatch();
  // const searchResult = useSelector((state) => state?.Product?.searchResult);
  const brands = useSelector((state) => state?.Product?.brands);
  const categories = useSelector((state) => state?.Product?.categories);
  let products = useSelector((state) => state?.Product?.products);
  let productCount = useSelector((state) => state?.Product?.productCount);
  const loading = useSelector((state) => state.Product?.loading);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const getProducts = useRef();

  // product filter
  const [isPublish, setIsPublish] = useState(false);
  const [isDeal, setIsDeal] = useState(false);
  const [isLowStock, setIsLowStock] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [noCategory, setNoCategory] = useState(false);
  const [selectBrand, setSelectBrand] = useState(null);
  const [selectCategory, setSelectCategory] = useState('all');

  const fetchCategory = () => {
    getDeepLinkedCategoryByIdApi()
      .then(({ data }) => {
        setCategoryList(data);
      })
      .catch((error) => console.error('Error', error));
  };

  getProducts.current = () => {
    // dispatch(productAction.getProducts(page, pageSize)); //passing page number and page size
    dispatch(productAction.getBrand());
    fetchCategory();
  };
  useEffect(() => {
    getProducts.current();
  }, []);

  useEffect(() => {
    const filter = {
      page: page,
      pageSize: pageSize,
    };

    if (brand) filter.brand = brand;
    if (selectCategory && selectCategory !== 'all') {
      filter.category_id = selectCategory;
    }
    // if (query !== '') filter.name = query; // search by

    // if (getSkip) filter.skip = getSkip;
    if (isPublish) filter.isActive = isPublish;

    // FIXME: low stock should be dynamic in future updates
    if (isLowStock) filter.lowStock = 10;
    if (dateRange) filter.date = dateRange;

    // apply filter
    dispatch(productAction.getProducts(filter)); //passing page number and page size
  }, [
    page,
    pageSize,
    brand,
    selectBrand,
    selectCategory,
    isPublish,
    isLowStock,
    dateRange,
    isDeal,
    noCategory,
  ]);

  useEffect(() => {
    // if(search)
  }, [search, brand]);

  const handleChange = (current, pageSize) => {
    setPage(current);
    setPageSize(pageSize);
  };

  const handleDelete = (id) => {
    dispatch(productAction.deleteProduct(id));
  };

  const handleSearch = (data) => {
    setSearch(data);
    dispatch(productAction.searchQuery(data));
  };

  const handleCategory = (data) => setSelectCategory(data);
  // toggle update product featured
  const handleFeaturedHandler = (id, fetured) => {
    dispatch(productAction.editProduct(id, { fetured }));
  };

  const supportColumns = [
    {
      name: ' S.N',
      selector: 'serial',
      center: true,
      width: '50px',
      cell: (row) => <p>{row.serial}</p>,
    },
    {
      name: 'Product Name',
      selector: 'name',
      sortable: true,
      center: true,
      width: '200px',
      cell: (row) => (
        <div className="d-flex w-100 justify-content-center p-1">
          <span>
            <Link
              style={{ textDecoration: 'none', textAlign: 'left' }}
              to={`/product/${row.id}/details`}
            >
              {row.name}
            </Link>
          </span>
        </div>
      ),
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: ' Image',
      selector: 'image',
      center: true,
      width: '100px',
      cell: (row) => (
        <div className="d-flex w-100 justify-content-center p-1">
          {console.log(row, 'row')}

          {row?.image?.map((item, index) => (
            <Avatar shape="square" size="large" src={item} />
          ))}
        </div>
      ),
    },
    {
      name: 'Added By',
      selector: 'addedBy',
      sortable: true,
      center: true,
      cell: (row) => <Text className="text-center">{row.addedBy}</Text>,
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'SKU',
      selector: 'code',
      sortable: true,
      center: true,
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Retail Price',
      selector: 'retailPrice',
      sortable: true,
      center: true,
      cell: (row) => <Text className="text-center">{row.retailPrice}</Text>,
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Sales Price',
      selector: 'salePrice',
      sortable: true,
      center: true,
      cell: (row) => <Text className="text-center">{row.salePrice}</Text>,
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Featured',
      selector: 'featured',
      sortable: true,
      center: true,
      cell: (row) => (
        <Switch
          checked={row.featured}
          onChange={(checked) => handleFeaturedHandler(row?.id, checked)}
        />
      ),
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      center: true,
      width: '200px',
      cell: (row) => (
        <>
          <Tag color={row.status ? 'green' : 'red'}>
            {row.status ? 'Published' : 'UnPublished'}
          </Tag>
        </>
      ),
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Actions',
      selector: 'action',
      center: true,
      width: '400px',
    },
  ];

  console.log(products, 'products');

  const supportData =
    products?.length &&
    products?.map((product, index) => {
      return {
        name: product.name,
        id: product.id,
        serial: index + 1,
        salePrice: product.salePrice,
        retailPrice: product.retailPrice,
        status: true,
        addedBy: product?.user?.username || 'Not Defined',
        code:
          (product?.variants &&
            product?.variants.map((variant, index) => {
              let skudata =
                variant?.sku +
                `${index + 1 === product?.variants.length ? '' : ','}`;
              return skudata;
            })) ||
          'None',
        // image: product?.image ? product.image.url : '',
        // image: (product?.image && product?.image.map((item,index)=>item.url))),
        image:
          product?.adminProductImages &&
          product?.adminProductImages.map((item, index) => {
            return item.url;
          }),
        featured: product?.featured,
        action: (
          <ActionButton
            id={product.id}
            item={product}
            onDelete={() =>
              SweetAlert.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete',
              }).then((res) => {
                if (res.isConfirmed) {
                  handleDelete(product.id);
                }
              })
            }
          />
        ),
      };
    });

  // filter handlers

  const handleBrand = (data) => {
    setBrand(data);
    // dispatch(productAction.brandSelect(data, search, category));
  };

  const checkDealHandler = ({ target }) => {
    setIsDeal(target.checked ? target.checked : false);
  };

  const checkStockHandler = ({ target }) => {
    setIsLowStock(target.checked ? target.checked : false);
  };

  const checkDateHandler = (value) => {
    const date = {
      startDate: value?.[0]?._d,
      endDate: value?.[1]?._d,
    };
    setDateRange(value ? date : null);
  };

  return (
    <>
      <Container className="addProduct-card" fluid={true}>
        <Row>
          <Col sm="12">
            <Breadcrumb parent="Products" title="Product Lists" />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Filter
              handleSearch={handleSearch}
              brands={brands}
              categories={categoryList}
              handleBrand={handleBrand}
              handleCategory={handleCategory}
              checkPublishHandler={setIsPublish}
              checkDealHandler={checkDealHandler}
              checkStockHandler={checkStockHandler}
              checkDateHandler={checkDateHandler}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className={loading ? 'p-3' : 'p-0'}>
                {loading ? (
                  <>
                    <Skeleton loading={loading} active avatar></Skeleton>
                    <Skeleton loading={loading} active avatar></Skeleton>
                    <Skeleton loading={loading} active avatar></Skeleton>
                  </>
                ) : (
                  <>
                    <div className="table-responsive support-table">
                      <DataTable
                        columns={supportColumns}
                        data={supportData}
                        striped={true}
                        center={true}
                      ></DataTable>
                    </div>
                    <Row>
                      <Col className="mt-2">
                        <Pagination
                          showSizeChanger
                          onChange={handleChange}
                          pageSize={pageSize}
                          current={page}
                          total={productCount}
                          style={{
                            height: '40px',
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewProducts;
