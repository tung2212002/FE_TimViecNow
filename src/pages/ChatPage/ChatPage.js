import { useDispatch, useSelector } from 'react-redux';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    TypingIndicator,
    MessageSeparator,
    ConversationHeader,
    InfoButton,
    VoiceCallButton,
    VideoCallButton,
    Sidebar,
    Conversation,
    ConversationList,
    Search,
    ExpansionPanel,
} from '@chatscope/chat-ui-kit-react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRef } from 'react';

import { getListConversationService } from '../../services/user/conversationService';
import { selectUser } from '../../redux/features/authUser/authSlide';
import { useWebSocket } from '../../context/WebSocketContext';
import { compareTimeString, formatTimeMessage, formatTimeSeparator } from '../../utils/convert/convertTimeUtil';
import { websocketType } from '../../constants';
import { getListMessageService } from '../../services/user/chatService';

const ChatPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const ref = useRef();
    const conversationId = useRef(null);
    let typingIntervalRef = null;
    let typingTimeoutRef = null;
    const userTyping = useRef(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { sendMessage, registerListener } = useWebSocket();
    const [groupedMessages, setGroupedMessages] = useState([]);
    const [conversationData, setConversitionData] = useState({
        page: 1,
        limit: 10,
        data: [],
        firstLoad: true,
    });
    const [messagesData, setMessagesData] = useState({
        page: 1,
        limit: 10,
        data: [],
        firstLoad: true,
    });

    const separatorComponent = (created_at) => ({
        type: 'separator',
        data: {
            created_at: created_at,
        },
    });

    const messageComponent = (message, position = 'normal') => {
        return {
            type: 'message',
            data: message,
            position: position,
        };
    };

    const groupMessages = (messages) => {
        const dataReverse = [...messages].reverse();
        const result = [];

        const addSeparator = (date) => {
            if (result.length === 0 || result[result.length - 1].type !== 'separator') {
                result.push(separatorComponent(date));
            }
        };

        const addMessage = (message, type) => {
            result.push(messageComponent(message, type));
        };

        const isTimeDifferent = (date1, date2) => {
            return compareTimeString(date1, date2);
        };

        dataReverse.forEach((message, index) => {
            const prevMessage = dataReverse[index - 1];
            const nextMessage = dataReverse[index + 1];

            if (index === 0 || isTimeDifferent(message.created_at, prevMessage.created_at)) {
                addSeparator(message.created_at);
            }

            let messageType;
            if (index === dataReverse.length - 1) {
                messageType = 'first';
            } else if (!nextMessage || message.account_id !== nextMessage.account_id || isTimeDifferent(nextMessage.created_at, message.created_at)) {
                if (
                    index !== 0 &&
                    prevMessage.type !== 'separator' &&
                    (message.account_id !== prevMessage.account_id || isTimeDifferent(message.created_at, prevMessage.created_at))
                ) {
                    messageType = 'first';
                } else {
                    messageType = 'last';
                }
            } else if (index === 0) {
                if (nextMessage.account_id === message.account_id) {
                    messageType = 'normal';
                } else {
                    messageType = 'first';
                }
            } else {
                messageType = 'normal';
            }

            addMessage(message, messageType);

            if (nextMessage && isTimeDifferent(nextMessage.created_at, message.created_at)) {
                addSeparator(nextMessage.created_at);
            }
        });

        return result;
    };

    const [conversation, setConversation] = useState([]);

    const handleTyping = () => {
        setMessage(ref.current.value);
        if (!typingIntervalRef) {
            sendMessage({
                data: {
                    conversation_id: conversationId.current,
                    user_id: user.id,
                },
                type: websocketType.USER_TYPING,
            });

            typingIntervalRef = setInterval(() => {
                sendMessage({
                    data: {
                        conversation_id: conversationId.current,
                        user_id: user.id,
                    },
                    type: websocketType.USER_TYPING,
                });
            }, 1000);

            if (typingTimeoutRef) {
                clearTimeout(typingTimeoutRef);
            }

            typingTimeoutRef = setTimeout(() => {
                clearInterval(typingIntervalRef);
                typingIntervalRef = null;
                typingTimeoutRef = null;
            }, 2000);
        }
    };

    const handleUserTypingInComming = (data) => {
        let newData = JSON.parse(JSON.stringify(data));
        if (newData.user_id !== user.id && conversationId.current === newData.conversation_id) {
            setIsTyping(true);
        }

        if (userTyping.current) {
            clearTimeout(userTyping.current);
        }

        userTyping.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);

        return () => {
            if (userTyping.current) {
                clearTimeout(userTyping.current);
            }
        };
    };

    const handleSendMessage = (content) => {
        const data = {
            data: {
                content: content,
                conversation_id: conversationId.current,
                type: 'text',
            },
            type: websocketType.NEW_MESSAGE,
        };
        sendMessage(data);
        if (typingIntervalRef) {
            clearInterval(typingIntervalRef);
            typingIntervalRef = null;
        }
    };

    const handleActiveConversation = (id) => {
        if (id === conversationId.current) {
            return;
        }

        setMessagesData((prev) => ({
            ...prev,
            page: 1,
            limit: 10,
            firstLoad: true,
            data: [],
        }));
        conversationId.current = id;
    };

    const handleNewMessageInComming = (data) => {
        let newData = JSON.parse(JSON.stringify(data));
        if (newData.conversation_id !== conversationId.current) {
            return;
        }
        newData.type = 'text';
        setMessagesData((prev) => ({
            ...prev,
            data: [newData, ...prev.data],
        }));
        if (isTyping) {
            setIsTyping(false);
        }
    };

    const handleGetConversation = (params) => {
        getListConversationService(params)
            .then((res) => {
                if (res.status === 200) {
                    setConversitionData((prev) => ({
                        ...prev,
                        data: res.data.data,
                        firstLoad: false,
                    }));
                } else {
                    if (conversationData.firstLoad) {
                        setConversitionData((prev) => ({
                            ...prev,
                            firstLoad: false,
                        }));
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (conversationData.firstLoad) {
                    setConversitionData((prev) => ({
                        ...prev,
                        firstLoad: false,
                    }));
                }
            });
    };

    const handleGetMessages = (params) => {
        getListMessageService(conversationId.current, params)
            .then((res) => {
                if (res.status === 200) {
                    setMessagesData((prev) => ({
                        ...prev,
                        firstLoad: false,
                        data: [...prev.data, ...res.data.data],
                    }));
                } else {
                    if (messagesData.firstLoad) {
                        setMessagesData((prev) => ({
                            ...prev,
                            firstLoad: false,
                        }));
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (messagesData.firstLoad) {
                    setMessagesData((prev) => ({
                        ...prev,
                        firstLoad: false,
                    }));
                }
            });
    };

    useEffect(() => {
        const handleNewMessage = (data) => {
            handleNewMessageInComming(data);
        };
        const handleUserTyping = (data) => {
            handleUserTypingInComming(data);
        };

        registerListener(websocketType.NEW_MESSAGE, handleNewMessage);
        registerListener(websocketType.USER_TYPING, handleUserTyping);

        return () => {};
    }, [dispatch]);

    useEffect(() => {
        ref.current.focus();
        setMessage('');
    }, [conversationId.current]);

    useEffect(() => {
        const params = {
            offset: (conversationData.page - 1) * conversationData.limit,
            limit: conversationData.limit,
        };
        handleGetConversation(params);
    }, []);

    useEffect(() => {
        if (conversationId.current) {
            const params = {
                conversation_id: conversationId.current,
                offset: (messagesData.page - 1) * messagesData.limit,
                limit: messagesData.limit,
            };
            handleGetMessages(params);
        }
    }, [conversationId.current]);

    useEffect(() => {
        if (!conversationId.current && conversationData.data.length > 0) {
            setMessagesData((prev) => ({
                ...prev,
                firstLoad: true,
            }));
            conversationId.current = conversationData.data[0].id;
        }
    }, [conversationData.data]);

    useEffect(() => {
        setGroupedMessages(groupMessages(messagesData.data));
    }, [messagesData.data]);

    const handCheckAllState = () => {
        console.log('conversationData', conversationData);
        console.log('messagesData', messagesData);
        console.log('groupedMessages', groupedMessages);
    };

    return (
        <MainContainer
            responsive
            style={{
                height: 'calc(100vh - 75px)',
            }}
        >
            <button onClick={handCheckAllState}>Check all state</button>
            <Sidebar position="left">
                <Search placeholder="Search..." />
                <ConversationList>
                    {conversationData.data.map((item, index) => (
                        <Conversation
                            key={index}
                            name={item.type === 'group' ? item.name : item.members[0].full_name}
                            info="Last message"
                            active={conversationId.current === item.id}
                            onClick={() => handleActiveConversation(item.id)}
                        >
                            <Avatar
                                name={item.type === 'group' ? item.name : item.members[0].full_name}
                                src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                                status="available"
                            />
                        </Conversation>
                    ))}
                </ConversationList>
            </Sidebar>
            <ChatContainer>
                <ConversationHeader>
                    <Avatar
                        name={
                            conversation.find((c) => c.id === conversationId.current)?.name ||
                            conversation.find((c) => c.id === conversationId.current)?.members[0].full_name ||
                            'Chat'
                        }
                        src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                    />
                    <ConversationHeader.Content
                        userName={
                            conversation.find((c) => c.id === conversationId.current)?.name ||
                            conversation.find((c) => c.id === conversationId.current)?.members[0].full_name ||
                            'Chat'
                        }
                        info="Online"
                    />
                </ConversationHeader>
                <MessageList typingIndicator={isTyping ? <TypingIndicator content="Đang nhập..." /> : null}>
                    {groupedMessages.map((message, index) => {
                        if (message.type === 'separator') {
                            return <MessageSeparator key={index} content={formatTimeSeparator(message.data.created_at)} />;
                        }
                        return (
                            <Message
                                key={index}
                                model={{
                                    message: message.data.content,
                                    sentTime: formatTimeMessage(message.data.created_at),
                                    sender: message.data.user.full_name,
                                    direction: message.data.user.id === user.id ? 'outgoing' : 'incoming',
                                    position: 'single',
                                }}
                            >
                                <Avatar
                                    src={message.data.user.avatar || 'https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg'}
                                    name={message.data.user.full_name}
                                    style={{
                                        visibility: message.position === 'normal' ? 'hidden' : 'visible',
                                    }}
                                />
                                {((message.type !== 'separator' &&
                                    message.data.account_id !== user.id &&
                                    (index === 0 ||
                                        groupedMessages[index - 1].type === 'separator' ||
                                        message.data.account_id !== user.id ||
                                        message.position === 'first') &&
                                    index > 0 &&
                                    groupedMessages[index - 1].type !== 'separator' &&
                                    groupedMessages[index - 1].data.user.id !== message.data.user.id) ||
                                    (index > 0 && groupedMessages[index - 1].type === 'separator' && message.data.user.id !== user.id) ||
                                    (index > 0 &&
                                        groupedMessages[index - 1].type !== 'separator' &&
                                        groupedMessages[index - 1].data.user.id !== message.data.user.id &&
                                        message.data.user.id !== user.id)) && <Message.Header>{message.data.user.full_name}</Message.Header>}
                            </Message>
                        );
                    })}
                </MessageList>

                <MessageInput
                    placeholder="Nhập tin nhắn..."
                    onSend={(content) => {
                        handleSendMessage(content);
                    }}
                    value={message}
                    onChange={handleTyping}
                    ref={ref}
                />
            </ChatContainer>
        </MainContainer>
    );
};

export default ChatPage;
