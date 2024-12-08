import { FaUser, FaUserShield, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import {motion} from 'framer-motion';

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
        <motion.div 
        className="bg-white max-sm:w-[40vw] rounded-[10px] flex-wrap max-xl:p-[12px] p-[20px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex gap-[20px] max-xl:flex max-xl:flex-col max-xl:items-center"
        whileHover={{ scale: 1.1 }}
        animate={{
            transition: { duration: 2 }
          }}
        >
            <div className="icon-containe rounded-full h-[75px] w-[75px] p-5" style={{ backgroundColor: iconBackgroundColor }}>
                {renderIcon()}
            </div>
            <div className="stats-info">
                <h3 className='font-semibold'>{category}</h3>
                <p>Total {category}: {totalUsers}</p>
            </div>
        </motion.div>
    );
};

export default Stats;