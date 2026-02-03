import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import Connect from "./Config/db.js";
import initSocket from "./Socket.js";
import path from "path";

// routes
import UserRoute from "./Routes/UserRoute.js";
import CategoryRoute from "./Routes/CategoryRoute.js";
import DestinationRoute from "./Routes/DestinationRoute.js";
import GuideRoute from "./Routes/GuideRoute.js";
import TripRoute from "./Routes/TripRoute.js";
import BookingRoute from "./Routes/BookingRoute.js";
import StatsRoute from "./Routes/StatsRoute.js";
import AdminBookingRoute from "./Routes/AdminBookingRoute.js";
import ActivityRoute from "./Routes/ActivityRoute.js";
import AnalyticsRoute from "./Routes/AnalyticsRoute.js";
import PaymentRoute from "./Routes/PaymentRoute.js";
import CompleteBooking from "./Controller/CompletedBookingController.js";
import RecommendRoute from "./Routes/RecommendRoute.js";

// background job


dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = initSocket(httpServer);

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
Connect();
CompleteBooking();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let allowedOrigins = ["http://localhost:5173","https://trip-planner-system-1.onrender.com"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// static uploads (example)
app.use("/uploads", express.static("uploads"));

// mount routes
app.use("/api/users", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/destination", DestinationRoute);
app.use("/api/guide", GuideRoute);
app.use("/api/trip", TripRoute);
app.use("/api/booking", BookingRoute);
app.use("/api/stats", StatsRoute);
app.use("/api/adminbooking", AdminBookingRoute);
app.use("/api/activity", ActivityRoute);
app.use("/api/analytics", AnalyticsRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/recommend", RecommendRoute);


app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});


httpServer.listen(port, () => {
  console.log(`listening on Port ${port}`);
});

