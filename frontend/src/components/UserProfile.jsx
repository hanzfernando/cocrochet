import ChangePasswordForm from './ChangePasswordForm.jsx'
import { useAuthContext } from '../hooks/useAuthContext.js'; 

const UserProfile = () => {
    const { user } = useAuthContext();

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className='font-roboto'>
                <h1 className="text-2xl font-bold font-playfair mb-4">Profile</h1>
                <p className="mb-2">
                    <span className='font-medium'>Name: </span> {user.name}
                </p>
                <p className="mb-2">
                    <span className='font-medium'>Email: </span> {user.email}
                </p>
                <p className="mb-4">
                    <span className='font-medium'>Role: </span> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>

                <ChangePasswordForm /> {/* Add the password change form here */}
            </div>
            
        </>
    )
}

export default UserProfile