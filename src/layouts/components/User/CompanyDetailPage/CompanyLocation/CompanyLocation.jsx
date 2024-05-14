import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLocationDot } from 'react-icons/fa6';
import { FaMap } from 'react-icons/fa';

import styles from './CompanyLocation.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const CompanyLocation = ({ company }) => {
    const address = company?.address;

    useEffect(() => {
        // :)) API KEY
    }, [address]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Thông tin liên hệ</h2>
                <div className={cx('body')}>
                    <div className={cx('item')}>
                        <div className={cx('box-title')}>
                            <FaLocationDot className={cx('icon')} />
                            <div className={cx('text')}>Địa chỉ công ty</div>
                        </div>
                        <div className={cx('content')}>{company.address}</div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('box-title')}>
                            <FaMap className={cx('icon')} />
                            <div className={cx('text')}>Xem bản đồ</div>
                        </div>
                        <div className="google-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.688524521909!2d105.84416467610228!3d21.005119180638268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac767fb412d5%3A0xa15e3744fef76fda!2zS8OtIFTDumMgWMOhIELDoWNoIEtob2E!5e0!3m2!1svi!2s!4v1714722157057!5m2!1svi!2s"
                                height="297"
                                width="100%"
                                style={{
                                    border: 0,
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CompanyLocation.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyLocation;
