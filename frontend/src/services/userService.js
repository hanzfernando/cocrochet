const API_URL = 'api/users';

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

export { 
    signupUser, 
    loginUser, 
    getUserDetails 
};

