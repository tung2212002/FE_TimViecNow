import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLock } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

import styles from './JobDetailBody.module.scss';
import { images } from '../../../../../assets';
import JobSuggest from './JobSuggest/JobSuggest';
import HeaderDynamic from '../HeaderDynamic/HeaderDynamic';
import JobSummary from './JobSummary/JobSummary';
import JobCategory from '../JobCategory/JobCategory';
import JobSuitable from '../JobSuitable/JobSuitable';
import CompanySummary from '../CompanySummary/CompanySummary';
import JobReport from '../JobReport/JobReport';
import SuggestCourseSlide from './SuggestCourseSlide/SuggestCourseSlide';
import { showModal } from '../../../../../redux/features/modal/modalSlice';
import { Modal } from '../../../../../components/common';
import { ModalApplyComponent } from '../../../../../components';
import { searchJobService } from '../../../../../services/jobService';

const cx = classNames.bind(styles);

const JobDetailBody = ({ job, state }) => {
    const displayLocation = {};
    const dispatch = useDispatch();
    const [stateTab, setStateTab] = useState('detail');
    const [suggest, setSuggest] = useState({
        job: null,
        loading: true,
    });

    const listDescription = [
        {
            id: 1,
            title: 'Mô tả công việc',
            content: job.job_description,
        },
        {
            id: 2,
            title: 'Yêu cầu ứng viên',
            content: job.job_requirement,
        },
        {
            id: 3,
            title: 'Quyền lợi',
            content: job.job_benefit,
        },
    ];

    const stateTrend = {
        percent: 8,
        status: 'down',
    };

    const showApply = () => {
        dispatch(showModal());
    };

    useEffect(() => {
        if (job && job.categories?.length > 0) {
            const params = {
                skip: 0,
                limit: 20,
                category_id: job.categories[0].id,
            };

            searchJobService(params)
                .then((res) => {
                    if (res.status === 200) {
                        setSuggest((prev) => ({
                            ...prev,
                            job: res.data.data.jobs,
                            loading: false,
                        }));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [job]);

    return (
        <div className={cx('wrapper')} id="job-search-detail-body">
            <Modal>
                <ModalApplyComponent job={job} />
            </Modal>
            <HeaderDynamic job={job} state={stateTab} />
            <div className={cx('container')}>
                <div className={cx('tab', state !== 'company' ? 'off' : '')}>
                    <CompanySummary company={job.company} />
                </div>
                <div className={cx('title', state !== 'info' ? 'off' : '')}>Chi tiết tuyển dụng</div>
                <div className={cx('info', state !== 'info' ? 'off' : '')}>
                    <JobSummary job={job} />
                </div>
                <div className={cx('content', state !== 'info' ? 'off' : '')}>
                    <div className={cx('description')}>
                        {listDescription.map((item) => (
                            <div className={cx('description-item')} key={item.id}>
                                <h3 className={cx('title-item')}>{item.title}</h3>
                                <div className={cx('content-item')} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                            </div>
                        ))}
                        <div className={cx('description-item')}>
                            <h3 className={cx('title-item')}>Địa điểm làm việc</h3>
                            <div className={cx('content-item')}>
                                {job?.locations?.map((location, index) => {
                                    const shouldHide = displayLocation[location.province.name] && !location.description;
                                    displayLocation[location.province.name] = true;

                                    return (
                                        !shouldHide && (
                                            <p key={index}>
                                                - {location.province.name} {location.description && ` : ${location.description}`}{' '}
                                                {location.district && ` - ${location.district.name}`}
                                            </p>
                                        )
                                    );
                                })}
                            </div>
                        </div>

                        <div className={cx('description-item')}>
                            <h3 className={cx('title-item')}>Thời gian làm việc</h3>
                            <div className={cx('content-item')}>
                                {job.working_times.map((time, index) => (
                                    <p key={index}>
                                        - Thứ {time.date_from + 1} - Thứ {time.date_to + 1} (từ {time.start_time?.slice(0, 5)} - {time.end_time?.slice(0, 5)})
                                    </p>
                                ))}
                            </div>
                            {job.working_time_text && job.working_time_text !== '""' && (
                                <div className={cx('content-item')} dangerouslySetInnerHTML={{ __html: job.working_time_text }}></div>
                            )}
                        </div>

                        <div className={cx('description-item')}>
                            <h3 className={cx('title-item')}>Cách thức ứng tuyển</h3>
                            <div className={cx('content-item')}>
                                Ứng viên nộp hồ sơ trực tuyến bằng cách bấm
                                <strong> Ứng tuyển </strong>
                                ngay dưới đây.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('action', state !== 'info' ? 'off' : '')}>
                    <div className={cx('action-item', 'apply')}>
                        <button className={cx('action-button')} onClick={showApply}>
                            Ứng tuyển ngay
                        </button>
                        <button className={cx('action-button')}>Lưu tin</button>
                    </div>
                    <div className={cx('action-item', 'applied', 'hidden')}>
                        <button className={cx('action-button')} onClick={showApply}>
                            Ứng tuyển ngay
                        </button>
                        <button className={cx('action-button')}>Lưu tin</button>
                    </div>
                    <div className={cx('deadline')}>Hạn nộp hồ sơ: {job.deadline}</div>
                    <div className={cx('quantity', 'disabled')}>
                        <div className={cx('quantity-icon')}>
                            <FaLock className={cx('icon-lock')} />
                        </div>
                        <div className={cx('text')}>TVNow chưa hỗ trợ xem số lượt ứng tuyển cho việc làm này</div>
                    </div>
                </div>
                <div className={cx('report', state !== 'info' ? 'off' : '')}>
                    <span className={cx('report-icon')}>
                        <FaCircleInfo className={cx('icon-info')} />
                    </span>
                    <span className={cx('report-text')}>
                        Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo,{' '}
                        <button className={cx('report-button')}>hãy phản ánh với chúng tôi.</button>
                    </span>
                </div>
                <div className={cx('update-info', state !== 'info' ? 'off' : '')}>
                    <img src={images.cv} alt="cv" className={cx('img-cv')} />
                    <div className={cx('update-content')}>
                        <p className={cx('update-title')}>
                            Số lượng NTD tìm kiếm những ứng viên như bạn đã
                            {stateTrend.status === 'up' ? ' tăng lên' : ' giảm đi'} khoảng <span className={cx('highlight')}> {stateTrend.percent}%</span> trong
                            1 tuần gần đây.
                        </p>
                    </div>
                    <div className={cx('chart')}>
                        <div className={cx('chart-percent')}>
                            {stateTrend.status === 'up' ? <HiArrowTrendingUp className={cx('icon-up')} /> : <HiArrowTrendingDown className={cx('icon-down')} />}
                            <span className={cx('percent')}>{stateTrend.percent}%</span>
                        </div>
                        <img src={images.chart} alt="chart" className={cx('img-chart', { down: stateTrend.status === 'down' })} />
                    </div>
                </div>
                <div className={cx('job-category', state !== 'info' ? 'off' : '')}>
                    <JobCategory job={job} />
                </div>
                <div className={cx('job-suitable', state !== 'info' ? 'off' : '')}>
                    <JobSuitable job={job} />
                </div>
                <div className={cx('job-report', state !== 'info' ? 'off' : '')}>
                    <JobReport />
                </div>
                <div className={cx('job-similar', state !== 'related' ? 'off' : '')} id="job-search-detail-similar">
                    <h2 className={cx('job-similar-title')}>Việc làm liên quan</h2>
                    <div className={cx('job-similar-list')}>{suggest && suggest.job?.slice(0, 20).map((job) => <JobSuggest job={job} key={job.id} />)}</div>
                </div>
                <div className={cx('job-course')} id="job-search-detail-course">
                    <SuggestCourseSlide />
                </div>
            </div>
        </div>
    );
};

JobDetailBody.propTypes = {
    job: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
};

export default JobDetailBody;
