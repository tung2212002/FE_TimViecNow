import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';

import { FaChevronRight } from 'react-icons/fa6';

import styles from './JobSearchDetailPage.module.scss';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import {
    JobDetailBody,
    JobDetailHeader,
    JobHeader,
    CompanySummary,
    JobCategory,
    JobReport,
    JobSuitable,
    TabCompany,
    JobSummary,
} from '../../layouts/components/User/JobDetailPage';
import { SEO } from '../../layouts/components/User';

const cx = classNames.bind(styles);

const JobSearchDetailPage = () => {
    const job = {
        company: {
            id: 120393,
            location: 'tòa nhà HPC Land Mark 105, Khu đô thị Văn Khê, Hà Đông, Hà Nội',
            scale: '100-499',
            name: 'C\u00d4NG TY TNHH DONG HUI',
            logo_url: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/cong-ty-tnhh-dong-hui-632d27959899e.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-tnhh-dong-hui/120393.html',
        },
        id: 882630,
        title: 'K\u1ebf To\u00e1n N\u1ed9i B\u1ed9',
        company_short_description: '',
        cities: "<p style='text-align: left'>H\u00e0 N\u1ed9i: C\u1ea7u Gi\u1ea5y</p>",
        short_cities: 'H\u00e0 N\u1ed9i',
        salary: 'Tr\u00ean 11 tri\u1ec7u',
        updated_at_str: '1 gi\u1edd tr\u01b0\u1edbc',
        is_featured: true,
        url: 'https://www.topcv.vn/viec-lam/ke-toan-noi-bo/882630.html?ta_source=BoxFeatureJob_LinkDetail',
        is_highlight: false,
        is_urgent: false,
        is_new: false,
        is_paid_featured: true,
        is_hot: false,
        is_bg_featured: true,
        is_remote: false,
        deadline: '16/04/2024',
        is_vip_employer: false,
        remain_deadline_by_day: 29,
        remain_deadline_by_hour: 704,
        number_of_vacancy: 1,
        is_diamond_employer: false,
        is_job_flash: true,
        employer_verified: false,
        apply_url: false,
        working_times: ['Th\u1ee9 2 - Th\u1ee9 6 (t\u1eeb 08:00 \u0111\u1ebfn 17:00)', 'Th\u1ee9 7 (t\u1eeb 08:00 \u0111\u1ebfn 12:00)'],
        job_description:
            '<p>- L\u1eadp b\u00e1o c\u00e1o thu\u1ebf GTGT, TNCN \u0111\u1ecbnh k\u1ef3 h\u00e0ng qu\u00fd.\n</p><p>- Theo d\u00f5i, \u0111\u1ed1i chi\u1ebfu s\u1ed1 li\u1ec7u chi ti\u1ebft v\u1edbi s\u1ed5 t\u1ed5ng h\u1ee3p.\n</p><p>- Theo d\u00f5i c\u00f4ng n\u1ee3 ph\u1ea3i thu ph\u1ea3i tr\u1ea3.\n</p><p>- Xu\u1ea5t h\u00f3a \u0111\u01a1n theo d\u00f5i doanh thu b\u00e1n h\u00e0ng.\n</p><p>- C\u00e1c c\u00f4ng vi\u1ec7c kh\u00e1c theo s\u1ef1 s\u1eafp x\u1ebfp c\u1ee7a K\u1ebf to\u00e1n tr\u01b0\u1edfng.</p>',
        job_requirement:
            '<p>- T\u1ed1t nghi\u1ec7p \u0110\u1ea1i h\u1ecdc, Cao \u0111\u1eb3ng chuy\u00ean ng\u00e0nh li\u00ean quan\n</p><p>- Hi\u1ec3u bi\u1ebft v\u1ec1 nh\u1eadp kh\u1ea9u v\u00e0 thanh to\u00e1n qu\u1ed1c t\u1ebf, bi\u1ebft l\u00e0m b\u00e1o c\u00e1o t\u00e0i ch\u00ednh l\u00e0 l\u1ee3i th\u1ebf</p><p>- Ch\u1ee7 \u0111\u1ed9ng, t\u00edch c\u1ef1c, nhanh nh\u1eb9n</p>',
        job_benefit:
            '<div><b>- M\u1ee9c l\u01b0\u01a1ng t\u1eeb 11 tri\u1ec7u tr\u1edf l\u00ean + c\u00e1c kho\u1ea3n ph\u1ee5 c\u1ea5p, th\u1ecfa thu\u1eadn theo n\u0103ng l\u1ef1c v\u00e0 kinh nghi\u1ec7m.</b></div><div><b><br /></b>- Tham gia BHXH, th\u01b0\u1edfng l\u1ec5 t\u1ebft, sinh nh\u1eadt, hi\u1ebfu h\u1ec9, l\u01b0\u01a1ng th\u00e1ng 13 c\u1ed1 \u0111\u1ecbnh.</div><div><br /></div><div>- Th\u1eddi gian l\u00e0m vi\u1ec7c: theo gi\u1edd h\u00e0nh ch\u00ednh t\u1eeb th\u1ee9 2 t\u1edbi s\u00e1ng th\u1ee9 7.</div><div><br /></div><div>- Tham gia teambuilding, du l\u1ecbch h\u00e0ng n\u0103m c\u00f9ng c\u00f4ng ty</div><div><br /></div><div>- M\u00f4i tr\u01b0\u1eddng l\u00e0m vi\u1ec7c th\u00e2n thi\u1ec7n, \u1ed5n \u0111\u1ecbnh v\u00e0 h\u1ed7 tr\u1ee3 nhau</div>',
        job_exp: '1 n\u0103m',
        address:
            '<div style="margin-bottom: 10px">- H\u00e0 N\u1ed9i:  L\u00f4 th\u01b0\u01a1ng m\u1ea1i s\u1ed1 01 t\u1ea7ng 03 T\u00f2a nh\u00e0 Luxury Park Views, D32 khu \u0111\u00f4 th\u1ecb m\u1edbi C\u1ea7u Gi\u1ea5y, Ph\u01b0\u1eddng Y\u00ean Ho\u00e0, C\u1ea7u Gi\u1ea5y  </div>',
        urlTooltip: 'https://www.topcv.vn/viec-lam/ke-toan-noi-bo/882630.html?ta_source=BoxFeatureJob_QuickView',
        url_tooltip_apply: 'https://www.topcv.vn/viec-lam/ke-toan-noi-bo/882630.html?ta_source=BoxFeatureJob_ButtonApplyFromQuickView',
        is_applied: false,
        job_category: [
            {
                id: 1,
                name: 'K\u1ebf to\u00e1n',
                icon_url: 'https://cdn-new.topcv.vn/unsafe/30x30/https://static.topcv.vn/assets/images/icons/ic-accountant.svg',
            },
            {
                id: 2,
                name: 'K\u1ebf to\u00e1n n\u1ed9i b\u1ed9',
                icon_url: 'https://cdn-new.topcv.vn/unsafe/30x30/https://static.topcv.vn/assets/images/icons/ic-accountant.svg',
            },
        ],
        employment_type: 'full_time',
        gender: 'male',
        status: 'pending',
        location: [
            {
                id: 1,
                name: 'Hà Nội',
            },
            {
                id: 2,
                name: 'Hồ Chí Minh',
            },
        ],
        required_skills: [
            {
                id: 1,
                name: 'K\u1ebf to\u00e1n',
            },
            {
                id: 2,
                name: 'K\u1ebf to\u00e1n n\u1ed9i b\u1ed9',
            },
        ],
        related_skills: [
            {
                id: 1,
                name: 'K\u1ebf to\u00e1n',
            },
            {
                id: 2,
                name: 'K\u1ebf to\u00e1n n\u1ed9i b\u1ed9',
            },
        ],
    };

    const [state, setState] = useState('info');

    const handleScrollToTopBody = () => {
        const detailBody = document.getElementById('job-search-detail-body');
        detailBody.scrollIntoView({ behavior: 'smooth' });
    };

    const handleToInfo = () => {
        setState('info');
        handleScrollToTopBody();
    };

    const handleToCompany = () => {
        setState('company');
        handleScrollToTopBody();
    };

    const handleToRelated = () => {
        setState('related');
        handleScrollToTopBody();
    };

    useDocumentTitle('TVNow - Tìm kiếm việc làm ngay');

    return (
        <div className={cx('wrapper')}>
            <JobDetailHeader />
            <div className={cx('container')}>
                <div className={cx('job-path')}>
                    <Link to="/">
                        <span className={cx('job-path-item')}>Trang chủ</span>
                    </Link>
                    <FaChevronRight className={cx('job-path-icon')} />
                    <Link to="/job-search">
                        <span className={cx('job-path-item')}>Tìm kiếm việc làm</span>
                    </Link>
                    <FaChevronRight className={cx('job-path-icon')} />
                    <span className={cx('job-path-name')}>{job.title}</span>
                </div>
                <div className={cx('job-detail')}>
                    <div className={cx('job-detail-body')}>
                        <div className={cx('job-detail-left')}>
                            <JobHeader job={job} />
                            <TabCompany handleToInfo={handleToInfo} handleToCompany={handleToCompany} handleToRelated={handleToRelated} state={state} />
                            <JobDetailBody job={job} state={state} />
                        </div>
                        <div className={cx('job-detail-right')}>
                            <CompanySummary company={job.company} />
                            <JobSummary job={job} />
                            <JobCategory job={job} />
                            <JobSuitable job={job} />
                            <JobReport />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('seo')}>
                <SEO />
            </div>
        </div>
    );
};

export default JobSearchDetailPage;
