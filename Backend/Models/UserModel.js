import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    // role:{
    //     type: String,
    //     enum: ["admin","user"],
    //     default: "user"
    // },
    // isVerified:{
    //     type: Boolean,
    //     default: false,
    // },   
}, {timestamps: true});

const UserModel = mongoose.model("users", usersSchema);

export default UserModel;