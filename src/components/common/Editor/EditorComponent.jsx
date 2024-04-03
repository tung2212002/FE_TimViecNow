import classNames from 'classnames/bind';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import PropTypes from 'prop-types';

import './test.css';

const editorConfiguration = {
    placeholder: 'Nhập nội dung',

    toolbar: {
        // items: [
        //     'undo',
        //     'redo',
        //     'removeFormat',
        //     '|',
        //     'bold',
        //     'italic',
        //     'underline',
        //     '|',
        //     'specialCharacters',
        //     '|',
        //     'increaseIndent',
        //     'decreaseIndent',
        //     '|',
        //     'bulletedList',
        //     'numberedList',
        // ],
    },
    language: 'en',
};

const EditorComponent = ({ contentHTML, setContentHTML }) => {
    return (
        <div className="wrapper-editor">
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={contentHTML}
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContentHTML(data);
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
            />
        </div>
    );
};

EditorComponent.propTypes = {
    contentHTML: PropTypes.string,
    setContentHTML: PropTypes.func,
};

export default EditorComponent;
