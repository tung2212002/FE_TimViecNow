import classNames from 'classnames/bind';

import { HiMagnifyingGlass, HiOutlineChevronDown } from 'react-icons/hi2';
import { HiOutlineLocationMarker, HiCheck, HiTrendingUp } from 'react-icons/hi';

import styles from './SearchJobSearchHeaderComponent.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const SearchJobSearchHeaderComponent = () => {
    const cityList = [
        { value: '0', name: 'Tất cả địa điểm' },
        { value: '1', name: 'Hà Nội' },
        { value: '2', name: 'Hồ Chí Minh' },
        { value: '3', name: 'Bình Dương' },
        { value: '4', name: 'Bắc Ninh' },
        { value: '5', name: 'Đồng Nai' },
        { value: '6', name: 'Hưng Yên' },
        { value: '7', name: 'Hải Dương' },
        { value: '8', name: 'Đà Nẵng' },
        { value: '9', name: 'Hải Phòng' },
        { value: '10', name: 'An Giang' },
        { value: '11', name: 'Bà Rịa-Vũng Tàu' },
        { value: '12', name: 'Bắc Giang' },
        { value: '13', name: 'Bắc Kạn' },
        { value: '14', name: 'Bạc Liêu' },
        { value: '15', name: 'Bến Tre' },
        { value: '16', name: 'Bình Định' },
        { value: '17', name: 'Bình Phước' },
        { value: '18', name: 'Bình Thuận' },
        { value: '19', name: 'Cà Mau' },
        { value: '20', name: 'Cần Thơ' },
        { value: '21', name: 'Cao Bằng' },
        { value: '22', name: 'Cửu Long' },
        { value: '23', name: 'Đắk Lắk' },
        { value: '24', name: 'Đắc Nông' },
        { value: '25', name: 'Điện Biên' },
        { value: '26', name: 'Đồng Tháp' },
        { value: '27', name: 'Gia Lai' },
        { value: '28', name: 'Hà Giang' },
        { value: '29', name: 'Hà Nam' },
        { value: '30', name: 'Hà Tĩnh' },
        { value: '31', name: 'Hậu Giang' },
        { value: '32', name: 'Hoà Bình' },
        { value: '33', name: 'Khánh Hoà' },
        { value: '34', name: 'Kiên Giang' },
        { value: '35', name: 'Kon Tum' },
        { value: '36', name: 'Lai Châu' },
        { value: '37', name: 'Lâm Đồng' },
        { value: '38', name: 'Lạng Sơn' },
        { value: '39', name: 'Lào Cai' },
        { value: '40', name: 'Long An' },
        { value: '41', name: 'Miền Bắc' },
        { value: '42', name: 'Miền Nam' },
        { value: '43', name: 'Miền Trung' },
        { value: '44', name: 'Nam Định' },
        { value: '45', name: 'Nghệ An' },
        { value: '46', name: 'Ninh Bình' },
        { value: '47', name: 'Ninh Thuận' },
        { value: '48', name: 'Phú Thọ' },
        { value: '49', name: 'Phú Yên' },
        { value: '50', name: 'Quảng Bình' },
        { value: '51', name: 'Quảng Nam' },
        { value: '52', name: 'Quảng Ngãi' },
        { value: '53', name: 'Quảng Ninh' },
        { value: '54', name: 'Quảng Trị' },
        { value: '55', name: 'Sóc Trăng' },
        { value: '56', name: 'Sơn La' },
        { value: '57', name: 'Tây Ninh' },
        { value: '58', name: 'Thái Bình' },
        { value: '59', name: 'Thái Nguyên' },
        { value: '60', name: 'Thanh Hoá' },
        { value: '61', name: 'Thừa Thiên Huế' },
        { value: '62', name: 'Tiền Giang' },
        { value: '63', name: 'Toàn Quốc' },
        { value: '64', name: 'Trà Vinh' },
        { value: '65', name: 'Tuyên Quang' },
        { value: '66', name: 'Vĩnh Long' },
        { value: '67', name: 'Vĩnh Phúc' },
        { value: '68', name: 'Yên Bái' },
        { value: '100', name: 'Nước Ngoài' },
    ];
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
    const [selectedCityValue, setSelectedCityValue] = useState('0');
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const changeValue = (value) => {
        setInputValue(value);

        const listFilter = cityList.filter((city) => city?.name.toLowerCase().includes(value.toLowerCase().trim()));
        if (listFilter.length > 0) {
            setCity(listFilter);
        } else {
            setCity([{ value: '-1', name: 'Không tìm thấy kết quả' }]);
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
                                        <span className={cx('text')}>{cityList.find((ct) => ct.value === selectedCityValue)?.name}</span>
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
                                                        selected: selectedCityValue === city.value && selectedCityValue !== '-1',
                                                    })}
                                                    onClick={() => {
                                                        city.value !== '-1' && setSelectedCityValue(city.value);
                                                        city.value !== '-1' && setDisplayDropdown(false);
                                                    }}
                                                    disabled={city.value === '-1'}
                                                >
                                                    {city.name}
                                                    {city.value === selectedCityValue && <HiCheck className={cx('icon-check')} />}
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

export default SearchJobSearchHeaderComponent;
