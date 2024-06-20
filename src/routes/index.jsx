import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '../layouts';
import { privateRoutes, publicRoutes } from './routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { getListProvinceService } from '../services/locationService';
import { setField, setProvince, setSkill, setCategory } from '../redux/features/config/configSilde';
import { getListSkillService } from '../services/skillService';
import { getListFieldService } from '../services/fieldService';
import { getListCategoryService } from '../services/categoryService';
import { selectBusiness } from '../redux/features/authBusiness/authSlide';
import { selectUser } from '../redux/features/auth/authSlide';
import useSide from '../hooks/useSIde';

const AppRouter = () => {
    const dispatch = useDispatch();
    const side = useSide();
    const user = side === 'candidate' ? useSelector(selectUser) : useSelector(selectBusiness);

    const handleGetConfig = () => {
        getListProvinceService()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setProvince(res.data.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });

        let params = {
            limit: 1000,
        };

        getListSkillService(params)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setSkill(res.data.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });

        getListFieldService()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setField(res.data.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });

        getListCategoryService()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setCategory(res.data.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useLayoutEffect(() => {
        handleGetConfig();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {!user &&
                    publicRoutes.map((route, index) => {
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
                                    verifyBusinessEmail={route.verifyBusinessEmail}
                                />
                            }
                        />
                    );
                })}

                {user &&
                    publicRoutes.map((route, index) => {
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
                                        verifyBusinessEmail={route.verifyBusinessEmail}
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
