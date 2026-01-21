const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const SecurityLog = require('../../models/SecurityLogs')
const ActivityLog = require('../../models/Activitylogs')

// Create User Controller
const createUser = async (req, res) => {
  await Promise.all([
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }).run(req),
    body('email', 'Enter a valid email').isEmail().run(req),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }).run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const generateReferralCode = (name) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `${name.slice(0, 3).toUpperCase()}${randomNum}`;   // e.g., MUH4567
};

  const { name, email, password, referredBy } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email address",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const referralCode = generateReferralCode(name);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: 'https://via.placeholder.com/40',
      referralCode: referralCode,
        referredBy: referredBy || null,
    });
    await newUser.save();

    await newUser.save();

// If the user was referred
if (referredBy) {
  const referrer = await User.findOne({ referralCode: referredBy });
  if (referrer) {
    const earnedAmount = (referrer.commission / 100) * 100; // 10% of assumed $100 default

    referrer.referrals += 1;
    referrer.totalEarned += earnedAmount;

    await referrer.save();
  }
}


    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Log Activity (Register)
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
           || req.connection?.remoteAddress
           || req.socket?.remoteAddress
           || req.ip;

    const cleanedIp = (ip === '::1' || ip === '::ffff:127.0.0.1') ? '127.0.0.1' : ip.replace('::ffff:', '');

    await ActivityLog.create({
      user: newUser._id,
      type: 'Register',
      actor: newUser.name,
      action: 'Created account',
      affectedItem: 'User Account',
      ipAddress: cleanedIp,
      dateTime: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
        status: newUser.status,
        
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User Controller
const login = async (req, res) => {
  await Promise.all([
    body('email', 'Enter a valid email').isEmail().run(req),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }).run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Try to Login with Correct Email" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Try to Login with Correct Password" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, name: existingUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Clean IP address
    const getClientIp = (req) => {
      let ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
             || req.connection?.remoteAddress
             || req.socket?.remoteAddress
             || req.ip;

      if (ip === '::1' || ip === '::ffff:127.0.0.1') ip = '127.0.0.1';
      if (ip?.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
      return ip;
    };

    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'];
    const dateTime = new Date().toLocaleString();

    // Save Security Log
    await SecurityLog.create({
      user: existingUser._id,
      event: 'User Login',
      ipAddress: ip,
      device: userAgent,
      dateTime,
    });

    // Save Activity Log ✅
    await ActivityLog.create({
      user: existingUser._id,
      type: 'Login',
      actor: existingUser.name,
      action: 'Signed in',
      affectedItem: 'User Account',
      ipAddress: ip,
      dateTime: new Date(),
    });

    // Send response
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        image: existingUser.image,
        status: existingUser.status
      },
      token: token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};





const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Detect if admin
    if (decoded.email === process.env.ADMIN_EMAIL) {
      req.user = {
        _id: decoded.id,
        email: decoded.email,
        isAdmin: true,
      };
      return next();
    }

    // ✅ Vendor
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // vendor user object (without isAdmin)
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};



// Logout controller
const logout = (req, res) => {
  // Optionally, destroy any session if you're using server-side sessions (for example, in `express-session`)
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // If using session cookies
    res.json({ success: true, message: "Logged out Successfully" });
  });
};


const getMe = async (req, res) =>{
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
      res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });    
  }

}

module.exports = { createUser, login, authMiddleware, logout , getMe};
