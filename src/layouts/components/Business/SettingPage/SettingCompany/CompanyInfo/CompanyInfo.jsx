import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FaPenToSquare } from 'react-icons/fa6';

import styles from './CompanyInfo.module.scss';
import { selectBusiness } from '@redux/features/authBusiness/authSlide';
import { images } from '@assets';
import { settingBusinessState } from '@constants';

const cx = classNames.bind(styles);

const CompanyInfo = ({ setActiveTab }) => {
    const user = useSelector(selectBusiness);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info-header')}>
                    <div className={cx('info-general')}>
                        <div className={cx('info-general-logo')}>
                            <img src={user?.company?.logo || images.avatar_default} alt="logo" className={cx('logo')} />
                        </div>
                        <div className={cx('info-general-detail')}>
                            <p className={cx('info-general-name')}>{user?.company?.name || '--'}</p>
                            <p className={cx('info-general-email')}>{`${user?.company?.address} | ${user?.company?.scale} nhân viên` || '--'}</p>
                        </div>
                    </div>
                    <button className={cx('info-action')} onClick={() => setActiveTab(settingBusinessState.SETTING)}>
                        <FaPenToSquare className={cx('icon')} />
                        Chỉnh sửa
                    </button>
                </div>
                <div className={cx('info-body')}>
                    <div className={cx('info-body-item')}>
                        <div className={cx('item-col')}>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>{user?.company?.type === 'company' ? 'Mã số thuế:' : 'Mã số thuế người đại diện:'}</div>
                                <div className={cx('item-row-detail')}>{user?.company?.tax_code || '--'}</div>
                            </div>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Lĩnh vực hoạt động:</div>
                                <div className={cx('item-row-detail')}>
                                    {user?.company?.fields?.map((field, index) => (
                                        <span key={index}>
                                            {field.name}
                                            {index < user?.company?.fields?.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Email:</div>
                                <div className={cx('item-row-detail')}>{user?.company?.email || '--'}</div>
                            </div>
                        </div>
                        <div className={cx('item-col')}>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Website:</div>
                                <div className={cx('item-row-detail')}>{user?.company?.website || '--'}</div>
                            </div>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Quy mô:</div>
                                <div className={cx('item-row-detail')}>
                                    {user?.company?.scale || '--'}
                                    {user?.company?.scale && ' nhân viên'}
                                </div>
                            </div>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Số điện thoại:</div>
                                <div className={cx('item-row-detail')}>{user?.company?.phone_number || '--'}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-body-item')}>
                        <div className={cx('item-col', 'sub-info')}>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Địa chỉ:</div>
                                <div className={cx('item-row-detail')}>{user?.company?.address || '--'}</div>
                            </div>
                            <div className={cx('item-row')}>
                                <div className={cx('item-row-title')}>Mô tả:</div>
                                <div className={cx('item-row-detail')}>
                                    {user?.company?.company_short_description ? (
                                        <div
                                            className={cx('html-content')}
                                            dangerouslySetInnerHTML={{ __html: user?.company?.company_short_description }}
                                        ></div>
                                    ) : (
                                        '--'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CompanyInfo.propTypes = {
    setActiveTab: PropTypes.func,
};

export default CompanyInfo;
