interface User {
    id: number;
    name: string;
    role: string;
    date: string;
    active: boolean;
}

const userData: User[] = [
    { 
        id: 1, 
        name: 'John Doe', 
        role: 'Admin', 
        date: '2023-10-01' ,
        active: true
    },
    { 
        id: 2, 
        name: 'Jane Smith', 
        role: 'User',
        date: '2023-10-02' ,
        active: false
    }
];

export default userData;