import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { HiCheck, HiOutlineChevronDown } from 'react-icons/hi';

import styles from './SearchSalaryComponent.module.scss';
import { SelectionComponent } from '../common';
import { filterSalary } from '../../constants';

const cx = classNames.bind(styles);

const SearchSalaryComponent = ({ padding, handleSetSalary, maxSalaryValue = '', minSalaryValue = '', salaryTypeValue = '' }) => {
    const million = 1000000;
    const maxSalary = 999;

    const initialSalary =
        filterSalary.filter(
            (item) =>
                (item.start === minSalaryValue / million && item.end === maxSalaryValue / million) ||
                (item.start === minSalaryValue / million && item.end === '') ||
                (item.start === '' && item.end === maxSalaryValue / million),
        )[0] ||
        (salaryTypeValue === 'deal' && filterSalary.find((item) => item.id === 9)) ||
        filterSalary[0];

    const [currentSearch, setCurrentSearch] = useState({
        filter: initialSalary.id,
        start: initialSalary.start === 0 ? '' : initialSalary.start,
        end: initialSalary.end === 0 ? '' : initialSalary.end,
    });

    const [inputValue, setInputValue] = useState({
        start: currentSearch.start,
        end: currentSearch.end,
    });

    const startRef = useRef(null);
    const endRef = useRef(null);

    const handleChangeStart = (event) => {
        let value = event.target.value;
        if (value == 0) {
            setInputValue({
                ...inputValue,
                start: '',
            });
            return;
        }
        if (value <= maxSalary) {
            setInputValue({
                ...inputValue,
                start: value,
            });
        }
    };

    const handleChangeEnd = (event) => {
        const value = event.target.value;
        if (value == 0) {
            setInputValue({
                ...inputValue,
                end: '',
            });
            return;
        }
        if (value <= maxSalary) {
            setInputValue({
                ...inputValue,
                end: value,
            });
        }
    };

    const handleSetFilter = (id) => {
        const start = filterSalary.find((item) => item.id === id).start;
        const end = filterSalary.find((item) => item.id === id).end;
        const type = id === 1 ? '' : id === 9 ? 'deal' : 'vnd';

        handleSetSalary && handleSetSalary(start * million, end * million, type);

        setCurrentSearch({
            filter: id,
            start: start,
            end: end,
        });

        setInputValue({
            start: start === '' ? '' : Number(start),
            end: end === '' ? '' : Number(end),
        });
    };

    const handeSetSalary = () => {
        const start = inputValue.start;
        const end = inputValue.end;
        const type = 'vnd';

        handleSetSalary && handleSetSalary(start * million, end * million, type);
        const id = filterSalary.find((item) => item.start === start && item.end === end)?.id || 0;
        setCurrentSearch({
            filter: id,
            start: start,
            end: end,
        });
    };

    useEffect(() => {
        startRef.current.focus();
    }, [inputValue.start]);

    useEffect(() => {
        endRef.current.focus();
    }, [inputValue.end]);

    useEffect(() => {
        const handlePaste = (event) => {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            if (paste >= 0 && paste <= maxSalary) {
                setInputValue({
                    ...currentSearch,
                    start: paste,
                });
            }
        };
        if (startRef.current) {
            startRef.current.addEventListener('paste', handlePaste);
        }

        return () => {
            if (startRef.current) {
                startRef.current.removeEventListener('paste', handlePaste);
            }
        };
    }, [currentSearch.start]);

    useEffect(() => {
        const handlePaste = (event) => {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            if (paste >= 0 && paste <= maxSalary) {
                setInputValue({
                    ...currentSearch,
                    end: paste,
                });
            }
        };
        if (endRef.current) {
            endRef.current.addEventListener('paste', handlePaste);
        }
        return () => {
            if (endRef.current) {
                endRef.current.removeEventListener('paste', handlePaste);
            }
        };
    }, [currentSearch.end]);

    return (
        <div className={cx('wrapper')}>
            <SelectionComponent
                header={() => (
                    <div className={cx('header-select')} style={{ padding: padding }}>
                        <div className={cx('container-select')}>
                            <PiCurrencyCircleDollar className={cx('icon-dollar')} />
                            <span className={cx('result')}>
                                {filterSalary.find((item) => item.id === currentSearch.filter)?.name ||
                                    (currentSearch.start !== '' && currentSearch.end !== ''
                                        ? `${currentSearch.start} - ${currentSearch.end} triệu`
                                        : currentSearch.start !== ''
                                        ? `Trên ${currentSearch.start} triệu`
                                        : currentSearch.end !== ''
                                        ? `Đến ${currentSearch.end} triệu`
                                        : '')}
                            </span>
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
                                value={inputValue.start}
                                onChange={handleChangeStart}
                                max={maxSalary}
                            />
                            <span className={cx('line')}>-</span>
                            <input
                                type="number"
                                placeholder="Đến"
                                className={cx('input')}
                                ref={endRef}
                                value={inputValue.end}
                                onChange={handleChangeEnd}
                                max={maxSalary}
                            />
                            <span className={cx('line')}>triệu</span>
                        </div>
                        <button
                            type="button"
                            className={cx('button-filter', {
                                active:
                                    (inputValue.start !== '' && inputValue.end !== '' && Number(inputValue.start) <= Number(inputValue.end)) ||
                                    (inputValue.start === '' && inputValue.end !== '') ||
                                    (inputValue.end === '' && inputValue.start !== ''),
                            })}
                            disabled={
                                (inputValue.start !== '' && inputValue.end !== '' && Number(inputValue.start) > Number(inputValue.end)) ||
                                ((inputValue.start === '' || inputValue === 0) && (inputValue.end === '' || inputValue === 0))
                            }
                            onClick={handeSetSalary}
                        >
                            Áp dụng
                        </button>
                    </div>
                )}
                icon={() => <HiOutlineChevronDown className={cx('icon-chevron')} />}
                itemSelect={currentSearch.filter}
                maxHeight={'320px'}
                styleDropdown={{ right: '0', left: 'auto', top: '60px', width: '311px' }}
            />
        </div>
    );
};

SearchSalaryComponent.propTypes = {
    padding: PropTypes.string,
    handleSetMinSalary: PropTypes.func,
    handleSetMaxSalary: PropTypes.func,
    handleSetSalaryType: PropTypes.func,
    handleSetSalary: PropTypes.func,
    maxSalaryValue: PropTypes.number,
    minSalaryValue: PropTypes.number,
    salaryTypeValue: PropTypes.string,
};

export default SearchSalaryComponent;
