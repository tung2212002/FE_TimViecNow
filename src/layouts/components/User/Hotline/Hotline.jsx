import { useState } from 'react';
import classNames from 'classnames/bind';

import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import styles from './Hotline.module.scss';
import { images } from '@assets';
import BoxPhone from './BoxPhone/BoxPhone';

const cx = classNames.bind(styles);

const Hotline = () => {
    const [activeTab, setActiveTab] = useState('candidate');

    const listHotline = [
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 1,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 2,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 3,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 4,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 5,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 6,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 7,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 8,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 9,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 1,
            id: 10,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 11,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 12,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 13,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 14,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 15,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 16,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 17,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 18,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 19,
        },
        {
            full_name: 'Nguyễn Văn A',
            phone: '0123456789',
            location_id: 2,
            id: 110,
        },
    ];

    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.hotline_bg})` }}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>Hotline Tư Vấn</h2>
                    <div className={cx('tab')}>
                        <ul className={cx('tab-list')}>
                            <li className={cx('tab-item', { active: activeTab === 'candidate' })} onClick={() => setActiveTab('candidate')}>
                                <a className={cx('tab-link')}>Dành cho Người tìm việc</a>
                            </li>
                            <li className={cx('tab-item', { active: activeTab === 'employer' })} onClick={() => setActiveTab('employer')}>
                                <a className={cx('tab-link')}>Dành cho Nhà tuyển dụng</a>
                            </li>
                        </ul>
                        <div className={cx('tab-content')}>
                            <div className={cx('tab-panel', { active: activeTab === 'candidate' })} id="candidate">
                                <div className={cx('tab-container', 'candidate')}>
                                    <div className={cx('text-content')}>
                                        <h2 className={cx('text-title')}>
                                            <span className={cx('label')}>Tìm việc khó</span>
                                            <span className={cx('highlight')}> đã có TVNow</span>
                                        </h2>
                                        <div className={cx('box-phone-number')}>
                                            <span className={cx('phone-number')}>(012) 345 6789</span>
                                            <a href="tel:0123456789" className={cx('phone-link')}>
                                                <FaPhoneAlt className={cx('phone-icon')} />
                                                <span className={cx('phone-text')}>GỌI NGAY</span>
                                            </a>
                                        </div>
                                        <div className={cx('box-email')}>
                                            <span className={cx('email')}>Email hỗ trợ ứng viên: </span>
                                            <span className={cx('email-address')}>
                                                <MdEmail className={cx('email-icon')} />
                                                <a href="mailto:tungong@email.com" className={cx('email-link')}>
                                                    tungong@email.com
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <img src={images.hotline} alt="hotline" className={cx('hotline')} />
                                </div>
                            </div>
                            <div className={cx('tab-panel', { active: activeTab === 'employer' })} id="employer">
                                <div className={cx('tab-container', 'employer')}>
                                    <div className={cx('col', 'service')}>
                                        <div className={cx('service-phone')}>
                                            <p className={cx('title')}>CSKH & Khiếu nại dịch vụ</p>
                                            <BoxPhone full_name="Hotline 1" phone="0123 456 789" />
                                            <BoxPhone full_name="Hotline 2" phone="0123 456 789" />
                                        </div>
                                        <div className={cx('service-email')}>
                                            <p className={cx('title')}>Email hỗ trợ nhà tuyển dụng</p>
                                            <BoxPhone phone="tungong@email.com" />
                                        </div>
                                    </div>
                                    <div className={cx('col', 'hotline-col')}>
                                        <p className={cx('title')}>Hotline tư vấn tuyển dụng miền Bắc</p>
                                        {listHotline
                                            .filter((item) => item.location_id === 1)
                                            .slice(0, 5)
                                            .map((item) => (
                                                <BoxPhone key={item.id} full_name={item.full_name} phone={item.phone} />
                                            ))}
                                    </div>
                                    <div className={cx('col', 'hotline-col')}>
                                        <p className={cx('title')}>Hotline tư vấn tuyển dụng miền Nam</p>
                                        {listHotline
                                            .filter((item) => item.location_id === 2)
                                            .slice(0, 5)
                                            .map((item) => (
                                                <BoxPhone key={item.id} full_name={item.full_name} phone={item.phone} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotline;
