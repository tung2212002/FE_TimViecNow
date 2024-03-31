import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectToken } from '../redux/features/auth/authSlide';
import route from '../constants/route';
import useSide from '../hooks/useSIde';
import { selectBusinessToken } from '../redux/features/authBusiness/authSlide';

const PublicRoute = ({ component: Component, layout: Layout, restricted, positionHeader, ...rest }) => {
    const side = useSide();
    const accessToken = side === 'candidate' ? useSelector(selectToken) : useSelector(selectBusinessToken);
    if (side === 'candidate') {
        return accessToken && restricted ? (
            <Navigate to={route.HOMEPAGE} replace />
        ) : (
            <Layout positionHeader={positionHeader}>
                <Component {...rest} />
            </Layout>
        );
    } else if (side === 'employer') {
        return accessToken && restricted ? (
            <Navigate to={route.DASHBOARD_ADMIN} replace />
        ) : (
            <Layout positionHeader={positionHeader}>
                <Component {...rest} />
            </Layout>
        );
    }
};

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    restricted: PropTypes.bool,
    positionHeader: PropTypes.string,
};

export default PublicRoute;
