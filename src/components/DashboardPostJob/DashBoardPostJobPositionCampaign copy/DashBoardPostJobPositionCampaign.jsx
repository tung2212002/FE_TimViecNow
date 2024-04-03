import PropTypes from 'prop-types';

import InputSelectorComponent from '../../common/InputSelectorComponent/InputSelectorComponent';

const DashboardPostJobPositionCampaign = ({ placeholder, options, value, setValue, styleInput }) => {
    return <InputSelectorComponent placeholder={placeholder} options={options} value={value} setValue={setValue} styleInput={styleInput} />;
};

DashboardPostJobPositionCampaign.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    setValue: PropTypes.func,
    styleInput: PropTypes.object,
};

export default DashboardPostJobPositionCampaign;
