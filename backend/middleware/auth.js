import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

const authToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('_id role')
        next()
    } catch (error) {
        
    }
}

const requireAdmin = (req, res, next) => {
    const { role } = req.user
    if(role !== 'admin') {
        return res.status(401).json({ message: 'Access Denied' })
    }
    next()
}

export { authToken, requireAdmin }