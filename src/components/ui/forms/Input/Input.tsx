import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

// Extendemos las props nativas de un input HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

// forwardRef es OBLIGATORIO para que funcione {...register()}
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, id, ...props }, ref) => {
        
        // Generamos un ID seguro si no viene uno, para accesibilidad (label click)
        const inputId = id || props.name;

        return (
            <div className={styles.inputContainer}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                    </label>
                )}
                
                <div className={styles.inputWrapper}>
                    <input
                        ref={ref}
                        id={inputId}
                        className={`${styles.input} ${error ? styles.hasError : ''} ${className || ''}`}
                        {...props}
                    />
                </div>

                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';