require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors')

const app = express();

app.use(cors())

// Middleware
app.use(bodyParser.json());
app.use(express.json())

// Routes
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
