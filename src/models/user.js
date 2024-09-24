import mongoose from "mongoose";
import { ROLES } from '../enums/roles.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  mobileNum: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  NIC: {
    type: String,
    // required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: [ROLES.USER, ROLES.ADMIN, ROLES.GUEST],
    default: ROLES.USER,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
