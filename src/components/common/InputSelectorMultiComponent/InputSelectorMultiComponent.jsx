import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaCaretDown } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import styles from './InputSelectorMultiComponent.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const InputSelectorMultiComponent = ({ placeholder, options, isRequired = true, value, setValue, styleInput, maxOption = 3 }) => {
    const refInput = useRef(null);
    const refOptions = useRef(null);

    const [valueOption, setValueOption] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [fillterOptions, setFillterOptions] = useState(options);
    const [isError, setIsError] = useState(false);

    const handleFillterOptions = (event) => {
        const inputValue = event.target.value;
        setValueOption(inputValue);
        if (inputValue === '') {
            setFillterOptions(options);
            return;
        }
        const fillterOptions = options.filter((option) => (option.name ? option.name : option.value)?.toLowerCase()?.includes(inputValue?.toLowerCase()));
        setFillterOptions(fillterOptions);
    };

    const handleSelectOption = (option) => {
        setValueOption('');
        if (isRequired) {
            if (!value.includes(option.id)) {
                if (value.length < maxOption) {
                    setValue([...value, option.id]);
                }
            }
        }
        setIsFocus(false);
    };

    useEffect(() => {
        const input = refInput.current;
        const optionsCurrent = refOptions.current;
        const handleClickOutside = (event) => {
            if (input && !input.contains(event.target) && optionsCurrent && !optionsCurrent.contains(event.target)) {
                setValueOption('');
                setIsFocus(false);
                setFillterOptions(options);
            }

            if (isError) setIsError(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [valueOption]);

    useEffect(() => {
        const input = refInput.current;

        const handleFocusInput = () => {
            if (value?.length < maxOption) setIsFocus(true);
            else {
                refInput.current.blur();
                setIsError(true);
            }
        };

        input.addEventListener('focus', handleFocusInput);

        return () => {
            input.removeEventListener('focus', handleFocusInput);
        };
    }, [value]);

    useEffect(() => {
        if (value?.length < maxOption) setIsError(false);
    }, [value]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('input-selector')}>
                {isError && (
                    <div className={cx('error')}>
                        <span className={cx('error-text')}>Chọn tối đa {maxOption} lựa chọn, xóa bớt và chọn lại lựa chọn bạn muốn</span>
                    </div>
                )}
                {value?.length > 0 && (
                    <div className={cx('tags')}>
                        {value?.map((id, index) => {
                            const option = options.find((option) => option.id === id || option.id === id?.id);
                            return (
                                <div key={index} className={cx('tag')}>
                                    <div className={cx('text')}>{option?.name ? option.name : option?.value}</div>
                                    <div className={cx('close')} onClick={() => setValue(value.filter((item) => item !== id))}>
                                        <IoClose className={cx('icon')} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <input
                    type="text"
                    className={cx('input')}
                    placeholder={placeholder}
                    value={valueOption}
                    onChange={handleFillterOptions}
                    ref={refInput}
                    style={{ ...styleInput, border: value?.length === 0 && 'none' }}
                />
                <FaCaretDown className={cx('icon-down', { active: isFocus })} />
            </div>
            <div className={cx('options', { active: isFocus })} ref={refOptions}>
                {fillterOptions?.length > 0 ? (
                    fillterOptions.map((option, index) => (
                        <div
                            key={index}
                            className={cx('option', { active: value.includes(option.id) || value?.some((item) => item?.id === option.id) })}
                            onClick={() => handleSelectOption(option)}
                        >
                            <div className={cx('text')}>{option?.name ? option.name : option?.value}</div>
                        </div>
                    ))
                ) : (
                    <div className={cx('option')}>
                        <div className={cx('text')}>Không tìm thấy kết quả</div>
                    </div>
                )}
            </div>
        </div>
    );
};

InputSelectorMultiComponent.propTypes = {
    options: PropTypes.array,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
    styleInput: PropTypes.object,
    maxOption: PropTypes.number,
};

export default InputSelectorMultiComponent;
