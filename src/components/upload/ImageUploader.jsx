/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Upload, Modal, message } from 'antd';
import swal from 'sweetalert2';
import { ConsoleSqlOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { getBearerToken } from 'helper/utility';
import config from 'config/app';
import { sendFile } from '../../api/axios';
import { editCategoryApi, deleteCategoryApi } from 'api/fetchCategory';
import {fileURLReader} from '../../utils'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// const createFileList = (images) => {
//   let url;
//   if (!images) return [];
//   return images.map((image, index) => {
//     if (image?.url?.includes('/asset/upload')) url = `${config.fileURL}`;
//     if (!image?.url?.includes('/asset/upload'))
//       url = `${config.assetURL}`;
//     return {
//       status: 'done',
//       thumbUrl: image.thumbUrl ? image.thumbUrl : null,
//       uid: image.uid || image.id ? image.uid || image.id : index,
//       name: image.name ? image.name : '',
//       url: image.url ? `${url}/${image.url}` : null,
//       response: [
//         {
//           url: image.url ? image.url : null,
//           id: image.id ? image.id : null,
//           name: image.name ? image.name : null,
//           isActive: image.isActive ? image.isActive : null,
//         },
//       ],
//     };
//   });
// };

const PicturesWall = (props) => {
  const {
    url,
    editImg,
    aspectRatioX,
    aspectRatioY,
    editQuality,
    rotate,
    grid,
    Images,
    setFileList,
    maxImageUpload,
    name,
    id,
  } = props;
  let fileList = [];

  // const defaultFileList = createFileList(Images);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([])

  const [data, setData] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: Images,
  });
  // const [init, setInit] = useState(true);
  fileList = Images;

  useEffect(() => {
    if (Images) {
      let updatedImages = Images.map((image) => ({
        ...image,
        url: `${fileURLReader(image.url)}`
      }))
      setData((data) => ({ ...data, fileList: updatedImages }));
    }
  }, [Images])

  const handleCancel = () => setData({ ...data, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setData({
      ...data,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // const handleChange = (response) => {
  //   //** Note: this is added because Upload only support this state strcture only and ths*/
  //   console.log("new",response);
  //   /**Reset the File List */
  //   fileList = [];
  //   /**Add new Images to fileList */
  //      response?.fileList.map((list) => {
  //     if (list.status === 'done') {
  //       if (list.response && list.response.length > 0) {
  //         if (!list.response[0].url.includes(config.fileURL)) {
  //           list.response[0].url = config.fileURL + list.response[0].url;
  //           fileList.push(list.response[0]);
  //         } else {
  //           fileList.push(list.response[0]);
  //         }
  //       }
  //     }
  //   });
  //   setFileList(fileList);
  //   /**Update data's current status */
  //   setData({ ...data, fileList: response.fileList });
  // };
  const { previewVisible, previewImage, previewTitle } = data;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    //for seeting image upload status done which fixes uploading issue in the upload part
    if (success) {
      setData({
        ...data,
        fileList: data.fileList.map((file) => {
          file.status = 'done';
          return file;
        }),
      });
      setSuccess(false);
    }
  }, [success]);

  const handleDelete = (response) => {

    let updatedImages = Images?.filter((image) => !response?.url?.includes(image?.url));
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
        if (response.url === undefined) {
          return true;
        }
        if (result.isConfirmed) {
          setData((data) => ({ ...data, fileList: updatedImages }))
          setFileList(updatedImages);
        } else {
          message.info('Image is safe');
        }
      });
  };

  const handleUpload = ({ file }) => {
    sendFile(file)
      .then((response) => {
        const { data } = response;
        let imageUrl = data[0]?.url;
        setSuccess(true); //todo
        Array.isArray(Images) && Images?.length ? setFileList((items) => [...items, { url: imageUrl }]) : setFileList([{ url: imageUrl }])
      })
      .catch((error) => {
        console.log({error});
        message.error("Image upload unsuccessful")
      });
  };

  const UploadIMG = () => {
    return (
      <Upload
        // action={config.baseURL + url}
        customRequest={handleUpload}
        listType="picture-card"
        fileList={data.fileList}
        onPreview={handlePreview}
        // onChange={handleChange}
        onRemove={handleDelete}
        headers={{
          Authorization: getBearerToken(),
        }}
      >
        {data?.fileList?.length >= (maxImageUpload ? maxImageUpload : 1)
          ? null
          : uploadButton}
      </Upload>
    );
  };

  return (
    <>
      {editImg ? (
        <ImgCrop
          aspect={
            (aspectRatioX && aspectRatioY ? parseInt(aspectRatioX) : 1) /
            (aspectRatioX && aspectRatioY ? parseInt(aspectRatioY) : 1)
          }
          rotate={rotate ? rotate : false}
          grid={grid ? grid : false}
          quality={editQuality ? editQuality : 0.5}
        >
          {UploadIMG()}
        </ImgCrop>
      ) : (
        UploadIMG()
      )}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
