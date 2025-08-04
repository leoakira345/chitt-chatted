// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// --- Connect to MongoDB ---
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

// --- User Schema ---
const UserSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    country: { type: String },
    password: { type: String, required: true },
    googleId: { type: String },
    facebookId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// --- Message Schema ---
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    type: {
        type: String,
        enum: ['text', 'image', 'voice', 'gif'],
        default: 'text'
    },
    fileUrl: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// --- Friendship Schema ---
const FriendshipSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
});

// --- Models ---
const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);
const Friendship = mongoose.model('Friendship', FriendshipSchema);

// --- Export everything ---
module.exports = {
    connectDB,
    User,
    Message,
    Friendship
};
