import mongoose, { Schema } from 'mongoose';

/**
 * Create database scheme for Members
 */
const MemberScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    age: String,
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Member', MemberScheme);
