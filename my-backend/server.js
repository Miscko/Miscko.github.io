const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.get("/api/massage", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});