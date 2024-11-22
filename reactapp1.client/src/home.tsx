import { useEffect, useState } from 'react';
import { getUsers, buildUrl } from './ApiService'
import './App.css'

interface User {
    id: string;
    name: string;
    roles: string[];    
    logins: number;
    lastLogin: string;
}

function Home() {
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        populateData();
    }, []);

    const contents = users === undefined
        ? <p>Loading... </p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Avatar</th>
                    <th>Logins</th>
                    <th>Last login</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.name }</td>
                        <td>{user.roles.map(role => <span>{role} </span>)}</td>
                        <td><img src={buildUrl(`/users/${user.id}/image`)} className="avatar"/></td>
                        <td>{user.logins}</td>
                        <td>{user.lastLogin}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Users list</h1>            
            {contents}
        </div>
    );

    async function populateData() {
        const response = await getUsers();
        setUsers(response);
    }
}

export default Home;

