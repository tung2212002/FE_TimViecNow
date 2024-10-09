import React from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import store from '@redux/store';
import AppRouter from '@routes';
import { GOOGLE_CLIENT_ID } from '@configs';
import { WebSocketProvider } from './context/WebSocketContext';

function App() {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                {/* <AppRouter />
                 */}
                <WebSocketProvider>
                    <AppRouter />
                </WebSocketProvider>
            </GoogleOAuthProvider>
        </Provider>
    );
}

export default App;
