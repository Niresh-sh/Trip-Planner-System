// username, email, password, role, createdAt, updatedAt, isVerified, 
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    }, 

}, {timestamps: true});

categorySchema.index({ name: 1 });

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;


