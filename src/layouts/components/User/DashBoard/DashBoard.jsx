import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';
import TippyText from '@tippyjs/react';
import styles from './DashBoard.module.scss';

import { HiCheck, HiOutlineChevronDown, HiTrendingUp } from 'react-icons/hi';

import { images } from '../../../../assets';
import { fakeJob } from '../../../../assets/fakejob';
import ChartJobOpportunity from './ChartJobOpportunity/ChartJobOpportunity';
import ChartJobDemand from './ChartJobDemand/ChartJobDemand';
import { SelectionComponent } from '../../../../components/common';

const cx = classNames.bind(styles);

const DashBoard = (props, ref) => {
    const fakeData = {
        quantity_job_recruitment: 40396,
        quantity_job_recruitment_yesterday: 38069,
        quantity_job_new_today: 5277,
        quantity_company_recruitment: 13043,
        time_scan: '20:35 05/03/2024',
    };
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
    const [newestJob, setNewestJob] = useState(fakeJob.slice(0, 3));
    const handleToLocaleString = (number) => {
        return number.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
    };

    const handleSetJob = (id) => {
        setSelectJob(id);
    };

    return (
        <div className={cx('wrapper')} ref={ref}>
            <div className={cx('container')}>
                <div className={cx('dashboard-section')}>
                    <div className={cx('dashboard-section__header')}>
                        <p className={cx('title')}>
                            Thị trường việc làm hôm nay
                            <span className={cx('date')}> 22/01/2024</span>
                        </p>
                    </div>
                    <div className={cx('dashboard-section__content')}>
                        <div className={cx('newest-job')}>
                            <img src={images.dashboard_item} alt="dashboard-item" className={cx('newest-job__img')} />
                            <div className={cx('newest-job__content')}>
                                <p className={cx('newest-job__title')}>Việc làm mới nhất</p>
                                <div className={cx('newest-job__slide')}>
                                    {newestJob.slice(0, 3).map((job, index) => (
                                        <div key={index} className={cx('newest-job__item', 'active')}>
                                            <a href={job.company.url} className={cx('logo')} target="_blank" rel="noreferrer">
                                                <img src={job.company.logo_url} alt="company-logo" className={cx('company-logo')} />
                                            </a>
                                            <div className={cx('content')}>
                                                <TippyText content={job.title} placement="top">
                                                    <a className={cx('title-link')} href={job.url} target="_blank" rel="noreferrer">
                                                        <p className={cx('title')}>{job.title}</p>
                                                    </a>
                                                </TippyText>
                                                <TippyText content={job.company.name} placement="top">
                                                    <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('company-link')}>
                                                        <p className={cx('company')}>{job.company.name}</p>
                                                    </a>
                                                </TippyText>
                                                <TippyText content={job.short_cities} placement="top">
                                                    <p className={cx('location')}>{job.short_cities}</p>
                                                </TippyText>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('statistic-job')}>
                            <div className={cx('work-market')}>
                                <div className={cx('work-item')}>
                                    <p className={cx('quantity')}>{handleToLocaleString(fakeData.quantity_job_new_today)}</p>
                                    <p className={cx('title')}>Việc làm mới 24h gần nhất</p>
                                </div>
                                <div className={cx('work-item')}>
                                    <p className={cx('quantity')}>{handleToLocaleString(fakeData.quantity_job_recruitment)}</p>
                                    <p className={cx('title')}>Việc làm đang tuyển</p>
                                </div>
                                <div className={cx('work-item')}>
                                    <p className={cx('quantity')}>{handleToLocaleString(fakeData.quantity_company_recruitment)}</p>
                                    <p className={cx('title')}>Công ty đang tuyển</p>
                                </div>
                            </div>
                            <div className={cx('trend-chart')}>
                                <div className={cx('item-chart')}>
                                    <div className={cx('header')}>
                                        <div className={cx('title')}>
                                            <HiTrendingUp className={cx('trend-icon')} />
                                            <span className={cx('text')}>Trend thị trường việc làm</span>
                                        </div>
                                    </div>
                                    <div className={cx('chart')}>
                                        <div className={cx('chart-item')}>
                                            <ChartJobOpportunity />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('item-chart')}>
                                    <div className={cx('header')}>
                                        <div className={cx('title')}>
                                            <HiTrendingUp className={cx('trend-icon')} />
                                            <span className={cx('text')}>Nhu cầu tuyển dụng theo</span>
                                        </div>
                                        <div className={cx('box-select')}>
                                            <SelectionComponent
                                                header={() => (
                                                    <span className={cx('selected')}>
                                                        <span className={cx('selected-text')}>{listBoxJob.find((item) => item.id === selectJob).name}</span>
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
                                                styleDropdown={{ width: '146px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('chart')}>
                                        <div className={cx('chart-item')}>
                                            <ChartJobDemand stateId={selectJob} />
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

export default forwardRef(DashBoard);
