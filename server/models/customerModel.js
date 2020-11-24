import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: {
        type: Number,
        default:1
    },
    
});

const customerModel = mongoose.model('customerModel', customerSchema);
export default customerModel;