import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout } from '../layouts';
import { selectToken, updateUserInfo } from '../redux/features/auth/authSlide';
import { getLocalAccessToken, getLocalToken, setLocalUser } from '../utils/authLocalStorage';
import { getInfoService } from '../services/userService';
import { privateRoutes, publicRoutes } from './routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { getInfoBusinessService } from '../services/businessService';
import { selectBusinessToken, updateBusinessInfo } from '../redux/features/authBusiness/authSlide';
import { getLocalBusinessAccessToken, getLocalBusinessToken, setLocalBusiness } from '../utils/authBusinessStorage';
import useSide from '../hooks/useSIde';

const AppRouter = () => {
    const side = useSide();
    const dispatch = useDispatch();

    const token = side === 'candidate' ? useSelector(selectToken) : useSelector(selectBusinessToken);
    useEffect(() => {
        if (side === 'candidate') {
            if (!token) {
                const tokenFromLocalStorage = getLocalAccessToken();
                if (tokenFromLocalStorage) {
                    getInfoService()
                        .then((response) => {
                            if (response.status === 200) {
                                setLocalUser(response.data.data);
                                let token = getLocalToken();
                                dispatch(updateUserInfo({ token, user: response.data.data }));
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        } else if (side === 'employer') {
            if (!token) {
                const tokenFromLocalStorage = getLocalBusinessAccessToken();
                if (tokenFromLocalStorage) {
                    getInfoBusinessService()
                        .then((response) => {
                            if (response.status === 200) {
                                setLocalBusiness(response.data.data);
                                let token = getLocalBusinessToken();
                                dispatch(updateBusinessInfo({ token, user: response.data.data }));
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        }
        // if (token) {
        //     if (side === 'candidate') {
        //         getInfoService()
        //             .then((response) => {
        //                 if (response.status === 200) {
        //                     setLocalUser(response.data.data);
        //                     let token = getLocalToken();
        //                     dispatch(updateUserInfo({ token, user: response.data.data }));
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //             });
        //     } else if (side === 'employer') {
        //         getInfoBusinessService()
        //             .then((response) => {
        //                 if (response.status === 200) {
        //                     setLocalBusiness(response.data.data);
        //                     let token = getLocalBusinessToken();
        //                     dispatch(updateBusinessInfo({ token, user: response.data.data }));
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //             });
        //     }
        // }
    }, [token, side, dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.layout || DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<PublicRoute component={Page} layout={Layout} restricted={route.restricted} positionHeader={route.positionHeader} />}
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Layout = route.layout || DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute
                                    component={Page}
                                    layout={Layout}
                                    isPrivate={route.isPrivate}
                                    restricted={route.restricted}
                                    positionHeader={route.positionHeader}
                                />
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
