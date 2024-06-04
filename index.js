import express from "express";
import * as dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const coldBoot = async (req, res) => {
  console.log("cold boot");
  console.log(req.body);
  const reqBody = JSON.parse(req.body.body);
  console.log(reqBody.email);
  if (reqBody.email) {
    const msg = {
      to: reqBody.email,
      from: "sahildixit9969@gmail.com",
      subject: "Hello there, thank you for showing your interest!",
      text: "I'll get back to you as soon as possible. If you have any questions or concerns, feel free to contact me again.",
      html: "<strong>I'll get back to you as soon as possible. If you have any questions or concerns, feel free to contact me again.</strong>",
    };
    try {
      await sgMail.send(msg);
      console.log("Email sent");
      const msg2 = {
        to: "sahil.dixit15.sd@gmail.com",
        from: "sahildixit9969@gmail.com",
        subject: `New user subscribed, ${reqBody.name}`,
        text: `Email: ${reqBody.email} message: ${reqBody.message}`,
        html: `<strong>Email: ${reqBody.email} message: ${reqBody.message}</strong>`,
        };
        await sgMail.send(msg2);
        console.log("Boss notified");

      res.status(200).send({ message: "Email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Email not sent" });
    }
  } else {
    return;
  }
};

app.post("/cold-boot", coldBoot);

app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});
