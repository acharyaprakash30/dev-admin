import React, { Fragment, useEffect, useState } from 'react';
import config from 'config/app';
import { AutoComplete, Card, Input, Image, Tag } from 'antd';
import { FiPackage, FiStar } from 'react-icons/fi';
import { BiPackage } from 'react-icons/bi';
import { MdFiberNew } from 'react-icons/md';
import CountUp from 'react-countup';
import DataTable from 'react-data-table-component';
import { Label } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import NoImage from '../../../assets/images/noImg.png';
import { fileURLReader } from 'utils';

const Vendorcatalog = ({ product, count, setPage, setPageSize }) => {
  let countData = [
    { name: `Total Products`, count: count, icon: FiPackage },
    { name: `Published Products`, count: 7, icon: BiPackage },
    { name: `Featured Products`, count: 5, icon: FiStar },
    { name: `New Products`, count: 3, icon: MdFiberNew },
  ];

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    setProducts(product);
  }, [product]);

  let columns = React.useMemo(() => [
    {
      name: 'ID',
      sortable: true,
      center: true,
      cell: (row) => row?.id,
    },
    {
      name: 'Image',
      sortable: true,
      center: true,
      cell: (row) => (
        <Image
          height={'60px'}
          src={fileURLReader(row?.images ? row?.images[0]?.url : '')}
          // src={
          //   `${Array.isArray(row?.images)}`
          //     ? `${config.baseURL}${row?.images[0]?.url}`
          //     : NoImage
          // }
        ></Image>
      ),
    },
    {
      name: 'Name',
      center: true,
      sortable: true,
      cell: (row) => row?.name,
    },
    {
      name: 'Price',
      center: true,
      sortable: true,
      cell: (row) => row?.salePrice,
    },
    {
      name: 'Brand',
      center: true,
      sortable: true,
      cell: (row) => row?.brands?.name || 'N/A',
    },
    {
      name: 'Category',
      center: true,
      sortable: true,
      cell: (row) => row.category?.name || 'N/A',
    },
    {
      name: 'Status',
      center: true,
      sortable: true,
      cell: (row) => (
        <Tag color={`${row?.published ? 'green' : 'red'}`}>
          {row?.published ? 'Published' : 'UnPublished'}
        </Tag>
      ),
    },
    {
      name: 'Verified',
      center: true,
      sortable: true,
      cell: (row) => (
        <Tag color={`${row?.isVerified ? 'green' : 'red'}`}>
          {row?.isVerified ? 'Verified' : 'UnVerified'}
        </Tag>
      ),
    },
  ]);

  useEffect(() => {
    let updatedProducts = product.filter((item) =>
      item?.name.toLowerCase().includes(search.toLowerCase()),
    );
    setProducts(updatedProducts);
  }, [search]);
  return (
    <Fragment>
      <div className="counts d-flex justify-content-around vendorCard">
        {countData.map((item) => (
          <div className="d-flex flex-column justify-content-between align-items-center">
            <div className="d-flex align-items-center justify-content-center itemCount">
              <item.icon
                className="mr-1"
                style={{ fontSize: '35px', color: '#43BEE1' }}
              />
              <CountUp className="count" end={item.count}></CountUp>
            </div>
            <div className="text-center itemName">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="productList vendorCard mt-3 d-flex flex-column">
        <div className="productSearch">
          <Label>
            <h5>Catalog</h5>
          </Label>
          <div style={{ position: 'relative' }}>
            <Input
              placeholder="Product Search"
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderRadius: '5px' }}
            />
            <FaSearch className="searchIcon" />
          </div>
        </div>
        <div>
          <DataTable
            noHeader
            data={products}
            columns={columns}
            paginationServer
            pagination
            paginationTotalRows={count}
            onChangeRowsPerPage={(pageSize, page) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            onChangePage={(page, totalRow) => setPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Vendorcatalog;
