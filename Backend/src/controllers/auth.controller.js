
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function register(req, res) {
    const {username, email, password, role = "user"} = req.body;

    const isUserAlreadyPresent = await userModel.findOne({
        $or:[{
            username
        },{
            email
        }]
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (isUserAlreadyPresent){
        return res.status(400).json({ message: 'User already exists' });
        
    }
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        role
    });
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie('token', token);
    res.status(201).json({ message: 'User registered successfully', 
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        }
     });
}

async function login(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if (!user){
        return res.status(400).json({ message: 'User Not Found' });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword){
        return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie('token', token);
    res.status(200).json({ message: 'Login successful', user: {
        username: user.username,
        email: user.email,
        role: user.role
    }});
}

async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

async function me(req, res) {
    const user = await userModel.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
}

module.exports = {
    register,
    login,
    logout,
    me
};