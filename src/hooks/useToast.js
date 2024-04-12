import { useDispatch, useSelector } from 'react-redux';
import { addToast, removeToast, selectToast } from '../redux/features/toast/toastSlice';

const useToast = () => {
    const dispatch = useDispatch();
    const toasts = useSelector(selectToast);

    const handleAddToast = (title, message, type) => {
        const newToast = {
            id: Math.random().toString(36).slice(2),
            title,
            message,
            type,
        };
        dispatch(addToast(newToast));
        setTimeout(() => {
            removeToast(newToast.id);
        }, 3000);
    };

    return {
        toasts,
        handleAddToast,
    };
};

export default useToast;
