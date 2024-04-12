import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import route from '../constants/route';
import useSide from '../hooks/useSIde';
import { getLocalAccessToken, getLocalToken, setLocalUser } from '../utils/authLocalStorage';
import { getLocalBusinessAccessToken, getLocalBusinessToken, setLocalBusiness } from '../utils/authBusinessStorage';
import { getInfoService } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserInfo } from '../redux/features/auth/authSlide';
import { getInfoBusinessService } from '../services/businessService';
import { selectBusiness, updateBusinessInfo } from '../redux/features/authBusiness/authSlide';

const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, verifyBusinessEmail, ...rest }) => {
    const dispatch = useDispatch();
    const side = useSide();
    const [isLoading, setIsLoading] = useState({
        loading: true,
        valid: false,
    });
    const token = side === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
    const user = side === 'candidate' ? useSelector(selectUser) : useSelector(selectBusiness);

    useEffect(() => {
        if (user) {
            console.log('user', verifyBusinessEmail && !user.is_verified_email);
            setIsLoading({ loading: false, valid: true });
        }
        if (token) {
            if (side === 'candidate') {
                getInfoService()
                    .then((response) => {
                        if (response.status === 200) {
                            setLocalUser(response.data.data);
                            let token = getLocalToken();
                            dispatch(updateUserInfo({ token, user: response.data.data }));
                            setIsLoading({ loading: false, valid: true });
                        } else {
                            setIsLoading({ loading: false, valid: false });
                        }
                    })
                    .catch((error) => {
                        setIsLoading({ loading: false, valid: false });
                        console.error(error);
                    });
            } else if (side === 'employer') {
                getInfoBusinessService()
                    .then((response) => {
                        if (response.status === 200) {
                            setLocalBusiness(response.data.data);
                            let token = getLocalBusinessToken();
                            dispatch(updateBusinessInfo({ token, user: response.data.data }));
                            setIsLoading({ loading: false, valid: true });
                        } else {
                            setIsLoading({ loading: false, valid: false });
                        }
                    })
                    .catch((error) => {
                        setIsLoading({ loading: false, valid: false });
                        console.error(error);
                    });
            }
        } else {
            setIsLoading({ loading: false, valid: false });
        }
    }, [side, token]);

    return (
        <>
            {!user && isLoading.loading && <div className="loading">...</div>}

            {user &&
                !isLoading.loading &&
                isLoading.valid &&
                (verifyBusinessEmail && !user.is_verified_email && user.role === 'business' ? (
                    <Navigate to={route.DASHBOARD_VERIFFY} />
                ) : (
                    <Layout positionHeader={positionHeader}>
                        <Component {...rest} />
                    </Layout>
                ))}
            {!user && !isLoading.loading && !isLoading.valid && <Navigate to={side === 'candidate' ? route.LOGIN : route.MANAGER_LOGIN} />}
        </>
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    positionHeader: PropTypes.string,
    verifyBusinessEmail: PropTypes.bool,
};

export default PrivateRoute;
