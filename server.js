const express = require("express");

const app = express();

// Route handler
app.get("/", (res, res) => {
  res.send("<h1>headasdfasdfing</h1>");
});

//Dynamically figure which port to listen
const PORT = process.env.PORT || 9000;

app.listen(PORT);
