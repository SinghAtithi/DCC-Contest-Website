// ------------- Imports --------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);

const jwt = require("jsonwebtoken");
require("./queue/ExecuteQueue/index.js");
require("./queue/EmailQueue/index.js");

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Kolkata');

const { Question } = require("./models/question.js");
const { User } = require("./models/user.js");
const { Contest } = require("./models/contest.js");
const { Submission } = require("./models/submission.js");

const QuesRoutes = require("./routes/question.js");
const SubmitRoutes = require("./routes/submit.js");
const AuthRoutes = require("./routes/auth.js");
const ContestRoutes = require("./routes/contest.js");
const UpdateRating = require("./routes/updateRating.js");
const DashboardRoutes = require("./routes/dashboard.js");
const UserRoutes = require("./routes/user.js");

const app = express();

// ------------- Middlewares --------------
app.use(bodyParser.json({ limit: '10mb' })); // To parse json objects
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // To pass urlencoded messages
app.use(cors()); // Allow Cross Origin Resource Sharing

app.get("/isItWorking", (req, res) => {
  res.send("Yes, it is working");
});

app.use("/question", QuesRoutes); // Routes for various operations with problems/questions
app.use("/question", SubmitRoutes); // Routes to handle submission of code of a problem
app.use("/auth", AuthRoutes); // Routes to handle authentication related requests
app.use("/contest", ContestRoutes); // Routes to handle queries related to contests 
app.use("/", UpdateRating); // Routes to facilitate updating the rating after contest 
app.use("/dashboard", DashboardRoutes); // Routes for user dashbaord
app.use("/user", UserRoutes); // Routes to handle updates in user


// ------------- Database connection and starting the server --------------
const PORT = process.env.PORT || 5000;


/* When "strictQuery" is set to true, Mongoose will throw an error if we try to query a model with undefined fields. 
  This helps ensure that the queries are precise and do not include unintended or misspelled fields.
*/
mongoose.set("strictQuery", true);


mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
