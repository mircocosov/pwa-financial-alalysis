import React from "react";
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
};

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ');

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...rest
}) => {
    return (
        <button
            className={cn(
                styles.button,
                styles[variant],
                styles[size],
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
};
