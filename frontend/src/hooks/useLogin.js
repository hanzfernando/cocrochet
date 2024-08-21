import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { getUserDetails, loginUser } from '../services/userService';
import { setToken, getToken } from '../utils/authUtil';

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(email, password);
            setToken(data.token);

            // Verify the token
            const storedToken = getToken();
            console.log('storedToken', storedToken);

            const user = await getUserDetails(storedToken);

            dispatch({ type: 'LOGIN', payload: user });
            setLoading(false);
        } catch (error) {
            setError(error);    
            
        }
    
    }

    return { login, loading, error };
}

export { useLogin };