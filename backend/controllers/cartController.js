import Cart from '../models/cartModel.js';

const initializeCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId, cartItems: [] });
        await cart.save();
    }
    return cart;
};

const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    // console.log('productId:...', productId._id);


    try {
        let cart = await initializeCart(userId);
        // cart.cartItems.find(item => 
        //     console.log('cartId...', item.productId._id))
        const existingProduct = cart.cartItems.find(item => item.productId._id == productId._id);
        
        if (existingProduct) {
            existingProduct.quantity += Number(quantity);
        } else {
            cart.cartItems.push({ productId, quantity });
        }

        cart = await cart.save();
        return res.status(201).json(cart);
    } catch (error) {
        console.error('Error adding to cart: ', error);
        res.status(500).json({ message: 'Error adding to cart.' });
    }
};

const getCart = async (req, res) => {
    const userId = req.user._id;
    try {
        let cart = await initializeCart(userId);
        cart = await Cart.findOne({ user: userId }).populate('cartItems.productId');
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error getting cart: ', error);
        res.status(500).json({ message: 'Error retrieving cart.' });
    }
};

const updateCartItem = async (req, res) => {
    const userId = req.user._id;
    const { quantity } = req.body;
    const { productId } = req.params;

    try {
        let cart = await initializeCart(userId);

        const existingProduct = cart.cartItems.find(item => item.productId == productId);
        if (existingProduct) {
            existingProduct.quantity = Number(quantity);
        } else {
            return res.status(404).json({ message: 'Product not in cart.' });
        }

        await cart.save();

        const updatedItem = {
            productId: existingProduct.productId,
            quantity: existingProduct.quantity,
            _id: existingProduct._id,
        };

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating cart item: ', error);
        res.status(500).json({ message: 'Error updating cart item.' });
    }
};

const deleteCartItem = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params; 

    try {
        let cart = await initializeCart(userId);

        cart.cartItems = cart.cartItems.filter(item => !item.productId.equals(productId));
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting cart item: ', error);
        res.status(500).json({ message: 'Error deleting cart item.' });
    }
};

export { 
    addToCart, 
    getCart, 
    updateCartItem, 
    deleteCartItem 
};
