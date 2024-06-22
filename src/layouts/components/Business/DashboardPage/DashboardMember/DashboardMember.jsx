import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { RxEnvelopeClosed } from 'react-icons/rx';
import { LuPhone } from 'react-icons/lu';
import { FaChevronRight } from 'react-icons/fa6';

import styles from './DashboardMember.module.scss';
import { icons, images } from '@assets';
import { selectBusiness } from '@redux/features/authBusiness/authSlide';
import path from '@constants/path';

const cx = classNames.bind(styles);

const DashboardMember = () => {
    const employer = useSelector(selectBusiness);

    const listProgress = [
        {
            id: 1,
            ranking: 'Member',
            point: 0,
        },
        {
            id: 2,
            ranking: 'Silver',
            point: 300,
        },
        {
            id: 3,
            ranking: 'Gold',
            point: 800,
        },
        {
            id: 4,
            ranking: 'Platinum',
            point: 1500,
        },
        {
            id: 5,
            ranking: 'Diamond',
            point: 2500,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-info')}>
                    <div className={cx('header-info')}>
                        <div className={cx('info')}>
                            <div className={cx('avatar-info')}>
                                <div className={cx('avatar')}>
                                    <img src={employer?.avatar ? employer.avatar : images.avatar_default} alt="avatar" className={cx('avatar-img')} />
                                </div>
                            </div>
                            <div className={cx('employer-info')}>
                                <div className={cx('employer-name')}>{employer?.full_name}</div>
                                <div className={cx('employer-id')}>Mã NTD: {employer?.id}</div>
                                <div className={cx('employer-contact')}>
                                    <div className={cx('employer-contact-item')}>
                                        <RxEnvelopeClosed className={cx('icon')} />
                                        <span className={cx('text')}>{employer?.email}</span>
                                    </div>

                                    <div className={cx('employer-contact-item')}>
                                        <LuPhone className={cx('icon')} />
                                        <span className={cx('text')}>{employer?.phone_number}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('member')}>
                                <div className={cx('member-item')}>
                                    <a href={path.HOMEPAGE} className={cx('member-link')}>
                                        <img src={images.member} alt="member" className={cx('member-img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('header-subtract')}>
                        <img src={images.subtract.default} alt="subtract" className={cx('subtract')} />
                    </div>
                </div>
                <div className={cx('box-rank')}>
                    <div className={cx('box-content')}>
                        <div className={cx('employer-progress')}>
                            <div className={cx('progress')}>
                                <div className={cx('custom-progress')}></div>
                                <div className={cx('progress-point')}>
                                    <div className={cx('point')}>
                                        <img src={icons.icon_point.default} alt="point" className={cx('point-img')} />
                                    </div>
                                </div>
                                <div className={cx('progress-text')}>
                                    <div className={cx('progress-list')}>
                                        {listProgress.map((item) => (
                                            <div className={cx('progress-item')} key={item.id} style={{ width: `${(item.id - 1) * 20}%` }}>
                                                <div className={cx('progress-item-ranking')}>{item.ranking}</div>
                                                <div className={cx('progress-item-point')}>{item.point}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('progress-more')}>
                                <div className={cx('progress-more-info')}>
                                    <div className={cx('progress-benefit')}>
                                        <div className={cx('now-point')}>
                                            <div className={cx('now-point-label')}>Điểm xét hạng</div>
                                            <div className={cx('now-point-value')}>
                                                <span>0</span>
                                                <img src={icons.icon_top_point} alt="now-point" className={cx('now-point-img')} />
                                            </div>
                                        </div>
                                        <a className={cx('go-benefit')} href={path.HOMEPAGE}>
                                            <span className={cx('go-benefit-text')}>Ưu đãi của tôi</span>
                                            <FaChevronRight className={cx('go-benefit-icon')} />
                                        </a>
                                    </div>
                                    <div className={cx('progress-encourage')}>
                                        <div className={cx('auth-verify')}>
                                            <div className={cx('warning')}>
                                                <div className={cx('warning-text')}>
                                                    Bạn cần đạt tối thiểu cấp độ xác thực 3 để thực hiện xét hạng khách hàng và sử dụng các quyền lợi tương ứng.
                                                </div>
                                                <div className={cx('warning-more')}>
                                                    <a href={path.HOMEPAGE} className={cx('warning-link')}>
                                                        Tìm hiểu thêm
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={cx('verify-now')}>Xác thực ngay</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('employer-detail')}>
                            <div className={cx('employer-detail-content')}>
                                <div className={cx('employer-detail-item')}>
                                    <div className={cx('employer-detail-item-label')}>Số lượng Now Point (NP)</div>
                                    <div className={cx('employer-detail-item-value')}>
                                        <div className={cx('ranking-point')}>
                                            <span className={cx('ranking-point-label')}>Xét hạng: </span>
                                            <span className={cx('ranking-point-value')}>0 NP</span>
                                        </div>
                                        <div className={cx('ranking-point')}>
                                            <span className={cx('ranking-point-label')}>Đổi quà: </span>
                                            <span className={cx('ranking-point-value')}>0 NP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('employer-detail-item')}>
                                    <div className={cx('employer-detail-item-label')}>Số lượng Credit (CP)</div>
                                    <div className={cx('employer-detail-item-value')}>
                                        <div className={cx('ranking-point')}>
                                            <span className={cx('ranking-point-label')}>Chính: </span>
                                            <span className={cx('ranking-point-value')}>0 NP</span>
                                        </div>
                                        <div className={cx('ranking-point')}>
                                            <span className={cx('ranking-point-label')}>Khuyến mãi: </span>
                                            <span className={cx('ranking-point-value')}>0 NP</span>
                                        </div>
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

export default DashboardMember;
