const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var startupSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    url: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    market_value: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Agroalimentaire","Artisanat","Animaux","Magasin & Jardin","Medias","Beaute et Bien-etre","Construction et fabrication","Shopping & Mode","Sante","Sport"],
        //ref: "Category",
    },
    subcategory: {
        type: String,
        required: true,
        //enum: ["Apple", "Samsung", "Lenovo"],
    },
    quantity: {
        type: Number,
        required: true,
        //select: false,
    },
    sell: {
        type: Number,
        default: 0,
        //select: false,
    },
    logo_images: {
        type: Array,
    },
    creation_date: {
        type: Date,
    },
    ratings: [
        {
            star: Number,
            // postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        }
    ],
},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Startup', startupSchema);
