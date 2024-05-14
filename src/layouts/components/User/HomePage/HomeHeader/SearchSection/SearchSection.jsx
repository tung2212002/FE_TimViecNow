import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import { HiMagnifyingGlass, HiOutlineChevronDown } from 'react-icons/hi2';
import { HiOutlineLocationMarker, HiCheck, HiTrendingUp } from 'react-icons/hi';

import styles from './SearchSection.module.scss';
import { useSelector } from 'react-redux';
import { selectProvince } from '../../../../../../redux/features/config/configSilde';
import path from '../../../../../../constants/path';

const cx = classNames.bind(styles);

const SearchSection = ({ handleSelectCity }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const province = useSelector(selectProvince);
    const [cities, setCities] = useState([{ id: 0, name: 'Tất cả địa điểm' }, ...province]);

    const fakeItem = [
        { value: '0', name: 'kế toán' },
        { value: '1', name: 'kế toán trưởng' },
        { value: '2', name: 'trưởng phòng kinh doanh' },
        { value: '3', name: 'nhân viên kế toán' },
        { value: '4', name: 'nhân viên chăm sóc khách hàng' },
        { value: '5', name: 'nhân viên marketing' },
        { value: '6', name: 'business analyst' },
        { value: '7', name: 'quản lý cửa hàng' },
        { value: '8', name: 'xây dựng' },
        { value: '9', name: 'thương mại điện tử' },
    ];

    const [city, setCity] = useState(cities);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [focus, setFocus] = useState(false);
    const [selectedCityValue, setSelectedCityValue] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchValue === '' && selectedCityValue === 0) {
            return;
        }
        navigate(path.JOB_FILTER, {
            state: {
                keyword: searchValue,
                province_id: selectedCityValue,
            },
        });
    };

    const changeValue = (value) => {
        setInputValue(value);

        const listFilter = cities.filter((ct) => ct?.name.toLowerCase().includes(value.toLowerCase()?.trim()));
        if (listFilter.length > 0) {
            setCity(listFilter);
        } else {
            setCity([{ id: -1, name: 'Không tìm thấy kết quả' }]);
        }
    };

    useEffect(() => {
        setCities([{ id: 0, name: 'Tất cả địa điểm' }, ...province]);
        setCity([{ id: 0, name: 'Tất cả địa điểm' }, ...province]);
    }, [province]);

    useEffect(() => {
        const handleClick = (event) => {
            if (event.target.closest(`.${cx('location')}`) === null) {
                setDisplayDropdown(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        const handleBlur = (event) => {
            if (event.target.closest(`.${cx('search-job')}`) === null && event.target.closest(`.${cx('input-search')}`) === null) {
                setFocus(false);
            }
        };
        document.addEventListener('click', handleBlur);
        return () => document.removeEventListener('click', handleBlur);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('container')}>
                    <div className={cx('search')}>
                        <HiMagnifyingGlass className={cx('icon-search')} />
                        <input
                            type="text"
                            placeholder="Vị trí ứng tuyển"
                            className={cx('input', 'input-search')}
                            autoComplete="off"
                            onFocus={() => setFocus(true)}
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </div>
                    <div className={cx('location')} onClick={() => setDisplayDropdown(!displayDropdown)}>
                        <div className={cx('selection')}>
                            <HiOutlineLocationMarker className={cx('icon-location')} />
                            <span className={cx('select-show')}>
                                <span className={cx('selection')}>
                                    <span className={cx('select-2')}>
                                        <span className={cx('text')}>{cities.find((ct) => ct.id === selectedCityValue)?.name}</span>
                                        <button className={cx('button')} type="button">
                                            <HiOutlineChevronDown className={cx('icon', 'icon-chevron-down', { rotate: displayDropdown })} />
                                        </button>
                                    </span>
                                </span>
                            </span>
                            <span className={cx('select-dropdown-container', { display: displayDropdown })} onClick={(event) => event.stopPropagation()}>
                                <div className={cx('select-dropdown')}>
                                    <div className={cx('select-dropdown-search')}>
                                        <input
                                            className={cx('input', 'input-search-select')}
                                            type="search"
                                            tabIndex="0"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            autoCapitalize="off"
                                            spellCheck="false"
                                            role="textbox"
                                            value={inputValue}
                                            onChange={(event) => changeValue(event.target.value)}
                                        />
                                    </div>
                                    <div className={cx('select-results')}>
                                        <ul className={cx('select-options')}>
                                            {city.map((ct, index) => (
                                                <li
                                                    key={index}
                                                    className={cx('select-option', {
                                                        selected: selectedCityValue === ct.id && selectedCityValue !== -1,
                                                    })}
                                                    onClick={() => {
                                                        ct.id !== -1 && setSelectedCityValue(ct.id);
                                                        ct.id !== -1 && handleSelectCity && handleSelectCity(ct.id);
                                                        ct.id !== -1 && setDisplayDropdown(false);
                                                    }}
                                                    disabled={ct.id === -1}
                                                >
                                                    {ct.name}
                                                    {ct.id === selectedCityValue && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className={cx('button-search')}>
                        <button className={cx('button')} onClick={handleSearch} type="button">
                            Tìm kiếm
                        </button>
                    </div>
                    <div className={cx('search-job', { display: focus })}>
                        <div className={cx('search-label')}>
                            <div className={cx('title')}>Từ khóa phổ biến</div>
                        </div>
                        <div className={cx('search-items')}>
                            {fakeItem.map((item, index) => (
                                <div
                                    className={cx('item')}
                                    key={index}
                                    onClick={() => {
                                        setSearchValue(item.name);
                                        setFocus(false);
                                    }}
                                >
                                    <HiTrendingUp className={cx('icon')} />
                                    <div className={cx('text')}>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

SearchSection.propTypes = {
    handleSelectCity: PropTypes.func,
};

export default SearchSection;
