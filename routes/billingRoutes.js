const { stripeSecret } = require("../config/keys");
const auth = require("../middlewares/auth");

const stripe = require("stripe")(stripeSecret);

module.exports = app => {
  app.post("/api/stripe", auth, async (req, res) => {
    const { id: source } = req.body;
    const charge = await stripe.charges.create({
      amount: 5000,
      currency: "usd",
      description: "5$ for 5 credits",
      source
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
