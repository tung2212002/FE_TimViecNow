import classNames from 'classnames/bind';

import { FaCircleQuestion } from 'react-icons/fa6';

import styles from './JobSearchDetailReportComponent.module.scss';
import JobDetailReportSlideComponent from './JobDetailReportSlideComponent/JobDetailReportSlideComponent';

const cx = classNames.bind(styles);

const JobSearchDetailReportComponent = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>
                    <FaCircleQuestion className={cx('icon')} />
                    Bí kíp Tìm việc an toàn
                </h3>
                <p className={cx('description')}>Dưới đây là những dấu hiệu của các tổ chức, cá nhân tuyển dụng không minh bạch:</p>
                <div className={cx('common-signal')}>
                    <h4 className={cx('common-signal-title')}>1. Yêu cầu nộp tiền cọc</h4>
                    <div className={cx('common-signal-slide')}>
                        <JobDetailReportSlideComponent />
                    </div>
                </div>
                <div className={cx('common-signal')}>
                    <h4 className={cx('common-signal-title')}>2. Cần làm gì khi gặp việc làm, công ty không minh bạch:</h4>
                    <div className={cx('common-signal-content')}>
                        <ul className={cx('ul')}>
                            <li className={cx('li')}>Kiểm tra thông tin về công ty, việc làm trước khi ứng tuyển</li>
                            <li className={cx('li')}>
                                Báo cáo tin tuyển dụng với TopCV thông qua nút{' '}
                                <strong>
                                    {'"'}Báo cáo tin tuyển dụng{'"'}
                                </strong>{' '}
                                để được hỗ trợ và giúp các ứng viên khác tránh được rủi ro
                            </li>
                            <li className={cx('li')}>
                                Hoặc liên hệ với TopCV thông qua kênh hỗ trợ ứng viên của TopCV:
                                <br />
                                Email: <a href="mailto:hotro@topcv.vn">hotro@topcv.vn</a>
                                <br />
                                Hotline: <a href="tel:02466805588">(024) 6680 5588</a>
                            </li>
                        </ul>
                    </div>
                    <button className={cx('common-signal-button')}>Báo cáo tin tuyển dụng</button>
                    <p className={cx('common-signal-note')}>
                        Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo{' '}
                        <a href="/" target="_blank" rel="noreferrer" className={cx('common-signal-link')}>
                            tại đây
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobSearchDetailReportComponent;
