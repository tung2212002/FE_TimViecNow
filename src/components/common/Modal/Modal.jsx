import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';
import { selectModal, hideModal } from '../../../redux/features/modal/modalSlice';

const cx = classNames.bind(styles);

const Modal = ({ children, animation = true }) => {
    const show = useSelector(selectModal);
    const dispatch = useDispatch();

    const close = () => {
        dispatch(hideModal());
    };
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '8px';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        }
    }, [show]);

    return createPortal(
        <div className={cx('wrapper', show ? 'show' : '')} onClick={() => close()}>
            <div className={cx('container', animation && 'animation')} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal'),
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    animation: PropTypes.bool,
};

export default Modal;
