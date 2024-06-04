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
  const reqBody = req.body;
  console.log(reqBody);
  if (reqBody) {
    const msg = {
      to: reqBody.email,
      from: "sahildixit9969@gmail.com",
      subject: "Thank You for showing your interest!",
      text: "Please stay tuned for further updates. If you have any questions or concerns, feel free to contact us again.",
      html: "<strong>Please stay tuned for further updates. If you have any questions or concerns, feel free to contact us again</strong>",
    };
    try {
      await sgMail.send(msg);
      console.log("Email sent");
      res.send({ message: "Email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Email not sent" });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

app.post("/cold-boot", coldBoot);

app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});
