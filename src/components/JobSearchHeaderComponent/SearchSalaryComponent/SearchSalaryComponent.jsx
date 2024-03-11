import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { HiCheck, HiOutlineChevronDown } from 'react-icons/hi';

import styles from './SearchSalaryComponent.module.scss';
import SelectionComponent from '../../SelectionComponent/SelectionComponent';

const cx = classNames.bind(styles);

const SearchSalaryComponent = () => {
    const maxSalary = 999;

    const filterSalary = [
        {
            id: 1,
            name: 'Tất cả mức lương',
            start: '',
            end: '',
        },
        {
            id: 2,
            name: 'Dưới 10 triệu',
            start: '',
            end: 10,
        },
        {
            id: 3,
            name: '10 - 15 triệu',
            start: 10,
            end: 15,
        },
        {
            id: 4,
            name: '15 - 20 triệu',
            start: 15,
            end: 20,
        },
        {
            id: 5,
            name: '20 - 25 triệu',
            start: 20,
            end: 25,
        },
        {
            id: 6,
            name: '25 - 30 triệu',
            start: 25,
            end: 30,
        },
        {
            id: 7,
            name: '30 - 50 triệu',
            start: 30,
            end: 50,
        },
        {
            id: 8,
            name: 'Trên 50 triệu',
            start: 50,
            end: '',
        },
        {
            id: 9,
            name: 'Thỏa thuận',
            start: '',
            end: '',
        },
    ];

    const [currentSearch, setCurrentSearch] = useState({
        filter: 1,
        start: '',
        end: '',
    });

    const startRef = useRef(null);
    const endRef = useRef(null);

    const handleChangeStart = (event) => {
        let value = event.target.value;
        if (value === '' || (value >= 0 && value <= maxSalary)) {
            setCurrentSearch({
                ...currentSearch,
                start: value,
            });
        }
    };

    const handleChangeEnd = (event) => {
        const value = event.target.value;
        if (value === '' || (value >= 0 && value <= maxSalary)) {
            setCurrentSearch({
                ...currentSearch,
                end: value,
            });
        }
    };

    const handleSetFilter = (id) => {
        setCurrentSearch({
            filter: id,
            start: filterSalary.find((item) => item.id === id).start,
            end: filterSalary.find((item) => item.id === id).end,
        });
    };

    const handleFilter = () => {
        // redirect to search page
    };

    useEffect(() => {
        startRef.current.focus();
    }, [currentSearch.start]);

    useEffect(() => {
        endRef.current.focus();
    }, [currentSearch.end]);

    useEffect(() => {
        const handlePaste = (event) => {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            if (paste >= 0 && paste <= maxSalary) {
                setCurrentSearch({
                    ...currentSearch,
                    start: paste,
                });
            }
        };
        startRef.current.addEventListener('paste', handlePaste);
        return () => {
            startRef.current.removeEventListener('paste', handlePaste);
        };
    }, [currentSearch.start]);

    useEffect(() => {
        const handlePaste = (event) => {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            if (paste >= 0 && paste <= maxSalary) {
                setCurrentSearch({
                    ...currentSearch,
                    end: paste,
                });
            }
        };
        endRef.current.addEventListener('paste', handlePaste);
        return () => {
            endRef.current.removeEventListener('paste', handlePaste);
        };
    }, [currentSearch.end]);

    return (
        <div className={cx('wrapper')}>
            <SelectionComponent
                header={() => (
                    <div className={cx('header-select')}>
                        <div className={cx('container-select')}>
                            <PiCurrencyCircleDollar className={cx('icon-dollar')} />
                            <span className={cx('result')}> {filterSalary.find((item) => item.id === currentSearch.filter).name}</span>
                        </div>
                    </div>
                )}
                body={() => (
                    <ul className={cx('ul-select')}>
                        {filterSalary.map((item) => (
                            <li key={item.id} className={cx('item', { active: item.id === currentSearch.filter })} onClick={() => handleSetFilter(item.id)}>
                                <span className={cx('text')}>{item.name}</span>
                                {item.id === currentSearch.filter && <HiCheck className={cx('icon')} />}
                            </li>
                        ))}
                    </ul>
                )}
                customeHeaderBody={() => (
                    <div className={cx('header-body')}>
                        <div className={cx('input-filter')}>
                            <input
                                type="number"
                                placeholder="Từ"
                                className={cx('input')}
                                ref={startRef}
                                value={currentSearch.start}
                                onChange={handleChangeStart}
                            />
                            <span className={cx('line')}>-</span>
                            <input type="number" placeholder="Đến" className={cx('input')} ref={endRef} value={currentSearch.end} onChange={handleChangeEnd} />
                            <span className={cx('line')}>triệu</span>
                        </div>
                        <button
                            type="button"
                            className={cx('button-filter', {
                                active: (currentSearch.start || currentSearch.end) > 0 && currentSearch.start <= currentSearch.end,
                            })}
                            disabled={(currentSearch.start || currentSearch.end) > 0 && currentSearch.start <= currentSearch.end ? false : true}
                        >
                            Áp dụng
                        </button>
                    </div>
                )}
                icon={() => <HiOutlineChevronDown className={cx('icon-chevron')} />}
                itemSelect={currentSearch.filter}
                maxHeight={'290px'}
                styleDropdown={{ right: '0', left: 'auto', top: '60px', width: '311px' }}
            />
        </div>
    );
};

SearchSalaryComponent.propTypes = {};

export default SearchSalaryComponent;
