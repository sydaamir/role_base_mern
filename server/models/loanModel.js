import mongoose from 'mongoose';

const loanSchema = mongoose.Schema({
        customerId: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
            default: 'none',
        },
        emi: {
            type: Number,
            required: true,
            default: 0
        },
        interest: {
            type: Number,
            required: true,
            default: 0
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        tenure: {
            type: String,
            required: true,
            default: ''
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    });

const loanModel = mongoose.model('loanModel', loanSchema);
export default loanModel;