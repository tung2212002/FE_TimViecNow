import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { PiStarOfDavidBold } from 'react-icons/pi';
import { HiCheck, HiOutlineChevronDown } from 'react-icons/hi';

import styles from './SearchExpComponent.module.scss';
import SelectionComponent from '../../SelectionComponent/SelectionComponent';

const cx = classNames.bind(styles);

const SearchExpComponent = ({padding}) => {
    const filterExp = [
        {
            id: 1,
            name: 'Tất cả kinh nghiệm',
        },
        {
            id: 2,
            name: 'Chưa có kinh nghiệm',
        },
        {
            id: 3,
            name: 'Dưới 1 năm',
        },
        {
            id: 4,
            name: '1 năm',
        },
        {
            id: 5,
            name: '2 năm',
        },
        {
            id: 6,
            name: '3 năm',
        },
        {
            id: 7,
            name: '4 năm',
        },
        {
            id: 8,
            name: '5 năm',
        },
        {
            id: 9,
            name: 'Trên 5 năm',
        },
    ];

    const [currentSearch, setCurrentSearch] = useState({
        filter: 1,
    });

    const handleSetFilter = (id) => {
        setCurrentSearch({
            filter: id,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <SelectionComponent
                header={() => (
                    <div className={cx('header-select')} style={{ padding: padding }}>
                        <div className={cx('container-select')}>
                            <PiStarOfDavidBold className={cx('icon-star')} />
                            <span className={cx('result')}> {filterExp.find((item) => item.id === currentSearch.filter).name}</span>
                        </div>
                    </div>
                )}
                body={() => (
                    <ul className={cx('ul-select')}>
                        {filterExp.map((item) => (
                            <li key={item.id} className={cx('item', { active: item.id === currentSearch.filter })} onClick={() => handleSetFilter(item.id)}>
                                <span className={cx('text')}>{item.name}</span>

                                {item.id === currentSearch.filter && <HiCheck className={cx('icon')} />}
                            </li>
                        ))}
                    </ul>
                )}
                icon={() => <HiOutlineChevronDown className={cx('icon-chevron')} />}
                itemSelect={currentSearch.filter}
                maxHeight={'230px'}
                styleDropdown={{ right: '0', left: 'auto', top: '60px' }}
            />
        </div>
    );
};

SearchExpComponent.propTypes = {
    padding: PropTypes.string,
};

export default SearchExpComponent;
