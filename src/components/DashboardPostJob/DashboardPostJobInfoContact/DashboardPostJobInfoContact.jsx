import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './DashnoardPostJobInfoContact.module.scss';
import { selectError, selectPostJob, setEmailContact, setFullNameContact, setPhoneNumberContact } from '../../../redux/features/postJob/postJobSlide';
import { selectBusiness } from '../../../redux/features/authBusiness/authSlide';
import randomId from '../../../utils/randomId';
import { InputSelectorMultiOptionComponent } from '../../common';

const cx = classNames.bind(styles);

const DashboardPostJobInfoContact = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectBusiness);
    const job = useSelector(selectPostJob);
    const error = useSelector(selectError);

    const listEmail = [
        {
            id: randomId(),
            value: user?.email,
        },
    ];

    const handleSetFullNameContact = (e) => {
        dispatch(setFullNameContact(e.target.value));
    };

    const handleSetPhoneNumberContact = (e) => {
        dispatch(setPhoneNumberContact(e.target.value));
    };

    const handleSetEmailContact = (value) => {
        dispatch(setEmailContact(value));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-title')}>
                <h6 className={cx('title')}>Thông tin nhận CV</h6>
            </div>
            <div className={cx('box-content-flex')}>
                <div className={cx('box-content-group')}>
                    <label className={cx('label')} htmlFor="job-title">
                        Họ và tên người nhận
                        <span className={cx('required')}>*</span>
                    </label>
                    <div className={cx('input-box')}>
                        <div className={cx('input-box-item')}>
                            <input
                                type="text"
                                className={cx('input')}
                                id="job-title"
                                placeholder="Nhập tên người nhận CV"
                                onChange={handleSetFullNameContact}
                            />
                        </div>
                        {error.full_name_contact && (
                            <div className={cx('input-box-feedback')}>
                                <div className={cx('feedback-text')}>Tên người nhận CV không được để trống</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('box-content-group')}>
                    <label className={cx('label')} htmlFor="job-phone">
                        Số điện thoại
                        <span className={cx('required')}>*</span>
                    </label>
                    <div className={cx('input-box')}>
                        <div className={cx('input-box-item')}>
                            <input
                                type="text"
                                className={cx('input')}
                                id="job-phone"
                                placeholder="Nhập số điện thoại người nhận CV"
                                onChange={handleSetPhoneNumberContact}
                            />
                        </div>
                        {error.phone_number_contact && (
                            <div className={cx('input-box-feedback')}>
                                <div className={cx('feedback-text')}>Số điện thoại người nhận CV không được để trống</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('box-content-group')}>
                <label className={cx('label')} htmlFor="job-email-cv">
                    Email nhận hồ sơ <i>(Tối đa 5 email)</i>
                    <span className={cx('required')}>*</span>
                </label>
                <div className={cx('input-box')}>
                    <InputSelectorMultiOptionComponent
                        placeholder={''}
                        options={job.email_contact}
                        defaultValue={job.email_contact[0] || user?.email}
                        defaultOptions={listEmail}
                        value={job.email_contact}
                        setValue={handleSetEmailContact}
                        styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                        maxOption={2}
                    />
                </div>
                {error.email_contact && (
                    <div className={cx('input-box-feedback')}>
                        <div className={cx('feedback-text')}>Email người nhận CV không được để trống</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPostJobInfoContact;
