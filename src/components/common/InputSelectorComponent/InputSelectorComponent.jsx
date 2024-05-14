import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaCaretDown } from 'react-icons/fa';

import styles from './InputSelectorComponent.module.scss';
import React, { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const InputSelectorComponent = ({
    disabled = false,
    placeholder,
    options,
    isRequired = false,
    value,
    setValue,
    keepValue = false,
    styleInput,
    styleWrapper,
    defaultValue,
}) => {
    const refInput = useRef(null);
    const refOptions = useRef(null);
    const refWrapper = useRef(null);

    const getValue = (optionValue) => {
        return optionValue?.name ? optionValue.name : optionValue?.value ? optionValue.value : optionValue?.title;
    };

    const [valueOption, setValueOption] = useState(
        defaultValue ? defaultValue : value !== '-1' && value ? getValue(options.find((option) => option.id == value)) : '',
    );
    const [fillterOptions, setFillterOptions] = useState(options);

    const handleFillterOptions = (event) => {
        const value = event.target.value;
        setValueOption(value);
        if (value === '') {
            setFillterOptions(options);
            return;
        }
        const fillterOptions = options.filter((option) => getValue(option).toLowerCase().includes(value.toLowerCase()));
        setFillterOptions(fillterOptions);
        if (!isRequired) {
            setValue(value);
        }
    };

    const handleSelectOption = (option) => {
        setValueOption(getValue(option));
        if (isRequired) {
            setValue(option.id);
        } else {
            setValue(getValue(option));
        }
        const currentWrapper = refWrapper.current;
        currentWrapper.classList.remove(`${cx('active')}`);
    };

    useEffect(() => {
        const input = refInput.current;
        const optionsCurrent = refOptions.current;
        const currentWrapper = refWrapper.current;
        const handleClickOutside = (event) => {
            if (
                isRequired &&
                optionsCurrent &&
                !optionsCurrent.contains(event.target) &&
                !options?.some((option) => option?.value === valueOption || option?.name === valueOption || option?.title === valueOption)
            ) {
                if (keepValue) {
                    if (value !== -1 && value !== '' && value !== null) {
                        const option = options.find((option) => option.id === value);
                        setValueOption(!option ? '' : getValue(option));
                        setFillterOptions(options);
                        currentWrapper.classList.remove(`${cx('active')}`);
                        return;
                    }
                    setValueOption('');
                    setValue(-1);
                } else {
                    setValueOption('');
                    setValue(-1);
                }
                setFillterOptions(options);
                currentWrapper.classList.remove(`${cx('active')}`);
            } else if (input && !input.contains(event.target) && optionsCurrent && !optionsCurrent.contains(event.target)) {
                currentWrapper.classList.remove(`${cx('active')}`);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [valueOption, value, placeholder]);

    useEffect(() => {
        const input = refInput.current;

        const handleFocusInput = () => {
            const currentCareDown = refWrapper.current;
            currentCareDown.classList.add(`${cx('active')}`);
        };

        input.addEventListener('focus', handleFocusInput);

        return () => {
            input.removeEventListener('focus', handleFocusInput);
        };
    }, []);

    return (
        <div className={cx('wrapper')} ref={refWrapper} style={styleWrapper}>
            <div className={cx('input-selector')}>
                <input
                    type="text"
                    className={cx('input')}
                    placeholder={placeholder}
                    value={valueOption}
                    onChange={handleFillterOptions}
                    ref={refInput}
                    style={styleInput}
                    disabled={disabled}
                />
                <FaCaretDown className={cx('icon')} />
            </div>
            <div className={cx('options')} ref={refOptions}>
                {fillterOptions?.length > 0 ? (
                    fillterOptions.map((option, index) => (
                        <div
                            key={index}
                            className={cx('option', {
                                active: value && (value === option.id || value === option?.name || value === option?.value || value === option?.title),
                            })}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelectOption(option);
                            }}
                        >
                            <div className={cx('text')}>{getValue(option)}</div>
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

InputSelectorComponent.propTypes = {
    options: PropTypes.array,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
    styleInput: PropTypes.object,
    keepValue: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    styleWrapper: PropTypes.object,
};

export default InputSelectorComponent;
