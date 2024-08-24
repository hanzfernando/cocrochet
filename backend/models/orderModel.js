import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: { 
                    type: Number, 
                    required: true,
                    min: 1,
                },
            }
        ],
        totalAmount : {
            type: Number,
            required: true,
            default: 0.0
        },
        orderStatus: {
            type: String,
            required: true,
            enum: [
                'pending',
                'processing',
                'shipped',
                'delivered',
                'received',
                'cancelled'
            ],
            default: 'pending'
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['gcash', 'cashondelivery'],
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        },
        
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema);
export default Order;