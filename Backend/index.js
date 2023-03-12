// ------------- Imports --------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./queue/ExecuteQueue/index.js");
require("./queue/EmailQueue/index.js");

const { Question } = require("./models/question.js");
const { User } = require("./models/user.js");
const { Code } = require("./models/code.js");
const { Contest } = require("./models/contest.js");
const { Submission } = require("./models/submission.js");

const RunRoutes = require("./routes/run.js");
const QuesRoutes = require("./routes/question.js");
const SubmitRoutes = require("./routes/submit.js");
const CodeRoutes = require("./routes/code.js");
const AuthRoutes = require("./routes/auth.js");
const ContestRoutes = require("./routes/contest.js");
const UpdateRating = require("./routes/updateRating.js");
const DashboardRoutes = require("./routes/dashboard.js");

const app = express();

// ------------- Middlewares --------------
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use("/api", RunRoutes);
app.use("/question", QuesRoutes);
app.use("/question", SubmitRoutes);
app.use("/code", CodeRoutes);
app.use("/auth", AuthRoutes);
app.use("/contest", ContestRoutes);
app.use("/", UpdateRating);
app.use("/dashboard", DashboardRoutes);

// ------------- database connection and starting the server --------------
const PORT = process.env.PORT || 5000;

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
