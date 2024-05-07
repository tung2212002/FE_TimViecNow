import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FaLocationDot, FaPlus } from 'react-icons/fa6';
import { LuTrash } from 'react-icons/lu';

import styles from './JobLocation.module.scss';
import { InputSelectorComponent } from '../../../../../components/common';
import { getListDistrictService } from '../../../../../services/locationService';
import JobDistrict from '../JobDistrict/JobDistrict';
import { addDistrict, refreshProvince, removeLocation, selectPostJob, setProvince } from '../../../../../redux/features/postJob/postJobSlide';
import { selectProvince } from '../../../../../redux/features/config/configSilde';
const cx = classNames.bind(styles);

const JobLocation = ({ location_id }) => {
    const dispatch = useDispatch();
    const job = useSelector(selectPostJob);
    const listLocation = job?.locations;
    const location = listLocation?.find((item) => item.id === location_id);
    const province = location?.province;
    const district = location?.district;
    const [loading, setLoading] = useState(false);

    const listProvince = useSelector(selectProvince);
    const [listDistrict, setListDistrict] = useState([]);

    const handleSetProvince = (value) => {
        const data = {
            province: value,
            id: location_id,
        };
        dispatch(setProvince(data));
    };

    const handleAddDistrict = () => {
        dispatch(addDistrict({ id: location_id }));
    };

    const handleRemoveLocation = () => {
        dispatch(removeLocation(location_id));
    };

    useEffect(() => {
        if (province !== -1) {
            setLoading(true);
            const params = {
                province_id: province,
            };
            getListDistrictService(params)
                .then((res) => {
                    if (res.status === 200) {
                        setListDistrict(res.data.data);
                        dispatch(refreshProvince({ id: location_id }));
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [province]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('location-box')}>
                    <div className={cx('location-box__province')}>
                        <div className={cx('location-box__province-title')}>
                            <FaLocationDot className={cx('title-icon')} />
                            <span className={cx('title-text')}>Khu vực:</span>
                        </div>
                        <div className={cx('location-box__province-content')}>
                            {listProvince?.length > 0 && (
                                <InputSelectorComponent
                                    isRequired={true}
                                    options={listProvince}
                                    placeholder="Chọn tỉnh/thành phố"
                                    value={province}
                                    setValue={handleSetProvince}
                                    keepValue={true}
                                />
                            )}
                        </div>
                        {listLocation.length > 1 && (
                            <span className={cx('remove-location')} onClick={handleRemoveLocation}>
                                <LuTrash className={cx('remove-icon')} />
                            </span>
                        )}
                    </div>
                </div>
                {loading ? (
                    <div className={cx('box-skeleton')}>
                        <Skeleton count={1} height={35} width={500} />
                    </div>
                ) : (
                    district.length > 0 &&
                    listDistrict.length > 0 && (
                        <div className={cx('address-box')}>
                            <div className={cx('address-box__district')}>
                                {province !== -1 &&
                                    district.map((item) => (
                                        <JobDistrict location_id={location_id} province_id={province} key={item.id} district_id={item.id} />
                                    ))}
                                {province !== -1 && (
                                    <button className={cx('add-district')} onClick={handleAddDistrict}>
                                        <FaPlus className={cx('add-icon')} />
                                        Thêm địa chỉ
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

JobLocation.propTypes = {
    location_id: PropTypes.number,
};

export default JobLocation;
