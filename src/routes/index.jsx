import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '../layouts';
import { privateRoutes, publicRoutes } from './routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
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
