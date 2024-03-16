import classNames from 'classnames/bind';

import styles from './JobSearchDetailHeaderComponent.module.scss';
import { SearchSalaryComponent, SearchExpComponent, SearchJobSearchHeaderComponent } from '../common';

const cx = classNames.bind(styles);

const JobSearchDetailHeaderComponent = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-search')}>
                    <SearchJobSearchHeaderComponent paddingContainer="4px 8px 4px 12px" searchHeight="32px" />
                    <div className={cx('group-box')}>
                        <SearchExpComponent padding="12px 19px 12px 2px" />
                        <SearchSalaryComponent padding="12px 19px 12px 2px" />
                    </div>
                    <div className={cx('box-filter')}>
                        <button className={cx('btn-filter')}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSearchDetailHeaderComponent;
