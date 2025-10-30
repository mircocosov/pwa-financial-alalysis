import React from "react";
import styles from './Input.module.scss';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...rest }) => (
    <input className={[styles.input, className].filter(Boolean).join(' ')} {...rest} />
);
