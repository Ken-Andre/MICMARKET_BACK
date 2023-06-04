const { application } = require("express");
const allowedOrigins = require("../config/allowedOrigins");
const cors = require("cors");


const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

// module.exports = corsMiddleware;

// function additionalCorsMiddleware(req, res, next) {
//   const origin = req.headers.origin;
//   const userAgent = req.headers['user-agent'];
//   if (allowedOrigins.indexOf(origin) !== -1 || userAgent.includes('PostmanRuntime')) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   } else {
//     res.status(403).send('Forbidden');
//   }
// }

// // // OPTIONS handler middleware
// const corsOptions = {
//   origin: allowedOrigins,
//   optionsSuccessStatus: 204
// };


// function corsMiddleware(req, res, next) {
//     cors(corsOptions)(req, res, next);
//     // additionalCorsMiddleware(req, res, next);
//   }
//  // // OPTIONS handler middleware
// application.options('*', function (req, res) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.sendStatus(204);
// });


// Export the middleware function created by cors
module.exports = corsMiddleware;
