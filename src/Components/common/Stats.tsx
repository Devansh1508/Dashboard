import { FaUser, FaUserShield, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import './css/stats.css';

interface StatsProps {
    category: string;
    totalUsers: number;
    iconBackgroundColor: string;
}

const Stats = ({ category, totalUsers, iconBackgroundColor }: StatsProps) => {
    const renderIcon = () => {
        switch (category.toLowerCase()) {
            case 'admin':
                return <FaUserShield className="user-icon"/>;
            case 'active':
                return <FaUserCheck className="user-icon"  />;
            case 'inactive':
                return <FaUserTimes className="user-icon"/>;
            case 'user':
            default:
                return <FaUser className="user-icon"/>;
        }
    };

    return (
        <div className="stats-card bg-secondary">
            <div className="icon-container rounded-full p-5" style={{ backgroundColor: iconBackgroundColor }}>
                {renderIcon()}
            </div>
            <div className="stats-info">
                <h3>{category}</h3>
                <p>Total {category}: {totalUsers}</p>
            </div>
        </div>
    );
};

export default Stats;