import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import route from '../constants/route';
import { selectToken } from '../redux/features/auth/authSlide';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const token = useSelector(selectToken);

  return token ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to={route.LOGIN} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
