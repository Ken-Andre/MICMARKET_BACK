const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const allowedOrigins = require("./config/allowedOrigins");
const cors = require("cors");
dbConnect();


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.options('*', cors());


// CORS middleware
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  const userAgent = req.headers['user-agent'];
  if (allowedOrigins.indexOf(origin) !== -1 || userAgent.includes('PostmanRuntime')) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  } else {
    res.status(403).send('Forbidden');
  }
});

// OPTIONS handler middleware
app.options('*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(204);
});

//API Routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT  ${PORT} `);
});
