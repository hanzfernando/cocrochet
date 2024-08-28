import ProductItem from './ProductItem.jsx'
import { useProductContext } from '../hooks/useProductContext.js';
import { useEffect } from 'react';
import { getProducts } from '../services/productService.js';

const ProductList = () => {

    const { state, dispatch } = useProductContext();
    const { products } = state;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                
                dispatch({ type: 'SET_PRODUCTS', payload: fetchedProducts });
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, [dispatch]);
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-w-7xl">
            {products && products.map((product) => (
                <ProductItem key={product._id} product={product} />
            ))}
        </div>
    );
  };
  
export default ProductList;
