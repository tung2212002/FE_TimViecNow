import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
    useLayoutEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = 'TVNow - Tìm kiếm việc làm ngay';
        }
    }, [title]);
};

export default useDocumentTitle;
