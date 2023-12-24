/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import axios from '../plugins/axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import { GoVerified } from 'react-icons/go';
import { Link } from 'react-router-dom';
const VerificationLayout = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const access_token = new URLSearchParams(location.search).get('token') as string;

  useEffect(() => {
    axios
      .post(`/verify-email`, {
        access_token,
      })
      .then(function (response) {
        setIsVerified(true);
        // navigate('/userprofile');
      })
      .catch(function (error) {
        toast.warn(`Sorry, email ${error?.response?.data?.keyValue?.email ?? ''} is not verified`);
      });
  }, [access_token]);

  return (
    <div className="container card my-3 p-3">
      {!isVerified ? (
        <LoadingOverlay
          loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
        />
      ) : (
        <div className="text-primary-700 text-center ">
          <h1>
            successfully verified <GoVerified className="bg-green" />
          </h1>
          <Link to="/login-screen" className="text-blue-600 no-underline hover:underline">
            Back to login page
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerificationLayout;
