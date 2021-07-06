const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (rq, res) => {
    res.send("Hyper Social Media");
})

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}...`);
})