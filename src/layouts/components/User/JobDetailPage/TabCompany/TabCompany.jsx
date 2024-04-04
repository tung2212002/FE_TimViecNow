import { useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './TabCompany.module.scss';

const cx = classNames.bind(styles);

const TabCompany = ({ handleToInfo, handleToCompany, handleToRelated, state }) => {
    useEffect(() => {
        const tab = document.getElementById('tab-company-component');
        const jobSearchDetailBody = document.getElementById('job-search-detail-body');
        const handleListenScroll = () => {
            let rect = tab.getBoundingClientRect();
            let react2 = jobSearchDetailBody.getBoundingClientRect();
            let height = rect.top;
            let height2 = react2.top;
            if (height < 0) {
                tab.classList.add(`${cx('show')}`);
            }
            if (height2 > 0) {
                tab.classList.remove(`${cx('show')}`);
            }
        };
        window.addEventListener('scroll', handleListenScroll);
        return () => {
            window.removeEventListener('scroll', handleListenScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper', 'show')} id="tab-company-component">
            <div className={cx('container')}>
                <nav className={cx('menu')}>
                    <ul className={cx('menu-tabs')}>
                        <li className={cx('menu-tab', state === 'info' ? 'active' : '')}>
                            <a className={cx('btn')} onClick={handleToInfo}>
                                Thông tin
                            </a>
                        </li>
                        <li className={cx('menu-tab', state === 'company' ? 'active' : '')}>
                            <a className={cx('btn')} onClick={handleToCompany}>
                                Công ty
                            </a>
                        </li>
                        <li className={cx('menu-tab', state === 'related' ? 'active' : '')}>
                            <a className={cx('btn')} onClick={handleToRelated}>
                                Việc liên quan
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

TabCompany.propTypes = {
    handleToInfo: PropTypes.func.isRequired,
    handleToCompany: PropTypes.func.isRequired,
    handleToRelated: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
};

export default TabCompany;
