import dotenv from 'dotenv'
import express from 'express'
import UserRoute from './Routes/UserRoute.js';
import cors from 'cors';
import Connect from './Config/db.js';
import { uploadProductImage } from './Middleware/Multer.js';
import CategoryRoute from './Routes/CategoryRoute.js';
import DestinationRoute from './Routes/DestinationRoute.js';
import GuideRoute from './Routes/GuideRoute.js';
import TripRoute from './Routes/TripRoute.js';
import BookingRoute from './Routes/BookingRoute.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 5000

Connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

// image upaload by multer
app.use("/uploads", async (req, res) => {
    try {
        const image = await uploadProductImage.single("image")(req, res);
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image: image
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
app.use("/api/users", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/destination", DestinationRoute);
app.use("/api/guide", GuideRoute);
app.use('/api/trip',TripRoute);
app.use('/api/booking', BookingRoute);

app.get('/',(req,res) => {
    res.send("hello ! I'm Niresh Shakya ")
})

app.listen(port,() => {
    console.log(`listening on Port ${port}`);
})