const express = require('express');
const app = express();
const cors = require("cors");

const db = require('./models');
const { router: authRouter } = require('./routes/auth'); // Import the auth router

app.use(express.json());
app.use(cors());

// Routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

const serviceRouter = require('./routes/Services');
app.use("/Services", serviceRouter);

app.use("/auth", authRouter); // Use the auth router

const appointmentRouter = require('./routes/appointments');
app.use('/appointments', appointmentRouter);


// Start the server
db.sequelize.sync().then(() => {
    try {
        app.listen(3002, () => {
            console.log("Server is running on port 3002");
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}).catch(err => {
    console.error("Database sync failed:", err);
});
