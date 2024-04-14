import { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { FaCheck } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';

import styles from './SettingCompany.module.scss';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import CreateCompany from './CreateCompany/CreateCompany';
import SearchCompany from './SearchCompany/SearchCompany';
import { selectBusiness } from '../../../../../redux/features/authBusiness/authSlide';

const cx = classNames.bind(styles);

const SettingCompany = () => {
    const user = useSelector(selectBusiness);
    const [state, setState] = useState(user?.company ? 3 : 1);
    const [compaines, setCompaines] = useState([]);

    const handleSetState = (value) => {
        setState(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {!(state === 3) && (
                    <ul className={cx('nav-tabs')}>
                        <li className={cx('nav-tab', { active: state === 1 })} onClick={() => state !== 1 && setState(1)}>
                            <div className={cx('nav-tab-item')}>
                                <div className={cx('nav-tab-item-icon')}>
                                    <IoSearchSharp className={cx('icon')} />
                                </div>
                                <div className={cx('nav-tab-item-text')}>
                                    <p className={cx('nav-tab-item-title')}>Tìm kiếm thông tin công ty</p>
                                    <span className={cx('nav-tab-item-description')}>Dành cho Doanh nghiệp đã có trên TimViecNow</span>
                                </div>
                                <div className={cx('nav-tab-item-tick', 'nav-tab-item-icon')}>
                                    <FaCheck className={cx('icon-check')} />
                                </div>
                            </div>
                        </li>
                        <li className={cx('nav-tab', { active: state === 2 })} onClick={() => state !== 2 && setState(2)}>
                            <div className={cx('nav-tab-item')}>
                                <div className={cx('nav-tab-item-icon')}>
                                    <FaPlus className={cx('icon')} />
                                </div>
                                <div className={cx('nav-tab-item-text')}>
                                    <p className={cx('nav-tab-item-title')}>Tạo công ty mới</p>
                                    <span className={cx('nav-tab-item-description')}>Dành cho Doanh nghiệp lần đầu sử dụng TimViecNow</span>
                                </div>
                                <div className={cx('nav-tab-item-tick', 'nav-tab-item-icon')}>
                                    <FaCheck className={cx('icon-check')} />
                                </div>
                            </div>
                        </li>
                    </ul>
                )}
                <div className={cx('content-tabs')}>
                    <div className={cx('content-tab', { active: state === 1 })}>
                        <SearchCompany />
                    </div>

                    <div className={cx('content-tab', { active: state === 2 })}>
                        <CreateCompany setActiveTab={handleSetState} />
                    </div>
                    <div className={cx('content-tab', { active: state === 3 })}>
                        <CompanyInfo setActiveTab={handleSetState} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingCompany;
