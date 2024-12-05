import React from 'react';
import { FaTachometerAlt, FaUserShield, FaUser } from 'react-icons/fa';
import './css/navbar.css';

const Navbar: React.FC = () => {
    const menuItems = [
        { icon: <FaTachometerAlt />, label: 'Dashboard' },
        { icon: <FaUserShield />, label: 'Admin' },
        { icon: <FaUser />, label: 'User' }
    ];

    return (
        <div className="navbar">
            <div className="active-page"></div>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;