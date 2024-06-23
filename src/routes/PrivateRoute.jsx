import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import route from '@constants/route';
// import useSide from '@hooks/useSIde';
import useSidePage from '../hooks/useSidePage';
import functionLocal from '../utils/function/functionLocal';
import functionService from '../utils/function/functionService';
import { updateInfo } from '../redux/features/authUser/authSlide';
import { role, sideType } from '../constants';
import { DashboardNotFound } from '../pages/DashboardAdminPage';
import { NotFoundPage } from '../pages';
import { selectUser } from '../redux/features/authUser/authSlide';

const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, verify, verifyBusinessEmail, restricted, roles, ...rest }) => {
    const dispatch = useDispatch();
    const side = useSidePage();
    const path = useMemo(() => window.location.pathname, []);
    const [isLoading, setIsLoading] = useState({
        loading: true,
        valid: false,
    });

    const { getLocalAccessToken, getLocalToken, setLocalUser } = functionLocal(side);
    const { getInfoService } = functionService(side);

    const token = getLocalAccessToken();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user) {
            setIsLoading((prev) => ({ ...prev, loading: false }));
        }

        if (token) {
            getInfoService()
                .then((response) => {
                    if (response.status === 200) {
                        setLocalUser(response.data.data);
                        const token = getLocalToken();

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

    if (!user && isLoading.loading) {
        return <div className="loading">...</div>;
    }

    if (user && !isLoading.loading && isLoading.valid) {
        if (verifyBusinessEmail && !user.is_verified_email && user.role === role.BUSINESS) {
            return <Navigate to={route.DASHBOARD_VERIFFY} />;
        }
        if (!restricted) {
            if (roles) {
                if (roles.includes(user.role)) {
                    return (
                        <Layout positionHeader={positionHeader}>
                            <Component {...rest} />
                        </Layout>
                    );
                } else if (user.role === role.USER) {
                    return (
                        <Layout>
                            <NotFoundPage />
                        </Layout>
                    );
                } else if (user.role === role.BUSINESS) {
                    return (
                        <Layout>
                            <DashboardNotFound />
                        </Layout>
                    );
                } else {
                    return (
                        <Layout>
                            <NotFoundPage />
                        </Layout>
                    );
                }
            } else {
                return (
                    <Layout positionHeader={positionHeader}>
                        <Component {...rest} />
                    </Layout>
                );
            }
        }
        return (
            <Navigate
                to={
                    side === sideType.USER
                        ? path === route.LOGIN
                            ? route.HOMEPAGE
                            : route.HOMEPAGE
                        : path === route.MANAGER_LOGIN
                        ? route.DASHBOARD_ADMIN
                        : route.DASHBOARD_ADMIN
                }
                replace
            />
        );
    }

    if (!user && !isLoading.loading && !isLoading.valid) {
        return (
            <Navigate
                to={side === sideType.USER ? route.LOGIN : route.MANAGER_LOGIN}
                state={{
                    from: path,
                }}
            />
        );
    }

    return null;
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    positionHeader: PropTypes.string,
    verifyBusinessEmail: PropTypes.bool,
    restricted: PropTypes.bool,
    verify: PropTypes.array,
    roles: PropTypes.array,
};

export default PrivateRoute;
