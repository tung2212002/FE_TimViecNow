import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { HiMagnifyingGlass, HiOutlineChevronDown } from 'react-icons/hi2';
import { HiOutlineLocationMarker, HiCheck, HiTrendingUp } from 'react-icons/hi';

import styles from './SearchJobSearchHeaderComponent.module.scss';
import { selectProvince } from '../../redux/features/config/configSilde';

const cx = classNames.bind(styles);

const SearchJobSearchHeaderComponent = ({
    paddingContainer,
    searchHeight,
    paddingInput,
    handleSelectCity,
    handleSelectKeyword,
    selectCity = 0,
    selectKeyword = '',
}) => {
    const location = useSelector(selectProvince);
    const [cityList, setCityList] = useState([{ id: 0, name: 'Tất cả địa điểm' }, ...location]);

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

    const [city, setCity] = useState(cityList);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [focus, setFocus] = useState(false);
    const [selectedCityValue, setSelectedCityValue] = useState(selectCity);
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState(selectKeyword);

    const handleSetSearchValue = (value) => {
        setSearchValue(value);
        handleSelectKeyword && handleSelectKeyword(value);
    };

    const changeValue = (value) => {
        setInputValue(value);
        const listFilter = cityList.filter((city) => city?.name.toLowerCase().includes(value.toLowerCase().trim()));
        if (listFilter.length > 0) {
            setCity(listFilter);
        } else {
            setCity([{ id: -1, name: 'Không tìm thấy kết quả' }]);
        }
    };

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
        setCityList([{ id: 0, name: 'Tất cả địa điểm' }, ...location]);
        setCity([{ id: 0, name: 'Tất cả địa điểm' }, ...location]);
    }, [location]);

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
                <div className={cx('container')} style={{ padding: paddingContainer }}>
                    <div className={cx('search')} style={{ height: searchHeight }}>
                        <HiMagnifyingGlass className={cx('icon-search')} />
                        <input
                            type="text"
                            placeholder="Vị trí ứng tuyển"
                            className={cx('input', 'input-search')}
                            autoComplete="off"
                            onFocus={() => setFocus(true)}
                            value={searchValue}
                            onChange={(event) => handleSetSearchValue(event.target.value)}
                            style={{ padding: paddingInput }}
                        />
                    </div>
                    <div className={cx('location')} onClick={() => setDisplayDropdown(!displayDropdown)}>
                        <div className={cx('selection')}>
                            <HiOutlineLocationMarker className={cx('icon-location')} />
                            <span className={cx('select-show')}>
                                <span className={cx('selection')}>
                                    <span className={cx('select-2')}>
                                        <span className={cx('text')}>{cityList.find((ct) => ct.id === selectedCityValue)?.name}</span>
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
                                            {city.map((city, index) => (
                                                <li
                                                    key={index}
                                                    className={cx('select-option', {
                                                        selected: selectedCityValue === city.id && selectedCityValue !== -1,
                                                    })}
                                                    onClick={() => {
                                                        city.id !== -1 && setSelectedCityValue(city.id);
                                                        city.id !== -1 && handleSelectCity && handleSelectCity(city.id);
                                                        city.id !== -1 && setDisplayDropdown(false);
                                                    }}
                                                    disabled={city.id === -1}
                                                >
                                                    {city.name}
                                                    {city.id === selectedCityValue && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </span>
                        </div>
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
                                        handleSelectKeyword && handleSelectKeyword(item.name);
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

SearchJobSearchHeaderComponent.propTypes = {
    paddingContainer: PropTypes.string,
    searchHeight: PropTypes.string,
    paddingInput: PropTypes.string,
    handleSelectCity: PropTypes.func,
    handleSelectKeyword: PropTypes.func,
    selectCity: PropTypes.number,
    selectKeyword: PropTypes.string,
};

export default SearchJobSearchHeaderComponent;
