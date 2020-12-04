import mongoose from 'mongoose';
 import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/userModel.js';
import loanModel from '../models/loanModel.js';

//fetch users
export const getUsers = async (req, res) => {
   try {
         const users = await userModel.find();
         res.status(200).json(users);
        
   } catch (error) {
       res.status(404).json({ message: error });
   }
    
}

//fetch single user from userModel
export const fetchUser = async (req, res) => {
    try {
        const { id: _id } = req.params;
          const user = await userModel.findById(_id);
          res.status(200).json([
                {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                }
          ]);
         
    } catch (error) {
        
        res.status(404).json({ message: error });
    }
     
 }

 //fetch all loan users
 export const getLoanUsers = async (req, res) => {
    try {
          const loanUsers = await loanModel.find();
          res.status(200).json(loanUsers);
         
    } catch (error) {
        res.status(404).json({ message: error });
    }
     
 }

 //fetch single user from loanModel
 export const fetchLoanUser = async (req, res) => {
    try {
        const { id: _id } = req.params;
          const user = await loanModel.findById(_id);
          res.status(200).json([
                {
                    id: user._id,
                    customerId: user.customerId,
                    state: user.state,
                    interest: user.interest,
                    emi: user.emi,
                    tenure: user.tenure,
                }
          ]);
         
    } catch (error) {
        
        res.status(404).json({ message: error });
    }
     
 }

 //loan approval
 export const approveLoan = async (req, res) => {
    const { id: customerId } = req.params;
    const state = 'Approved';
        let user;
        const loanUsers = await loanModel.find();
        for(let i=0;i<loanUsers.length;i++)
        {
            if(loanUsers[i].customerId === customerId) {
                if(loanUsers[i].state === 'New'){
                user = await loanModel.findByIdAndUpdate(loanUsers[i]._id, { state }, { new: true }) 
                res.status(200).json([
                    {
                        id: user._id,
                        customerId: user.customerId,
                        state: user.state,
                        interest: user.interest,
                        emi: user.emi,
                        tenure: user.tenure,
                    }
              ]);
            }
            }
        }
       

    }


  //loan Rejection
  export const rejectLoan = async (req, res) => {
    const { id: customerId } = req.params;
    const state = 'Rejected';
        let user;
        const loanUsers = await loanModel.find();
        for(let i=0;i<loanUsers.length;i++)
        {
            if(loanUsers[i].customerId === customerId) {
                user = await loanModel.findByIdAndUpdate(loanUsers[i]._id, { state }, { new: true }) 
                res.status(200).json([
                    {
                        id: user._id,
                        customerId: user.customerId,
                        state: user.state,
                        interest: user.interest,
                        emi: user.emi,
                        tenure: user.tenure,
                    }
              ]);
            }
        }
       

 }

//loan generation
export const generateLoan = async (req, res) => {
    let { customerId, interest, tenure } = req.body;
    //validate
    if(!customerId || !interest || !tenure)
        return res.status(400).json({msg : "Not all fields have been entered."});
        if(interest === "interest")
        return res.status(400).json({msg : "Please select the interest."});
        if(tenure === "tenure")
        return res.status(400).json({msg : "Please select the tenure."});
        // const loan = req.body;
        const loan = {
            customerId: req.body.customerId,
            state: 'New',
            interest: req.body.interest,
            tenure: req.body.tenure

        }


        const userLoan = new loanModel(loan);
        try {
            await userLoan.save();
             const user = await loanModel.findById(userLoan._id);
             res.status(201).json([
                  {
                     id: userLoan._id,
                     customerId: userLoan.customerId,
                     interest: userLoan.interest,
                     tenure: userLoan.tenure,
                     emi: userLoan.emi,
                     state: userLoan.state,
         
                     },
                 ]);
            
       
         
        } catch (error) {
            res.status(409).json({ message: error});
            
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
    const user = req.body;  // need to check this statement 
    let hashpassword = req.body.password;
    hashpassword = await bcrypt.hash(hashpassword, salt);
    req.body.password = hashpassword;

   const newUser = new userModel(user);
   try {
       await newUser.save();
        const user = await userModel.findById(newUser._id);
        res.status(201).json([
             {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
    
                },
            ]);
       
  
    
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
//token validation
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

//get logged in user
export const user = async (req, res) => {
    const user = await userModel.findById(req.user);
    res.json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id: user._id
    });
}