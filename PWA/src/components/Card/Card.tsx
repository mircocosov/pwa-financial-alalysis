import React from "react";
import styles from './Card.module.scss';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'primary' | 'outline' | 'ghost';
};

export const Card: React.FC<CardProps> = ({
    children,
    className,
    variant = 'primary',
    ...rest
}) => (
    <div className={[styles.card, styles[variant], className].filter(Boolean).join(' ')} {...rest}>
        {children}
    </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={[styles.header, className].filter(Boolean).join(' ')} {...rest}>{children}</div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...rest }) => (
    <h4 className={[styles.title, className].filter(Boolean).join(' ')} {...rest}>{children}</h4>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={[styles.content, className].filter(Boolean).join(' ')} {...rest}>{children}</div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={[styles.footer, className].filter(Boolean).join(' ')} {...rest}>{children}</div>
);
