import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { HiTrendingUp, HiCheck } from 'react-icons/hi';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { TbChevronsDown } from 'react-icons/tb';

import styles from './HomeHeader.module.scss';
import { icons, images } from '@assets';
import SearchSection from './SearchSection/SearchSection';
import ChartJob from './ChartJob/ChartJob';
import { SelectionComponent } from '@components/common';
import { getJobCruitmentDemandService } from '@services/user/jobService';

const cx = classNames.bind(styles);

const HomeHeader = ({ handleScrollToDashBoard }) => {
    const date = new Date();
    const [jobDemand, setJobDemand] = useState({});

    const listSubTitle = [
        'Định hướng nghề nghiệp ',
        'Việc làm mới ',
        'Công ty phù hợp ',
        'Phúc lợi tốt ',
        'Mức lương cao ',
        'Thông tin thị trường ',
        'CV mới ',
    ];
    const listBoxJob = [
        {
            id: 1,
            name: 'Ngành nghề',
        },
        {
            id: 2,
            name: 'Mức lương',
        },
    ];
    const [selectJob, setSelectJob] = useState(1);
    const [subTitle, setSubTitle] = useState(0);

    const handleSetJob = (id) => {
        setSelectJob(id);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (subTitle < listSubTitle.length - 1) {
                setSubTitle(subTitle + 1);
            } else {
                setSubTitle(0);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [subTitle]);

    useEffect(() => {
        getJobCruitmentDemandService()
            .then((res) => {
                setJobDemand(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.background_header})` }}>
            <div className={cx('container')}>
                <div className={cx('list-column')}>
                    <div className={cx('col')}>
                        <h4 className={cx('title-1')}>Công nghệ AI dự đoán, cá nhân hoá việc làm</h4>
                        <h2 className={cx('title-2')}>
                            {listSubTitle.map((text, index) => (
                                <span key={index} className={cx('text', { active: index === subTitle, hidden: index !== subTitle })}>
                                    {text}
                                </span>
                            ))}
                            <span>&nbsp;</span>dành cho bạn.
                        </h2>

                        <SearchSection />
                        <button className={cx('show-video')}>
                            <img src={images.banner} alt="banner" className={cx('img')} />
                        </button>
                    </div>
                    <div className={cx('col')}>
                        <div className={cx('box-demand-job')}>
                            <div className={cx('job-market')}>
                                <div className={cx('job-market__header')}>
                                    <span className={cx('title')}>
                                        <img src={icons.job_market} alt="job_market" className={cx('icon')} /> Thị trường việc làm hôm nay:
                                    </span>
                                    <span className={cx('datetime')}>
                                        {date.toLocaleDateString('vi-VN', {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className={cx('job-market__content')}>
                                    <div className={cx('job-hiring')}>
                                        <span className={cx('title')}>Việc làm đang tuyển</span>
                                        <span className={cx('quantity')}>{jobDemand?.number_of_job_active}</span>
                                        <HiTrendingUp className={cx('icon')} />
                                    </div>
                                    <div className={cx('job-hiring')}>
                                        <span className={cx('title')}>Việc làm mới hôm nay</span>
                                        <span className={cx('quantity')}>{jobDemand?.number_of_job_24h}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('header')}>
                                <span className={cx('header__title')}>
                                    <img src={icons.trend_chart} alt="trend_chart" className={cx('icon')} />
                                    <span className={cx('title')}>Nhu cầu tuyển dụng theo</span>
                                </span>
                                <div className={cx('box-select')}>
                                    <SelectionComponent
                                        header={() => (
                                            <span className={cx('selected')}>
                                                <span className={cx('text')}>{listBoxJob.find((item) => item.id === selectJob).name}</span>
                                            </span>
                                        )}
                                        body={() => (
                                            <ul className={cx('ul-select')}>
                                                {listBoxJob.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className={cx('item', { active: item.id === selectJob })}
                                                        onClick={() => handleSetJob(item.id)}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>

                                                        {item.id === selectJob && <HiCheck className={cx('icon')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        icon={() => <HiOutlineChevronDown className={cx('icon-chevron')} />}
                                        itemSelect={selectJob}
                                        maxHeight={'200px'}
                                    />
                                </div>
                            </div>
                            <div className={cx('box-chart')}>
                                <ChartJob stateId={selectJob} />
                                <div className={cx('more-info')} onClick={handleScrollToDashBoard}>
                                    <span className={cx('text')}>Xem thêm</span>
                                    <TbChevronsDown className={cx('icon')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HomeHeader.propTypes = {
    handleScrollToDashBoard: PropTypes.func,
};

export default HomeHeader;
