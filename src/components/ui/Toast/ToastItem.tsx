import { 
    FaCheckCircle, 
    FaExclamationCircle, 
    FaInfoCircle, 
    FaExclamationTriangle, 
    FaTimes 
} from "react-icons/fa";
import style from './toast.module.scss';

// Definimos el tipo aquí o lo importamos
export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: () => void;
}

const icons = {
    success: <FaCheckCircle />,
    error: <FaExclamationCircle />,
    warning: <FaExclamationTriangle />,
    info: <FaInfoCircle />
};

const ToastItem = ({ type, message, onClose }: ToastProps) => {
    
    return (
        <div className={`${style.toast} ${style[type]}`} role="alert">
            <div className={style.icon}>
                {icons[type]}
            </div>
            
            <p className={style.message}>
                {message}
            </p>

            <button onClick={onClose} className={style.closeBtn} aria-label="Cerrar notificación">
                <FaTimes />
            </button>
        </div>
    );
};

export default ToastItem;