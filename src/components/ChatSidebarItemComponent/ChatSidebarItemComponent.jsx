import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
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
    Button,
} from '@chatscope/chat-ui-kit-react';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './ChatSidebarItemComponent.module.scss';
import path from '@constants/path';
import slugConvert from '@utils/convert/slugConvert';
import { icons } from '@assets';

const cx = classNames.bind(styles);

const ChatSidebarItemComponent = ({ contact, onClick }) => {
    const { company, job } = contact;

    return (
        <Conversation
            className={cx('wrapper')}
            name={
                <span>
                    <TippyText content={job.title}>
                        <a href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('job-name')}>
                            {job.title}
                        </a>
                    </TippyText>
                    <Button className={cx('btn-message')} onClick={onClick}>
                        <span>Nhắn tin</span>
                    </Button>
                </span>
            }
            lastSenderName={
                <TippyText content={company.name}>
                    <div className={cx('company-name')}>{company.name}</div>
                </TippyText>
            }
        >
            <Avatar
                src={company.logo || icons.icon_default_logo_company}
                name={company.name}
                onError={(e) => (e.target.src = icons.icon_default_logo_company)}
            />
        </Conversation>
    );
};

ChatSidebarItemComponent.propTypes = {
    contact: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default ChatSidebarItemComponent;
