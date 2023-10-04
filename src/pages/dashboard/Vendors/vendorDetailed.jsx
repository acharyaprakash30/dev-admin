import React, { Fragment, useEffect, useState } from 'react';
import {
  Container,
  TabContent,
  TabPane,
} from 'reactstrap';
import { Tabs, Button } from 'antd';

import config from 'config/app';
import actions from './redux/actions';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IdcardTwoTone } from '@ant-design/icons';
import Vendorcatalog from './vendorcatalog';
import { getVendorApiById, getVendorProducts } from 'api/fetchVendor';
import VendorForm from 'components/Modal/vendorForm';
import VendorCommission from './vendorCommission';

const Vendors = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState(false);
  const [modaledit, setModaledit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [image, setimage] = useState([]);
  const toggleedit = () => setModaledit(!modaledit);
  const [selected, setSelected] = useState('catalog');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(null)
  const [product, setProducts] = useState([]);
  const data = useSelector((state) => state?.Vendor?.Vendor);
  const vendorDetail = data.filter((vendor) => vendor?.id === Number(id));

  useEffect(() => {
    dispatch(actions.getVendorReq());
  }, []);

  useEffect(() => {
    if (vendorDetail?.length !== 0) {
      getVendorProducts({ id: vendorDetail[0]?.defaultTenant, page, pageSize }).then((response) => {
        setProducts(response?.data?.data);
        setCount(response?.data?.count)
      })
    }
  }, [vendorDetail?.length, page, pageSize])


  const { TabPane } = Tabs;

  const onChange = (key) => {
    console.log(key);
  };

  const submitHandler = async () => {
    const vendor = {
      firstName: modalData?.firstName,
      middleName: modalData?.middleName,
      lastName: modalData?.lastName,
      username: modalData?.username,
      email: modalData?.email,
      image: modalData?.image,
      phone: modalData?.phone,
      company_name: modalData?.company_name,
      company_address: modalData?.company_address,
      is_phone_verified: modalData?.is_phone_verified,
      is_email_verified: modalData?.is_email_verified,
      citizenship: modalData?.citizenship,
      company_registration: modalData?.company_registration,
      pan_or_vat: modalData?.pan_or_vat,
      banijya_bivag: modalData?.banijya_bivag,
    };
    // await axios.patch(`/users/${modalData.id}`, user);
    dispatch(actions.editVendorReq(modalData.id, vendor));
    toggleedit();
    setModalData({});
  };


  return (
    <Fragment>
      <VendorForm modalData={vendorDetail[0]} modaledit={modaledit} toggleedit={toggleedit} setFileList={setFileList} image={[{ url: vendorDetail[0]?.avatar }]} fileList={fileList} setModalData={setModalData} submitHandler={submitHandler} ></VendorForm>
      <Container fluid={true}>
        <div className='mainvendor'>
          <div className="catalog-wrapper col-md-12 col-lg-3 col-sm-12 col-xs-12 mt-2">
            <h2>
              {vendorDetail[0]?.firstName} {vendorDetail[0]?.lastName}{' '}

            </h2>
            <div className="vendor-profile">
              <img
                src={
                  vendorDetail[0]?.avatar === null
                    ? require('assets/images/avtar/dafault-user.jpg')
                    : vendorDetail[0]?.avatar.includes('www')
                      ? vendorDetail[0]?.avatar
                      : config.baseURL + vendorDetail[0]?.avatar
                }
              />
              <div className="overlay-text">
                <h1>{vendorDetail[0]?.vendorDetail?.company_name}</h1>
                <h6>
                  {vendorDetail[0]?.vendorDetail?.company_address}
                  {' , '}
                  {vendorDetail[0]?.phone}
                </h6>
                <>
                  <Button type='danger' onClick={toggleedit} >Edit</Button>
                </>
              </div>
            </div>
          </div>
          <div className="catalog col-md-12 col-lg-9 col-sm-12 col-xs-12 w-100 mb-2">
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Catalog" key="1">
                <Vendorcatalog product={product} setPage={setPage} setPageSize={setPageSize} count={count}></Vendorcatalog>
              </TabPane>{' '}
              <TabPane tab="Commission" key="2">
                <VendorCommission />
              </TabPane>{' '}
            </Tabs>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Vendors;
