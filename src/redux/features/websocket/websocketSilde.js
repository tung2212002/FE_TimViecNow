import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    // ws: null,
    connected: false,
    wsError: null,
    wsData: null,
    messages: [],
    // listeners: {},
};

// export const connectWebSocket = createAsyncThunk('websocket/connect', async (url, { dispatch }) => {
//     console.log('connect websocket---------111');
//     console.log('url', url);
//     const socket = new WebSocket(url);
//     socket.onopen = () => {
//         console.log('connected111111');
//         dispatch(setConnected(true));
//         dispatch(setWs(socket));
//     };

//     socket.onmessage = (event) => {
//         try {
//             console.log('message-----------------', event.data);
//             const data = JSON.parse(event.data);
//             console.log(data);
//             dispatch(addMessage(data.data));
//             dispatch(calllListener(data.type, data.data));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     socket.error = (error) => {
//         console.error(error);
//         dispatch(setWsError(error));
//     };

//     socket.onclose = () => {
//         console.log('disconnected');
//         dispatch(setConnected(false));
//     };

//     return socket;
// });

// export const sendMessage = createAsyncThunk('websocket/send', async (data, { getState }) => {
//     const ws = selectWs(getState());
//     console.log('send message', data);
//     console.log('ws', ws);
//     ws.send(JSON.stringify(data));
// });

const websocketSlide = createSlice({
    name: 'websocket',
    initialState: initialState,
    reducers: {
        // setWs: (state, action) => {
        //     state.ws = action.payload;
        // },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setWsError: (state, action) => {
            state.wsError = action.payload;
        },
        setWsData: (state, action) => {
            state.wsData = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        // registerListener: (state, action) => {
        //     const { messageType, listener } = action.payload;
        //     if (!state.listeners[messageType]) {
        //         state.listeners[messageType] = [];
        //     }
        //     state.listeners[messageType].push(listener);
        // },
        // calllListener: (state, action) => {
        //     const { messageType, data } = action.payload;
        //     const listeners = state.listeners[messageType];
        //     if (listeners) {
        //         listeners.forEach((listener) => listener(data));
        //     }
        // },
    },
});

export default websocketSlide.reducer;

// export const selectWs = (state) => state.websocket.ws;
export const selectConnected = (state) => state.websocket.connected;
export const selectWsError = (state) => state.websocket.wsError;
export const selectWsData = (state) => state.websocket.wsData;
export const selectMessages = (state) => state.websocket.messages;

// export const { setWs, setConnected, setWsError, setWsData, addMessage, registerListener, calllListener } = websocketSlide.actions;

export const { setConnected, setWsError, setWsData, addMessage } = websocketSlide.actions;
