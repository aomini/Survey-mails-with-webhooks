const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const credits = require("../middlewares/credits");
const surveyTemplate = require("../services/emailTemplates/SurveyTemplate");
const Mailer = require("../services/Mailer");

const Survey = mongoose.model("surveys");

const mapEvents = data => {
  const path = new Path("/api/surveys/:surveyID/:choice");

  const events = _.map(data, ({ email, url }) => {
    const pathname = new URL(url).pathname;
    const match = path.test(pathname);
    if (match) {
      const { surveyID, choice } = match;
      return { email, surveyID, choice };
    }
  });
  return events;
};

module.exports = app => {
  app.get("/api/surveys/:surveyID/:choice ", (req, res) => {
    res.send("Thank you");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const events = mapEvents(req.body);

    _.chain(events)
      .compact()
      .uniqBy("email", "surveyID")
      .each(({ surveyID, choice, email }) => {
        Survey.updateOne(
          {
            _id: surveyID,
            recipents: {
              $elemMatch: { email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipents.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.get("/api/surveys", auth, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select(
      "-recipents"
    );
    res.send(surveys);
  });

  app.post("/api/surveys", auth, credits, async (req, res) => {
    const { title, subject, body, recipents } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipents: recipents
        .split(",")
        .reduce((acc, recipent) => [...acc, { email: recipent }], []),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //SEND GRID MAIL SERVICE
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
