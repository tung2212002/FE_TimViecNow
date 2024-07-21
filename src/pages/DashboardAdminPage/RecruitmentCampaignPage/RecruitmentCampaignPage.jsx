import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FaChevronDown, FaEye, FaPlus } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';
import { HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft } from 'react-icons/hi';

import styles from './RecruitmentCampaignPage.module.scss';
import { SelectionComponent } from '@components/common';
import { IoSearchOutline } from 'react-icons/io5';
import path from '@constants/path';
import { getListCampaignService } from '@services/business/campaignService';
import { JobStatus } from '@constants';
import { SkeletonRecruimentCampaignComponent } from '@components/skeleton';
import { selectUser } from '@redux/features/authUser/authSlide';

const cx = classNames.bind(styles);

const RecruitmentCampaignPage = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
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

    const listTableHead = [
        {
            id: 1,
            name: 'Chiến dịch',
        },
        {
            id: 2,
            name: 'Tối ưu',
        },
        {
            id: 3,
            name: 'Tin tuyển dụng',
        },
        {
            id: 4,
            name: 'CV từ hệ thống',
        },
        {
            id: 5,
            name: 'Lọc CV',
        },
        {
            id: 6,
            name: 'Dịch vụ đang chạy',
        },
    ];

    const [campaigns, setCampaigns] = useState(null);

    const [filterCampaign, setFilterCampaign] = useState({
        filter_by: 1,
        page: 1,
        loading: true,
    });

    const requestSetStatusCampaign = (id, status) => {
        console.log(id, status);
    };

    const handlePrevPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilterCampaign({ ...filterCampaign, page: filterCampaign.page - 1, loading: true });
    };

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilterCampaign({ ...filterCampaign, page: filterCampaign.page + 1, loading: true });
    };

    const handleFilterCampaign = (filter) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilterCampaign({ ...filterCampaign, filter_by: filter, page: 1, loading: true });
    };

    useEffect(() => {
        const params = {
            skip: (filterCampaign.page - 1) * 10,
            limit: 10,
            sort_by: 'created_at',
            order_by: 'desc',
        };

        filterCampaign.filter_by !== 1 && (params.filter_by = listFilterCampaign.find((item) => item.id === filterCampaign.filter_by)?.filter_by);

        filterCampaign.loading &&
            getListCampaignService(params)
                .then((res) => {
                    if (res.status === 200) {
                        setCampaigns({
                            campaigns: res.data.data.campaigns,
                            count: res.data.data.count,
                        });
                        if (res.data.data.campaigns.length === 0 && user?.role === 'business') {
                            navigate(path.DASHBOARD_RECRUIREMENT_CAMPAIGNS_CREATE);
                        } else {
                            setTimeout(() => {
                                setFilterCampaign({ ...filterCampaign, loading: false });
                            }, 500);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [filterCampaign]);

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
                                                    {listFilterCampaign.find((item) => item.id === filterCampaign.filter_by)?.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {listFilterCampaign.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className={cx('item', { active: item.id === filterCampaign.filter_by })}
                                                    onClick={() => handleFilterCampaign(item.id)}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaChevronDown className={cx('icon-care')} />}
                                    itemSelect={listFilterCampaign.find((item) => item.id === filterCampaign.filter_by)?.name}
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
                                    {/* <th className={cx('table-head-item')}>Chiến dịch</th>
                                    <th className={cx('table-head-item')}>Tối ưu</th>
                                    <th className={cx('table-head-item')}>Tin tuyển dụng</th>
                                    <th className={cx('table-head-item')}>CV từ hệ thống</th>
                                    <th className={cx('table-head-item')}>Lọc CV</th>
                                    <th className={cx('table-head-item')}>Dịch vụ đang chạy</th> */}
                                    {listTableHead.map((item) => (
                                        <th key={item.id} className={cx('table-head-item')}>
                                            {item.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className={cx('table-body')}>
                                {campaigns && !filterCampaign.loading ? (
                                    campaigns.campaigns?.length > 0 ? (
                                        campaigns.campaigns.map((item) => (
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
                                                                {item?.cv_applies?.count > 0 ? `Có ${item.cv_applies.count} CV` : 'Chưa có CV nào'}
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
                                    )
                                ) : (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <tr className={cx('table-body-row')} key={index}>
                                            <td colSpan="6" className={cx('table-body-empty')}>
                                                <SkeletonRecruimentCampaignComponent />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {campaigns && campaigns.campaigns?.length > 0 && (
                        <div className={cx('footer')}>
                            <div className={cx('content-footer')}>
                                <span
                                    className={cx('btn', filterCampaign.page === 1 ? 'deactive' : '')}
                                    onClick={handlePrevPage}
                                    disabled={filterCampaign.page === 1}
                                >
                                    <HiOutlineChevronDoubleLeft className={cx('icon')} />
                                </span>
                                <p className={cx('text-page')}>
                                    <span className={cx('number')}>{filterCampaign.page}</span> / {Math.ceil(campaigns.count / 40)} trang
                                </p>
                                <span
                                    className={cx('btn', filterCampaign.page === Math.ceil(campaigns.count / 40) ? 'deactive' : '')}
                                    onClick={handleNextPage}
                                    disabled={filterCampaign.page === Math.ceil(campaigns.count / 10)}
                                >
                                    <HiOutlineChevronDoubleRight className={cx('icon')} />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecruitmentCampaignPage;
