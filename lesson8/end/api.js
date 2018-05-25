const express = require("express");
const bodyParser = require("body-parser");
const expressjwt = require("express-jwt");
const cors = require("cors");

const app = express();
const PORT = process.env.API_PORT || 8888;

app.use(bodyParser.json());
app.use(cors());

const jwtCheck = expressjwt({
  secret: 't2ABNgm7aB8YrMrnsutSB0bPNtLZbC7P',
  audience: 'secure-spa-auth0',
  issuer: "https://joel-1.auth0.com/"
});

app.get("/resource", (req, res) => {
    res
    .status(200)
    .send("Public resource, you can see this");
});

app.get("/resource/secret", jwtCheck, (req, res) => {
    res
    .status(200)
    .send("Secret resource, you should be logged in to see this");
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});