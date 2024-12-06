interface User {
    id: number;
    name: string;
    role: string;
    date: string;
}

const userData: User[] = [
    { 
        id: 1, 
        name: 'Admin', 
        role: 'Admin', 
        date: '2023-10-01' 
    },
    { 
        id: 2, 
        name: 'Jane Smith', 
        role: 'User',
        date: '2023-10-02' 
    }
];

export default userData;