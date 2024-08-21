import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { signupUser, getUserDetails } from '../services/userService';
import { setToken, getToken } from '../utils/authUtil';

const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const data = await signupUser(name, email, password);
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
    return { signup, loading, error };
}

export { useSignup };