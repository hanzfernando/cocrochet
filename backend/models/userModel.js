import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
)

// Encrypt password before saving user
userSchema.pre('save', async function (next) {
    try {
        if(this.isModified('password')) {
            const salt = await bcrypt.genSalt(12)
            this.password = await bcrypt.hash(this.password, salt)
        }
    } catch (error) {
        next(error)
        
    }
})

userSchema.statics.signup = async function (name, email, password, role='user') {
    try {
        if(!name || !email || !password) {
            throw new Error('Please provide name, email, and password');
        }

        const exists = await this.findOne({ email })
        if(exists) {
            throw new Error('User with this email already exists');
        }

        const user = await this.create({ name, email, password, role })
        return user
    } catch (error) {
        console.log('Error signing up user', error)
        throw new Error(error.message);
    }
}

// Static method to login user
userSchema.statics.login = async function (email, password) {
    try {
        if(!email || !password) {
            throw new Error('Please provide email and password');
        }

        const user = await this.findOne({ email })
        if(!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error('Invalid email or password');
        }

        return user
    } catch (error) {
        console.log('Error loggin in user', error)
        throw new Error(error.message);
    }
}

// Admin -----------------------
// Static method to create an admin user
userSchema.statics.createAdminUser = async function(name, email, password) {
    try {
        // Check if the admin user already exists
        const existingAdmin = await this.findOne({ email, role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin);
            return existingAdmin;
        }

        // Create a new admin user using the signup method
        const admin = await this.signup(name, email, password, 'admin');

        console.log('Admin user created:', admin);
        return admin;
    } catch (error) {
        console.error('Error creating admin user:', error);
        throw new Error('Failed to create admin user');
    }
};

// Admin -----------------------
// Function to create an admin user (invoke this function during app initialization or as needed)
const createAdminUser = async () => {
    try {
        await User.createAdminUser('Admin', 'admin@gmail.com', 'securepassword');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};


const User = mongoose.model('User', userSchema)

export { createAdminUser };
export default User

