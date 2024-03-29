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

const AppRouter = () => {
    // const path = window.location.pathname;
    // const [side, setSide] = useState(path.startsWith('/tuyen-dung/app') ? 'employer' : 'candidate');
    const dispatch = useDispatch();

    const token = useSelector(selectToken);

    // useEffect(() => {
    //     if (path.startsWith('/tuyen-dung/app')) {
    //         setSide('employer');
    //     } else {
    //         setSide('candidate');
    //     }
    // }, [path]);

    useEffect(() => {
        getInfoService();
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
    }, []);

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
