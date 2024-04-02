import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import route from '../constants/route';
import { selectToken } from '../redux/features/auth/authSlide';
import { selectBusinessToken } from '../redux/features/authBusiness/authSlide';
import useSide from '../hooks/useSIde';
import { getLocalAccessToken } from '../utils/authLocalStorage';
import { getLocalBusinessAccessToken } from '../utils/authBusinessStorage';

const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, ...rest }) => {
    const side = useSide();
    const token = side === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
    if (side === 'candidate') {
        return token ? (
            <Layout positionHeader={positionHeader}>
                <Component {...rest} />
            </Layout>
        ) : (
            <Navigate to={route.LOGIN} />
        );
    } else if (side === 'employer') {
        return token ? (
            <Layout positionHeader={positionHeader}>
                <Component {...rest} />
            </Layout>
        ) : (
            <Navigate to={route.MANAGER_LOGIN} />
        );
    }
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    positionHeader: PropTypes.string,
};

export default PrivateRoute;
