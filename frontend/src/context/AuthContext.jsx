import { createContext, useReducer, useEffect } from 'react'
import { getUserDetails } from '../services/userService'
import { getToken } from '../utils/authUtil'
import { useState } from 'react'
import PropTypes from 'prop-types'

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken()
        // console.log("Token in AUTHCONTEXT: ", token)
        if(token){
            getUserDetails(token)
                .then(user => {
                    dispatch({ type: 'LOGIN', payload: user });
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch user details:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [])

    // console.log('AuthContext', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { AuthContext, AuthProvider }