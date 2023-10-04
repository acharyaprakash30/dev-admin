import React from 'react';
import { FiAlertTriangle, FiCircle, FiInfo } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

function alertType(status) {
  switch (true) {
    case 100 <= status && status <= 199:
      return {
        color: 'info dark',
        icon: FiInfo,
      };
    case 400 <= status && status <= 499:
      return {
        color: 'warning dark',
        icon: FiAlertTriangle
      };
    case 500 <= status && status <= 599:
      return {
        color: 'danger dark',
        icon: FiCircle,
      };
    default:
      return null;
  }
}

const AlertItemWithIcon = () => {
  const AlertState = useSelector((state) => state.Alert);
  const { open, message, status } = AlertState;
  const alert = alertType(status);
  return (
    alert &&
    <Alert
      className="alert alert-primary text-center d-flex  align-items-center"
      color={alert.color}
      isOpen={open}
      target={'Alert-message'}
    >

      <alert.icon fontSize={42} />
      <h6 className="text-white m-0 pl-3">{message}</h6>
    </Alert>
  );
};

export default AlertItemWithIcon;
