import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SearchLevelTypeComponent.module.scss';
import { GiRank3 } from 'react-icons/gi';

import SelectSearchComponent from '@components/common/SelectSearchComponent/SelectSearchComponent';
import { listJobEmployerLevel } from '@constants';

const cx = classNames.bind(styles);

const SearchLevelTypeComponent = ({ canSearch = false, handleSetFilter, filter, active = false }) => {
    const level = [{ id: 0, name: 'Tất cả cấp bậc' }, ...listJobEmployerLevel];

    return (
        <div className={cx('wrapper')} style={{ width: '100%' }}>
            <SelectSearchComponent
                list={level}
                canSearch={canSearch}
                icon={<GiRank3 />}
                title="Chọn ngành nghề"
                handleSetFilter={handleSetFilter}
                filter={filter}
                active={active}
            />
        </div>
    );
};

SearchLevelTypeComponent.propTypes = {
    canSearch: PropTypes.bool,
    handleSetFilter: PropTypes.func.isRequired,
    filter: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export default SearchLevelTypeComponent;
