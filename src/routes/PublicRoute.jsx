import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectToken } from '../redux/features/auth/authSlide';

const PublicRoute = ({
  component: Component,
  layout: Layout,
  restricted,
  ...rest
}) => {
  const accessToken = useSelector(selectToken);

  return accessToken && restricted ? (
    <Navigate to={'/sub'} replace />
  ) : (
    <Layout>
      <Component />
    </Layout>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
  restricted: PropTypes.bool,
};

export default PublicRoute;
