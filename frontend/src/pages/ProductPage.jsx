import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/productService.js';
import { addToCart } from '../services/cartService.js';
import ProductLoadingCard from '../components/ProductLoadingCard.jsx';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.js'; // Import useAuthContext

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { user } = useAuthContext(); // Get user from context

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProduct(productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(product, Number(quantity));
            toast.success('Added to cart');
            clearQuantity();
        } catch (error) {
            console.error('Error adding to cart', error);   
        }
    };

    const clearQuantity = () => {
        setQuantity(1);
    };

    // Conditional rendering to avoid errors while the product data is loading
    if (!product) {
        return <ProductLoadingCard />;
    }

    // Check if the user role is admin
    const isAdmin = user?.role === 'admin'; // Assuming role is available on user object

    return (
        <div className="bg-gray-extralight">
            <div className="w-full max-w-6xl mx-auto px-10 p-8">
                <div className="flex flex-col md:flex-row bg-white border rounded-xl font-roboto">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-w-3 aspect-h-4"> {/* Adjusted aspect ratio */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover rounded-lg shadow-md w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-16 w-full md:w-1/2 p-8 ">
                        <div className=''>
                            <h1 className="text-xl md:text-2xl font-playfair font-bold mb-4">{product.name}</h1>
                            <p className="md:text-base">Product Description:</p>
                            <p className="text-sm md:text-base font-thin mb-4">{product.description}</p>
                            <p className="text-gray-700 mb-4">{product.details}</p>
                            <p className="block bg-gold-thin p-2 text-2xl text-gold-dark font-medium mb-2">₱{product.price}</p>
                            <p className="text-sm md:text-base font-thin mb-4">Items Sold: {product.itemsSold}</p>
                            <label className='font-thin md:text-base text-sm' htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                max="10"
                                className="w-1/4 border border-gray-300 rounded p-2 mb-4 mx-4 h-8" 
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                        </div>
                        <div className=""> {/* Ensure button stays at the bottom */}
                            <button
                                onClick={handleAddToCart}
                                className={`bg-gold-extralight hover:bg-gold-light text-white font-medium py-2 px-4 rounded w-full ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                                disabled={isAdmin}
                            >
                                {isAdmin ? 'Admin Cannot Purchase' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
