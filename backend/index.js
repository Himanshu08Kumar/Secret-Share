const { configDotenv } = require("dotenv");
const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/secrets', require('./routes/secret'))

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });