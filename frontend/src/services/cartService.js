const API_URL = '/api/cart';
import { getToken } from '../utils/authUtil.js';

const addToCart = async (productId, quantity) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to add to cart.');
        }
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity }),
        });

        if (!response.ok) {
            throw new Error('Error adding to cart.');
        }

        return response.json();
    } catch (error) {
        console.error('Error adding to cart: ', error);
        throw error;
    }
};

const getCart = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to view cart.');
        }
        const response = await fetch(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error retrieving cart.');
        }

        return response.json();
    } catch (error) {
        console.error('Error getting cart: ', error);
        throw error;
    }
};

const updateCartItem = async (productId, quantity) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to update cart item.');
        }
        const response = await fetch(`${API_URL}/${productId}`, { // productId in the URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
        });

        if (!response.ok) {
            throw new Error('Error updating cart item.');
        }

        return response.json(); // Return the updated item only
    } catch (error) {
        console.error('Error updating cart item: ', error);
        throw error;
    }
};

const deleteCartItem = async (productId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to delete cart item.');
        }
        const response = await fetch(`${API_URL}/${productId}`, { // productId in the URL
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting cart item.');
        }

        return response.json();
    } catch (error) {
        console.error('Error deleting cart item: ', error);
        throw error;
    }
};

export {
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem,
};
