import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.error('Error getting products: ', error)
        res.status(500).json({message: 'Error retrieving products.'})
    }
}

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        console.error('Error getting product: ', error)
        res.status(500).json({message: 'Error retrieving product.'})    
    }
}

const createProduct = async (req, res) => {
    const { name, price, description, itemsSold, category, image } = req.body
    const product = new Product({
        name, 
        price, 
        description, 
        itemsSold,
        category,
        image
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct);
    } catch (error) {
        console.log('Error creating product: ', error)
        res.status(400).json({message: 'Error creating product.'})
    }
}

const updateProduct = async (req, res) => {
    const { productId } = req.params
    const { name, description, price, category, imageUrl } = req.body

    try {  
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = {
            name : name || product.name,
            description : description || product.description,
            price : price || product.price,
            category : category || product.category,
            imageUrl : imageUrl || product.imageUrl,
        }
        const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        res.status(200).json(result); 
    } catch (error) {
        console.log('Error updating product: ', error)
        res.status(404).json({ message: 'Error updating product.'});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params
        await Product.findByIdAndDelete(productId)
        res.status(200).json({message: 'Product deleted successfully.'})
    } catch (error) {
        console.log('Error updating product: ', error)
        res.status(404).json({ message: 'Error deleting product.'}); 
    }
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
