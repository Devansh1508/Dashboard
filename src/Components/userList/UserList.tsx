import React from 'react';
import './css/MemberList.css';
import Button from '../common/Button';

interface User {
    id: number;
    name: string;
    permission: string;
    role: string;
    email: string;
}

const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        permission: 'Admin',
        role: 'Manager',
        email: 'john.doe@example.com',
    },
    {
        id: 2,
        name: 'Jane Smith',
        permission: 'User',
        role: 'Developer',
        email: 'jane.smith@example.com',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        permission: 'User',
        role: 'Designer',
        email: 'alice.johnson@example.com',
    },
    {
        id: 4,
        name: 'Bob Brown',
        permission: 'Admin',
        role: 'CEO',
        email: 'bob.brown@example.com',
    },
    {
        id: 5,
        name: 'Charlie Davis',
        permission: 'User',
        role: 'Intern',
        email: 'charlie.davis@example.com',
    },
    // Add more users as needed
];


const MemberList: React.FC = () => {
    return (
        <div className='bg-secondary flex flex-col w-fit'>
            <h2 className='flex font-bold text-3xl justify-center'>Member Table</h2>
            <table>
                <thead>
                    <tr className='text-xl'>
                        <th className='table-cell-content'>Name</th>
                        <th className='table-cell-content'>Permission</th>
                        <th className='table-cell-content'>Role</th>
                        <th className='table-cell-content'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr className='table-row' key={user.id}>
                            <td className='table-cell-content table-name'>
                                <td className='table-row-thumbnail'>
                                    {user.name.split(' ').map(word => word[0]).join('')}
                                </td>
                            <td className='table-cell-content'>
                                <div>{user.name}</div>
                            </td>
                            </td>

                            <td className='table-cell-content'>{user.permission}</td>
                            <td className='table-cell-content'>{user.role}</td>
                            <td className='table-cell-content'>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-action-container">
                    <Button label='Next' onClick={() => console.log('Next clicked')} />
                    <Button label='Previous' onClick={() => console.log('Previous clicked')} />
                </div>
        </div>
    );
};

export default MemberList;
