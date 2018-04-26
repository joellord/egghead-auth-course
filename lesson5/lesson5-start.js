const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.API_PORT || 8888;

app.use(bodyParser.json());



app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});