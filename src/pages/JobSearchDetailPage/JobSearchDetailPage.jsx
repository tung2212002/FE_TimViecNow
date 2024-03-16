import classNames from 'classnames/bind';

import styles from './JobSearchDetailPage.module.scss';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import JobSearchDetailHeaderComponent from '../../components/JobSearchDetailHeaderComponent/JobSearchDetailHeaderComponent';

const cx = classNames.bind(styles);

const JobSearchDetailPage = () => {
    useDocumentTitle('TVNow - Tìm kiếm việc làm ngay');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <JobSearchDetailHeaderComponent />
            </div>
        </div>
    );
};

export default JobSearchDetailPage;
