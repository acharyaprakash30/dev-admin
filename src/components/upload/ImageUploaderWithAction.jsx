import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { getBearerToken } from 'helper/utility';
import config from 'config/app';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const createFileList = (images) => {
    if(!images) return [];
    return images.map((image, index)=>{
        return {
            status: 'done',
            thumbUrl: image.thumbUrl ? image.thumbUrl : null,
            uid: image.uid || image.id? image.uid || image.id : index,
            name: image.name ? image.name : '',
            url: image.url ? image.url : null, 
            response: [{
                url: image.url ? image.url : null,
                id: image.id ? image.id : null,
                name: image.name ? image.name : null,
                isActive: image.isActive ? image.isActive : null
            }]
        };
    });
}

const PicturesWall = (props) => {
    const { url, action, editImg, aspectRatioX, aspectRatioY, editQuality, rotate, grid, Images, setFileList, maxImageUpload } = props;
    let fileList = [];

    const defaultFileList = createFileList(Images);
    const [data, setData] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: defaultFileList
    });

    fileList = defaultFileList;
    
    const handleCancel = () => setData({ ...data, previewVisible: false });

    const handlePreview = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setData({
            ...data,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    const handleChange = (response) => {
        //** Note: this is added because Upload only support this state strcture only and ths*/

        /**Reset the File List */
        fileList = [];

        /**Add new Images to fileList */
        response?.fileList.map((list)=>{
            if(list.status === "done"){
                if(list.response && list.response.length > 0){
                    if(!list.response[0].url.includes(config.baseURL)){
                        list.response[0].url = config.baseURL + list.response[0].url;
                        fileList.push(list.response[0]);
                    }else{
                        fileList.push(list.response[0]);
                    }
                } 
            }
        });
        setFileList(fileList);
        /**Update data's current status */
        setData({ ...data, fileList: response.fileList });
    };
    const { previewVisible, previewImage, previewTitle } = data;
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const UploadIMG = () => {
        return (
            <Upload
                action={action}
                listType="picture-card"
                fileList={data.fileList}
                onPreview={handlePreview}
                onChange={handleChange}

                headers={{
                    Authorization: getBearerToken(),
                }}
            >
                {data?.fileList?.length >= (maxImageUpload ? maxImageUpload : 1) ? null : uploadButton}
            </Upload>);
    }

    return (
        <>
            {editImg ?
                <ImgCrop
                    aspect={(aspectRatioX && aspectRatioY ? parseInt(aspectRatioX) : 1) / (aspectRatioX && aspectRatioY ? parseInt(aspectRatioY) : 1)}
                    rotate={rotate ? rotate : false}
                    grid={grid ? grid : false}
                    quality={editQuality ? editQuality : 0.5}>
                    {UploadIMG()}
                </ImgCrop>
                : UploadIMG()}
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
}

export default PicturesWall;