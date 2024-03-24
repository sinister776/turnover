const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const emailVerification = async (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SERVER_EMAIL,
            pass: process.env.SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'Ecommerce',
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log('Error sending email:', error);
        throw new Error('Error sending email');
    }
};


const registerUser = async (username, password, email) => {

    const verificationCode = Math.floor(10000000 + Math.random() * 90000000);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email, verificationCode });
    emailVerification(email, verificationCode); 
    return user;
};


let emailVerificationCheck = async (email, verificationCode) => {
    try {
        let check = await User.findOne({ where: { email } })
        if (check) {
            if (check.verificationCode === verificationCode) {
                return true
            }
            else {
                false
            }
        }

    } catch (error) {
        throw error
    }
}



const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '24h' });
    return token ;
};



const deleteUserById = async (id) => {
    await User.destroy({ where: { id } });
};

const getAllUsers = async () => {
    return await User.findAll();
};

module.exports = { registerUser, loginUser, emailVerificationCheck, deleteUserById, getAllUsers };
