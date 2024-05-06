import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SearchCategoryComponent.module.scss';
import { getListCategoryService } from '../../services/categoryService';
import { IoBriefcaseOutline } from 'react-icons/io5';

import SelectSearchComponent from '../common/SelectSearchComponent/SelectSearchComponent';
import { useSelector } from 'react-redux';
import { selectCategory } from '../../redux/features/config/configSilde';

const cx = classNames.bind(styles);

const SearchCategoryComponent = ({ canSearch = true, handleSetFilter, filter, active = false }) => {
    const category = useSelector(selectCategory);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        category && setCategories([{ id: 0, name: 'Tất cả ngành nghề' }, ...category]);
    }, [category]);

    return (
        <div className={cx('wrapper')} style={{ width: '100%' }}>
            {categories && (
                <SelectSearchComponent
                    list={categories}
                    canSearch={canSearch}
                    icon={<IoBriefcaseOutline />}
                    title="Chọn ngành nghề"
                    handleSetFilter={handleSetFilter}
                    filter={filter}
                    maxHeight={320}
                    active={active}
                />
            )}
        </div>
    );
};

SearchCategoryComponent.propTypes = {
    canSearch: PropTypes.bool,
    handleSetFilter: PropTypes.func.isRequired,
    filter: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export default SearchCategoryComponent;
