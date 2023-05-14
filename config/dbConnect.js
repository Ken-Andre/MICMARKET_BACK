const {  default: mongoose } =  require("mongoose");

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL );
        console.log("Database connection success" );
    }
    catch (error) {
        //throw new Error(console.error());
        console.log("Database connection failed " );
    }

};

module.exports = dbConnect;
