const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/auth.model');

const newMemberRegister = async (req,res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const existingMemberLogin = async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    newMemberRegister,
    existingMemberLogin,
}