import { useState } from 'react';
import classNames from 'classnames/bind';

import { FaChevronDown, FaEye, FaPlus } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';

import styles from './RecruitmentCampaignPage.module.scss';
import { SelectionComponent } from '../../../components/common';
import { IoSearchOutline } from 'react-icons/io5';
import path from '../../../constants/path';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const RecruitmentCampaignPage = () => {
    const [filterCampaign, setFilterCampaign] = useState('all');

    const listFilterCampaign = [
        {
            id: 1,
            name: 'Tất cả chiến dịch',
            filter_by: 'all',
        },
        {
            id: 2,
            name: 'Chỉ chiến dịch đang mở',
            filter_by: 'only_open',
        },
        {
            id: 3,
            name: 'Có CV ứng tuyển mới cần xem',
            filter_by: 'has_new_cv',
        },
        {
            id: 4,
            name: 'Đã kích hoạt tính năng CV đề xuất',
            filter_by: 'actived_cv_scout',
        },
        {
            id: 5,
            name: 'Tin tuyển dụng đang hiển thị',
            filter_by: 'has_publishing_job',
        },
        {
            id: 6,
            name: 'Có dịch vụ đang chạy',
            filter_by: 'has_running_service',
        },
        {
            id: 7,
            name: 'Tin tuyển dụng hết hạn hiển thị',
            filter_by: 'expired_job',
        },
        {
            id: 8,
            name: 'Tin tuyển dụng đang xét duyệt',
            filter_by: 'waitting_approve_job',
        },
    ];

    const listCampaign = [
        {
            id: 1535337,
            title: 'Test 12',
            created_at: '2024-03-31T19:40:19.000000Z',
            status: 0,
            experience: '0-0',
            salary_currency: null,
            employee_level: null,
            salary_level: null,
            salary_from: null,
            salary_to: null,
            job_type: null,
            locations: [],
            job: {
                id: 1284467,
                title: 'Test 12',
                recruitment_campaign_id: 1535337,
                url: 'https://www.topcv.vn/viec-lam/test-12/1284467.html',
                status: -1,
                status_str: 'Không công khai',
                reject_reason: null,
                is_fast_manual_up_top: false,
                can_fast_manual_up_top: false,
                restriction_level: null,
                is_pro_x_job: false,
                verified: false,
                raw_title: 'Test 12',
                deadline: '2024-04-29T17:00:00.000000Z',
                categories: [
                    {
                        id: 10006,
                        name: 'Bảo hiểm',
                        alias: 'bao-hiem',
                        is_main: 1,
                    },
                    {
                        id: 10007,
                        name: 'Bất động sản',
                        alias: 'bat-dong-san',
                        is_main: 0,
                    },
                    {
                        id: 10008,
                        name: 'Chứng khoán / Vàng / Ngoại tệ',
                        alias: 'chung-khoan-vang-ngoai-te',
                        is_main: 0,
                    },
                ],
                job_status: {
                    str_status: 'Không hiển thị',
                    name_status: 'not-publish',
                },
                job_approve_status: {
                    str_status: 'Chưa yêu cầu duyệt',
                    name_status: 'not-request',
                },
                recruitment_position_title: 'Aasasa',
            },
            services_scout_ai: [],
            services: [],
            cv_scout_position: null,
            optimal_score: 36,
            is_need_confirm_stop: false,
            recruitment_position_title: null,
            statistic: {
                used_credit_for_cv_scout_count: 0,
                used_prepaid_for_cv_scout_count: 0,
                used_credit_for_cv_search_count: 0,
                used_prepaid_for_cv_search_count: 0,
                evaluate_cv_apply: null,
                opened_cv_applies: 0,
            },
            is_flash: false,
            cv_records: {
                data: [],
                total: 0,
            },
            cv_applies: {
                data: [],
                total: 0,
            },
            suggested_data_cvs: {
                data: [],
                total: 0,
            },
            up_sale: {
                tooltip_up_sale: '',
                restriction_level: null,
            },
            is_ssp: 0,
            cv_recommend_in_day: 0,
        },
        {
            id: 1535252,
            title: 'Intern tháng 4',
            created_at: '2024-03-31T05:20:23.000000Z',
            status: 0,
            experience: '0-0',
            salary_currency: null,
            employee_level: null,
            salary_level: null,
            salary_from: null,
            salary_to: null,
            job_type: null,
            locations: [],
            job: null,
            services_scout_ai: [],
            services: [],
            cv_scout_position: null,
            optimal_score: 24,
            is_need_confirm_stop: false,
            recruitment_position_title: null,
            statistic: {
                used_credit_for_cv_scout_count: 0,
                used_prepaid_for_cv_scout_count: 0,
                used_credit_for_cv_search_count: 0,
                used_prepaid_for_cv_search_count: 0,
                evaluate_cv_apply: null,
                opened_cv_applies: null,
            },
            is_flash: false,
            cv_records: {
                data: [],
                total: 0,
            },
            cv_applies: {
                data: [],
                total: 0,
            },
            suggested_data_cvs: {
                data: [],
                total: 0,
            },
            up_sale: {
                tooltip_up_sale: '',
                restriction_level: null,
            },
            is_ssp: 0,
            cv_recommend_in_day: 0,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-modal')}></div>
            <div className={cx('container')}>
                <div className={cx('breadcrumb-box')}>
                    <div className={cx('breadcrumb-box-title')}>
                        <h6 className={cx('breadcrumb')}>Quản lý chiến dịch tuyển dụng</h6>
                    </div>
                    <div className={cx('breadcrumb-box-button')}>
                        <div className={cx('button-list')}>
                            <Link to={path.DASHBOARD_RECRUIREMENT_CAMPAIGNS_CREATE}>
                                <button className={cx('button', 'button-post')}>
                                    <FaPlus className={cx('icon-plus')} />
                                    Thêm chiến dịch mới
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-list')}>
                        <div className={cx('box-search')}>
                            <div className={cx('box-filter-campaign')}>
                                <SelectionComponent
                                    header={() => (
                                        <div className={cx('header-select')}>
                                            <div className={cx('container-select')}>
                                                <span className={cx('result')}>
                                                    {listFilterCampaign.find((item) => item.filter_by === filterCampaign)?.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {listFilterCampaign.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className={cx('item', { active: item.filter_by === filterCampaign })}
                                                    onClick={() => setFilterCampaign(item.filter_by)}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaChevronDown className={cx('icon-care')} />}
                                    itemSelect={listFilterCampaign.find((item) => item.filter_by === filterCampaign)?.name}
                                    maxHeight={'300px'}
                                    styleDropdown={{
                                        right: 'auto',
                                        left: '0',
                                        top: '45px',
                                        width: '250px',
                                        borderRadius: '4px',
                                        border: '1px solid #e8e8e8',
                                        borderTop: 'none',
                                    }}
                                    styleButton={{ marginRight: '10px' }}
                                />
                            </div>
                            <div className={cx('box-search-campaign')}>
                                <input type="text" placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)" className={cx('input-search')} />
                                <IoSearchOutline className={cx('icon-search')} />
                            </div>
                        </div>
                        <table className={cx('table')}>
                            <thead className={cx('table-head')}>
                                <tr>
                                    <th className={cx('table-head-item')}>Chiến dịch</th>
                                    <th className={cx('table-head-item')}>Tối ưu</th>
                                    <th className={cx('table-head-item')}>Tin tuyển dụng</th>
                                    <th className={cx('table-head-item')}>CV từ hệ thống</th>
                                    <th className={cx('table-head-item')}>Lọc CV</th>
                                    <th className={cx('table-head-item')}>Dịch vụ đang chạy</th>
                                </tr>
                            </thead>
                            <tbody className={cx('table-body')}>
                                {listCampaign.map((item) => (
                                    <tr key={item.id} className={cx('table-body-row')}>
                                        <td className={cx('table-body-item')}>
                                            <div className={cx('item-campaign')}>
                                                <label className={cx('item-switch')}>
                                                    <input type="checkbox" className={cx('switch-input')} />
                                                    <span className={cx('switch-slider')}></span>
                                                </label>
                                                <div className={cx('item-content')}>
                                                    <div className={cx('item-content-id')}>
                                                        <span className={cx('id')}>#{item.id}</span>
                                                    </div>
                                                    <a href={`${path.DASHBOARD_RECRUIREMENT_CAMPAIGNS}/${item.id}`} className={cx('item-content-title')}>
                                                        {item.title}
                                                    </a>
                                                    <br />
                                                    <div className={cx('item-content-cv')}>
                                                        {item.cv_applies.total > 0 ? `Có ${item.cv_applies.total} CV` : 'Chưa có CV nào'}
                                                    </div>
                                                    <div className={cx('item-content-action', 'item-content-absolute')}>
                                                        <a href={`${path.DASHBOARD_RECRUIREMENT_CAMPAIGNS}/${item.id}`} className={cx('item-content-link')}>
                                                            Xem báo cáo
                                                        </a>
                                                    </div>
                                                    <div className={cx('item-content-action', 'item-content-absolute')}>
                                                        <a
                                                            href={`${path.DASHBOARD_RECRUIREMENT_CAMPAIGNS}/${item.id}?active_tab=apply_cv`}
                                                            className={cx('item-content-link')}
                                                        >
                                                            Xem CV ứng tuyển
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx('table-body-item')}>
                                            <div className={cx('item-optimal')}>
                                                <span className={cx('optimal-percentage')}>
                                                    <a href={path.DASHBOARD_SUGGESTION} className={cx('optimal-percentage-link')}>
                                                        {item.optimal_score > 0 ? `${item.optimal_score}%` : 'Chưa tối ưu'}
                                                    </a>
                                                </span>
                                            </div>
                                        </td>
                                        <td className={cx('table-body-item')}>
                                            <div className={cx('table-body-item-info')}>
                                                <div className={cx('info-job')}>
                                                    <div className={cx('job-position')}>
                                                        <span className={cx('id')}>{item.job?.id ? `ID: ${item.job.id}` : 'Chiến dịch đang tắt'}</span>
                                                        {item.job ? <div className={cx('item-content-title')}>{item.job?.title}</div> : null}
                                                        {item.job ? (
                                                            <div
                                                                className={cx('job-status', {
                                                                    'job-status-publish': item.job?.job_status?.name_status === 'publish',
                                                                })}
                                                            >
                                                                <span className={cx('job-status-text')}>
                                                                    {item.job?.job_status?.name_status === 'publish' ? 'Đang hiển thị' : 'Không hiển thị'}
                                                                </span>
                                                                <span className={cx('job-status-text')}>
                                                                    {item.job?.job_approve_status?.name_status === 'request'
                                                                        ? 'Đang xét duyệt'
                                                                        : 'Chưa yêu cầu duyệt'}
                                                                </span>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className={cx('item-content-absolute', 'info-job-action')}>
                                                        <FaPen className={cx('icon-edit')} />
                                                        <a href={`${path.DASHBOARD_POST_JOB_EDIT}/${item.job?.id}/edit`} className={cx('item-content-link')}>
                                                            Chỉnh sửa
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx('table-body-item')}>
                                            <div className={cx('table-body-item-cv')}>
                                                <div className={cx('cv-apply')}>
                                                    CV đề xuất
                                                    <br />
                                                    <p className={cx('cv-apply-number')}>
                                                        {item.statistic.opened_cv_applies ? item.statistic.opened_cv_applies : 'Chiến dịch đang tắt'}
                                                    </p>
                                                    <div className={cx('cv-apply-view')}>
                                                        <a href={path.DASHBOARD_SEARCH} className={cx('cv-apply-view-link')}>
                                                            <FaEye className={cx('cv-apply-view-icon')} />
                                                            Xem chi tiết
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx('table-body-item')}>
                                            <div className={cx('table-body-item-title')}></div>
                                        </td>
                                        <td className={cx('table-body-item')}>
                                            <div className={cx('table-body-item-title')}>
                                                {item.status === 0 ? (
                                                    <div className={cx('item-status')}>Chiến dịch đang tắt</div>
                                                ) : (
                                                    <div className={cx('item-status', 'item-status-active')}>Chiến dịch đang mở</div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruitmentCampaignPage;
