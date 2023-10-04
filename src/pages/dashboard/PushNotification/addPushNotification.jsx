import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from 'antd';
import { Container } from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import { FiSearch, FiTrash } from 'react-icons/fi';
import { fetchUserByName } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axiosInstance, { sendFile } from 'api/axios';
import { fileURLReader } from 'utils';
import { getAllCategories } from 'api/fetchCategoryVariant';
import { getBrandApi } from 'api/fetchBrand';
import { getCouponApi } from 'api/fetchCoupons';
import { getDealApi } from 'api/fetchDeals';
import { useHistory } from 'react-router-dom';

const AddPushNotifications = () => {
  let dispatch = useDispatch();

  const [details, setDetails] = useState({
    title: '',
    body: '',
    device: '',
    isActive: false,
    
    key: '',
    value: '',
  });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [options, setOptions] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState();

  const [viewImage, setViewImage] = useState('');
  const [valueData, setValueData] = useState({
    coupon: [],
    category: [],
    brands: [],
    deals: [],
  });

  const uploadButton = (
    <div>
      {loading && !loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSearch = (e) => {
    setSelectedUser(e);
    if (e) {
      fetchUserByName(e).then((response) => {
        setUsers(response?.data?.users);
        setOptions(
          response?.data?.users?.map((user) => ({
            label: `${user?.firstName}${' '}${user?.lastName}${' '}-${' '}(${
              user?.email
            })`,
            value: user?.id,
          })),
        );
      });
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const customRequests = ({ file, onSuccess }) => {
    sendFile(file)
      .then((response) => {
        const { data } = response;
        let object = {
          key: data[0]?.data?.Key,
          bucket: data[0]?.data?.Bucket,
          url: data[0]?.url,
        };
        setFileList([file]);
        setViewImage(data[0]?.data?.key);
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = async (e, type) => {
    if (type) {
      return setDetails({
        ...details,
        key: type,
        value: e,
      });
    }
    const { name, value, checked } = e.target;
    if (name === 'key') {
      setLoading(true);
      let brands, categories, coupons, deals;
      if (value === 'brand') {
        brands = await getBrandApi();
        setValueData({
          brands: [...brands?.data],
        });
      }
      if (value === 'category') {
        categories = await getAllCategories();
        setValueData({
          category: [...categories?.data],
        });
      }
      if (value === 'coupon') {
        coupons = await getCouponApi({});
        setValueData({
          coupon: [...coupons?.data],
        });
      }
      if (value === 'deal') {
        deals = await getDealApi();
        setValueData({
          deals: [...deals.data?.deals],
        });
      }

      setLoading(false);
    }

    if (name === 'sendtoIndividual') {
      setDetails({
        ...details,
        [name]: checked,
      });
      return;
    }
    setDetails({
      ...details,
      [name]: value,
    });
  };
  const history = useHistory();
  const findPlaceholder = (action) => {
    if (action === 'url') {
      return (
        <Input
          onChange={(e) => handleChange(e.target.value, 'url')}
          placeholder="/url"
        ></Input>
      );
    } else if (action === 'coupon') {
      return (
        <Select
          name="coupon"
          onChange={(e) => handleChange(e, 'coupon')}
          placeholder="Select Coupon"
          loading={loading}
        >
          {Array.isArray(valueData?.coupon) &&
            valueData?.coupon.map((item) => (
              <Select.Option name="coupon" value={item?.id}>
                {item?.code}
              </Select.Option>
            ))}
        </Select>
      );
    } else if (action === 'keyword') {
      return (
        <Input
          onChange={(e) => handleChange(e.target.value, 'keyword')}
          placeholder="Keyword"
        ></Input>
      );
    } else if (action === 'brand') {
      return (
        <Select
          name="brand"
          onChange={(e) => handleChange(e, 'brand')}
          placeholder="Select Brand"
        >
          {Array.isArray(valueData?.brands) &&
            valueData?.brands.map((item) => (
              <Select.Option name="brand" value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
        </Select>
      );
    } else if (action === 'deal') {
      return (
        <Select
          name="deal"
          onChange={(e) => handleChange(e, 'deal')}
          placeholder="Select Deal"
        >
          {Array.isArray(valueData?.deals) &&
            valueData?.deals.map((item) => (
              <Select.Option name="deal" value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
        </Select>
      );
    } else if (action === 'category') {
      return (
        <Select
          onChange={(e) => handleChange(e, 'category')}
          placeholder="Select Category"
          name="category"
        >
          {Array.isArray(valueData?.category) &&
            valueData?.category.map((item) => (
              <Select.Option name="category" value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
        </Select>
      );
    }
  };
  const handleSubmit = (e, type) => {
    e.preventDefault();
    // if (details.device === 'sendToIndividual')
    //   details.users = selectedUsers.map((users) => users.id);
    if (details.device === 'topic') delete details.users;
    details.status = type;
    console.log(details);
    delete details.isActive;
    axiosInstance
      .post('/push-notifications', {
        ...details,
        value: String(details?.value),
        image: viewImage,
      })
      .then((response) => {
        debugger;
        if (response.status === 200) {
          message.success(
            `Notification ${
              type === 'publish' ? 'published' : 'saved'
            } successfully`,
          );
          history.push('/dashboard/push-notifications');
        }
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          message.error('Please enter all the required fields');
        }
      });
  };
  return (
    <>
      <Breadcrumb
        parent="Dashboard"
        title="Add Push Notifications"
      ></Breadcrumb>
      <Container fluid={true}>
        <div className="push-notifications-form card p-4 ml-2 ">
          <form className="form-group">
            <div className="notification-title mb-3">
              <label>Notification Title*</label>
              <input
                minLength={5}
                maxLength={50}
                onChange={handleChange}
                className="form-control col-lg-9"
                name="title"
              ></input>
            </div>
            <div className="notification-body mb-3">
              <label>Notification Body*</label>
              <textarea
                minLength={15}
                maxLength={150}
                className="form-control col-lg-9"
                name="body"
                onChange={handleChange}
              ></textarea>
            </div>

            {
              <div className="notification-target-topic mb-3">
                <label className="mr-2">Target</label>
                <select onChange={handleChange} name="device">
                  <option>Choose Target</option>
                  <option value="general">General Users</option>
                  <option value="ios">IOS Users</option>
                  <option value="android"> Android</option>
                </select>
              </div>
            }
            {/* <div className="notification-target mb-3">
                <input
                  name="sendToIndividual"
                  onChange={handleChange}
                  value="sendToIndividual"
                  className="form-radio mr-1"
                  type="checkbox"
                ></input>
                <p className="form-check-label d-inline">Send To Individual</p>
              </div> */}
            {
              // details?.device && (
              //   <div className="notification-target-individual mb-3">
              //     <Form.Item className="col-md-7 col-lg-9 col-sm-12 autosearch">
              //       <AutoComplete
              //         className="form-control "
              //         placeholder="Search User ..."
              //         onChange={handleSearch}
              //         options={options}
              //         onSelect={handleUser}
              //         value={selectedUser}
              //       ></AutoComplete>
              //       {/* <FiSearch /> */}
              //     </Form.Item>
              //     {Array.isArray(selectedUsers) &&
              //       selectedUsers.length > 0 &&
              //       selectedUsers.map((user) => (
              //         <div className="selected-user mb-2 d-flex justify-content-between">
              //           <div className="selected-user-details">
              //             <p>Name: {user?.firstName + ' ' + user?.lastName}</p>
              //             <p>Email: {user?.email}</p>
              //           </div>
              //           <div className="seletced-user-delete mr-2 align-self-center">
              //             <FiTrash onClick={() => handleDelete(user)} />
              //           </div>
              //         </div>
              //       ))}
              //   </div>
              // )
            }
            <div className="notification-click-action mb-2">
              <label className="mr-2">Click Action*</label>
              <select
                className="form-select py-1 px-3"
                onChange={handleChange}
                name="key"
              >
                <option name="action" value="">
                  Choose Action
                </option>
                <option name="action" value="coupon">
                  Coupon
                </option>
                <option name="action" value="url">
                  External URL
                </option>
                <option name="action" value="keyword">
                  Keyword
                </option>

                <option name="action" value="deal">
                  Deal
                </option>
                <option name="action" value="category">
                  Category
                </option>
                <option name="action" value="brand">
                  Brand
                </option>
              </select>
            </div>
            {details?.key && (
              <div className="mb-3">{findPlaceholder(details.key)}</div>
            )}
            <div className="notification-is-active mb-3">
              <input
                name="isActive"
                className="form-checkbox mr-2"
                type="checkbox"
                onChange={(e) =>
                  setDetails({
                    ...details,
                    isActive: e.target.checked,
                  })
                }
              ></input>
              <label className="form-check-label">Is Active?</label>
            </div>
            <div>
              <label>Upload Image</label>
              {!viewImage ? (
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={customRequests}
                >
                  {uploadButton}
                </Upload>
              ) : (
                <div className="d-flex justify-content-start">
                  <img
                    src={fileURLReader(viewImage)}
                    alt="avatar"
                    style={{ width: '15%' }}
                  />
                  <DeleteOutlined
                    onClick={() => setViewImage('')}
                    className="ml-5 align-self-center"
                    style={{ color: 'red', fontSize: '22px' }}
                  ></DeleteOutlined>
                </div>
              )}
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
            <div className="push-notification-submit">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e, 'save')}
              >
                Save{' '}
              </button>
            </div>
            <div className="push-notification-submit">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={(e) => handleSubmit(e, 'publish')}
              >
                Save and Publish
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddPushNotifications;
