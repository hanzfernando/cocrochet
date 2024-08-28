const API_URL = '/api/orders';
import { getToken } from '../utils/authUtil.js';

const placeOrder = async (orderItems, paymentMethod) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to place an order.');
        }
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ orderItems, paymentMethod }),
        });

        if (!response.ok) {
            throw new Error('Error placing order.');
        }

        return response.json(); 
    } catch (error) {
        console.error('Error placing order: ', error);
        throw error;
    }
};

const getOrders = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to view orders.');
        }
        const response = await fetch(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error retrieving orders.');
        }

        return response.json(); 
    } catch (error) {
        console.error('Error getting orders: ', error);
        throw error;
    }
};

const getOrderById = async (orderId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to view order.');
        }
        const response = await fetch(`${API_URL}/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error retrieving order.');
        }

        return response.json(); 
    } catch (error) {
        console.error('Error getting order: ', error);
        throw error;
    }
};

const updateOrderStatus = async (orderId, orderStatus) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to update order status.');
        }

        const response = await fetch(`${API_URL}/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ orderStatus }),
        });

        if (!response.ok) {
            throw new Error('Error updating order status.');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating order status: ', error);
        throw error;
    }
};

const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('You must be logged in to update payment status.');
        }

        const response = await fetch(`${API_URL}/${orderId}/payment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ paymentStatus }),
        });

        if (!response.ok) {
            throw new Error('Error updating payment status.');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating payment status: ', error);
        throw error;
    }
};

export {
    placeOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus
};
