import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'

const initialState = {
    products: [],
    loading: false,
    error: null
}

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            }
        case 'CREATE_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
                error: null
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload)
            }

        default:
            return state;
    }
}

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { ProductContext, ProductProvider };