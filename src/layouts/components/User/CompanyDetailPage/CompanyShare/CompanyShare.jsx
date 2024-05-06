import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaRegCopy, FaCopy } from 'react-icons/fa';

import styles from './CompanyShare.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const CompanyShare = ({ company }) => {
    const [isCopy, setIsCopy] = useState(false);

    const handleCopy = () => {
        const copyText = document.getElementById('url_company');
        const text = copyText.value;
        navigator.clipboard.writeText(text);
        setIsCopy(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Chia sẻ công ty tới bạn bè</h2>
                <div className={cx('body')}>
                    <div className={cx('item')}>
                        <div className={cx('box-title')}>
                            <div className={cx('text')}>Sao chép đường dẫn</div>
                        </div>
                        <div className={cx('box-copy')}>
                            <input type="text" value={window.location.href} readOnly id="url_company" />
                            <button className={cx('btn-copy')} onClick={handleCopy}>
                                {isCopy ? <FaCopy className={cx('icon', 'active')} /> : <FaRegCopy className={cx('icon')} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CompanyShare.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyShare;
