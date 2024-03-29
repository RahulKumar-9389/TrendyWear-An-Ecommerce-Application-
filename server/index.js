// IMPORT PACKAGES
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';

//app
const app = express();
dotenv.config();


// PORT
const PORT = process.env.PORT || 4000;


// MIDDLEWARES
app.use(express.json());
app.use(cors());


// ROUTES
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/product', productRoute)



// connect to MONGODB
connectDB();


app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});