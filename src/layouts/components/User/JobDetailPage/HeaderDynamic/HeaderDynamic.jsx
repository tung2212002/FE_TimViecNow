import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaRegPaperPlane } from 'react-icons/fa';

import styles from './HeaderDynamic.module.scss';
import { showModal } from '@redux/features/modal/modalSlice';
import { Modal } from '@components/common';
import { ModalApplyComponent } from '@components';

const cx = classNames.bind(styles);

const HeaderDynamic = ({ job }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState('detail');

    const handleToDetail = () => {
        setState('detail');
        const detailBody = document.getElementById('job-search-detail-body');
        detailBody.scrollIntoView({ behavior: 'smooth' });
    };

    const handleToSuggestions = () => {
        setState('company');
        const detailSuitable = document.getElementById('job-search-detail-similar');
        detailSuitable.scrollIntoView({ behavior: 'smooth' });
    };

    const showApply = () => {
        dispatch(showModal());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const header = document.getElementById('header-detail-dynamic');
        const handleListenScroll = () => {
            const scroll = window.scrollY;
            if (scroll > 300) {
                header.classList.add(`${cx('show')}`);
            }
            if (scroll < 300) {
                header.classList.remove(`${cx('show')}`);
            }
        };
        window.addEventListener('scroll', handleListenScroll);
        return () => {
            window.removeEventListener('scroll', handleListenScroll);
        };
    }, []);

    return (
        <header className={cx('wrapper')} id="header-detail-dynamic">
            <Modal>
                <ModalApplyComponent job={job} />
            </Modal>
            <div className={cx('container')}>
                <div className={cx('menu')}>
                    <div className={cx('menu-tabs')}>
                        <div className={cx('menu-tab', state === 'detail' ? 'active' : '')} onClick={handleToDetail}>
                            Chi tiết tin tuyển dụng
                        </div>
                        <div className={cx('menu-tab', state === 'company' ? 'active' : '')} onClick={handleToSuggestions}>
                            Việc làm liên quan
                        </div>
                    </div>
                    <div className={cx('menu-actions')}>
                        <button className={cx('btn')} onClick={showApply}>
                            <span className={cx('icon')}>
                                <FaRegPaperPlane className={cx('icon-plane')} />
                            </span>
                            <span className={cx('text')}>Ứng tuyển ngay</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

HeaderDynamic.propTypes = {
    job: PropTypes.object.isRequired,
    state: PropTypes.any.isRequired,
};

export default HeaderDynamic;
