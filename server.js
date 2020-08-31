const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/api");

require("dotenv").config();
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
//check connection
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

mongoose.set("useFindAndModify", false);

app.use(express.static("./client/build/"));

// LIMITER
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1,
});
const replyLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1,
});
app.use("/api/createpost", apiLimiter);
app.use("/api/reply", replyLimiter);

//HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build/",
  });
});

switch (process.env.NODE_ENV) {
  case "dev":
    var PORT = process.env.DEV_PORT;
    break;
  case "prod":
    var PORT = process.env.PROD_PORT;
    break;
}

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
