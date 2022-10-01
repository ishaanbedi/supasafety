const client = require("twilio")(
  process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  process.env.REACT_APP_TWILIO_AUTH_TOKEN
);

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  client.messages
    .create({
      body: req.body.body,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${req.body.to}`,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
};
