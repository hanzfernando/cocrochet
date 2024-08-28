import { useState, useRef } from 'react';
import { useProductContext } from '../hooks/useProductContext';
import { editProduct, getProducts } from '../services/productService.js';
import PropTypes from 'prop-types'
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';

const EditProduct = ({ onClose, editingProduct }) => {

    const [name, setName] = useState(editingProduct.name || '');
    const [price, setPrice] = useState(editingProduct.price || '');
    const [category, setCategory] = useState(editingProduct.category || '');
    const [description, setDescription] = useState(editingProduct.description || '');
    const [itemsSold, setItemsSold] = useState(editingProduct.itemsSold || '');
    const [image, setImage] = useState(editingProduct.image || null);
    const imageInputRef = useRef();

    const { dispatch } = useProductContext();

    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleItemsSoldChange = (e) => setItemsSold(e.target.value);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 1, 
                    maxWidthOrHeight: 1024,
                };
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onloadend = () => setImage(reader.result);
            } catch (error) {
                console.error('Error compressing image', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, price, description, category, itemsSold, image };
        try {
            await editProduct(editingProduct._id, newProduct);
            toast.success('Product edited');
            // Re-fetch products after successful creation
            const fetchedProducts = await getProducts();
            dispatch({ type: 'SET_PRODUCTS', payload: fetchedProducts });
            resetForm();
            onClose();  
        } catch (error) {
            console.error("Failed to create product", error);
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setItemsSold('');
        setImage('');
        imageInputRef.current.value = "";
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <form className="border border-1 relative p-10 bg-white rounded-xl font-roboto" onSubmit={handleSubmit}>
                <button onClick={onClose} className="absolute top-2 right-6 bg-red-500 text-white p-2 w-10 rounded-full m-4">X</button>
                <h2 className="text-2xl font-playfair mb-8">Edit Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="col-span-2 md:col-span-2 text-sm">
                        <label htmlFor="name" className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter product name"
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1 text-sm">
                        <label htmlFor="price" className="block font-medium">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder="Enter price"
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1 text-sm">
                        <label htmlFor="category" className="block font-medium">Product Category</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="headband">Headband</option>
                            <option value="keychain">Keychain</option>
                            <option value="bouquet">Bouquet</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="col-span-2 text-sm">
                        <label htmlFor="details" className="block font-medium">Product Details</label>
                        <textarea
                            id="details"
                            name="details"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter product details"
                            className="border p-2 rounded h-20 w-full"
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-2 text-sm">
                        <label htmlFor="itemsSold" className="block font-medium">Items Sold</label>
                        <input
                            type="number"
                            id="itemsSold"
                            name="itemsSold"
                            value={itemsSold}
                            onChange={handleItemsSoldChange}
                            placeholder="Enter items sold"
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1 text-sm">
                        <label htmlFor="image" className="block font-medium">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="border p-2 rounded w-full text-gray-500"
                            ref={imageInputRef}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1 text-sm">
                        <label htmlFor="image" className="block font-medium ">Preview Image</label>
                        <div className="mb-4 p-2 border rounded flex justify-center">
                            {image ? (
                                    <img src={image} alt="Current product" className="h-24 w-auto mb-2 md:h-32"/>
                                ) : (
                                    <span className="text-gray-500">No image selected</span>
                                )}
                        </div>
                    </div>
                    
                </div>
                <button type="submit" className="mt-8 bg-gold py-2 px-4 rounded w-full text-white" >
                    Edit Product
                </button>
            </form>
        </div>
    
    )
}

EditProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
    editingProduct: PropTypes.object,
}

export default EditProduct