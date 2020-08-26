const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

const routes = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUri =
  "mongodb+srv://richie:richie123@bscluster.uose7.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

//connect to mongoDB atlas
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
