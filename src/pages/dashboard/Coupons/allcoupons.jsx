import React, { Fragment, useEffect, useState, useRef } from 'react';
import { FcExpired } from 'react-icons/fc';
import { GiMoneyStack, GiTripleScratches } from 'react-icons/gi';
import { IoTicketOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardHeader, Col, Container, Row } from 'reactstrap';
import ModalForm from '../../../components/Modal/Modal';
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import {
  CouponsTableHeader,
  CouponsTableTitle,
  Delete,
  Edit,
  Update,
} from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import actions from './redux/actions';

import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import TableBasicActions from 'components/TableBasicActions';
import { ConfirmDeleteDialogue } from 'utils/Dialogue';
import { Switch, message } from 'antd';
import action from './redux/actions';

const AllCoupons = (props) => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const coupons = useSelector((state) => state.Coupons.Coupons);
  let [filteredData, setFilteredData] = useState(coupons);
  let searchResult = useSelector((state) => state.Coupons.result);
  const [filterValue, setFilterValue] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedID, setSelectedID] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        name: 'Coupon Type',
        selector: 'type',
        sortable: true,
        cell: (row) => row.type,
      },
      {
        name: 'Coupon Code',
        selector: 'code',
        sortable: true,
        cell: (row) => row.code,
      },
      {
        name: 'Max Count',
        selector: 'max_count',
        sortable: true,
        cell: (row) => row.max_count,
      },
      {
        name: 'Price (Min-Max)',
        selector: ['minPrice', 'maxPrice'],
        sortable: true,
        cell: (row) => `${row.minPrice} - ${row.maxPrice}`,
      },
      {
        name: 'Date (Start-End)',
        selector: ['startDate', 'endDate'],
        sortable: true,
        cell: (row) =>
          `${row.startDate?.split('T')[0]} - ${row.endDate?.split('T')[0]}`,
      },
      {
        name: 'Coupon Value',
        selector: 'rate',
        sortable: true,
        cell: (row) => row.couponValue,
      },
      // {
      //   name: 'Usage Count',
      //   selector: 'usageCount',
      //   sortable: true,
      //   cell: (row) => row?.usageCount,
      // },
      // {
      //   name: 'Used',
      //   selector: 'used',
      //   sortable: true,
      //   cell: (row) => row?.used,
      // },
      // {
      //   name: 'Product',
      //   selector: 'product',
      //   sortable: true,
      //   cell: (row) => row?.product,
      // },
      // {
      //   name: 'Vendor',
      //   selector: 'vendor',
      //   sortable: true,
      //   cell: (row) => row?.vendor,
      // },
      // {
      //   name: 'Issue Count',
      //   selector: 'issueCount',
      //   sortable: true,
      //   cell: (row) => row?.issueCount,
      // },
      // {
      //   name: 'isTimeBound',
      //   selector: 'isTimeBound',
      //   sortable: true,
      //   cell: (row) => (row?.isTimeBound == true ? 'True' : 'False'),
      // },
      // {
      //   name: 'Shop',
      //   selector: 'shop',
      //   sortable: true,
      //   cell: (row) => row?.shop,
      // },
      {
        name: 'Status',
        selector: 'isActive',
        sortable: true,
        cell: (row) => (
          <Switch
            checked={row?.id === selectedID ? !row?.isActive : row?.isActive}
            onChange={(e) => handleStatus(e, row)}
          ></Switch>
        ),
      },

      {
        name: 'Actions',
        selector: 'actions',
        sortable: false,
        cell: (item) => (
          <TableBasicActions
            handleView={() => toggleEdit(item)}
            handleDelete={() => deleteCoupon(item.id)}
            handleEdit={() => handleCouponEdit(item.id)}
            viewUrl={'/dashboard/coupons'}
          />
        ),
      },
    ],
    [],
  );

  const datas = [
    {
      title: 'Issued Coupons',
      value: coupons?.length || 0,
      icon: IoTicketOutline,
    },
    {
      title: 'Active Coupons',
      value: coupons.filter((item) => item?.isActive).length,
      icon: GiTripleScratches,
    },
    {
      title: 'Inactive Coupons',
      value: coupons.filter((item) => !item?.isActive).length,
      icon: GiMoneyStack,
    },
    {
      title: 'Expired Coupons',
      value: coupons.filter(
        (item) => new Date(String(item?.endDate)).getTime() > Date.now(),
      ).length,
      icon: FcExpired,
    },
  ];

  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const [modaledit, setModaledit] = useState(false);
  const toggleedit = () => setModaledit(!modaledit);
  const closeModelHandler = () => setShow(false);

  const deleteCouponRef = useRef();
  const editCouponRef = useRef();

  const fetchCoupons = () => {
    dispatch(actions.getCouponsReq());
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  deleteCouponRef.current = (id) => {
    dispatch(actions.dltCouponsReq(id));
  };

  const deleteCoupon = (id) => {
    ConfirmDeleteDialogue('coupon').then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.dltCouponsReq(id));
      }
    });
  };

  editCouponRef.current = (data) => {
    dispatch(actions.editCouponsReq(modelObj.dataObj.id, data));
  };

  useEffect(() => {
    let filtered = coupons;

    if (filterValue) {
      filtered = coupons.filter((item) => item.type === filterValue);
    }
    setFilteredData(filtered);
  }, [filterValue, coupons]);

  const handleSearch = (e) => {
    let value = e.target.value;
    dispatch(actions.searchCouponReq(value));
    setFilteredData(searchResult);
  };

  const [modelObj, setModelObj] = useState({
    title: 'Coupon',
  });

  const toggleEdit = (couponData) => {
    // set formodal
    setModelObj({
      ...modelObj,

      dataObj: {
        id: couponData.id,
        code: couponData.code,
      },
    });
    setShow(true);
  };

  const handleSave = (data) => {
    dispatch(actions.editCategoryReq(modelObj.dataObj.id, data));
    dispatch(actions.getCategoryReq());
  };

  const handleCouponEdit = (id) => {
    push(`./coupon/${id}/edit`);
  };

  const handleStatus = (e, coupon) => {
    dispatch(
      actions.editCouponsReq(coupon?.id, {
        isActive: !coupon?.isActive,
      }),
    );
  };

  useEffect(() => {
    dispatch(actions.getCouponsReq());
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent="Users" title="All Coupons" />
      <Container fluid={true}>
        <ModalForm
          show={show}
          data={modelObj}
          close={closeModelHandler}
          save={handleSave}
        />
        <WidgetGlance data={datas} />
        <div className="edit-profile">
          <div className="feature-products">
            <SearchBox
              handleInput={handleSearch}
              filterText="Search By Coupon Type"
              placeholder={'Search by Coupon Code'}
              setStatus={searching}
              searchTerm={searchTerm}
              handleStatus={(value) => setSearching(value)}
              buttonText="Add Coupon"
              onChange={(e) => setFilterValue(e.target.value)}
              buttonLink="/dashboard/coupon/create"
              options={Array.from(new Set(coupons.map((row) => row.type)))}
            />
          </div>
          <Row>
            <Col md="12">
              <DataTable
                title={<p className="m-0 p-0">{CouponsTableTitle}</p>}
                noHeader={true}
                columns={columns}
                data={filteredData}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default AllCoupons;
