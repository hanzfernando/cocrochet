import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);

        // Generate token if user is found
        const token = generateToken(user._id, user.role);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};


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

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect current password' });
        }

        // Update the password field with the new plaintext password
        user.password = newPassword;

        // Save the updated user (pre('save') will handle hashing)
        await user.save();

        res.json({ msg: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};


export { loginUser, signupUser, getUserDetails, changePassword }