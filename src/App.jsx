import React from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './redux/store';
import AppRouter from './routes';
import GlobalStyles from './components/GlobalStyle/GlobalStyle';
import { GOOGLE_CLIENT_ID } from './configs';

function App() {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GlobalStyles>
                    <AppRouter />
                </GlobalStyles>
            </GoogleOAuthProvider>
        </Provider>
    );
}

export default App;
