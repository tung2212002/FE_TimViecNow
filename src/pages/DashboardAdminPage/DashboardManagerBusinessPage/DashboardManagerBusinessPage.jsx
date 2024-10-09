import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { FaChevronDown, FaEye, FaPlus } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';
import { HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';
import { CgMail } from 'react-icons/cg';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';

import styles from './DashboardManagerBusinessPage.module.scss';
import { SelectionComponent } from '@components/common';
import path from '@constants/path';
import { getListBusinessService } from '../../../services/business/businessService';
import { getListUserService } from '../../../services/user/userService';
import { SkeletonManagerUsercomponent } from '@components/skeleton';
import { selectUser } from '@redux/features/authUser/authSlide';
import { images } from '@assets';
import { convertTimeAgo } from '@utils/convert/convertTimeUtil';

const cx = classNames.bind(styles);

const DashboardManagerBusinessPage = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const listFilterBusiness = [
        {
            id: 1,
            name: 'Người dùng tìm việc',
            filter_by: 'normal',
        },
        {
            id: 2,
            name: 'Người dùng doanh nghiệp',
            filter_by: 'business',
        },
    ];

    const [business, setBusiness] = useState(null);

    const [filterBusiness, setFilterBusiness] = useState({
        filter_by: 2,
        page: 1,
        loading: true,
        canLoadMore: true,
    });

    const requestSetStatusCampaign = (id, status) => {
        console.log(id, status);
    };

    const handlePrevPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilterBusiness({ ...filterBusiness, page: filterBusiness.page - 1, loading: true });
    };

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilterBusiness({ ...filterBusiness, page: filterBusiness.page + 1, loading: true });
    };

    const handleFilterBusiness = (filter) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilterBusiness({ ...filterBusiness, filter_by: filter, page: 1, loading: true });
    };

    useEffect(() => {
        const params = {
            skip: (filterBusiness.page - 1) * 10,
            limit: 10,
            sort_by: 'created_at',
            order_by: 'desc',
        };

        filterBusiness.filter_by !== 1 && (params.filter_by = filterBusiness.filter_by);

        filterBusiness.loading &&
            (filterBusiness.filter_by === 1 ? getListUserService(params) : getListBusinessService(params))
                .then((res) => {
                    if (res.status === 200) {
                        setBusiness({
                            business: res.data.data,
                        });
                        if (res.data.data.length === 0 && user?.role === 'business') {
                            navigate(path.DASHBOARD_HOME);
                        } else {
                            setTimeout(() => {
                                setFilterBusiness({ ...filterBusiness, loading: false, canLoadMore: res.data.data.length === 10 });
                            }, 500);
                        }
                    } else if (res.status === 404) {
                        setBusiness({
                            business: [],
                        });
                        setTimeout(() => {
                            setFilterBusiness((prev) => ({ ...prev, loading: false, canLoadMore: false }));
                        }, 500);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [filterBusiness]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-modal')}></div>
            <div className={cx('container')}>
                <div className={cx('breadcrumb-box')}>
                    <div className={cx('breadcrumb-box-title')}>
                        <h6 className={cx('breadcrumb')}>Quản lý người dùng</h6>
                    </div>
                    <div className={cx('breadcrumb-box-button')}>
                        <div className={cx('button-list')}>
                            <Link to={path}>
                                <button className={cx('button', 'button-post')}>
                                    <FaPlus className={cx('icon-plus')} />
                                    ...
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
                                                    {listFilterBusiness.find((item) => item.id === filterBusiness.filter_by)?.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {listFilterBusiness.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className={cx('item', { active: item.id === filterBusiness.filter_by })}
                                                    onClick={() => handleFilterBusiness(item.id)}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaChevronDown className={cx('icon-care')} />}
                                    itemSelect={listFilterBusiness.find((item) => item.id === filterBusiness.filter_by)?.name}
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
                                <input
                                    type="text"
                                    placeholder={`Tìm người dùng theo email, tên ${filterBusiness.filter_by === 2 ? ', công ty ' : ''}(Nhấn enter để tìm kiếm)`}
                                    className={cx('input-search')}
                                />
                                <IoSearchOutline className={cx('icon-search')} />
                            </div>
                        </div>
                        <table className={cx('table')}>
                            <thead className={cx('table-head')}>
                                <tr>
                                    <th className={cx('table-head-item')}>Ảnh</th>
                                    <th className={cx('table-head-item')}>Tên</th>
                                    <th className={cx('table-head-item')}>Thông tin</th>
                                    {filterBusiness.filter_by === 2 && <th className={cx('table-head-item')}>Công ty</th>}
                                </tr>
                            </thead>
                            <tbody className={cx('table-body')}>
                                {business && !filterBusiness.loading ? (
                                    business.business?.length > 0 ? (
                                        business.business.map((item) => (
                                            <tr key={item.id} className={cx('table-body-row')}>
                                                <td className={cx('table-body-item')}>
                                                    <div className={cx('item-avatar')}>
                                                        {/* <label className={cx('item-switch')}>
                                                            <input
                                                                type="checkbox"
                                                                className={cx('switch-input')}
                                                                value={item.status === 'open'}
                                                                checked={item.status === 'open'}
                                                                onChange={() => requestSetStatusCampaign(item.id, item.status === 'open' ? 'close' : 'open')}
                                                            />
                                                            <span className={cx('switch-slider')}></span>
                                                        </label> */}
                                                        <div className={cx('item-content')}>
                                                            <div className={cx('item-content-image')}>
                                                                <img src={item.avatar || images.avatar_default} alt={item.full_name} className={cx('avatar')} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={cx('table-body-item')}>
                                                    <div className={cx('item-name')}>
                                                        <span className={cx('full_name')}>
                                                            <a href={path.DASHBOARD_SUGGESTION} className={cx('full-name-link')}>
                                                                {item.full_name}
                                                            </a>
                                                        </span>
                                                        {filterBusiness.filter_by === 1 && (
                                                            <div>
                                                                <div className={cx('id')}>Đã tham gia: {convertTimeAgo(item.created_at)}</div>
                                                                <div className={cx('id')}>Cập nhật lần cuối: {convertTimeAgo(item.updated_at)}</div>
                                                                <p className={cx('status', { active: item.is_verified })}>
                                                                    {item.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                                                                </p>
                                                                <p className={cx('status', { active: item.is_active })}>
                                                                    {item.is_active ? 'Hoạt động' : 'Tạm khóa'}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className={cx('table-body-item')}>
                                                    <div className={cx('table-body-item-info')}>
                                                        <div className={cx('info-business')}>
                                                            <div className={cx('business-position')}>
                                                                <span className={cx('id')}>
                                                                    ID: {item.id} - {item.role}
                                                                </span>
                                                                <TippyText content={item.email}>
                                                                    <div className={cx('item-content-info')}>
                                                                        <CgMail className={cx('icon')} />
                                                                        <span className={cx('item-content-title')}>{item.email}</span>
                                                                    </div>
                                                                </TippyText>
                                                                <TippyText content={item.email}>
                                                                    <div className={cx('item-content-info')}>
                                                                        <FiPhone className={cx('icon')} />
                                                                        <span className={cx('item-content-title')}>{item.phone_number}</span>
                                                                    </div>
                                                                </TippyText>
                                                                <TippyText content={item.email}>
                                                                    <div className={cx('item-content-info')}>
                                                                        <MdOutlineManageAccounts className={cx('icon')} />
                                                                        <span className={cx('item-content-title')}>{item.work_position}</span>
                                                                    </div>
                                                                </TippyText>
                                                            </div>
                                                            <div className={cx('item-content-absolute', 'info-business-action')}>
                                                                <FaPen className={cx('icon-edit')} />
                                                                <a
                                                                    href={`${path.DASHBOARD_POST_JOB_EDIT}/${item?.id}/edit`}
                                                                    className={cx('item-content-link')}
                                                                >
                                                                    Chỉnh sửa
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {filterBusiness.filter_by === 2 && (
                                                    <td className={cx('table-body-item')}>
                                                        <div className={cx('table-body-item-company')}>
                                                            <div className={cx('company-apply')}>
                                                                <TippyText content={item?.company?.name}>
                                                                    <div className={cx('item-content-title')}> {item?.company?.name.toUpperCase()}</div>
                                                                </TippyText>
                                                                <TippyText content={item?.company?.email}>
                                                                    <div className={cx('item-content-info')}>
                                                                        <CgMail className={cx('icon')} />
                                                                        <div className={cx('item-content-des')}>{item?.company?.email}</div>
                                                                    </div>
                                                                </TippyText>
                                                                <TippyText content={item?.company?.address}>
                                                                    <div className={cx('item-content-info')}>
                                                                        <GrLocation className={cx('icon')} />
                                                                        <div className={cx('item-content-des')}>{item?.company?.address}</div>
                                                                    </div>
                                                                </TippyText>
                                                                <p className={cx('company-apply-number', { active: item?.is_verified })}>
                                                                    {item.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                                                                </p>
                                                                <div className={cx('company-apply-view')}>
                                                                    <a href={path.DASHBOARD_SEARCH} className={cx('company-apply-view-link')}>
                                                                        <FaEye className={cx('company-apply-view-icon')} />
                                                                        Xem chi tiết
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}
                                                {/* <td className={cx('table-body-item')}>
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
                                                </td> */}
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
                                                <SkeletonManagerUsercomponent />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {business && business.business?.length > 0 && (
                        <div className={cx('footer')}>
                            <div className={cx('content-footer')}>
                                <span
                                    className={cx('btn', filterBusiness.page === 1 ? 'deactive' : '')}
                                    onClick={handlePrevPage}
                                    disabled={filterBusiness.page === 1}
                                >
                                    <HiOutlineChevronDoubleLeft className={cx('icon')} />
                                </span>
                                <p className={cx('text-page')}>
                                    Trang <span className={cx('number')}>{filterBusiness.page}</span>
                                </p>
                                <span
                                    className={cx('btn', !filterBusiness.canLoadMore ? 'deactive' : '')}
                                    onClick={handleNextPage}
                                    disabled={!filterBusiness.canLoadMore}
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

export default DashboardManagerBusinessPage;
