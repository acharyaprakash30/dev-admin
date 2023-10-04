import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';


const config = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }


const ShowMessage = (status, message) => {
  switch (true) {
    case 100 <= status && status <= 199:
      return toast.info(" Ⓘ "+message, config);
    case 200 <= status && status <= 299:
      return toast.success(" ✔ "+message, config);
    case 400 <= status && status <= 499:
      return toast.warn(" ！"+message, config);
    case 500 <= status && status <= 599:
      return toast.error(" ✘ "+message, config);
    default:
      return null;
  }
};

export default ShowMessage;
