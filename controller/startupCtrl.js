const Startup = require("../models/startupModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// Create startup function here
const createStartup = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const newStartup = await Startup.create(req.body);
    res.json(newStartup);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a startup function
const getaStartup = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const findStartup = await Startup.findById(id);
    res.json(findStartup);
  } catch (error) {
    throw new Error(error);
  }
});

//Update a startup
const updateStartup = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updateStartup = await Startup.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateStartup);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a startup
const deleteStartup = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const deleteStartup = await Startup.findOneAndDelete(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateStartup);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllStartup = asyncHandler(async (req, res) => {
  //console.log(req.query);
  try {
    // Filtering startups
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    //console.log(queryObj, req.query);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(queryStr));

    let query = Startup.find(JSON.parse(queryStr));

    //Sorting startups
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    //limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    console.log(page, limit, skip);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const startupCount = await Startup.countDocuments();
      if (skip >= startupCount) throw new Error("This page doesn't exists.");
    }
    const startup = await query;
    res.json(startup);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createStartup,
  getaStartup,
  updateStartup,
  getAllStartup,
  deleteStartup,
};
