const express = require("express");
const mongoose = require("mongoose");
const { mongoURI, cookieKey } = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const authMiddleware = require("./middlewares/auth");

require("./models/User");
require("./models/Survey");

require("./services/passport");

mongoose.connect(mongoURI, { useNewUrlParser: true });

const app = express();

const route = express.Router();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //Express should serve production files as main.js or main .css
  app.use(express.static("client/build"));

  //Express should serve up the index.html file if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Dynamically figure which port to listen
const PORT = process.env.PORT || 9000;
app.listen(PORT);
