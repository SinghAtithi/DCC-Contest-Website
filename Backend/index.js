// ------------- Imports --------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const RunRoutes = require("./routes/run.js");
const QuesRoutes = require("./routes/question.js");
const SubmitRoutes = require("./routes/submit.js");
const { Question } = require("./models/question.js");

const app = express();


// ------------- Middlewares --------------

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use("/api", RunRoutes);
app.use("/question",QuesRoutes);
app.use("/question",SubmitRoutes);


// ------------- database connection --------------

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
