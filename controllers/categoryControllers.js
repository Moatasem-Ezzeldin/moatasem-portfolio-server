const asyncHandler = require("express-async-handler");
const categoryServices = require("../services/categoryServices");
const ApiError = require("../utils/apiError");

// GET ME
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await categoryServices.deleteCategory(req.params.id);
    if(!category) {
        return next(
            new ApiError("Category not found", 404)
        );
    }
    res.status(204).send()

});