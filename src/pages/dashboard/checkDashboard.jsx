import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VendorDashboard from './vendorDashboard/VendorDashboard';
import AdminDashboard from './adminDashboard/adminDashboard';
import { decodeToken } from "react-jwt";

// import { decodeToken } from "react-jwt";

const CheckDashboard= () => {
  const auth = useSelector((state) => state.Auth);

  const accessToken = localStorage.getItem('access_token');
  const decodedData = decodeToken(accessToken);

  if(auth.isLoggedIn) {
      if(decodedData.role == 3){
          return <VendorDashboard />
      } else if(decodedData.role == 2 || decodedData.role == 1){
          return <AdminDashboard />
      }
  }
}

export default CheckDashboard;