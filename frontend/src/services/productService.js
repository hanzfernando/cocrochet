const API_URL = '/api/products';

const getProducts = async () => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        return await res.json(); // Ensure parsing the response as JSON
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
};

const getProduct = async (productId) => {
    try {
        const res = await fetch(`${API_URL}/${productId}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch product with ID ${productId}`);
        }
        return await res.json(); // Ensure parsing the response as JSON
    } catch (error) {
        console.error(`Error getting product with ID ${productId}:`, error);
        throw error;
    }
};

const createProduct = async (product) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!res.ok) {
            throw new Error('Failed to add product');
        }

        return await res.json(); // Ensure parsing the response as JSON
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const editProduct = async (productId, product) => {
    try {
        const res = await fetch(`${API_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!res.ok) {
            throw new Error('Failed to edit product');
        }

        return await res.json(); // Ensure parsing the response as JSON
    } catch (error) {
        console.error("Error editing product:", error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const res = await fetch(`${API_URL}/${productId}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Failed to delete product');
        }

        return await res.json(); // Ensure parsing the response as JSON
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export { 
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
};
