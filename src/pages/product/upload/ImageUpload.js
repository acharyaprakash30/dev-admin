import React, { useEffect, useRef, useState } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { APP_CONFIG } from '../../../app/config';
import axios, { sendFile } from '../../../api/axios';
import swal from 'sweetalert2';
import ShowMessage from '../../../components/Toast/Toast';
import productAction from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductImageApi } from 'api/products';

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const productImagesList = useSelector(
    (state) => state.Product?.productImages)


  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: productImagesList,
  });


  const handleToggle = useRef();
  handleToggle.current = () => {
    if (toggle) {
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    dispatch(productAction.fetchProductImages(id));
  }, [id]);


  const accessToken = localStorage.getItem('access_token');

  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };
  const handleRemove = async (props) => {
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
        if (props.id === undefined) {
          return true;
        }
        if (result.isConfirmed) {
          dispatch(productAction.deleteProductImage(props.id))
        }
        else {
          message.info("Image is safe");
        }
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


  const handleChange = (info) => {
    const { fileList } = info;
    setState({ fileList });
  }

  useEffect(() => { //for seeting image upload status done which fixes uploading issue in the upload part
    if (success) {
      setState({
        ...state, fileList: state.fileList.map((file) => {
          file.status = "done"
          return file
        })
      })
      setSuccess(false);
    }
  }, [success])

  const customRequests = ({ file, onSuccess }) => {
    setLoading(true)
    sendFile(file)
      .then((response) => {
        const { data } = response;
        let object = {
          key: data[0]?.data?.Key,
          bucket: data[0]?.data?.Bucket,
          url: data[0]?.data?.Location,
          adminProductId: +id
        }
        dispatch(productAction.addProductImage(object))
      })
      .catch((err) => {
        setSuccess(false)
        setLoading(false);
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
          // action={`https://api.ktmkart.com/asset-manager/upload-image`}
          customRequest={customRequests}
          listType="picture-card"
          headers={{
            Authorization: `Bearer ${accessToken}`,
            // 'Content-Type': 'multipart/form-data'
          }}
          fileList={!loading ? productImagesList : state.fileList}

          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={true}
          data={data}
          multiple={multiple}
          accept={`image/*`}
          className="images"
          onRemove={handleRemove}
        >
          {state.fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal // ,modal image when clicked
          style={{ zIndex: 999 }}
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
