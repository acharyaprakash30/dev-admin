import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory, useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Card, Checkbox, Image, message, Select } from 'antd';
import { FaPrint } from 'react-icons/fa';
import TextArea from 'antd/lib/input/TextArea';
import config from 'config/app';
import MyDocument from '../../../components/pdf';
import axios from '../../../api/axios';
import './order.css';
import { editOrderApi, relatedVendors, transferOrder } from 'api/fetchOrder';
import NoImage from '../../../assets/images/noImg.png';
const { Option } = Select;

const Edit = () => {
  const params = useParams();
  const ref = useRef();
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const [vendors, setVendors] = useState([]); // setting different vendors for different products;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedProductId, setSelectProductId] = useState([]);
  const [selectedProduct, setSelectProduct] = useState([]);
  const [remarkValue, setRemarkValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('pending');

  const handleOk = () => {
    setIsModalVisible(false);
    editOrderApi(deliveryStatus, params?.id, remarkValue)
      .then((response) => {
        message.success('Order has been updated');
      })
      .catch((error) => {
        setDeliveryStatus(ref.current);
        message.error('Order update failed');
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRemarkValue('');
  };

  const handleVendorSearch = (id) => {
    setLoading(true);
    relatedVendors(id)
      .then((response) => {
        if (response.data.length === 0) {
          setDisabled(true);
          setLoading(false);
          setSuccess(false);
        }
        setVendors([...response?.data]);
        setLoading(false);
        setSuccess(true);
        setDisabled(true);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
      });
  };

  const fetchOrders = async () => {
    const response = await axios.get(`/orders/${params.id}`);
    const ord = await response.data;
    setOrderItems(ord?.orderItems);
    if (ord) {
      setOutOfStockItems(
        Array.isArray(ord?.orderItems) &&
          ord?.orderItems.filter((item) => {
            if (
              item?.productVariant.stock <= 0 &&
              (ord?.status !== 'outForDelivery' ||
                ord?.status !== 'processing' ||
                ord?.status !== 'delivered')
            ) {
              return item;
            } else {
              return null;
            }
          }),
      );
    }
    setOrder(ord);
    setDeliveryStatus(ord.status);
    ref.current = ord.status;
  };

  const handleCheckBox = (e, i, product) => {
    let { checked } = e.target;

    if (checked === true && !selectedProductId.includes(i)) {
      // checking if the checkbox is true and  the array donot incldes the product id earlier
      // so that the user wont be able to add the same product in the array.

      if (selectedProductId.length > 0)
        //if the lenght of the array is greater than  than returning so that user wont be able to add in the array
        return message.info('Please select only one at a time');

      setVendors([]); // setting null array of vendor foe new selection so that it wont be seen when user selects another product which might not have vendors
      selectedProductId.push(i); //pushing id to array
      selectedProduct.push(product);
      handleVendorSearch(i); //calling vendor search function
    } else if (checked === false && selectedProductId.includes(i)) {
      selectedProductId.pop(selectedProductId.indexOf(i)); //removing the data from the selectedProduct array
    }
    setSelectProductId([...selectedProductId]); //setting the selecteProduct Id at  the end of the operation
    setSelectProduct([...selectedProduct]);
  };

  const handleTransfer = () => {
    let data = {
      productName: selectedProduct[0].name,
      brand: selectedProduct[0].brands.id,
      selectedVendor: selectedVendor,
      orderId: +params?.id,
      orderItemId: outOfStockItems.filter(
        // getting cart id so that it can be deleted from this order because it wiil be transferred to another order
        (item) => item?.product?.id === selectedProductId[0],
      )[0]?.id,
    };
    transferOrder(data)
      .then((response) => {
        message.success("Order transferred successfully");
        history.push('/dashboard/orders')
        history.go(0);
      })
      .catch((err) => {
        if (err.response.status === 422)
          return message.error('Request body is invalid');
        else {
          message.error('Transfer order failed');
        }
      });
  };

  useEffect(() => {
    if (params) {
      fetchOrders();
    }
  }, [params, history]);

  const onDeliveryStatusChange = (value) => {
    setDeliveryStatus(value);
    setIsModalVisible(true);
  };

  return (
    <div className="order-edit">
      <Modal isOpen={isModalVisible}>
        <ModalHeader>Add Remark</ModalHeader>
        <ModalBody>
          <TextArea
            style={{ width: '100%', height: '100%' }}
            onChange={(e) => setRemarkValue(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button className="primary" onClick={handleOk}>
            Submit Remark
          </Button>{' '}
          <Button onClick={handleCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Card title="Order Details" bordered={true}>
        <div className="flex-end">
          <div className="select-label">
            <label id="delivery-boy">Assign Deliver Boy</label>
            <div className="select2-drpdwn-product select-options p-0 w-100">
              <Select className="" name="select" defaultValue={'female'}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>
          </div>

          <div className="select-label">
            <label id="delivery-boy">Payment Status</label>
            <div className=" select2-drpdwn-product select-options p-0 w-100">
              <Select className="" name="select" defaultValue={'unpaid'}>
                <Option value="paid">Paid</Option>
                <Option value="unpaid">Unpaid</Option>
              </Select>
            </div>
          </div>

          <div className="select-label">
            <label id="delivery-boy">Delivery Status</label>
            <div className=" select2-drpdwn-product select-options p-0 w-100">
              <Select
                className=""
                name="select"
                value={deliveryStatus}
                onChange={(e) => onDeliveryStatusChange(e)}
              >
                <Option
                  value="accepted"
                  disabled={
                    deliveryStatus === '' || deliveryStatus === 'pending'
                      ? false
                      : true
                  }
                >
                  Accepted
                </Option>
                <Option
                  value="rejected"
                  disabled={
                    deliveryStatus === '' ||
                    deliveryStatus === 'accepted' ||
                    deliveryStatus === 'pending'
                      ? false
                      : true
                  }
                >
                  Rejected
                </Option>
                <Option
                  value="processing"
                  disabled={deliveryStatus === 'accepted' ? false : true}
                >
                  Processing
                </Option>
                <Option
                  value="outForDelivery"
                  disabled={
                    deliveryStatus === 'processing' &&
                    deliveryStatus !== 'rejected'
                      ? false
                      : true
                  }
                >
                  OutForDelivery
                </Option>
                <Option
                  disabled={
                    deliveryStatus === 'outForDelivery' &&
                    deliveryStatus !== 'rejected'
                      ? false
                      : true
                  }
                  value="delivered"
                >
                  Delivered
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="details row">
          <div className="customer-details ">
            <p className="fs-16">
              <strong>Customer Details</strong>
            </p>

            <p>
              <strong> Name: </strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              {order?.user?.firstName} {order?.user?.lastName}
            </p>
            <p>
              <strong>User Name: </strong>&nbsp; &nbsp;{order?.user?.username}
            </p>
            <p>
              <strong> Email: </strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
              {order?.user?.email}
            </p>
            <p>
              <strong> Phone: </strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              {order?.user?.phone ?? '-'}
            </p>
            {/* <p>Lorem placeat ut ve, Sed ea dolore offici, Et et dolore officia</p> */}
            {/* <p>Namibia</p> */}
          </div>
          <div className="customer-details">
            <p className="fs-16">
              <strong>Shipping Details</strong>
            </p>
            <p>
              <strong> Address: </strong> &nbsp;
              {typeof order?.delivery_address === 'object'
                ? `${order?.delivery_address?.name.toUpperCase()},
                ${order?.delivery_address?.municipality?.name.toUpperCase()},
                ${order?.delivery_address?.municipality?.district?.name.toUpperCase()}`
                : order?.delivery_address}
            </p>
            <p>
              <strong>Delivery Price: </strong>&nbsp; &nbsp;
              {order?.delivery_price}
            </p>
            <p>
              <strong> Order Quantity: </strong> &nbsp; &nbsp; {order?.quantity}
            </p>
          </div>
          <div className="order-details">
            <p className="ml-2 fs-16">
              <strong>Order Details</strong>
            </p>

            <div className="order-details--text">
              <p>Tracking Code &nbsp; &nbsp; &nbsp;</p>
              <p>{order?.tracking_code}</p>
            </div>
            <div className="order-details--text">
              <p>Order Status &nbsp; &nbsp; &nbsp; &nbsp;</p>
              <p>pending</p>
            </div>
            <div className="order-details--text">
              <p>Order date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
              <p>{order?.createdOn?.substr(0, 10)}</p>
            </div>
            <div className="order-details--text">
              <p>Total amount &nbsp; &nbsp; &nbsp; &nbsp;</p>
              <p>
                {order?.order?.currency} {order.amount}
              </p>
            </div>
            <div className="order-details--text">
              <p>Payment method </p>
              <p> {order?.payment_type?.split('_').join(' ')}</p>
            </div>
          </div>
        </div>

        <DataTable
          noHeader
          columns={[
            {
              name: 'Photo',
              center: true,
              cell: (row) => (
                <Image
                  src={
                    Array.isArray(row?.product?.images)
                      ? `${config.baseURL}${row?.product?.images[0]?.url}`
                      : NoImage
                  }
                  height={90}
                  width={90}
                  alt={`${row?.product?.name}`}
                />
              ),
              grow: 0.5,
            },
            {
              name: 'Name',
              center: true,
              selector: (row) => row?.product?.name,
            },
            {
              name: 'Stock',
              center: true,
              selector: (row) => row?.productVariant?.stock,
            },
            {
              name: 'Price',
              center: 'true',
              selector: (row) => row?.product?.salePrice,
            },
          ]}
          data={orderItems}
        />

        {/* out of stock  */}
        <DataTable
          className="mt-1"
          title="Out of Stock Items"
          columns={[
            {
              name: '#',
              center: true,
              width: '60px',
              selector: (row) => (
                <Checkbox
                  checked={
                    selectedProductId.filter(
                      (item) => row.product.id === item,
                    )[0]
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckBox(e, row.product.id, row.product)
                  }
                ></Checkbox>
              ),
            },
            {
              name: 'Photo',
              center: true,
              cell: (row) => (
                <Image
                  src={
                    Array.isArray(row?.product?.images)
                      ? `${config.baseURL}${row?.product?.images[0]?.url}`
                      : NoImage
                  }
                  height={90}
                  width={90}
                  alt={`${row?.product?.name}`}
                />
              ),
              grow: 0.5,
            },
            {
              name: 'Name',
              center: true,
              selector: (row) => row?.product?.name,
            },
            {
              name: 'Stock',
              center: true,
              selector: (row) => row?.productVariant?.stock,
            },
            {
              name: 'Vendor',
              center: true,
              selector: (row) => row?.product?.tenant?.name || '-',
            },
          ]}
          data={outOfStockItems}
        />

        {/* vendor select design */}
        {selectedProductId.length > 0 && vendors.length > 0 && (
          <div className="select-vendor">
            <h5 className="mt-4 pb-1 border-bottom">Transfer Product</h5>
            <div className="d-flex m-0 mt-1 flex-row justify-content-between align-items-center text-capitalize">
              <p className="bold">
                {
                  outOfStockItems.filter(
                    (item) => item?.product?.id === selectedProductId[0],
                  )[0]?.product?.name
                }
              </p>
              <Select
                onChange={(e) => setSelectedVendor(e)}
                className="w-50"
                placeholder="Select Vendor"
              >
                {vendors.map((vendor) => (
                  <Select.Option key={vendor?.id} value={vendor?.id}>
                    {vendor?.name}
                  </Select.Option>
                ))}
              </Select>
              <Button className="btn btn-primary" onClick={handleTransfer}>
                Submit
              </Button>
            </div>
          </div>
        )}

        <div className="flex-row ">
          <div className="flex-column">
            <p>Sub Total</p>
            <p>Shipping cost</p>
            <p>Total Tax</p>
            <p className="border-bottom">Coupon Discount</p>

            <p>Grand Total</p>
          </div>
          <div className="flex-column">
            <p className="bold">NRS.{order?.amount}</p>
            <p className="bold">NRS.0.000</p>
            <p className="bold">NRS.0.000</p>
            <p className="bold border-bottom">NRS.{order?.coupon_discount}</p>
            <p className="bold">NRS.{order?.amount - order?.coupon_discount}</p>
            {order && order.status ? (
              <PDFDownloadLink
                document={<MyDocument order={order} />}
                fileName="orderdetails.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <FaPrint size={20} style={{ margin: '10px', color: 'red' }} />
                )}
              </PDFDownloadLink>
            ) : null}
          </div>
        </div>
        <div>
          <Button onClick={() => history.push('/dashboard/orders')}>
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Edit;
