import mongoose from 'mongoose';
 
import adminModel from '../models/adminModel.js';
import agentModel from '../models/agentModel.js';
import customerModel from '../models/customerModel.js';


export const getUsers = async (req, res) => {
//    try {
//     //    const postMessages = await PostMessage.find();
//     //    res.status(200).json(postMessages);
//    } catch (error) {
//        res.status(404).json({ message: error });
//    }
    res.json({
        message: "working"
    })
}

export const createAdmin = async (req, res) => {
//    const post = req.body;
//    res.json({userpost: post});
//    const newPost = new PostMessage(post);
//    try {
//        await newPost.save();
//        res.status(201).json(newPost);
//    } catch (error) {
//        res.status(409).json({ message: error});
       
//    }
res.json({
    message: "admin created"
})
}


export const createAgent = async (req, res) => {
//    const { id: _id } = req.params;
//    const post = req.body;

//    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
//    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

//    res.json(updatedPost);
}