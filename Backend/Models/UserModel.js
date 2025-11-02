import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false, // not all Google responses have this
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // allow Google logins without password
  },
  google_id: {
    type: String,
    unique: true,
    sparse: true, // allows multiple users without google_id
  },
  is_google_account: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const UserModel = mongoose.model('User', usersSchema);

export default UserModel;
