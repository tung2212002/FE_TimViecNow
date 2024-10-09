import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setConnected, selectConnected, setWsError, selectMessages, addMessage } from '../redux/features/websocket/websocketSilde';
import { getLocalAccessToken } from '../utils/authStorage/authLocalStorage';
import { WEBSOCKET_URL } from '../configs';
import { selectUserRole } from '../redux/features/authUser/authSlide';
import { getLocalBusinessAccessToken } from '../utils/authStorage/authBusinessStorage';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const listenersRef = useRef({});

    useEffect(() => {
        if (!userRole) {
            return;
        }
        const token = userRole === 'business' ? getLocalBusinessAccessToken() : getLocalAccessToken();
        if (token && !socket) {
            const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

            ws.onopen = () => {
                dispatch(setConnected(true));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('onmessage', data);
                dispatch(addMessage(data));
                triggerListener(data.type, data);
            };

            ws.onerror = (error) => {
                dispatch(setWsError(error.data));
            };

            ws.onclose = () => {
                dispatch(setConnected(false));
            };

            setSocket(ws);

            return () => {
                ws.close();
            };
        }
    }, [dispatch, userRole]);

    const sendMessage = (data) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        }
    };

    const registerListener = (messageType, listener) => {
        listenersRef.current = {
            ...listenersRef.current,
            [messageType]: [...(listenersRef.current[messageType] || []), listener],
        };
    };

    const triggerListener = (messageType, data) => {
        const messageListeners = listenersRef.current[messageType];
        if (messageListeners) {
            messageListeners.forEach((listener) => listener(data));
        }
    };

    return <WebSocketContext.Provider value={{ sendMessage, registerListener }}>{children}</WebSocketContext.Provider>;
};

WebSocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
