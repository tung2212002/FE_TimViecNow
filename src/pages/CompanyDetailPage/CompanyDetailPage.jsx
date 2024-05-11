import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FaChevronRight } from 'react-icons/fa6';

import styles from './CompanyDetailPage.module.scss';
import { CompanyDescription, CompanyHeader, CompanyRecruitment, CompanyRelate, CompanyShare } from '../../layouts/components/User/CompanyDetailPage';
import CompanyLocation from '../../layouts/components/User/CompanyDetailPage/CompanyLocation/CompanyLocation';
import { getCompanyByIdSerivce } from '../../services/companyService';
import slugConvert from '../../utils/slugCovnert';
const cx = classNames.bind(styles);

const CompanyDetailPage = () => {
    const params = useParams();
    const usenavigate = useNavigate();
    const { id, slug } = params;

    const [company, setCompany] = useState(null);

    useEffect(() => {
        getCompanyByIdSerivce(id)
            .then((res) => {
                if (res.status === 200) {
                    if (slugConvert(res.data.data.name) !== slug) {
                        usenavigate('/');
                    }
                    setCompany(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            {company && (
                <div className={cx('container')}>
                    <div className={cx('company-path')}>
                        <Link to="/">
                            <span className={cx('company-path-item')}>Danh sách Công ty</span>
                        </Link>
                        <FaChevronRight className={cx('company-path-icon')} />
                        <span className={cx('company-path-name')}>Thông tin công ty & tin tuyển dụng từ {company.name}</span>
                    </div>
                    <div className={cx('company-header')}>
                        <CompanyHeader company={company} />
                    </div>
                    <div className={cx('company-body-main')}>
                        <div className={cx('company-description')}>
                            <CompanyDescription company={company} />
                        </div>
                        <div className={cx('company-recruitment')}>
                            <CompanyRecruitment company={company} />
                        </div>
                        <div className={cx('company-relate')}>
                            <CompanyRelate company={company} />
                        </div>
                    </div>
                    <div className={cx('company-body-sub')}>
                        <div className={cx('company-location')}>
                            <CompanyLocation company={company} />
                        </div>
                        <div className={cx('company-share')}>
                            <CompanyShare company={company} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDetailPage;
