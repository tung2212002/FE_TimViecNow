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

const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, ...rest }) => {
    const dispatch = useDispatch();
    const side = useSide();
    const [isLoading, setIsLoading] = useState({
        loading: true,
        valid: false,
    });
    const token = side === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
    const user = side === 'candidate' ? useSelector(selectUser) : useSelector(selectBusiness);
    // if (side === 'candidate') {
    //     return token ? (
    //         <Layout positionHeader={positionHeader}>
    //             <Component {...rest} />
    //         </Layout>
    //     ) : (
    //         <Navigate to={route.LOGIN} />
    //     );
    // } else if (side === 'employer') {
    //     return token ? (
    //         <Layout positionHeader={positionHeader}>
    //             <Component {...rest} />
    //         </Layout>
    //     ) : (
    //         <Navigate to={route.MANAGER_LOGIN} />
    //     );
    // }

    useEffect(() => {
        if (user) {
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

    // return isLoading.loading ? (
    //     <div className="loading">Loading...</div>
    // ) : isLoading.valid ? (
    //     <Layout positionHeader={positionHeader}>
    //         <Component {...rest} />
    //     </Layout>
    // ) : (
    //     <Navigate to={side === 'candidate' ? route.LOGIN : route.MANAGER_LOGIN} />
    // );
    return (
        <>
            {!user && isLoading.loading && <div className="loading">...</div>}

            {user && !isLoading.loading && isLoading.valid && (
                <Layout positionHeader={positionHeader}>
                    <Component {...rest} />
                </Layout>
            )}
            {!user && !isLoading.loading && !isLoading.valid && <Navigate to={side === 'candidate' ? route.LOGIN : route.MANAGER_LOGIN} />}
        </>
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    positionHeader: PropTypes.string,
};

export default PrivateRoute;
