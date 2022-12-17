const express = require("express");
// const child = require("child_process");
// const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const RunRoutes = require("./routes/run.js");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use('/api',RunRoutes);

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
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
