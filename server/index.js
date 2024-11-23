const express = require('express');
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());


const db = require('./models');

// routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

const serviceRouter = require('./routes/Services');
app.use("/Services", serviceRouter);

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



