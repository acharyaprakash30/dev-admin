import React, { Fragment, useEffect, useState } from 'react';
import { FaCartPlus, FaShippingFast } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
} from 'reactstrap';
import {
  ordersDeliveredCountApi,
  ordersPendingCountApi,
  ordersActiveCountApi,
  ordersCancelCountApi,
  fetchOrderApi,
  ordersOutForDeliveryCountApi,
  ordersProcessingCountApi,
  ordersPaidCountApi,
  fetchVendorCountApi,
} from '../../../api/fetchOrder';
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import Breadcrumb from '../../../layout/breadcrumb';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { FaEye, FaFileDownload, FaTrash } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../../../components/pdf';
import axios from '../../../api/axios';
import FilterStatus from 'components/Filter/FilterStatus';

import './order.css';
import SimpleSlider from 'components/Slider';

const datas = [
  {
    title: "Today's Orders",
    value: 0,
    icon: FaCartPlus,
  },
  {
    title: 'Total Shipped Orders',
    value: 0,
    icon: FaShippingFast,
  },
  {
    title: 'Pending Orders',
    value: 0,
    icon: VscLoading,
  },
  {
    title: 'Cancelled Orders',
    value: 0,
    icon: MdCancel,
  },
];
const Allorders = (props) => {
  const [orderCount, setOrderCount] = useState(null);
  const [apicall, setApicall] = useState(0);

  // useEffect(() => {
  //   ordersDeliveredCountApi().then(({ data }) =>
  //     setOrderCount((prevState) => ({
  //       ...prevState,
  //       delivered: data.count,
  //     })),
  //   );
  //   ordersPendingCountApi().then(({ data }) =>
  //     setOrderCount((prevState) => ({ ...prevState, pending: data.count })),
  //   );
  //   ordersCancelCountApi().then(({ data }) =>
  //     setOrderCount((prevState) => ({
  //       ...prevState,
  //       rejected: data.count,
  //     })),
  //   );
  //   ordersActiveCountApi().then(({ data }) =>
  //     setOrderCount((prevState) => ({
  //       ...prevState,
  //       confirmed: data.count,
  //     })),
  //   );
  //   ordersOutForDeliveryCountApi().then(({ data }) =>
  //     setOrderCount((prevState) => ({
  //       ...prevState,
  //       outForDelivery: data.count,
  //     })),
  //   );
  //   ordersProcessingCountApi().then(({ data }) =>
  //     setOrderCount((prevState) => ({
  //       ...prevState,
  //       processing: data.count,
  //     })),
  //   );
  //   ordersPaidCountApi().then(({ data }) =>
  //   setOrderCount((prevState) => ({
  //     ...prevState,
  //     paid: data.count,
  //   })),
  // );
  // },

  //  []);

  useEffect(() => {
    datas.map((item) => ({
      ...item,
      value: orderCount?.[item.key],
    }));
  }, [orderCount, datas]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [tenant, setTenant] = useState();
  const [page, setPage] = useState(1);
  const activeOrder = useSelector(
    (state) => state.Statistics?.activeOrder?.data?.count,
  );
  const pendingOrder = useSelector(
    (state) => state.Statistics?.pendingOrder?.data?.count,
  );
  const cancelledOrder = useSelector(
    (state) => state.Statistics?.cancelledOrder?.data?.count,
  );
  const deliveredOrder = useSelector(
    (state) => state.Statistics?.deliveredOrder?.data?.count,
  );
  const processingOrder = useSelector(
    (state) => state.Statistics?.processingOrder?.data?.count,
  );
  const outForDelivery = useSelector(
    (state) => state.Statistics?.outForDelivery?.data?.count,
  );
  const paidOrder = useSelector(
    (state) => state.Statistics?.paidOrder?.data?.count,
  );
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchOrderApi({ page, perPage, selectedStatus, tenant })
      .then((response) => {
        setOrders(response?.data?.orderItems);
        setTotalRows(response?.data?.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [page, perPage, selectedStatus, tenant]);

  useEffect(() => {
    fetchVendorCountApi().then((response) => setVendors(response.data));
  }, []);

  useEffect(() => {
    setOrderCount({
      all: totalRows,
      confirmed: activeOrder,
      pending: pendingOrder,
      rejected: cancelledOrder,
      delivered: deliveredOrder,
      processing: processingOrder,
      outForDelivery: outForDelivery,
    });
  }, [
    totalRows,
    activeOrder,
    pendingOrder,
    cancelledOrder,
    deliveredOrder,
    processingOrder,
    outForDelivery,
  ]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPage(page);
    setPerPage(newPerPage);
  };

  const history = useHistory();

  const columns = [
    {
      name: 'Order Code',
      // selector:row=>row.orderCode,
      selector: (row) => row.id,
      grow: 0.2,
    },
    {
      name: 'Customer',
      cell: (row) => (
        <p>
          {row?.user?.firstName} {row?.user?.lastName}
        </p>
      ),
      center: true,
    },
    {
      name: 'Email',
      cell: (row) => <p>{row?.user?.email}</p>,
      grow: 1,
    },

    {
      name: 'Phone',
      cell: (row) => <p>{row?.user?.phone}</p>,
    },

    {
      name: 'Amount',
      selector: (row) => `${row.currency}. ${row.amount}`,
      center: true,
      grow: 0.85,
      wrap: true,
    },
    {
      name: 'Payment',
      selector: (row) => (
        <button className="btn-danger" style={{ borderRadius: '5px' }}>
          Unpaid
        </button>
      ),
      center: true,
      grow: 0.5,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      center: true,
      grow: 0.5,
    },
    {
      name: 'Vendor',
      selector: (row) => row.tenant?.name || '-',
      wrap: true,
      grow: 0.5,
      center: true,
    },
    {
      name: 'Vendor Contact',
      selector: (row) => row.tenant?.phone || '-',
      wrap: true,
      grow: 0.5,
      center: true,
    },
    {
      name: 'Delivery Address',
      selector: (row) => `${row?.delivery_address}`,
      center: true,
      wrap: true,
    },
    {
      name: 'Payment Type',
      selector: (row) =>
        row.payment_type.replace('c', 'C').split('_').join(' '),
      wrap: true,
      grow: 0.5,
      center: true,
    },

    {
      name: 'Options',
      cell: (row) => (
        <>
          <button
            onClick={() =>
              history.push({
                pathname: `/dashboard/orders/${row.id}/edit`,
                state: row,
              })
            }
            style={{
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            <FaEye size={15} style={{ margin: '5px', color: 'red' }} />
          </button>

          <PDFDownloadLink
            document={<MyDocument order={row} />}
            fileName="orderdetails.pdf"
          >
            {({ blob, url, loading, error }) => (
              <FaFileDownload
                size={15}
                style={{ margin: '5px', color: 'red' }}
              />
            )}
          </PDFDownloadLink>
        </>
      ),
      center: true,
    },
  ];

  return (
    <Fragment>
      <Breadcrumb parent="dashboard" title="Manage Orders" />
      <Container fluid={true}>
        <WidgetGlance data={datas} />
        <div className="feature-products">
          <Row>
            <Col xl="3" sm="3">
              <div className={`product-sidebar }`}>
                <div className="filter-section">
                  <Card>
                    <CardHeader>
                      <h6 className="mb-0 f-w-600">
                        Filters
                        <span className="pull-right">
                          <i className="fa fa-chevron-down toggle-data"></i>
                        </span>
                      </h6>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </Col>
            <Col xl="4" sm="4">
              <Form>
                <FormGroup className="m-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Filter by Code"
                  />
                  <i className="fa fa-search"></i>
                </FormGroup>
              </Form>
            </Col>

            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select className="form-control btn-square" name="select">
                  <option>Filter by deliviery Status</option>
                  <option value="Featured">Pending</option>
                  <option value="LowestPrices">Delivered</option>
                  <option value="HighestPrices">On The Way</option>
                </select>
              </div>
            </Col>
          </Row>
        </div>
        {/* <div>
          <SimpleSlider
            setter={setTenant}
            items={vendors}
            type="vendor"
          ></SimpleSlider>
        </div> */}
        {
          <FilterStatus
            //  data={{all:totalRows,confirmed:activeOrder,pending:pendingOrder,rejected:cancelledOrder,delivered: deliveredOrder,processing:processingOrder,outForDelivery:outForDelivery}}
            data={orderCount}
            selectedStatus={selectedStatus}
            setStatus={setSelectedStatus}
          ></FilterStatus>
        }
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <div className="table-responsive">
                  <DataTable
                    columns={columns}
                    data={orders}
                    progressPending={loading}
                    noHeader={true}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    responsive
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[10, 20, 50, 100]}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Allorders;
