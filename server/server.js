require("dotenv").config();
const express = require("express");
const app = express();

// const record = require("./controllers/person.controller")
//parses incoming JSON data from the request body (post/put requests).
const cors = require('cors');
// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(cors({
  origin: 'https://yourdeployedsite.com'
}));
app.use(express.json());
//parse URL-encoded data from the request body.
// URL-encoded data is commonly used when submitting HTML forms via POST requests.

//The extended: true option allows for complex objects and arrays to be included in the form data.
app.use(express.urlencoded({ extended: true }));


app.use("/record", require("./controllers/person.controller"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server listening on port " + port));
