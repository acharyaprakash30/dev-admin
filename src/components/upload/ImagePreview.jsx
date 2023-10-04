import React from 'react';
import { XCircle } from 'react-feather';
import SweetAlert from 'sweetalert2';

const PreviewImage = (props) => {
  const handleAlt = ({ meta }) => {
    SweetAlert.fire({
      title: 'Enter image description',
      input: 'text',
    }).then((text) => {
      let a = props.files.filter((item) => item.id === meta.id);
      a.alt = text;
      let b = props.files.filter((item) => item.id !== meta.id);
      props.setFiles([...b, a]);
    });
  };
  return (
    <>
      <div className="preview-image shadow-lg">
        <XCircle className="close-icon" onClick={() => props?.onClose(props)} />
        <img
          onClick={() => handleAlt(props)}
          src={props?.meta?.previewUrl}
          height="170px"
          width="170px"
        />
      </div>
    </>
  );
};

export default PreviewImage;
