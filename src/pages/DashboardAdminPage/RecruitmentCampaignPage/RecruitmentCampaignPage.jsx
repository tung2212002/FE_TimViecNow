import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FaChevronDown, FaEye, FaPlus } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';

import styles from './RecruitmentCampaignPage.module.scss';
import { SelectionComponent } from '../../../components/common';
import { IoSearchOutline } from 'react-icons/io5';
import path from '../../../constants/path';
import { Link } from 'react-router-dom';
import { getListCampaignService } from '../../../services/campaignService';
import { JobStatus, JobApprovalStatus } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectCampaign, setCampaign } from '../../../redux/features/campaign/campaignSilde';

const cx = classNames.bind(styles);

const RecruitmentCampaignPage = () => {
    const dispatch = useDispatch();

    const campaigns = useSelector(selectCampaign);

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

    const requestSetStatusCampaign = (id, status) => {
        console.log(id, status);
    };

    useEffect(() => {
        const body = {
            skip: 0,
            limit: 10,
            sort_by: 'id',
            order_by: 'asc',
            business_id: null,
            status: 'all',
        };
        !campaigns &&
            getListCampaignService(body)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setCampaign(res.data.data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    }, []);

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
                                {campaigns &&
                                    (campaigns?.length > 0 ? (
                                        campaigns.map((item) => (
                                            <tr key={item.id} className={cx('table-body-row')}>
                                                <td className={cx('table-body-item')}>
                                                    <div className={cx('item-campaign')}>
                                                        <label className={cx('item-switch')}>
                                                            <input
                                                                type="checkbox"
                                                                className={cx('switch-input')}
                                                                value={item.status === 'open'}
                                                                checked={item.status === 'open'}
                                                                onChange={() => requestSetStatusCampaign(item.id, item.status === 'open' ? 'close' : 'open')}
                                                            />
                                                            <span className={cx('switch-slider')}></span>
                                                        </label>
                                                        <div className={cx('item-content')}>
                                                            <div className={cx('item-content-id')}>
                                                                <span className={cx('id')}>#{item.id}</span>
                                                            </div>
                                                            <a
                                                                href={`${path.DASHBOARD_RECRUIREMENT_CAMPAIGNS}/${item.id}`}
                                                                className={cx('item-content-title')}
                                                            >
                                                                {item.title}
                                                            </a>
                                                            <br />
                                                            <div className={cx('item-content-cv')}>
                                                                {item?.cv_applies?.total > 0 ? `Có ${item.cv_applies.total} CV` : 'Chưa có CV nào'}
                                                            </div>
                                                            <div className={cx('item-content-action', 'item-content-absolute')}>
                                                                <a
                                                                    href={`${path.DASHBOARD_RECRUIREMENT_CAMPAIGNS}/${item.id}`}
                                                                    className={cx('item-content-link')}
                                                                >
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
                                                                    <div className={cx('job-status', `job-status-${item.job?.status}`)}>
                                                                        {/* <span className={cx('job-status-text')}>
                                                                        {item.job?.status !== 'published' ? 'Không hiển thị' : 'Đang hiển thị'}
                                                                    </span> */}
                                                                        <span className={cx('job-status-text')}>
                                                                            {JobStatus.find((status) => status.value === item.job?.status)?.name}
                                                                        </span>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className={cx('item-content-absolute', 'info-job-action')}>
                                                                <FaPen className={cx('icon-edit')} />
                                                                <a
                                                                    href={`${path.DASHBOARD_POST_JOB_EDIT}/${item.job?.id}/edit`}
                                                                    className={cx('item-content-link')}
                                                                >
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
                                                                {item?.statistic?.opened_cv_applies ? item.statistic.opened_cv_applies : 'Chiến dịch đang tắt'}
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
                                                        {item.status === 'open' ? (
                                                            <div className={cx('item-status', 'item-status-active')}>Chiến dịch đang mở</div>
                                                        ) : (
                                                            <div className={cx('item-status')}>Chiến dịch đang tắt</div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className={cx('table-body-empty')}>
                                                Không có dữ liệu
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
