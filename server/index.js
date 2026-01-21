const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const errorLogger = require('./middleware/errorLogger');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('./middleware/cloudinary');

const authRoutes = require('./routes/auth/auth-routes');
const adminRoutes = require('./routes/admin/admin-route');
const userdetailRoute = require('./routes/admin/userdetail-route');
const serviceRoute = require('./routes/admin/Service');
const categoryRoute = require('./routes/admin/Category');
const getServicesByCategory = require('./routes/admin/Service');
const providerRoute = require('./routes/admin/Provider');
const affiliateRoute = require('./routes/admin/affiliates');
const childPanelRoute = require('./routes/admin/childpanel');
const MessageRoute = require('./routes/admin/message');
const SecurityLogRoute = require('./routes/admin/securitylogs');
const ActivityLogRoute = require('./routes/admin/activitylogs');
const systemErrorRoute = require('./routes/admin/systemerrors');
const ReportIssuesRoute = require('./routes/admin/ReportIssues');

const vendorCategory = require('./routes/vendor/order');
const vendorOrder = require('./routes/vendor/order');
const vendorService = require('./routes/vendor/order');
const ticketRoute = require('./routes/vendor/ticket');
const fundsRoutes = require('./routes/fundsAddHistory');
const PricingRoutes = require('./routes/specialPricing');
const stripeWebhookRoute = require('./routes/webhook/stripe');
const RefundRoute = require('./routes/admin/refund');
const MassOrderRoute = require('./routes/admin/massorder');
const subscriptionRoute = require('./routes/admin/subscriptions');


// Routes for payments
const StripePaymentRoute = require('./routes/payments/stripePayment');
const plisioRoute = require('./routes/payments/plisio')
const nowPaymentsRoute = require('./routes/payments/nowpayment');
const cryptomusRoute = require('./routes/payments/cryptomus')
const payeerRoute = require('./routes/payments/payeer');
const changenowRoute = require('./routes/payments/changenow')
const hoodpayRoute = require('./routes/payments/hoodpay')
const paygateRoute = require('./routes/payments/paygate')

// Routes for forgot password
const emailRoute = require('./routes/email/email')
const resetPasswordRoute = require('./routes/auth/reset-password')
const app = express();

// ✅ Connect to MongoDB (only once on cold start)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((error) => console.error(error));
}

// ✅ CORS
const allowedOrigins = ['http://localhost:5173', 'https://uhqsmm.temp2026.com', 'https://uhqsmm.com', 'http://uhqsmm.com',  'http://162.217.249.95:4173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Stripe Webhook raw parser
app.use('/webhook/stripe', bodyParser.raw({ type: 'application/json' }));

// ✅ Other middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/userdetail', userdetailRoute);
app.use('/api/admin', serviceRoute);
app.use('/api/admin', categoryRoute);
app.use('/api/admin', providerRoute);
app.use('/api/admin', affiliateRoute);
app.use('/api/admin', childPanelRoute);
app.use('/api/admin', MessageRoute);
app.use('/api/admin', SecurityLogRoute);
app.use('/api/admin', ActivityLogRoute);
app.use('/api/admin', ReportIssuesRoute);
app.use('/api/admin', systemErrorRoute);

app.use('/api/vendor', subscriptionRoute);
app.use('/api/vendor', ticketRoute);
app.use('/api/vendor', vendorOrder);
app.use('/api/vendor', vendorCategory);
app.use('/api/vendor', vendorService);
app.use('/api/vendor', getServicesByCategory);
app.use('/api/funds', fundsRoutes);
app.use('/api/pricing', PricingRoutes);
app.use('/webhook/stripe', stripeWebhookRoute);
app.use('/api/vendor', RefundRoute);
app.use('/api/vendor', MassOrderRoute);

// Payments Routes
app.use('/api/payments/stripe', StripePaymentRoute);
app.use('/api/payments/plisio', plisioRoute);
app.use('/api/payments/nowpayments', nowPaymentsRoute);
app.use('/api/payments/cryptomus', cryptomusRoute);
app.use('/api/payments/payeer', payeerRoute);
app.use('/api/payments/changenow', changenowRoute);
app.use('/api/payments/hoodpay', hoodpayRoute);
app.use('/api/payments/paygate', paygateRoute);

// email verification
app.use('/api/email', emailRoute)
app.use('/api/auth', resetPasswordRoute)


// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ✅ 404 Handler
app.use((req, res, next) => {
  const error = new Error('API Not Found');
  error.status = 404;
  next(error);
});

// ✅ Error Logger
app.use(errorLogger);

// ✅ Export the app for Vercel
// ✅ Start server
module.exports = app;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});