import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/user.js';
import sendVerificationEmail from '../../utils/send_mail.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: 'Please verify your email before logging in.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 6000
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        name: user.name,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const register = async (req, res) => {
  const { email, mobileNum, name, NIC, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      mobileNum,
      name,
      NIC,
      password: hashedPassword,
      isVerified: false,
    });

    const savedUser = await newUser.save();

    // Send verification email with link
    await sendVerificationEmail(email, savedUser._id);

    res.status(201).json({ success: true, message: 'User registered. Please check your email for verification.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export async function check_auth(req, res) {
  // req?.cookies ||
  res.status(201).send("cookie not found")
}

export const verifyEmailById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User is already verified' });
    }

    // Update the user's isVerified status
    user.isVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
