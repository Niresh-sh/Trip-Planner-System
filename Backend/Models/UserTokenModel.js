import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },  
}, {timestamps: true});

const UserTokenModel = mongoose.model("userToken", userTokenSchema);

export default UserTokenModel;
   