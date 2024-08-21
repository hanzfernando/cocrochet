import express from 'express'
import dotenv from 'dotenv'
import logger from './middleware/logger.js'
import connectDB from './config/database.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import cors from 'cors'
// import { createAdminUser } from './models/userModel.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.json({ limit: '10mb' })); // Adjust as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use(logger)
app.use(cors({
    origin: 'http://localhost:7000', // Ensure this matches your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

connectDB()
    .then(async () => {
        // await createAdminUser()
        app.listen(PORT, () => {
            console.log("Server running on port", PORT)
        })
    })
    .catch((error) => {
        console.log("Error: ", error.message);
        process.exit(1)
    })