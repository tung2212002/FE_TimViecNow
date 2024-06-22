import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SearchFieldComponent.module.scss';
import { PiCubeFocus } from 'react-icons/pi';

import SelectSearchComponent from '@components/common/SelectSearchComponent/SelectSearchComponent';
import { selectField } from '@redux/features/config/configSilde';

const cx = classNames.bind(styles);

const SearchFieldComponent = ({ canSearch = true, handleSetFilter, filter, active = false }) => {
    const field = useSelector(selectField);
    const [fields, setFields] = useState(null);

    useState(() => {
        field && setFields([{ id: 0, name: 'Tất cả lĩnh vực' }, ...field]);
    }, [field]);

    return (
        <div className={cx('wrapper')} style={{ width: '100%' }}>
            {fields && (
                <SelectSearchComponent
                    list={fields}
                    canSearch={canSearch}
                    icon={<PiCubeFocus />}
                    title="Chọn lĩnh vực"
                    handleSetFilter={handleSetFilter}
                    filter={filter}
                    maxHeight={320}
                    active={active}
                />
            )}
        </div>
    );
};

SearchFieldComponent.propTypes = {
    canSearch: PropTypes.bool,
    handleSetFilter: PropTypes.func.isRequired,
    filter: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export default SearchFieldComponent;
