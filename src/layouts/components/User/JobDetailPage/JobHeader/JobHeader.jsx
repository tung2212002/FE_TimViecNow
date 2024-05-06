import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { TbCircleCheckFilled } from 'react-icons/tb';
import { FaLock, FaRegPaperPlane, FaRegHeart } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';

import styles from './JobHeader.module.scss';
import { icons } from '../../../../../assets';
import useDocumentTitle from '../../../../../hooks/useDocumentTitle';
import { Modal } from '../../../../../components/common';
import { ModalApplyComponent } from '../../../../../components';
import { showModal } from '../../../../../redux/features/modal/modalSlice';
import { convertSalary } from '../../../../../utils/convertSalary';
import { Experience } from '../../../../../constants';

const cx = classNames.bind(styles);

const JobHeader = ({ job }) => {
    const dispatch = useDispatch();
    const setProvince = [];

    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    const listCheck = [
        {
            id: 1,
            name: 'Đã xác thực email tên miền công ty',
        },
        {
            id: 2,
            name: 'Đã xác thực số điện thoại',
        },
        {
            id: 3,
            name: 'Đã được duyệt Giấy phép kinh doanh',
        },
        {
            id: 4,
            name: 'Tài khoản NTD được tạo tối thiểu 6 tháng',
        },
        {
            id: 5,
            name: 'Chưa có lịch sử bị báo cáo tin đăng',
        },
    ];

    const sections = [
        {
            id: 1,
            label: 'Mức lương',
            icon: icons.icon_money,
            text: convertSalary(job.salary_type, job.min_salary, job.max_salary),
        },
        {
            id: 2,
            label: 'Địa điểm',
            icon: icons.icon_location,
            text: setProvince.length <= 1 ? setProvince.join(', ') : `${setProvince[0]} & ${setProvince.length - 1} nơi khác`,
        },
        {
            id: 3,
            label: 'Kinh nghiệm',
            icon: icons.icon_time,
            text: Experience[job.job_experience_id - 1]?.name,
        },
    ];

    const showApply = () => {
        dispatch(showModal());
    };

    useDocumentTitle(`${job.title} - ${job.company.name}`);
    return (
        <div className={cx('wrapper')}>
            <Modal>
                <ModalApplyComponent job={job} />
            </Modal>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    {job.title}
                    <Tippy
                        render={(attrs) => (
                            <div {...attrs} className={cx('tooltip')}>
                                <b className={cx('tooltip-title')}>Nhà tuyển dụng</b>
                                <span className={cx('tooltip-content')}> đã được xác thực:</span>
                                <br />
                                {listCheck.map((check) => (
                                    <div className={cx('tooltip-item')} key={check.id}>
                                        <TbCircleCheckFilled className={cx('icon')} />
                                        <span>{check.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        interactive
                        placement="top"
                        delay={100}
                        arrow={true}
                        zIndex={9999}
                        offset={[0, -6]}
                        appendTo={() => document.body}
                    >
                        <span className={cx('check')}>
                            <TbCircleCheckFilled className={cx('icon-check')} />
                        </span>
                    </Tippy>
                </h1>
                <div className={cx('sections')}>
                    {sections.map((section) => (
                        <div className={cx('section')} key={section.id}>
                            <div className={cx('icon-wrapper')}>
                                <img src={section.icon} alt={section.label} className={cx('icon')} />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('label')}>{section.label}</div>
                                <div className={cx('text')}>{section.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('flex')}>
                    <div className={cx('quantity-applier', 'disabled')}>
                        <div className={cx('quantity-icon')}>
                            <FaLock className={cx('icon-lock')} />
                        </div>
                        <div className={cx('text')}>TVNow chưa hỗ trợ xem số lượt ứng tuyển cho việc làm này</div>
                    </div>
                    <div className={cx('deadline-applier')}>
                        <div className={cx('deadline-icon')}>
                            <FaClock className={cx('icon-clock')} />
                        </div>
                        <div className={cx('text')}>
                            Hạn nộp hồ sơ:{' '}
                            {job.deadline ? `${job.deadline.slice(8, 10)}/${job.deadline.slice(5, 7)}/${job.deadline.slice(0, 4)}` : 'Không xác định'}
                        </div>
                    </div>
                </div>
                <div className={cx('company')}>
                    <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('logo-link')}>
                        <img src={job.company.logo} alt="logo" className={cx('logo')} />
                    </a>
                    <div className={cx('detail')}>
                        <TippyText content={job.company.name} placement="top">
                            <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('company-link')}>
                                {job.company.name}
                            </a>
                        </TippyText>
                        <div className={cx('description')}>{job.company_short_description}</div>
                    </div>
                </div>
                <div className={cx('save-job')}>
                    <button className={cx('button-apply')} onClick={showApply}>
                        <span className={cx('icon-save')}>
                            <FaRegPaperPlane className={cx('icon')} />
                        </span>
                        <span className={cx('text')}>Ứng tuyển ngay</span>
                    </button>
                    <button className={cx('button-save')}>
                        <span className={cx('icon-save')}>
                            <FaRegHeart className={cx('icon', 'icon-save')} />
                        </span>
                        <span className={cx('text')}>Lưu tin</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

JobHeader.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobHeader;
