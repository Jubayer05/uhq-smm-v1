const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error", err));