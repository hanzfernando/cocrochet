import express from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productContoller.js'

const router = express.Router()

// General Route
router.get('/', getProducts)
router.get('/:productId', getProduct)

// Protected Route
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router