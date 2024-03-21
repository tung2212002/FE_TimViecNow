import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Modal2.module.scss';

const cx = classNames.bind(styles);

const Modal2 = ({ header, body, footer, animation = true, show, handleHidden }) => {
    const close = () => {
        handleHidden();
    };
    
    return createPortal(
        <div className={cx('wrapper', show ? 'show' : '')} onClick={() => close()}>
            <div className={cx('container', animation && 'animation')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>{header}</div>
                <div className={cx('body')}>{body}</div>
                <div className={cx('footer')}>{footer}</div>
            </div>
        </div>,
        document.getElementById('dialog'),
    );
};

Modal2.propTypes = {
    children: PropTypes.node,
    animation: PropTypes.bool,
    show: PropTypes.bool,
    handleHidden: PropTypes.func,
    header: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node,
};

export default Modal2;
