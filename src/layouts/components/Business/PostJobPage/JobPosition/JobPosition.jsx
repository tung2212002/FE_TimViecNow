import PropTypes from 'prop-types';

import { InputSelectorComponent } from '../../../../../components/common';

const JobPosition = ({ placeholder, options, value, setValue, styleInput }) => {
    return <InputSelectorComponent placeholder={placeholder} options={options} value={value} setValue={setValue} styleInput={styleInput} />;
};

JobPosition.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    setValue: PropTypes.func,
    styleInput: PropTypes.object,
};

export default JobPosition;
