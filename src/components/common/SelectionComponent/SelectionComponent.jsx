import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SelectionComponent.module.scss';

const cx = classNames.bind(styles);

const SelectionComponent = ({
    header: HeaderComponent,
    body: BodyComponent,
    customeHeaderBody: CustomeHeaderBodyComponent,
    icon: Icon,
    maxHeight,
    styleDropdown,
    styleButton,
    itemSelect,
    disabled = false,
}) => {
    const ulRef = useRef(null);

    const handleDropDown = () => {
        const selection = ulRef.current;
        selection.classList.toggle(`${cx('active')}`);
    };

    useEffect(() => {
        const selection = ulRef.current;
        if (itemSelect) {
            selection.classList.remove(`${cx('active')}`);
        }
    }, [itemSelect]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const selection = ulRef.current;
            const headerBody = ulRef.current.querySelector(`.${cx('header-body-component')}`);
            const header = ulRef.current.querySelector(`.${cx('header')}`);
            if ((!headerBody && !header.contains(event.target)) || (headerBody && !headerBody.contains(event.target) && !header.contains(event.target))) {
                selection.classList.remove(`${cx('active')}`);
            }
        };

        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('selection')} ref={ulRef}>
                <div className={cx('header')} onMouseUp={disabled ? null : handleDropDown}>
                    <HeaderComponent />
                    <button className={cx('button')} type="button" style={styleButton}>
                        {Icon && <Icon className={cx('icon', 'icon-chevron-down')} />}
                    </button>
                </div>
                <div
                    className={cx('select-dropdown-container')}
                    onMouseDown={(event) => event.stopPropagation()}
                    style={{ maxHeight: maxHeight, ...styleDropdown }}
                >
                    {CustomeHeaderBodyComponent && (
                        <div className={cx('header-body-component')}>
                            <CustomeHeaderBodyComponent />
                        </div>
                    )}

                    <div className={cx('body-select')}>
                        <BodyComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

SelectionComponent.propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    header: PropTypes.elementType.isRequired,
    body: PropTypes.elementType.isRequired,
    customeHeaderBody: PropTypes.elementType,
    icon: PropTypes.elementType,
    maxHeight: PropTypes.string,
    itemSelect: PropTypes.any,
    styleDropdown: PropTypes.object,
    disabled: PropTypes.bool,
    styleButton: PropTypes.object,
};

export default SelectionComponent;
