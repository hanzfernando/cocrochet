import { useState, useEffect } from 'react';
import { useCartContext } from '../hooks/useCartContext.js';
import { getCart, updateCartItem, deleteCartItem } from '../services/cartService.js';
import { placeOrder } from '../services/orderServices.js';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { state, dispatch } = useCartContext();
  const { cart } = state;
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cashondelivery'); // Default payment method
  
  useEffect(() => {
      const fetchCart = async () => {
          try {
              const fetchedCart = await getCart();
              dispatch({ type: 'SET_CART', payload: fetchedCart });
          } catch (error) {
              console.error('Error getting cart: ', error);
          }
      };
      fetchCart();
  }, [dispatch]);

  const handleCheckboxChange = (id) => {
      if (selectedOrders.includes(id)) {
          setSelectedOrders(selectedOrders.filter(productId => productId !== id));
      } else {
          setSelectedOrders([...selectedOrders, id]);
      }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const quantity = Number(newQuantity);

    if (quantity <= 0) {
        console.error('Quantity must be greater than zero');
        return;
    }

    try {
        const updatedItem = await updateCartItem(productId, quantity);
        dispatch({ type: 'UPDATE_CART_ITEM', payload: updatedItem });
    } catch (error) {
        console.error('Error updating cart item: ', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
        await deleteCartItem(productId);
        toast.success('Item deleted');
        dispatch({ type: 'DELETE_CART_ITEM', payload: productId });
    } catch (error) {
        console.error('Error deleting cart item: ', error);
    }
  };

  const handlePlaceOrder = async () => {
    const orders = cart.cartItems.filter(item => selectedOrders.includes(item.productId._id));
    const orderDetails = orders.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
    }));
    try {
        await placeOrder(orderDetails, paymentMethod);
        toast.success('Order placed successfully');
        setSelectedOrders([]); // Clear selected orders after placing the order
         // Fetch the updated cart to reflect the changes
        const updatedCart = await getCart();
        dispatch({ type: 'SET_CART', payload: updatedCart });
    } catch (error) {
        toast.error('Error placing order');
        console.error('Error placing order: ', error);
    }
  };

  const totalAmount = selectedOrders.reduce((total, selectedId) => {
    const item = cart.cartItems.find(item => item.productId._id === selectedId);
    if (item) {
        return total + (item.productId.price * item.quantity);
    }
    return total;
  }, 0);

  return (
    <div className="w-full max-w-7xl m-auto px-4 my-12">
      <div className='p-8 border'>
        <div className='block w-full flex justify-between items-center mb-6'>
          <h2 className="font-playfair text-2xl font-medium px-4">My Cart</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className='text-left border-t border-b'>
              <th className="px-4 py-2 font-medium">Select</th>
              <th className="px-4 py-2 font-medium">Product Name</th>
              <th className="px-4 py-2 font-medium">Product Image</th>
              <th className="px-4 py-2 font-medium">Order Quantity</th>
              <th className="px-4 py-2 font-medium">Order Price</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cart.cartItems) && cart.cartItems.map(item => (
              <tr className=' border-b' key={item._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(item.productId._id)}
                    onChange={() => handleCheckboxChange(item.productId._id)}
                  />
                </td>
                <td className="px-4 py-2">{item.productId.name}</td>
                <td className="px-4 py-2 ">
                  <div className='aspect-w-6 aspect-h-7 overflow-hidden'>
                    <img src={item.productId.image} alt={item.productId.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) => handleQuantityChange(item.productId._id, e.target.value)}
                    className="w-16 p-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">₱{(item.productId.price * item.quantity).toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.productId._id)}
                    className="bg-red-400 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex flex-col items-end'>
          <div className="mt-4">
              <span className="font-medium">Total Amount: </span>₱{totalAmount.toFixed(2)}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setPaymentMethod('gcash')}
              className={`px-4 py-2 rounded ${paymentMethod === 'gcash' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              GCash
            </button>
            <button
              onClick={() => setPaymentMethod('cashondelivery')}
              className={`px-4 py-2 rounded ${paymentMethod === 'cashondelivery' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Cash on Delivery
            </button>
          </div>
          <button
              onClick={handlePlaceOrder}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-44"
          >
              Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
