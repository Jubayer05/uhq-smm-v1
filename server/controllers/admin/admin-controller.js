const jwt = require('jsonwebtoken');
require('dotenv').config();  // Load environment variables from .env file

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password match the environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate JWT token with email and password (you can change payload as needed)
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

module.exports = { adminLogin };
