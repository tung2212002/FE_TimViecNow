import { useState } from 'react';
import classNames from 'classnames/bind';

import { FaSortDown } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';

import styles from './PolicyManagerComponent.module.scss';

const cx = classNames.bind(styles);

const PolicyManagerComponent = () => {
    const [state, setState] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')} onClick={() => setState(!state)}>
                    <span className={cx('title-text')}>Quy định</span>
                    <span className={cx('icon-route', { rotate: state })}>
                        <FaSortDown className={cx('icon-route-icon')} />
                    </span>
                </div>
                <div className={cx('content', { show: state })}>
                    <div className={cx('content-container')}>
                        <div className={cx('content-item')}>
                            Để đảm bảo chất lượng dịch vụ, TVNow{' '}
                            <span className={cx('content-item-description')}>không cho phép một người dùng tạo nhiều tài khoản khác nhau</span>.
                        </div>
                        <div className={cx('content-item')}>
                            Nếu phát hiện vi phạm, TopCV sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống
                            website của TVNow. Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, TVNow hỗ trợ kích hoạt đăng tin tuyển
                            dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
                        </div>
                        <div className={cx('content-item')}>Mọi thắc mắc vui lòng liên hệ Hotline CSKH:</div>
                        <div className={cx('contact')}>
                            <div className={cx('contact-item')}>
                                <button className={cx('contact-item-button')}>
                                    <FaPhoneAlt className={cx('contact-item-icon')} />
                                </button>
                                <span className={cx('contact-item-text')}>0300 000 000</span>
                            </div>
                            <div className={cx('contact-item')}>
                                <button className={cx('contact-item-button')}>
                                    <FaPhoneAlt className={cx('contact-item-icon')} />
                                </button>
                                <span className={cx('contact-item-text')}>0300 000 000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyManagerComponent;
