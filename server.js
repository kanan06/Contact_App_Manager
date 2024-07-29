const express = require("express");
const dotenv = require("dotenv").config();
const connectionDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

// Connect to the database
connectionDb();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/contacts", require("./routes/contact_routes"));
app.use("/api/users", require("./routes/user_routes.js"));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


