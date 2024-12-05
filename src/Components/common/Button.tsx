import React from 'react';
import './css/Button.css';

interface ButtonProps {
    onClick: () => void;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label}) => {
    return (
        <button className='bg-tertiary custom-button' onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;