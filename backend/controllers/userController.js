import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)

        const token = generateToken(user._id, user.role)
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.signup(name, email, password)

        const token = generateToken(user._id, user.role)
        res.status(201).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { loginUser, signupUser, getUserDetails }