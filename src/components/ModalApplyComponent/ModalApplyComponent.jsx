import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyText from '@tippyjs/react';

import { FaCircleExclamation, FaFeatherPointed, FaRegFileLines, FaRegTrashCan } from 'react-icons/fa6';
import { FaExclamationTriangle, FaPen } from 'react-icons/fa';
import { RiFolderUserFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';

import styles from './ModalApplyComponent.module.scss';
import { icons } from '../../assets';
import { hideModal } from '../../redux/features/modal/modalSlice';
import Modal2 from '../common/Modal2/Modal2';

const cx = classNames.bind(styles);

const ModalApplyComponent = ({ job }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [data, setData] = useState({
        cv: null,
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
    });
    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [dialog, setDialog] = useState({
        show: false,
        title: '',
        content: '',
    });

    const handleHiddenModal = () => {
        setData({
            cv: null,
            name: '',
            email: '',
            phone: '',
            coverLetter: '',
        });
        setError({
            name: '',
            email: '',
            phone: '',
        });

        dispatch(hideModal());
    };

    const handleFocusArea = () => {
        const textarea = document.getElementById('cover-letter');
        textarea.focus();
    };

    const handleClickFile = () => {
        ref.current.click();
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file.size > 5 * 1024 * 1024) {
            setDialog({
                show: true,
                title: 'File quá lớn',
                content: 'Vui lòng chọn file có kích thước nhỏ hơn 5MB',
            });
            return;
        }
        setData({ ...data, cv: file });
    };

    const handleSubmit = () => {
        if (!data.cv) {
            setDialog({
                show: true,
                title: 'Thông báo',
                content: 'Vui lòng chọn CV trước khi nộp hồ sơ ứng tuyển!',
            });
            return;
        }
        if (!data.name) {
            setError({ ...error, name: 'Họ tên không được để trống' });
            return;
        }
        if (!data.email) {
            setError({ ...error, email: 'Email không được để trống' });
            return;
        }
        if (!data.phone) {
            setError({ ...error, phone: 'Số điện thoại không được để trống' });
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className="dialog-container">
                <Modal2
                    show={dialog.show}
                    handleHidden={() => setDialog({ ...dialog, show: false })}
                    header={
                        <div className={cx('header-dialog')}>
                            <h4 className={cx('title-dialog')}>{dialog.title}</h4>
                        </div>
                    }
                    body={
                        <div className={cx('body-dialog')}>
                            <p className={cx('content-dialog')}>{dialog.content}</p>
                        </div>
                    }
                    footer={
                        <div className={cx('footer-dialog')}>
                            <button className={cx('btn-cancel-dialog')} onClick={() => setDialog({ ...dialog, show: false })}>
                                Đóng
                            </button>
                        </div>
                    }
                />
            </div>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h4 className={cx('title')}>
                        Ứng tuyển <span className={cx('text-highlight')}>{job.title}</span>
                    </h4>
                    <button className={cx('btn-close')} onClick={handleHiddenModal}>
                        <IoClose className={cx('icon-close')} />
                    </button>
                </header>
                <main className={cx('body')}>
                    <div className={cx('warn')}>
                        <div className={cx('icon')}>
                            <FaCircleExclamation className={cx('icon-warn')} />
                        </div>
                        <div className={cx('warn-content')}>
                            <div className={cx('warn-title')}>Lưu ý</div>
                            <div className={cx('warn-text')}>
                                Việc ứng tuyển nhiều lần sẽ giảm độ chuyên nghiệp của bạn trong mắt nhà tuyển dụng. Bạn còn{' '}
                                <span className={cx('hightlight')}>3 lượt</span> ứng tuyển lại cho công việc này, hãy cân nhắc kỹ!
                            </div>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-tab')}>
                            <div className={cx('tab-title')}>
                                <RiFolderUserFill className={cx('icon')} />
                                <span className={cx('text')}>Chọn CV để ứng tuyển</span>
                            </div>
                            <div className={cx('tab-content-info')}>
                                <div className={cx('info')}>
                                    <div className={cx('cv')} onClick={handleClickFile}>
                                        <input
                                            type="file"
                                            accept=".doc, .docx, .pdf"
                                            className={cx('input-file')}
                                            ref={ref}
                                            hidden
                                            onChange={handleChangeFile}
                                        />

                                        <div className={cx('cv-icon-label')}>
                                            <img src={icons.icon_upload_cloud} alt="upload" className={cx('icon-upload')} />
                                            Tải lên CV từ máy tính, chọn hoặc kéo thả
                                        </div>
                                        <span className={cx('text-note')}>Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB</span>
                                        <div className={cx('upload-container')}>
                                            {data.cv && <FaRegFileLines className={cx('icon-file')} />}
                                            {data.cv && <span className={cx('file-name')}>{data.cv.name}</span>}
                                            {data.cv && (
                                                <FaRegTrashCan
                                                    className={cx('icon-trash')}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setData({ ...data, cv: null });
                                                    }}
                                                />
                                            )}
                                            <button className={cx('btn-upload')}>Chọn CV</button>
                                        </div>
                                    </div>
                                    <div className={cx('form-info')}>
                                        <div className={cx('form-info-header')}>
                                            <div className={cx('form-info-title')}>Vui lòng nhập đầy đủ thông tin chi tiết</div>
                                            <div className={cx('form-info-note')}>(*) Thông tin bắt buộc.</div>
                                        </div>
                                        <div className={cx('form-info-content')}>
                                            <div className={cx('form-info-item')}>
                                                <label htmlFor="name" className={cx('label')}>
                                                    Họ và tên
                                                    <span className={cx('danger')}>&nbsp;*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className={cx('input', error.name && 'error')}
                                                    placeholder="Họ tên hiển thị với NTD"
                                                    value={data.name}
                                                    onChange={(e) => {
                                                        if (error.name) setError({ ...error, name: '' });
                                                        setData({ ...data, name: e.target.value });
                                                    }}
                                                />
                                                <p className={cx('error-message', error.name && 'active')}>
                                                    {error.name && <span className={cx('error')}>{error.name}</span>}
                                                </p>
                                            </div>
                                            <div className={cx('form-info-group')}>
                                                <div className={cx('form-info-item')}>
                                                    <label htmlFor="email" className={cx('label')}>
                                                        Email
                                                        <span className={cx('danger')}>&nbsp;*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        className={cx('input', error.email && 'error')}
                                                        placeholder="Email hiển thị với NTD"
                                                        value={data.email}
                                                        onChange={(e) => {
                                                            if (error.email) setError({ ...error, email: '' });
                                                            setData({ ...data, email: e.target.value });
                                                        }}
                                                    />
                                                    <p className={cx('error-message', error.email && 'active')}>
                                                        {error.email && <span className={cx('error')}>{error.email}</span>}
                                                    </p>
                                                </div>
                                                <div className={cx('form-info-item')}>
                                                    <label htmlFor="phone" className={cx('label')}>
                                                        Số điện thoại
                                                        <span className={cx('danger')}>&nbsp;*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        className={cx('input', error.phone && 'error')}
                                                        placeholder="Số điện thoại hiển thị với NTD"
                                                        value={data.phone}
                                                        onChange={(e) => {
                                                            if (error.phone) setError({ ...error, phone: '' });
                                                            setData({ ...data, phone: e.target.value });
                                                        }}
                                                    />
                                                    <p className={cx('error-message', error.phone && 'active')}>
                                                        {error.phone && <span className={cx('error')}>{error.phone}</span>}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-tab-cover-letter')}>
                            <div className={cx('tab-title')}>
                                <FaFeatherPointed className={cx('icon-feather')} />
                                <span className={cx('text')}>Thư giới thiệu:</span>
                            </div>
                            <div className={cx('tab-desc')}>
                                Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                            </div>
                            <div className={cx('cover-letter')}>
                                <textarea
                                    className={cx('textarea')}
                                    rows={3}
                                    id="cover-letter"
                                    name="cover-letter"
                                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                                    value={data.coverLetter}
                                    onChange={(e) => setData({ ...data, coverLetter: e.target.value })}
                                />
                                <TippyText content="Sửa" placement="top" className={cx('tippy')}>
                                    <label htmlFor="cover-letter" className={cx('label')} onClick={handleFocusArea}>
                                        <FaPen className={cx('icon')} />
                                    </label>
                                </TippyText>
                            </div>
                        </div>
                    </div>
                    <div className={cx('note')}>
                        <div className={cx('note-box')}>
                            <h4 className={cx('note-header')}>
                                <FaExclamationTriangle className={cx('icon')} />
                                Lưu ý:
                            </h4>
                            <div className={cx('note-content')}>
                                <p className={cx('note-item')}>
                                    <span className={cx('note-text')}>
                                        TVNow khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị
                                        trí việc làm trước khi ứng tuyển. <br />
                                        Ứng viên cần có trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng
                                        ngờ của nhà tuyển dụng, hãy báo cáo ngay cho TVNow qua email{' '}
                                        <a href="mailto:tungong@email.com" className={cx('note-link')} target="_top">
                                            tungong@email.com
                                        </a>{' '}
                                        để được hỗ trợ kịp thời.
                                    </span>
                                </p>
                                <p className={cx('note-item')}>
                                    <span className={cx('note-text')}>
                                        Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo{' '}
                                        <a href="/" className={cx('note-link')} target="_blank">
                                            tại đây
                                        </a>
                                        .
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className={cx('footer')}>
                    <button className={cx('btn-cancel')} onClick={handleHiddenModal}>
                        Hủy
                    </button>
                    <button className={cx('btn-apply')} onClick={handleSubmit}>
                        Nộp hồ sơ ứng tuyển
                    </button>
                </footer>
            </div>
        </div>
    );
};

ModalApplyComponent.propTypes = {
    job: PropTypes.object,
};

export default ModalApplyComponent;
