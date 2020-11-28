import mongoose from 'mongoose';
 import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/userModel.js';

//fetch users
export const getUsers = async (req, res) => {
   try {
         const users = await userModel.find();
         res.status(200).json(users);
        
   } catch (error) {
       res.status(404).json({ message: error });
   }
    
}

//user registration 
export const createUser = async (req, res) => {
    let { firstname, lastname, email, password, role } = req.body;
    //validate
    if(!firstname || !lastname || !email || !password || !role)
        return res.status(400).json({msg : "Not all fields have been entered."});
    if(role === "Select")
        return res.status(400).json({msg : "Please select the Role."});
    if(role === 'Admin' || role === 'Agent')
        role = 'none';

    if(password.length < 6)
        return res.status(400).json({msg : "The password needs to be atleast 6 characters long."});
    const existingUser = await userModel.findOne({ email: email });
    if(existingUser)
    return res.status(400).json({msg : "An account with this user already exists."});

    const salt = await bcrypt.genSalt();
    const user = req.body;
    let hashpassword = req.body.password;
    hashpassword = await bcrypt.hash(hashpassword, salt);
    req.body.password = hashpassword;
   //res.json({user: user});
    res.json({
        user: {
        id: user._id,
        email: user.email,
        role: user.role,

        },
    })
   const newUser = new userModel(user);
   try {
       await newUser.save();
       res.status(201).json(newUser);
   } catch (error) {
       res.status(409).json({ message: error});
       
   }
    
}

//user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let role;
        //validate 
        if(!email || !password)
            return res.status(400).json({msg : "Not all fields have been entered."});
        const user = await userModel.findOne({ email: email });
        if(!user)
            return res.status(400).json({msg : "No account with this email has been registered."});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        return res.status(400).json({msg : "Invalid credentials."});
        const JWT_SECRET = 'role-base-secret-key';
        const token = jwt.sign({ id:user._id }, JWT_SECRET);
        res.json({
            token,
            user: {
            id: user._id,
            email: user.email,
            role: user.role,

            },
        })


    } catch (error) {
       res.status(409).json({ message: error});
        
    }
}

//delete
export const deleteUser =  async  (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.user);
        res.json(deleteUser);
    } catch (error) {
       res.status(409).json({ message: error});
        
    }
}

export const tokenIsValid = async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token)
            return res.json(false);
        const JWT_SECRET = 'role-base-secret-key';
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        if(!verifiedToken)
            return res.json(false);
        const user = await userModel.findById(verifiedToken.id);
        if(!user)
            return res.json(false);
        return res.json(true);
        
        
    } catch (error) {
       res.status(409).json({ message: error});
        
    }
}
