import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String},
    itemsSold: { type: Number },
    category: { 
        type: String, 
        required: true, 
        enum: ['keychain', 'bouquet', 'headband', 'other']
    },
    image : { type: String},
},
{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product