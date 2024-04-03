import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import route from '../constants/route';
import useSide from '../hooks/useSIde';
import { getLocalAccessToken, getLocalToken, setLocalUser } from '../utils/authLocalStorage';
import { getLocalBusinessAccessToken, getLocalBusinessToken, setLocalBusiness } from '../utils/authBusinessStorage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserInfo } from '../redux/features/auth/authSlide';
import { selectBusiness, updateBusinessInfo } from '../redux/features/authBusiness/authSlide';
import { getInfoService } from '../services/userService';
import { getInfoBusinessService } from '../services/businessService';

const PublicRoute = ({ component: Component, layout: Layout, restricted, positionHeader, ...rest }) => {
    const side = useSide();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState({
        loading: true,
        valid: false,
    });
    const token = side === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
    const user = side === 'candidate' ? useSelector(selectUser) : useSelector(selectBusiness);

    // if (side === 'candidate') {
    //     return accessToken && restricted ? (
    //         <Navigate to={route.HOMEPAGE} replace />
    //     ) : (
    //         <Layout positionHeader={positionHeader}>
    //             <Component {...rest} />
    //         </Layout>
    //     );
    // } else if (side === 'employer') {
    //     return accessToken && restricted ? (
    //         <Navigate to={route.DASHBOARD_ADMIN} replace />
    //     ) : (
    //         <Layout positionHeader={positionHeader}>
    //             <Component {...rest} />
    //         </Layout>
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

    return (
        <>
            {!user && isLoading.loading && <div className="loading">...</div>}

            {user && !isLoading.loading && restricted && isLoading.valid && (
                <Navigate to={side === 'candidate' ? route.HOMEPAGE : route.DASHBOARD_ADMIN} replace />
            )}

            {user && !isLoading.loading && !restricted && isLoading.valid && (
                <Layout positionHeader={positionHeader}>
                    <Component {...rest} />
                </Layout>
            )}

            {!user && !isLoading.loading && !isLoading.valid && (
                <Layout positionHeader={positionHeader}>
                    <Component {...rest} />
                </Layout>
            )}
        </>
    );
};

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    restricted: PropTypes.bool,
    positionHeader: PropTypes.string,
};

export default PublicRoute;
