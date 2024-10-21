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
import { FaCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRef } from 'react';
import classNames from 'classnames/bind';

import { getListContactableService, getListConversationService, getConversationExistService } from '../../services/user/conversationService';
import { selectUser } from '../../redux/features/authUser/authSlide';
import { useWebSocket } from '../../context/WebSocketContext';
import { compareTimeString, formatTimeMessage, formatTimeSeparator } from '../../utils/convert/convertTimeUtil';
import { websocketType } from '../../constants';
import { getListMessageService } from '../../services/user/chatService';
import { ChatSidebarItemComponent } from '../../components';
import { getListCVApplicationsService } from '../../services/user/cvApplicationsService';
import styles from './ChatPage.module.scss';

const cx = classNames.bind(styles);

const ChatPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const ref = useRef();
    const conversationId = useRef(null);
    const listMessageRef = useRef(null);
    let typingIntervalRef = null;
    let typingTimeoutRef = null;
    const userTyping = useRef(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { sendMessage, registerListener } = useWebSocket();
    const [groupedMessages, setGroupedMessages] = useState([]);
    const [conversationData, setConversationData] = useState({
        page: 1,
        limit: 20,
        data: [],
        firstLoad: true,
        canLoadMore: true,
        isLoading: false,
    });
    const [messagesData, setMessagesData] = useState({
        page: 1,
        limit: 20,
        data: [],
        firstLoad: true,
        canLoadMore: true,
        isLoading: false,
        isTop: false,
    });
    const [contactable, setContactableData] = useState({
        page: 1,
        limit: 20,
        data: [],
        firstLoad: true,
        canLoadMore: true,
        isLoading: false,
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

    const handleActiveFakeConversation = (id) => {
        setMessagesData((prev) => ({
            ...prev,
            page: 1,
            limit: 20,
            firstLoad: true,
            data: [],
            canLoadMore: true,
            isLoading: false,
            isTop: false,
        }));
        conversationId.current = id;
    };

    const handleActiveConversation = (id) => {
        if (id === conversationId.current) {
            return;
        }

        setConversationData((prev) => ({
            ...prev,
            data: prev.data.filter((c) => c.id !== 0),
        }));

        setMessagesData((prev) => ({
            ...prev,
            page: 1,
            limit: 20,
            firstLoad: true,
            data: [],
            canLoadMore: true,
            isLoading: false,
            isTop: false,
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
        setConversationData((prev) => {
            const matchedConversation = prev.data.find((c) => c.id === newData.conversation_id);
            const updatedConversation = { ...matchedConversation, last_message: newData };

            const otherConversations = prev.data.filter((c) => c.id !== newData.conversation_id);

            return {
                ...prev,
                data: [updatedConversation, ...otherConversations],
            };
        });

        if (isTyping) {
            setIsTyping(false);
        }
    };

    const handleNewConversationInComming = (data) => {
        let newData = JSON.parse(JSON.stringify(data));
        newData.type = newData.conversation_type;
        newData.count_member = newData.members.length;

        setConversationData((prev) => ({
            ...prev,
            data: [newData, ...prev.data],
        }));
    };

    const handleGetConversation = (params) => {
        if (!conversationData.canLoadMore || conversationData.isLoading) {
            return;
        }
        setConversationData((prev) => ({
            ...prev,
            isLoading: true,
        }));
        getListConversationService(params)
            .then((res) => {
                if (res.status === 200) {
                    setConversationData((prev) => ({
                        ...prev,
                        data: res.data.data,
                        firstLoad: false,
                        canLoadMore: res.data.data.length === prev.limit,
                        isLoading: false,
                    }));
                } else {
                    if (conversationData.firstLoad) {
                        setConversationData((prev) => ({
                            ...prev,
                            firstLoad: false,
                            isLoading: false,
                        }));
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (conversationData.firstLoad) {
                    setConversationData((prev) => ({
                        ...prev,
                        firstLoad: false,
                        isLoading: false,
                    }));
                }
            });
    };

    const handleGetMessages = (params) => {
        if (!messagesData.canLoadMore) {
            return;
        }

        getListMessageService(conversationId.current, params)
            .then((res) => {
                if (res.status === 200) {
                    setMessagesData((prev) => ({
                        ...prev,
                        firstLoad: false,
                        data: [...prev.data, ...res.data.data],
                        canLoadMore: res.data.data.length === prev.limit,
                        isLoading: false,
                        page: prev.page + 1,
                        isTop: false,
                    }));
                } else {
                    if (messagesData.firstLoad) {
                        setMessagesData((prev) => ({
                            ...prev,
                            firstLoad: false,
                            isLoading: false,
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
                        isLoading: false,
                    }));
                }
            });
    };

    const handleGetCvApplication = (params) => {
        if (!contactable.canLoadMore || contactable.isLoading) {
            return;
        }
        setContactableData((prev) => ({
            ...prev,
            isLoading: true,
        }));
        getListContactableService(params)
            .then((res) => {
                if (res.status === 200) {
                    setContactableData((prev) => ({
                        ...prev,
                        data: res.data.data,
                        firstLoad: false,
                        canLoadMore: res.data.data.length === prev.limit,
                        isLoading: false,
                    }));
                } else {
                    if (contactable.firstLoad) {
                        setContactableData((prev) => ({
                            ...prev,
                            firstLoad: false,
                            isLoading: false,
                        }));
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (contactable.firstLoad) {
                    setContactableData((prev) => ({
                        ...prev,
                        firstLoad: false,
                        isLoading: false,
                    }));
                }
            });
    };

    const handleScrollListMessage = () => {
        if (messagesData.isLoading || !messagesData.canLoadMore) {
            return;
        }
        setMessagesData((prev) => ({
            ...prev,
            isLoading: true,
        }));

        const params = {
            conversation_id: conversationId.current,
            skip: (messagesData.page - 1) * messagesData.limit,
            limit: messagesData.limit,
        };
        handleGetMessages(params);
    };

    // const fakeConversation = (item) => () => {
    //     return {
    //         id: 0,
    //         name: item.full_name,
    //         type: 'single',
    //         members: [item],
    //         last_message: null,
    //     };
    // };

    const checkExistConversation = (item) => () => {
        const members = [item.id];
        const params = {
            members: members,
        };

        getConversationExistService(params)
            .then((res) => {
                if (res.status === 200) {
                    handleActiveConversation(res.data.data.id);
                } else if (res.status === 404) {
                    let fakeConversation = {
                        id: 0,
                        name: item.full_name,
                        type: 'single',
                        members: [item],
                        last_message: null,
                    };

                    console.log('not exist conversation', fakeConversation);
                    setConversationData((prev) => ({
                        ...prev,
                        data: [fakeConversation, ...prev.data.filter((c) => c.id !== 0)],
                    }));
                    handleActiveFakeConversation(0);
                }
            })
            .catch((err) => {
                console.log(err);
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
        registerListener(websocketType.NEW_CONVERSATION, handleNewConversationInComming);

        return () => {};
    }, [dispatch]);

    useEffect(() => {
        ref.current.focus();
        setMessage('');
    }, [conversationId.current]);

    useEffect(() => {
        const params = {
            skip: (conversationData.page - 1) * conversationData.limit,
            limit: conversationData.limit,
        };
        handleGetConversation(params);
    }, []);

    useEffect(() => {
        if (conversationId.current) {
            const params = {
                conversation_id: conversationId.current,
                skip: (messagesData.page - 1) * messagesData.limit,
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

    useEffect(() => {
        const params = {
            skip: (contactable.page - 1) * contactable.limit,
            limit: contactable.limit,
        };
        handleGetCvApplication(params);
    }, []);

    return (
        <MainContainer responsive className={cx('wrapper')}>
            <Sidebar position="left" loading={conversationData.firstLoad} className={cx('sidebar')}>
                <Search placeholder="Nhập tên công ty, tên nhà tuyển dụng" />
                <ConversationList>
                    {conversationData.data.map((item, index) => (
                        <Conversation
                            key={index}
                            name={<span className={cx('conversation-name')}>{item.type === 'group' ? item.name : item.members[0].full_name}</span>}
                            info={
                                <span className={cx('conversation-info')}>
                                    {item?.last_message?.content
                                        ? item.last_message.account_id === user.id
                                            ? 'Bạn: ' + item.last_message.content
                                            : item.last_message.content
                                        : item.id === 0
                                        ? ''
                                        : 'Tin nhắn mới'}
                                    {item.id === 0 ? '' : <FaCircle className={cx('conversation-info-icon')} />}
                                    {item?.last_message?.created_at ? formatTimeMessage(item?.last_message?.created_at) : item.id === 0 ? '' : 'Tin nhắn mới'}
                                </span>
                            }
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
                    <Avatar src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg" />
                    <ConversationHeader.Content
                        userName={
                            conversationData.data.find((c) => c.id === conversationId.current)?.name ||
                            conversationData.data.find((c) => c.id === conversationId.current)?.members[0].full_name
                        }
                        info="Online"
                    />
                </ConversationHeader>
                <MessageList
                    typingIndicator={isTyping ? <TypingIndicator content="Đang nhập..." /> : null}
                    ref={listMessageRef}
                    loading={messagesData.firstLoad && ![0, null].includes(conversationId.current)}
                    loadingMore={messagesData.isLoading}
                    loadingMorePosition="top"
                    onYReachStart={messagesData.isTop ? null : handleScrollListMessage}
                    disableOnYReachWhenNoScroll={false}
                    style={{ paddingBottom: '50px' }}
                >
                    <div>
                        {[0, null].includes(conversationId.current) && <MessageSeparator content="Hãy bắt đầu cuộc trò chuyện" />}
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
                    </div>
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
            <Sidebar position="right" className={cx('sidebar')} loading={contactable.firstLoad}>
                <ExpansionPanel open={true} title="Tin tuyển dụng đã ứng tuyển" className={cx('expansion-panel')}>
                    {contactable.data.map((item, index) => (
                        <ChatSidebarItemComponent key={index} contact={item} onClick={checkExistConversation(item)} />
                    ))}
                </ExpansionPanel>
            </Sidebar>
        </MainContainer>
    );
};

export default ChatPage;
