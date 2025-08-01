const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const startupRouter = require("./routes/startupRoute");
const categoryRouter = require("./routes/categoryRoute");
const enqRouter = require("./routes/enqRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const allowedOrigins = require("./config/allowedOrigins");
const cors = require("cors");
const corsMiddleware = require("./middlewares/corsMiddleware");
// const corsOptions = require("./config/corsOption");
// const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
// const swaggerJsDoc = require("swagger-jsdoc");
dbConnect();

const app = express();

//Le swagger ooptions
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "MicMarket API",
//       version: "1.0.0",
//       description: "The MicMarket API Docs",
//       contact: {
//         name: "Jaba Space",
//         email: "jabaspace@gmail.com",
//         url: "http://localhost:4000"
//       }
//     },
//     servers: [
//       {
//         url: "http://localhost:4000",
//         description: "Development server"
//       },
//       {
//         url: "https://micmarket-back.vercel.app",
//         description: "Production server"  
//       }
//     ]
//   },
//   apis: ["./routes/*.js", "./swagger.json"] // Include both route files and swagger.json
// };

// const specs = swaggerJsDoc(options);
// const swaggerDocument = require("./swagger.json");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Handle options credentials check - before CORS!
const corsOptions = {
  origin: [
    '*', // Allow all origins for testing
    `https://${process.env.CODESPACE_NAME}-4000.app.github.dev`, // GitHub Codespaces domain
    'http://localhost:4000', // Local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// app.use(corsMiddleware);
// app.use((req, res, next) => {
//   const allowedOrigins = [
//     '*', // Allow all origins for testing
//     `https://${process.env.CODESPACE_NAME}-4000.app.github.dev`, // GitHub Codespaces domain
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin || '*');
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });
app.use(express.urlencoded({ extended: false }));

// Swagger UI setup - with your existing swagger.json file
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      url: "/swagger.json",
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      withCredentials: true,
      tryItOutEnabled: true,
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: "Development server"
        },
		{
			"url": `https://${process.env.CODESPACE_NAME}-4000.app.github.dev`,
			"description": "GitHub Codespaces server"
    	},
      ]
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "MicMarket API Documentation"
  })
);


// API Routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/startup", startupRouter);
app.use("/api/category", categoryRouter);
app.use("/api/enquiry", enqRouter);

app.get('/', (req, res) => {
  res.json({ message: 'MicMarket API is running' });
});
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working well',
    timestamp: new Date().toISOString(),
  });
});

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.send(swaggerDocument);
});




// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));




// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT  ${PORT} `);
  });
}
