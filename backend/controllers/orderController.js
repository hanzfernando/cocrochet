import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

const calculateTotalAmount = (orderItemsWithPrice) => {
    return orderItemsWithPrice.reduce((total, item) => {
        total += item.quantity * item.price;
        return total;
    }, 0);
};

const placeOrder = async (req, res) => {
    const userId = req.user._id;
    const { orderItems, paymentMethod } = req.body;

    try {
        // Find the user's cart and populate product details
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.productId');

        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Cannot place order.' });
        }

        // Prepare order items with prices
        const orderItemsWithPrice = orderItems.map(orderItem => {
            const cartItem = cart.cartItems.find(item => item.productId._id.toString() === orderItem.productId.toString());
            if (cartItem) {
                return {
                    productId: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: cartItem.productId.price // Get the price from the cart item
                };
            }
            return null;
        }).filter(item => item !== null);

        // Calculate total amount
        const totalAmount = calculateTotalAmount(orderItemsWithPrice);

        // Create a new order
        const newOrder = new Order({
            user: userId,
            orderItems: orderItemsWithPrice,
            totalAmount,
            paymentMethod,
            orderStatus: 'pending', // Initial status
            paymentStatus: 'pending', // Initial payment status
        });

        // Save the order
        const savedOrder = await newOrder.save();

        // Update the cart: remove items that were ordered
        cart.cartItems = cart.cartItems.filter(cartItem => 
            !orderItems.some(orderItem => orderItem.productId.toString() === cartItem.productId._id.toString())
        );

        // Save the updated cart
        await cart.save();

        return res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error placing order: ', error);
        res.status(500).json({ message: 'Error placing order.' });
    }
};

const getOrders = async (req, res) => {
    const userId = req.user._id;
    const { role } = req.user;

    try {
        if (role === 'admin') {
            // Admin can get all orders
            const orders = await Order.find().populate('user').populate('orderItems.productId');
            return res.status(200).json(orders);
        } else if (role === 'user') {
            // User can get only their own orders
            const orders = await Order.find({ user: userId }).populate('orderItems.productId');
            return res.status(200).json(orders);
        } else {
            return res.status(403).json({ message: 'Unauthorized.' });
        }
    } catch (error) {
        console.error('Error fetching orders: ', error);
        res.status(500).json({ message: 'Error retrieving orders.' });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    const { role } = req.user;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId).populate('orderItems.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Role-based access control
        if (role === 'admin' || order.user.toString() === userId.toString()) {
            return res.status(200).json(order);
        } else {
            return res.status(403).json({ message: 'Unauthorized.' });
        }
    } catch (error) {
        console.error('Error getting order: ', error);
        res.status(500).json({ message: 'Error retrieving order.' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const { role } = req.user;

    try {
        // Validate input
        if (!orderStatus) {
            return res.status(400).json({ message: 'Order status must be provided.' });
        }

        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Role-based status update validation
        if (role === 'admin') {
            if (!['pending', 'processing', 'shipped', 'delivered'].includes(orderStatus)) {
                return res.status(400).json({ message: 'Invalid order status for admin.' });
            }
        } else if (role === 'user') {
            if (!['received', 'cancelled'].includes(orderStatus)) {
                return res.status(400).json({ message: 'Invalid order status for user.' });
            }
        } else {
            return res.status(403).json({ message: 'Unauthorized.' });
        }

        // Update order status
        order.orderStatus = orderStatus;

        // Save the updated order
        const updatedOrder = await order.save();

        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status: ', error);
        res.status(500).json({ message: 'Error updating order status.' });
    }
};

const updatePaymentStatus = async (req, res) => {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;
    const { role } = req.user;

    try {
        // Validate input
        if (!paymentStatus) {
            return res.status(400).json({ message: 'Payment status must be provided.' });
        }

        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Role-based payment status update validation
        if (role === 'admin') {
            if (!['pending', 'paid', 'failed'].includes(paymentStatus)) {
                return res.status(400).json({ message: 'Invalid payment status for admin.' });
            }
        } else {
            return res.status(403).json({ message: 'Unauthorized.' });
        }

        // Update payment status
        order.paymentStatus = paymentStatus;

        // Save the updated order
        const updatedOrder = await order.save();

        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating payment status: ', error);
        res.status(500).json({ message: 'Error updating payment status.' });
    }
};

export { getOrders, placeOrder, getOrderById, updateOrderStatus, updatePaymentStatus };
