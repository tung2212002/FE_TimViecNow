import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaCaretDown } from 'react-icons/fa';

import styles from './InputSelectorComponent.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const InputSelectorComponent = ({ placeholder, options, isRequired = false, value, setValue, styleInput }) => {
    const refInput = useRef(null);
    const refOptions = useRef(null);

    const [valueOption, setValueOption] = useState('');
    const [fillterOptions, setFillterOptions] = useState(options);
    const [isFocus, setIsFocus] = useState(false);

    const handleFillterOptions = (event) => {
        const value = event.target.value;
        setValueOption(value);
        if (value === '') {
            setFillterOptions(options);
            return;
        }
        const fillterOptions = options.filter((option) => option.value.toLowerCase().includes(value.toLowerCase()));
        setFillterOptions(fillterOptions);
        if (!isRequired) {
            setValue(value);
        }
    };

    const handleSelectOption = (option) => {
        setValueOption(option?.name ? option.name : option?.value);
        if (isRequired) {
            setValue(option.id);
        } else {
            setValue(option?.name ? option.name : option?.value);
        }
        setIsFocus(false);
    };

    useEffect(() => {
        const input = refInput.current;
        const optionsCurrent = refOptions.current;
        const handleClickOutside = (event) => {
            if (
                isRequired &&
                valueOption?.length > 0 &&
                optionsCurrent &&
                !optionsCurrent.contains(event.target) &&
                !options?.some((option) => option?.value === valueOption || option?.name === valueOption)
            ) {
                setValueOption('');
                setFillterOptions(options);
                setIsFocus(false);
                setValue(-1);
            } else if (input && !input.contains(event.target) && optionsCurrent && !optionsCurrent.contains(event.target)) {
                setIsFocus(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [valueOption, value, options]);

    useEffect(() => {
        const input = refInput.current;

        const handleFocusInput = () => {
            setIsFocus(true);
        };

        input.addEventListener('focus', handleFocusInput);

        return () => {
            input.removeEventListener('focus', handleFocusInput);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('input-selector')}>
                <input
                    type="text"
                    className={cx('input')}
                    placeholder={placeholder}
                    value={valueOption}
                    onChange={handleFillterOptions}
                    ref={refInput}
                    style={styleInput}
                />
                <FaCaretDown className={cx('icon', { active: isFocus })} />
            </div>
            <div className={cx('options', { active: isFocus })} ref={refOptions}>
                {fillterOptions?.length > 0 ? (
                    fillterOptions.map((option, index) => (
                        <div
                            key={index}
                            className={cx('option', { active: value === option.id || value === option?.name || value === option?.value })}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelectOption(option);
                            }}
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

InputSelectorComponent.propTypes = {
    options: PropTypes.array,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
    styleInput: PropTypes.object,
};

export default InputSelectorComponent;
