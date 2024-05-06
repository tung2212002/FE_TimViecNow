import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaChevronDown } from 'react-icons/fa';

import styles from './SelectSearchComponent.module.scss';
import SelectionComponent from '../SelectionComponent/SelectionComponent';
import SearchDropDownIdComponent from '../../SearchDropDownIdComponent/SearchDropDownIdComponent';

const cx = classNames.bind(styles);

const SelectSearchComponent = ({ list, canSearch = true, maxHeight = 230, title = 'Chọn lọc', icon, handleSetFilter, filter, active = false }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <SelectionComponent
                    header={() => (
                        <div className={cx('header-select', { active })}>
                            <div className={cx('container-select')}>
                                {icon && <div className={cx('icon')}>{icon}</div>}
                                <span className={cx('result')}>{(list?.length > 0 && list.find((item) => item.id === filter)?.name) || title}</span>
                            </div>
                        </div>
                    )}
                    body={() => <></>}
                    customeHeaderBody={() =>
                        list?.length > 0 && (
                            <SearchDropDownIdComponent
                                object={list}
                                setDisplayDropdown={() => {}}
                                selectedObjectValue={filter}
                                setSelectedObjectValue={(value) => handleSetFilter(value)}
                                handleSelectObject={(value) => handleSetFilter(value)}
                                canSearch={canSearch}
                            />
                        )
                    }
                    icon={() => <FaChevronDown style={{ color: '#c0c0c0', fontSize: '21px' }} className={cx('icon-chevron')} />}
                    itemSelect={filter}
                    maxHeight={maxHeight + 'px'}
                    styleDropdown={{ right: '0', left: 'auto', top: '60px' }}
                    styleButton={{ right: '10px' }}
                />
            </div>
        </div>
    );
};

SelectSearchComponent.propTypes = {
    canSearch: PropTypes.bool,
    list: PropTypes.array,
    maxHeight: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.element,
    handleSetFilter: PropTypes.func.isRequired,
    filter: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export default SelectSearchComponent;
