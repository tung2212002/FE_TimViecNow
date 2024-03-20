import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import route from '../constants/route';
import { selectToken } from '../redux/features/auth/authSlide';

const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, ...rest }) => {
    const token = useSelector(selectToken);
    return token ? (
        <Layout positionHeader={positionHeader}>
            <Component {...rest} />
        </Layout>
    ) : (
        <Navigate to={route.LOGIN} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    positionHeader: PropTypes.string,
};

export default PrivateRoute;
