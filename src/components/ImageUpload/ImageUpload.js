import React, { useEffect, useRef, useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { APP_CONFIG } from '../../../app/config';
import axios from '../../../api/axios';
import swal from 'sweetalert2';
import ShowMessage from '../../../components/Toast/Toast';
import productAction from '../redux/action';
import { useDispatch } from 'react-redux';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const Imageupload = ({
  multiple,
  id,
  setToggle,
  toggle,
  getUploadParams,
  data,
}) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });

  const handleToggle = useRef();
  handleToggle.current = () => {
    if (toggle) {
      setToggle(!toggle);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    handleToggle.current();
    dispatch(productAction.fetchProductImages(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const accessToken = localStorage.getItem('access_token');

  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };
  const handleRemove = (props) => {
    return swal
      .fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (props.response === undefined) {
          return true;
        }
        if (result.isConfirmed) {
          return axios
            .delete(
              `${APP_CONFIG.API_BASE_URL}/product-images/${props?.response[0]?.id}`,
            )
            .then((res) => {
              ShowMessage(res.status, 'Deleted Successfully.');
              return true;
            })
            .catch((err) => {
              ShowMessage(err?.response?.status, 'Deletion failed.');
              return false;
            });
        }
        return false;
      });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = ({ fileList }) => setState({ fileList });
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <div>
        <Upload
          action={`${APP_CONFIG.API_BASE_URL}/product/${id}/image-upload`}
          listType="picture-card"
          headers={{
            Authorization: `Bearer ${accessToken}`,
          }}
          fileList={state.fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          data={data}
          multiple={multiple}
          accept={`image/*`}
          className="images"
          onRemove={handleRemove}

        >
          {state.fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal
          style={{zIndex: 999}}
          visible={state.previewVisible}
          title={state.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt={`${state.previewImage}`}
            style={{ width: '100%' }}
            src={state.previewImage}
          />
        </Modal>
      </div>
    </>
  );
};
export default Imageupload;
