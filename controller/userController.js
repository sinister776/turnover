const userService = require('../service/userService');

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await userService.registerUser(username, password, email);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const emailVerificationCheck = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const isVerified = await userService.emailVerificationCheck(email, verificationCode);
    if (isVerified) {
      res.status(200).json({ message: 'Verification successful' });
    } else {
      res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUserById(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = { registerUser, loginUser, emailVerificationCheck, deleteUserById, getAllUsers };
