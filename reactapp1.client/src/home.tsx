import { useEffect, useState } from 'react';
import { getUsers, getAvatarUrl, deleteUser } from './services/ApiService'
import IdentityService from './services/IdentityService'
import './App.css'
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    roles: string[];    
    logins: number;
    lastLogin: string;
}

function Home() {
    const [users, setUsers] = useState<User[]>();

    const navigate = useNavigate();

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
                    {IdentityService.isInRole("admin") && <th>Last login</th>}
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id} onClick={async () => { navigate(`/profile/${user.id}`);}} className="clickable">
                        <td>{user.name}</td>
                        <td>{user.roles.map(role => <span key={role}>{role} </span>)}</td>
                        <td><img src={getAvatarUrl(user.id)} className="avatar" /></td>
                        <td>{user.logins}</td>
                        <td>{user.lastLogin}</td>
                        {(IdentityService.isInRole("admin") && IdentityService.Identity?.id != user.id) && <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>}
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

    async function handleDelete(id: string) {
        await deleteUser(id);
        setUsers(users?.filter(x => x.id != id));
    }
}

export default Home;
