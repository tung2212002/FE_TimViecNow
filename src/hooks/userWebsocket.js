// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     // selectWs,
//     selectConnected,
//     selectMessages,
//     selectWsData,
//     selectWsError,
//     setConnected,
//     // setWs,
//     setWsData,
//     setWsError,
//     addMessage,
// } from '../redux/features/websocket/websocketSilde';
// import { selectUser, selectUserToken } from '../redux/features/authUser/authSlide';

// import { WEBSOCKET_URL } from '../configs';

// const useWebsocket = () => {
//     const ws = useSelector(selectWs);
//     const user = useSelector(selectUser);
//     const token = useSelector(selectUserToken);
//     const connected = useSelector(selectConnected);
//     const messages = useSelector(selectMessages);
//     const wsData = useSelector(selectWsData);
//     const wsError = useSelector(selectWsError);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!ws) {
//             const socket = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

//             socket.onopen = () => {
//                 console.log('connected');
//                 dispatch(setConnected(true));
//             };

//             socket.onmessage = (event) => {
//                 try {
//                     const data = JSON.parse(event.data);
//                     console.log(data);
//                     handleMessage(data);
//                     dispatch(addMessage(data));
//                 } catch (error) {
//                     console.error(error);
//                 }
//             };

//             socket.onclose = () => {
//                 console.log('disconnected');
//                 dispatch(setConnected(false));
//             };

//             socket.onerror = (error) => {
//                 console.error(error);
//                 dispatch(setWsError(error));
//             };

//             dispatch(setWs(socket));
//         }

//         return () => {
//             if (ws) {
//                 ws.close();
//             }
//         };
//     }, [ws, dispatch, token]);

//     const handleMessage = (message) => {
//         switch (message.type) {
//             case 'new_message':
//                 // ws.send(JSON.stringify(message));
//                 console.log('Have new message: ', message);
//                 break;
//             default:
//                 break;
//         }
//     };
// };

// export default useWebsocket;
