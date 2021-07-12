const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const { dbConnection } = require("./db/db.connect");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const activityRoutes = require("./routes/activity.routes");

const errorHandler = require("./middleware/errorHandler");
const routeHandler = require("./middleware/routeHandler");

dbConnection();

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/activity", activityRoutes);

app.get("/", (req, res) => {
    res.send("Hyper Social Media");
})

//middleware
app.use(routeHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}...`);
})