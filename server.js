const express = require("express");
const mongoose = require("mongoose");
const { mongoURI, cookieKey } = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");

mongoose.connect(mongoURI, { useNewUrlParser: true });
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

//Dynamically figure which port to listen
const PORT = process.env.PORT || 9000;
app.listen(PORT);
