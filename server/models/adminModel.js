import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: {
        type: Number,
        default:3
    }
});

const adminModel = mongoose.model('adminModel', adminSchema);
export default adminModel;