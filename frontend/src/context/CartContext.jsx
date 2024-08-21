import { createContext, useReducer } from "react"
import PropTypes from 'prop-types'

const initialState = {
    cart : [],
    loading: false,
    error: null
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CART':
            // {console.log("cart state", state.cart)}

            return {
                ...state,
                cart: action.payload, // Ensure this is an array
                loading: false,
                error: null
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload],
                loading: false,
                error: null
            }
        case 'UPDATE_CART_ITEM':        
            // state.cart.cartItems.map(item => {
            //     console.log("item id", item.productId._id)
            //     console.log("action payload", action.payload.productId)
            // })
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: state.cart.cartItems.map(item =>
                        item.productId._id == action.payload.productId
                            ? { ...item, quantity: action.payload.quantity }
                            : item
                    )
                }
            };
            
        case 'DELETE_CART_ITEM':

            {console.log("cart state", state.cart.cartItems)}
            {console.log("action payload", action.payload)}
            
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: state.cart.cartItems.filter(item => 
                        item.productId._id !== action.payload)
                }
            };
        
            
        default:
            return state
    }
}


const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { CartContext, CartProvider }