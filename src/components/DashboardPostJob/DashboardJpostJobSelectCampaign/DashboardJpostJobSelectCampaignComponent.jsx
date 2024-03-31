import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { HiCheck } from 'react-icons/hi';
import { FaCaretDown } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

import styles from './DashboardJpostJobSelectCampaignComponent.module.scss';
import { SelectionComponent } from '../../common';

const cx = classNames.bind(styles);

const DashboardJpostJobSelectCampaignComponent = ({ currentCampaign, padding, handleSetCampaign }) => {
    const campaigns = [
        {
            id: 1,
            name: 'Tuyển Intern ReactJS',
        },
        {
            id: 2,
            name: 'Tuyển Intern FastAPI',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <SelectionComponent
                header={() => (
                    <div className={cx('header-select')} style={{ padding: padding }}>
                        <div className={cx('container-select')}>
                            <span className={cx('result')}> {campaigns.find((item) => item.id === currentCampaign)?.name || 'Chọn chiến dịch'}</span>
                        </div>
                    </div>
                )}
                body={() => (
                    <ul className={cx('ul-select')}>
                        {campaigns.map((item) => (
                            <li key={item.id} className={cx('item', { active: item.id === currentCampaign })} onClick={() => handleSetCampaign(item.id)}>
                                <span className={cx('text')}>{item.name}</span>
                                {item.id === currentCampaign && <HiCheck className={cx('icon')} />}
                            </li>
                        ))}
                    </ul>
                )}
                customeHeaderBody={() => (
                    <div className={cx('header-body')}>
                        <button className={cx('button')}>
                            <FaPlus className={cx('icon-plus')} />
                            Tạo chiến dịch mới
                        </button>
                    </div>
                )}
                icon={() => <FaCaretDown className={cx('icon-chevron')} />}
                itemSelect={currentCampaign}
                maxHeight={'290px'}
                styleDropdown={{ right: '0', left: 'auto', top: '60px', width: '311px' }}
            />
        </div>
    );
};

DashboardJpostJobSelectCampaignComponent.propTypes = {
    padding: PropTypes.string,
    currentCampaign: PropTypes.number,
    handleSetCampaign: PropTypes.func,
};

export default DashboardJpostJobSelectCampaignComponent;
