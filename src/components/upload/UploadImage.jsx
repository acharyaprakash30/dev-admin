import React, { useState } from 'react';
import { Button, Label } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import PreviewImage from './ImagePreview';

import { PlusCircle } from 'react-feather';
const UploadImage = ({
  isMultiple,
  title,
  height,
  width,
  onSubmit,
  getUploadData,
}) => {
  const handleRemove = (meta) => {
    return meta.fileWithMeta.remove();
  };

  const [files, setFiles] = useState([]);

  const handleFiles = ({ file, meta }) => {
    let data = [...files, meta];
    setFiles(data);
  };

  return (
    <>
      <Label className="col-sm-2" key="title">
        {title}
      </Label>
      <Dropzone
        className="col-sm-8"
        key="dropzine"
        classNames={{
          inputLabelWithFiles: 'inputLabelWithFiles-custom',
        }}
        addClassNames={{
          dropzone: isMultiple
            ? 'dropzone-custom-multiple'
            : 'dropzone-custom-single',
        }}
        canRemove={true}
        multiple={isMultiple}
        canCancel={false}
        inputContent="Upload"
        accept="image/*"
        getUploadParams={handleFiles}
        inputWithFilesContent={
          isMultiple ? () => <PlusCircle className="add-image-icon" /> : null
        }
        PreviewComponent={(props) => (
          <PreviewImage
            {...props}
            files={files}
            setFiles={setFiles}
            onClose={handleRemove}
          />
        )}
        styles={{
          dropzone: { width: width, height: height },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </>
  );
};

export default UploadImage;
