import React from 'react';
import './user-profile.scss';
import { useUser } from '../../context/userContext';
import { toast } from 'react-toastify';

const UserProfile = () => {

    const { user } = useUser();

    const handleSignOut = () => {
        localStorage.clear('setUser');
        toast.success('Sign out successfully!!!');
        setTimeout(() => {
            if(undefined !== typeof window && window.location && window.location.reload) {
                window.location.reload();
            }
        }, 1000);
    }

    return (
        <div className='user_profile_container'>
            <div className='profile'>{user && user.firstName && user.firstName.charAt(0).toUpperCase()}{user && user.lastName && user.lastName.charAt(0).toUpperCase()}</div>
            <div className='name'>{user.firstName} {user.lastName}</div>
            <div className='email'>{user.email}</div>
            <div className='btn_area' onClick={handleSignOut}>
                <button type='submit'>Sign out</button>
            </div>
        </div>
    );
}

export default UserProfile;