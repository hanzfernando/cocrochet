import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, updatePaymentStatus } from '../services/orderServices.js';
import { useAuthContext } from '../hooks/useAuthContext.js'; 

const OrderTable = () => {
    const { user } = useAuthContext(); 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderStatusChange = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, orderStatus: status } : order
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePaymentStatusChange = async (orderId, status) => {
        try {
            await updatePaymentStatus(orderId, status);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, paymentStatus: status } : order
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <table className="min-w-full divide-y divide-gray-200 font-roboto border">
            <thead className="bg-gold-thin">
                <tr className='font-playfair'>
                    <th className="px-6 py-3 text-left text-sm tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-sm tracking-wider">Order Items</th>
                    <th className="px-6 py-3 text-left text-sm tracking-wider">Total Amount</th>
                    <th className="px-6 py-3 text-left text-sm tracking-wider">Order Status</th>
                    <th className="px-6 py-3 text-left text-sm tracking-wider">Payment Method</th>
                    <th className="px-6 py-3 text-left text-sm tracking-wider">Payment Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                    <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-2">
                                {order.orderItems.map(item => (
                                    <div key={item.productId._id} className="flex items-center space-x-4">
                                        <div className="relative w-32 h-40 overflow-hidden rounded">
                                            <img
                                                className="absolute inset-0 object-cover w-full h-full"
                                                src={item.productId.image}
                                                alt={item.productId.name}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{item.productId.name}</div>
                                            <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                                            <div className="text-sm text-gray-500">Price: PHP {item.productId.price}</div>
                                            <div className="text-sm text-gray-500">Total: PHP {item.quantity * item.productId.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PHP {order.totalAmount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                                {['pending', 'processing', 'shipped', 'delivered', 'received', 'cancelled'].map(status => {
                                    const isDisabled = 
                                        (user.role === 'admin' && status === 'received') ||
                                        (user.role === 'admin' && status === 'cancelled') ||
                                        (user.role === 'user' && (status === 'pending' || status === 'processing' || status === 'shipped' || status === 'delivered')) ||
                                        (user.role === 'user' && status === 'received' && order.orderStatus !== 'delivered') ||
                                        (user.role === 'user' && status === 'cancelled' && !(order.orderStatus === 'pending' || order.orderStatus === 'processing'));
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                if (!isDisabled) {
                                                    handleOrderStatusChange(order._id, status);
                                                }
                                            }}
                                            className={`px-3 py-1 text-sm font-medium rounded ${order.orderStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isDisabled}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    );
                                })}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentMethod}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                                {['pending', 'paid', 'failed'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handlePaymentStatusChange(order._id, status)}
                                        className={`px-3 py-1 text-sm font-medium rounded ${order.paymentStatus === status ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} ${user.role === 'user' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={user.role === 'user'}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrderTable;
