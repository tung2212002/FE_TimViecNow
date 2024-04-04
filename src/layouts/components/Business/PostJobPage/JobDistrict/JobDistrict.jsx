import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { HiXMark } from 'react-icons/hi2';

import styles from './JobDistrict.module.scss';
import { InputSelectorComponent } from '../../../../../components/common';
import { getListDistrictService } from '../../../../../services/locationService';
import { removeDistrict, selectPostJob, setDistrict } from '../../../../../redux/features/postJob/postJobSlide';

const cx = classNames.bind(styles);

const JobDistrict = ({ location_id, province_id, district_id }) => {
    const dispatch = useDispatch();

    const job = useSelector(selectPostJob);
    const location = job?.location?.find((item) => item.id === location_id);
    const district = location?.district.find((item) => item.id === district_id).district;
    const description = location?.district.find((item) => item.id === district_id).description;
    const [districts, setDistricts] = useState([]);

    const handleSetDistrict = (value) => {
        dispatch(setDistrict({ districtId: district_id, id: location_id, district: { district: value } }));
    };

    const handleRemoveDistrict = () => {
        dispatch(removeDistrict({ id: location_id, districtId: district_id }));
    };

    const handleSetDistrictDescription = (value) => {
        dispatch(setDistrict({ districtId: district_id, id: location_id, district: { description: value } }));
    };

    useEffect(() => {
        const params = {
            province_id,
        };
        getListDistrictService(params)
            .then((res) => {
                if (res.status === 200) {
                    setDistricts(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [province_id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('district')}>
                    {districts.length > 0 && (
                        <InputSelectorComponent
                            isRequired={true}
                            options={districts}
                            placeholder="Chọn quận/huyện"
                            value={district}
                            setValue={handleSetDistrict}
                            keepValue={true}
                            disabled={province_id === -1}
                        />
                    )}
                </div>

                <div className={cx('input')}>
                    <input
                        className={cx('input-text')}
                        disabled={district === -1}
                        type="text"
                        placeholder="Nhập địa điểm làm việc cụ thể"
                        value={description}
                        onChange={(e) => handleSetDistrictDescription(e.target.value)}
                    />
                </div>
            </div>
            {location?.district.length > 1 && (
                <div className={cx('remove')} onClick={handleRemoveDistrict}>
                    <HiXMark className={cx('icon')} />
                </div>
            )}
        </div>
    );
};

JobDistrict.propTypes = {
    location_id: PropTypes.number,
    province_id: PropTypes.number,
    district_id: PropTypes.number,
};

export default JobDistrict;
