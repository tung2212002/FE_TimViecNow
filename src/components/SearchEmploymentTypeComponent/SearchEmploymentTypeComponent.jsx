import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SearchEmploymentTypeComponent.module.scss';
import { AiOutlineFieldTime } from 'react-icons/ai';

import SelectSearchComponent from '@components/common/SelectSearchComponent/SelectSearchComponent';
import { EmploymentType } from '@constants';
const cx = classNames.bind(styles);

const SearchEmploymentTypeComponent = ({ canSearch = false, handleSetFilter, filter, active = false }) => {
    const employmentType = [{ id: 0, name: 'Tất cả hình thức' }, ...EmploymentType];

    return (
        <div className={cx('wrapper')} style={{ width: '100%' }}>
            <SelectSearchComponent
                list={employmentType}
                canSearch={canSearch}
                icon={<AiOutlineFieldTime />}
                title="Chọn ngành nghề"
                handleSetFilter={handleSetFilter}
                filter={filter}
                active={active}
            />
        </div>
    );
};

SearchEmploymentTypeComponent.propTypes = {
    canSearch: PropTypes.bool,
    handleSetFilter: PropTypes.func.isRequired,
    filter: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export default SearchEmploymentTypeComponent;
