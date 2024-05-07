import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { PiStarOfDavidBold } from 'react-icons/pi';
import { HiCheck, HiOutlineChevronDown } from 'react-icons/hi';

import styles from './SearchExpComponent.module.scss';
import { SelectionComponent } from '../common';
import { Experience } from '../../constants';

const cx = classNames.bind(styles);

const SearchExpComponent = ({ padding, handleSelectExperience, experienceValue = 0 }) => {
    const [currentSearch, setCurrentSearch] = useState({
        filter: experienceValue,
    });

    const handleSetFilter = (id) => {
        setCurrentSearch({
            filter: id,
        });

        handleSelectExperience && handleSelectExperience(id);
    };
    return (
        <div className={cx('wrapper')}>
            <SelectionComponent
                header={() => (
                    <div className={cx('header-select')} style={{ padding: padding }}>
                        <div className={cx('container-select')}>
                            <PiStarOfDavidBold className={cx('icon-star')} />
                            <span className={cx('result')}> {Experience.find((item) => item.id === currentSearch.filter)?.name}</span>
                        </div>
                    </div>
                )}
                body={() => (
                    <ul className={cx('ul-select')}>
                        {Experience.map((item) => (
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
    handleSelectExperience: PropTypes.func,
    experienceValue: PropTypes.number,
};

export default SearchExpComponent;
