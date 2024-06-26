import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import route from '@constants/route';
import useSidePage from '../hooks/useSidePage';
import { sideType } from '../constants';
import functionLocal from '../utils/function/functionLocal';
import functionService from '../utils/function/functionService';
import { selectUser, updateInfo } from '../redux/features/authUser/authSlide';

const PublicRoute = ({ component: Component, layout: Layout, restricted, positionHeader, roles, ...rest }) => {
    const side = useSidePage();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState({
        loading: true,
        valid: false,
    });
    const previousPath = location.state?.from;
    const { getLocalAccessToken, getLocalToken, setLocalUser } = functionLocal(side);
    const { getInfoService } = functionService(side);
    const token = getLocalAccessToken();
    const user = useSelector(selectUser);
    useEffect(() => {
        if (user) {
            setIsLoading({ loading: false, valid: true });
        }
        if (token) {
            getInfoService()
                .then((response) => {
                    if (response.status === 200) {
                        setLocalUser(response.data.data);
                        let token = getLocalToken();
                        dispatch(updateInfo({ token, user: response.data.data }));
                        setIsLoading({ loading: false, valid: true });
                    } else {
                        setIsLoading({ loading: false, valid: false });
                    }
                })
                .catch((error) => {
                    setIsLoading({ loading: false, valid: false });
                    console.error(error);
                });
        } else {
            setIsLoading({ loading: false, valid: false });
        }
    }, [side, token]);

    return (
        <>
            {!user && isLoading.loading && <div className="loading">...</div>}

            {user && !isLoading.loading && restricted && isLoading.valid && (
                <Navigate
                    to={
                        side === sideType.USER
                            ? previousPath && ![route.LOGIN, route.REGISTER].includes(previousPath)
                                ? previousPath
                                : route.HOMEPAGE
                            : previousPath && ![route.LOGIN_BUSINESS, route.REGISTER_BUSINESS].includes(previousPath)
                            ? previousPath
                            : route.DASHBOARD_ADMIN
                    }
                    replace
                />
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
    roles: PropTypes.array,
};

export default PublicRoute;
