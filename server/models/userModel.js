import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: 6},
    role: {
        type: String,
        required: true,
        default: 'Customer'
    },
    
});

const userModel = mongoose.model('userModel', userSchema);
export default userModel;