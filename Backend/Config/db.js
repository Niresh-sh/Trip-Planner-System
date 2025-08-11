import mongoose from "mongoose";
// function to connect to the database -> try and catch methods are used to handle the errors
const Connect = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database", error.message);
    }
}

export default Connect;