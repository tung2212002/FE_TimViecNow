import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './CompanyRelate.module.scss';
import { getListCompanySerivce } from '../../../../../services/companyService';
import CompanyRelateComponent from './CompanyRelateComponent/CompanyRelateComponent';

const cx = classNames.bind(styles);

const CompanyRelate = ({ company }) => {
    const [companyRelate, setCompanyRelate] = useState(null);

    useEffect(() => {
        if (!company.fields || company.fields.length === 0) {
            setCompanyRelate([]);
            return;
        }
        let shouldBreak = false;

        for (let i = 0; i < company.fields.length; i++) {
            if (shouldBreak) break;
            const params = {
                limit: 10,
                skip: 0,
                sort_by: 'created_at',
                fields: [company.fields[i].id],
            };

            getListCompanySerivce(params)
                .then((res) => {
                    if (res.status === 200) {
                        setCompanyRelate(res.data.data.filter((item) => item.id !== company.id));
                        shouldBreak = true;
                    } else {
                        shouldBreak = true;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    shouldBreak = true;
                });
        }
    }, [company]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Top công ty cùng lĩnh vực</h2>
                <div className={cx('body')}>
                    {companyRelate &&
                        (companyRelate.length > 0 ? (
                            companyRelate.map((item) => (
                                <div className={cx('company')} key={item.id}>
                                    <CompanyRelateComponent company={item} />
                                </div>
                            ))
                        ) : (
                            <div className={cx('empty')}>Không có công ty nào cùng lĩnh vực</div>
                        ))}
                </div>
            </div>
        </div>
    );
};

CompanyRelate.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyRelate;
