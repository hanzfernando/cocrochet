const API_URL = '/api/users';
import { getToken} from '../utils/authUtil.js';

const signupUser = async (name, email, password) => {
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if(!res.ok) {
            throw new Error('Failed to signup user');
        }

        const data = res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during signup');
    }
}

const loginUser = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if(!res.ok) {
            throw new Error('Failed to login user');
        }

        const data = res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login');
    }
}

const getUserDetails = async (token) => {
    try {
        const res = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if(!res.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data = res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching user details');
    }
}


const changePassword = async (currentPassword, newPassword) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('User not authenticated');
        }

        const res = await fetch(`${API_URL}/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use your method of storing tokens
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to change password');
        }

        const data = await res.json();  // Added await here
        return data.message;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { 
    signupUser, 
    loginUser, 
    getUserDetails,
    changePassword 
};

