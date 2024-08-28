import { FaPlus } from 'react-icons/fa'
import AddProduct from './AddProduct.jsx'
import EditProduct from './EditProduct.jsx';
import { useState, useEffect } from 'react';
import { useProductContext } from '../hooks/useProductContext';
import { getProducts, deleteProduct } from '../services/productService.js';
import DeleteProductConfirmation from './DeleteProductConfirmation.jsx';
import { toast } from 'react-toastify';
const ProductTable = () => {
    const { state, dispatch } = useProductContext();
    const { products } = state;
    const image = null;
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

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

    const handleAddProductClick = () => {
        setShowAddModal(true);
    };

    const handleEditProductClick = (product) => {
        setEditingProduct(product);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setEditingProduct(null);
    };

    const handleDeleteProductClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            dispatch({ type: 'DELETE_PRODUCT', payload: productToDelete._id });
            await deleteProduct(productToDelete._id);
            toast.success('Product deleted');
            handleCloseModal();
        }
    };

    return (
        <div className='border border-1 p-8'>
            <div className='block w-full flex justify-between items-center mb-6'>
                <h2 className="font-playfair text-2xl font-medium px-4">Product List</h2>
                <button className="py-2 px-4 rounded text-center border rounded font-roboto" onClick={handleAddProductClick}>
                    Add Product <FaPlus className='inline-block ml-2'/>
                </button>
            </div>

            <table className="min-w-full bg-white">
                <thead className='bg-gold-thin'>
                    <tr className='font-playfair text-left border-t border-b'>
                        <th className="px-6 py-3 font-semibold">Name</th>
                        <th className="px-6 py-3 font-semibold">Price</th>
                        <th className="px-6 py-3 font-semibold">Details</th>
                        <th className="px-6 py-3 font-semibold">Items Sold</th>
                        <th className="px-6 py-3 font-semibold">Image</th>
                        <th className="px-6 py-3 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => (
                        <tr key={product._id} className='border-b'>                       
                            <td className="py-2 px-4">{product.name}</td>
                            <td className="py-2 px-4">{product.price}</td>
                            <td className="py-2 px-4 max-w-36">{product.description}</td>
                            <td className="py-2 px-4">{product.itemsSold}</td>
                            <td className="py-2 px-4">
                                <div className='aspect-w-6 aspect-h-7 overflow-hidden'>
                                    <img src={product.image || image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                
                            </td>
                            <td className="py-2 px-4 text-sm text-white">
                                <button 
                                    className="bg-indigo-400 px-2 py-2 w-16 rounded text-center mr-1 mb-2 md:mb-1"
                                    onClick={() => handleEditProductClick(product)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-400 px-2 py-2 w-16 rounded text-center"
                                    onClick={() => handleDeleteProductClick(product)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddModal && (
                <div className="modal">
                    <AddProduct onClose={handleCloseModal} />
                </div>
            )}

            {showEditModal && editingProduct && (
                <div className="modal">
                    <EditProduct onClose={handleCloseModal} editingProduct={editingProduct} />
                </div>
            )}

            {showDeleteModal && productToDelete && (
                <DeleteProductConfirmation 
                    onClose={handleCloseModal} 
                    onConfirm={handleConfirmDelete} 
                    productToDelete={productToDelete}
                />
            )}

        </div>

        

    )
}

export default ProductTable