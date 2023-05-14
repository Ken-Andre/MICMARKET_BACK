const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//Create a product8
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }

});

//Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.json(updateProduct);
        console.log(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete a product

const deleteProduct = asyncHandler(async (req, res) => {

    const id = req.params.id;

    console.log(id);

    try {



        const deleteProduct = await Product.findOneAndDelete({ _id: id }, req.body, {

            new: true,

        });

        res.json(deleteProduct);

        console.log(deleteProduct);

    } catch (error) {

        throw new Error(error);

    }

});


//Get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
    //console.log(req.query);
    try {
        // Filtering products
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el)  => delete queryObj [el]);
        //console.log(queryObj, req.query);
        let queryStr=JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`);
        //console.log(JSON.parse(queryStr));

        let query = Product.find(JSON.parse(queryStr));

        //Sorting products
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort('createdAt');
        }


        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

//Exports module
module.exports = {
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};
