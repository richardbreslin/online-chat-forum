const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUri =
  "mongodb+srv://richie:richie123@bscluster.uose7.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

//connect to mongoDB atlas
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//check connection
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

// rate limiter for posts
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1,
});
app.use("/api/createpost", apiLimiter);

//HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
