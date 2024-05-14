import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { HiCheck } from 'react-icons/hi';

import styles from './SearchDropDownIdComponent.module.scss';

const cx = classNames.bind(styles);

const SearchDropDownIdComponent = ({ object, setDisplayDropdown, selectedObjectValue, setSelectedObjectValue, handleSelectObject, canSearch = true }) => {
    const [inputValue, setInputValue] = useState('');
    const [listItem, setListItem] = useState(object);

    const changeValue = (value) => {
        setInputValue(value);
        const listFilter = object.filter((item) => item?.name.toLowerCase().includes(value.toLowerCase().trim()));

        if (listFilter.length > 0) {
            setListItem(listFilter);
        } else {
            setListItem([{ id: -1, name: 'Không tìm thấy kết quả' }]);
        }
    };
    return (
        <div className={cx('select-dropdown')}>
            {canSearch && (
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
            )}
            <div className={cx('select-results')}>
                <ul className={cx('select-options')}>
                    {listItem.map((obj, index) => (
                        <li
                            key={index}
                            className={cx('select-option', {
                                selected: selectedObjectValue === obj.id && selectedObjectValue !== -1,
                            })}
                            onClick={() => {
                                obj.id !== -1 && setSelectedObjectValue(obj.id);
                                obj.id !== -1 && handleSelectObject && handleSelectObject(obj.id);
                                obj.id !== -1 && setDisplayDropdown(false);
                            }}
                            disabled={obj.id === -1}
                        >
                            {obj.name || obj.title || obj.value}
                            {obj.id === selectedObjectValue && <HiCheck className={cx('icon-check')} />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

SearchDropDownIdComponent.propTypes = {
    object: PropTypes.array.isRequired,
    setDisplayDropdown: PropTypes.func.isRequired,
    selectedObjectValue: PropTypes.number.isRequired,
    setSelectedObjectValue: PropTypes.func.isRequired,
    handleSelectObject: PropTypes.func.isRequired,
    canSearch: PropTypes.bool,
};

export default SearchDropDownIdComponent;
