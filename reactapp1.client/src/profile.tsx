import { useEffect, useState } from 'react';
import { User } from './dto'
import { getUser, getAvatarUrl, updateAvatar, getRoles, updateUserRole } from './services/ApiService'
import IdentityService from './services/IdentityService'
import './profile.css'
import { useParams } from 'react-router-dom';

function Profile(){

    const [userProfile, setUserProfile] = useState<User>();    
    const [roles, setRoles] = useState<string[]>([]);    
    const [selectedImage, setSelectedImage] = useState<string>();
    const params = useParams();
    const [id, setId] = useState<string>("");
    useEffect(() => {          
        loadData();
    }, []);

    async function loadData() {        
        const id = params.id ?? IdentityService.Identity?.id;
        setId(id as string);
        const data = await getUser(id);        
        setUserProfile(data);
        const r = await getRoles();
        setRoles(r);
        setSelectedImage(getAvatarUrl(data.id));
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
            
        if (!selectedFile) {            
            return;
        }

        if (selectedFile.size > 20480)
            alert(`File size more then 20kB.`);
        
        try {
            const response = await updateAvatar(selectedFile);            
            console.log(response);            
            setSelectedImage(getAvatarUrl(userProfile!.id));            
        } catch (error) {
           // setUploadStatus(`Ошибка: ${error.message}`);
        }
    };

    const handleRoleChange = async (role: string, checked: boolean) => {
        await updateUserRole(userProfile!.id, role, checked);
        const data = await getUser(id);        
        setUserProfile(data);
    };

    const contents = userProfile === undefined
        ? <p>Loading... </p>
        : <div>            
            <img src={selectedImage} alt="Avatar" className="avatar_big" />
            {IdentityService.Identity?.id == id &&
                <p><strong>Update image:</strong>
                    <input
                        type="file"
                        name="avatar"
                        accept=".svg, .png, .jpeg, .jpg"
                        // Event handler to capture file selection and update the state
                        onChange={handleFileChange}
                    />
                </p>
            }
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Last login:</strong> {userProfile.lastLogin}</p>
            <div className="roles-container"><strong>Roles:</strong>
                {roles.map(role => (
                <div key={role}>
                    <label> 
                        <input disabled={!IdentityService.isInRole("admin")}
                            type="checkbox"
                            checked={userProfile.roles.includes(role)}
                                onChange={(e) => handleRoleChange(role, e.target.checked)}
                            />  
                            {role}
                    </label>
                </div>
            ))}</div>
          </div>

    return (
        <div className="container profile">
            <h1 className="title">User profile</h1>
            <div className="infoBox">
                { contents}
            </div>
            <div className="buttonContainer">
                {/*<button style={styles.button} onClick={handleEdit}>Редактировать профиль</button>*/}
                {/*<button style={styles.button} onClick={handleLogout}>Выход</button>*/}
            </div>
        </div>
    );
};

export default Profile;