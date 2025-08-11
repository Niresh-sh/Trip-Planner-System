import dotenv from 'dotenv'
import express from 'express'
import UserRoute from './Routes/UserRoute.js';
import cors from 'cors';
import Connect from './Config/db.js';

dotenv.config();
const app = express()
const port = process.env.PORT || 5000

Connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const allowedOrigins = ['http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use('/api/users', UserRoute)
// app.use('',destination)
// app.use('',city)
// app.use('',plantrip)
app.get('/',(req,res) => {
    res.send("hello ! I'm Niresh Shakya ")
})

app.listen(port,() => {
    console.log(`listening on Port ${port}`);
})