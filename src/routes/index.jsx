import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultLayout } from '../layouts';
import { selectToken, updateUserInfo } from '../redux/features/auth/authSlide';
import {
  getLocalAccessToken,
  getLocalToken,
  setLocalUser,
} from '../utils/authLocalStorage';
import { getInfoService } from '../services/userService';
import { privateRoutes, publicRoutes } from './routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  const dispatch = useDispatch();

  const [isFirstTime, setIsFirstTime] = useState(true);

  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      const tokenFromLocalStorage = getLocalAccessToken();
      if (tokenFromLocalStorage) {
        getInfoService()
          .then((response) => {
            if (response.status === 200) {
              setLocalUser(response.data);
              let token = getLocalToken();
              dispatch(updateUserInfo({ token, user: response.data }));
              setIsFirstTime(false);
            } else {
              setIsFirstTime(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setIsFirstTime(false);
          });
      }
    }
  }, []);

  // if (isFirstTime) {
  //   return 'loading';
  // }

  // const publicRoutes = appRoutes.filter((route) => !route.isPrivate);

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
              element={
                // <Layout>
                //   <Page />
                // </Layout>
                <PublicRoute
                  component={Page}
                  layout={Layout}
                  restricted={route.restricted}
                />
              }
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
                // <Layout>
                //   <Page />
                // </Layout>\
                <PrivateRoute
                  component={Page}
                  layout={Layout}
                  isPrivate={route.isPrivate}
                  restricted={route.restricted}
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
