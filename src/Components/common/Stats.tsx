import { FaUser } from 'react-icons/fa';

interface StatsProps {
    category: string;
    totalUsers: number;
}

const Stats = ({ category, totalUsers }:StatsProps) => {
    return (
        <div className="stats-card flex gap-10 bg-secondary py-5 px-9">
            <div className="icon-container rounded-full bg-[#00a8e8] p-5">
                <FaUser className="user-icon" style={{ fontSize: '30px', color: 'white' }} />
            </div>
            <div className="stats-info px-5 py-2">
                <h3>{category}</h3>
                <p>Total {category}: {totalUsers}</p>
            </div>
        </div>
    );
};

export default Stats;