import mongoose from 'mongoose';

const agentSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: {
        type: Number,
        default:2
    }
});

const agentModel = mongoose.model('agentModel', agentSchema);
export default agentModel;