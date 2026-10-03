const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

const checkCategoryExistsMiddlewares = (operation) =>
    asyncHandler(async (req, res, next) => {
        const categoryId = req.body.category;

        if (operation === "update" && !categoryId) {
            return next();
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return next(new ApiError("Category not found", 404));
        }

        next();
    });

module.exports = checkCategoryExistsMiddlewares;