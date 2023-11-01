const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const http = require("http");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const server = http.createServer(app);
const path = require("path");
const Message = require("./Models/messageModel");
dotenv.config({ path: path.join(__dirname, "config.env") });
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const userRouter = require("./routes/userRoutes");
const contactUsRouter = require("./routes/contactusRoute");
const contactRouter = require("./routes/contactRouter");
const postRouter = require("./routes/projectPostRoutes");
const interviewRouter = require("./routes/interviewRoutes");
const socialPostRouter = require("./routes/socialPostRoutes");
const reportRouter = require("./routes/reportRoutes");
const bidRouter = require("./routes/bidRouter");
const chatRouter = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const viewRoutes = require("./routes/viewRoutes");
const servicesRouter = require("./routes/servicesRoutes");
const AppError = require("./utils/appError");
const catchAsync = require("./utils/catchAsync");
const globalErrorHandler = require("./Controllers/errorController");
const notificationRoutes = require("./routes/notificationRoutes");
const session = require("express-session");
const webSocketManager = require("./utils/websocketManager");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});
app.use(fileUpload());

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE;

app.use(cookieParser());
app.use(
  cors({
    origin: "ws://192.168.1.27:3000",
  })
);
app.use(express.json({ limit: "90mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "server", "public")));
//app.use(express.static("public"));
//console.log(__dirname)
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

process.on("uncaughtExpection", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception Occured! Shutting Down....");
  server.close(() => {
    process.exit(1);
  });
});

mongoose.connect(DB, { useNewUrlParser: true, family: 4 }).then((con) => {
  console.log("Database Connected Successfully");
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/creedlance/users", userRouter);
app.use("/creedlance/projects", postRouter);
app.use("/creedlance/interviews", interviewRouter);
app.use("/creedlance/bid", bidRouter);
app.use("/creedlance/social", socialPostRouter);
app.use("/creedlance/report", reportRouter);
app.use("/creedlance/services", servicesRouter);
app.use("/creedlance", contactRouter);
app.use("/creedlance", contactUsRouter);
app.use("/creedlance", chatRouter);
app.use("/creedlance/notifications", notificationRoutes);
app.use("/creedlance/message", messageRoutes);
app.use("/view", viewRoutes);
app.all("*", (req, res, next) => {
  return next(new AppError(`Can 't find ${req.originalUrl} on this server!`));
  next(err);
  //})
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message, err);
  console.log("Unhandled Rejection Occured! Shutting Down....");
  server.close(() => {
    process.exit(1);
  });
});

app.use(globalErrorHandler);

webSocketManager.initializeWebSocketServer(server);

//serve static assets
if (
  process.env.NODE_ENV === "PRODUCTION" ||
  process.env.NODE_ENV == "staging"
) {
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});
