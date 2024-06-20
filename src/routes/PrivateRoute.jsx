// import { useEffect, useMemo, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import route from '../constants/route';
// import useSide from '../hooks/useSIde';
// import { getLocalAccessToken, getLocalToken, setLocalUser } from '../utils/authLocalStorage';
// import { getLocalBusinessAccessToken, getLocalBusinessToken, setLocalBusiness } from '../utils/authBusinessStorage';
// import { getInfoService } from '../services/userService';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUser, updateUserInfo } from '../redux/features/auth/authSlide';
// import { getInfoBusinessService } from '../services/businessService';
// import { selectBusiness, updateBusinessInfo } from '../redux/features/authBusiness/authSlide';

// const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, verifyBusinessEmail, restricted, ...rest }) => {
//     const dispatch = useDispatch();
//     const side = useSide();
//     const path = useMemo(() => window.location.pathname, []);
//     const [isLoading, setIsLoading] = useState({
//         loading: true,
//         valid: false,
//     });

//     const token = side === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
//     const user = side === 'candidate' ? useSelector(selectUser) : useSelector(selectBusiness);
//     console.log('PrivateRoute -> user', user);
//     // console.log('PrivateRoute -> isLoading', isLoading);
//     useEffect(() => {
//         console.log('PrivateRoute -> user', user, isLoading);
//         if (user) {
//             setIsLoading((prev) => ({ ...prev, loading: false }));
//         }
//         console.log('PrivateRoute -> token', token);
//         if (token) {
//             if (side === 'candidate') {
//                 getInfoService()
//                     .then((response) => {
//                         if (response.status === 200) {
//                             setLocalUser(response.data.data);
//                             let token = getLocalToken();
//                             dispatch(updateUserInfo({ token, user: response.data.data }));
//                             setIsLoading({ loading: false, valid: true });
//                         } else {
//                             setIsLoading({ loading: false, valid: false });
//                         }
//                     })
//                     .catch((error) => {
//                         setIsLoading({ loading: false, valid: false });
//                         console.error(error);
//                     });
//             } else if (side === 'employer') {
//                 getInfoBusinessService()
//                     .then((response) => {
//                         if (response.status === 200) {
//                             setLocalBusiness(response.data.data);
//                             let token = getLocalBusinessToken();
//                             dispatch(updateBusinessInfo({ token, user: response.data.data }));
//                             setIsLoading({ loading: false, valid: true });
//                         } else {
//                             setIsLoading({ loading: false, valid: false });
//                         }
//                     })
//                     .catch((error) => {
//                         setIsLoading({ loading: false, valid: false });
//                         console.error(error);
//                     });
//             }
//         } else {
//             setIsLoading({ loading: false, valid: false });
//         }
//     }, [side, token]);

//     return (
//         <>
//             {!user && isLoading.loading && <div className="loading">...</div>}

//             {user &&
//                 !isLoading.loading &&
//                 isLoading.valid &&
//                 (verifyBusinessEmail && !user.is_verified_email && user.role === 'business' ? (
//                     <Navigate to={route.DASHBOARD_VERIFFY} />
//                 ) : !restricted ? (
//                     <Layout positionHeader={positionHeader}>
//                         <Component {...rest} />
//                     </Layout>
//                 ) : (
//                     // <Navigate to={side === 'candidate' ? route.HOMEPAGE : route.DASHBOARD_ADMIN} replace />
//                     <Navigate to={path} replace />
//                 ))}
//             {!user && !isLoading.loading && !isLoading.valid && <Navigate to={side === 'candidate' ? route.LOGIN : route.MANAGER_LOGIN} />}
//         </>
//     );
// };

// PrivateRoute.propTypes = {
//     component: PropTypes.elementType.isRequired,
//     layout: PropTypes.elementType.isRequired,
//     positionHeader: PropTypes.string,
//     verifyBusinessEmail: PropTypes.bool,
//     restricted: PropTypes.bool,
// };

// export default PrivateRoute;

import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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

const PrivateRoute = ({ component: Component, layout: Layout, positionHeader, verifyBusinessEmail, restricted, ...rest }) => {
    const dispatch = useDispatch();
    const side = useSide();
    const path = useMemo(() => window.location.pathname, []);
    const [isLoading, setIsLoading] = useState({
        loading: true,
        valid: false,
    });

    const token = side === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
    const user = side === 'candidate' ? useSelector(selectUser) : useSelector(selectBusiness);
    useEffect(() => {
        if (user) {
            setIsLoading((prev) => ({ ...prev, loading: false }));
        }

        if (token) {
            const fetchInfo = side === 'candidate' ? getInfoService : getInfoBusinessService;
            fetchInfo()
                .then((response) => {
                    if (response.status === 200) {
                        if (side === 'candidate') {
                            setLocalUser(response.data.data);
                            const token = getLocalToken();
                            dispatch(updateUserInfo({ token, user: response.data.data }));
                        } else {
                            setLocalBusiness(response.data.data);
                            const token = getLocalBusinessToken();
                            dispatch(updateBusinessInfo({ token, user: response.data.data }));
                        }
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
        if (verifyBusinessEmail && !user.is_verified_email && user.role === 'business') {
            return <Navigate to={route.DASHBOARD_VERIFFY} />;
        }
        if (!restricted) {
            return (
                <Layout positionHeader={positionHeader}>
                    <Component {...rest} />
                </Layout>
            );
        }
        return (
            <Navigate
                to={
                    side === 'candidate'
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
                to={side === 'candidate' ? route.LOGIN : route.MANAGER_LOGIN}
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
};

export default PrivateRoute;
