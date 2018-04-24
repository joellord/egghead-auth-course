const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const user = req.body.username;

    res
    .status(200)
    .send(`You logged in with ${user}`);
})

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});