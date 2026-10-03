const asyncHandler = require("express-async-handler");
const projectServices = require("../services/projectServices");
const ApiError = require("../utils/apiError");

// GET ME
exports.getProjectBySlug = asyncHandler(async (req, res, next) => {
    const project = await projectServices.getProjectBySlug(req.params.slug);
    if(!project) {
        return next(
            new ApiError("Project not found", 404)
        );
    }
    res.status(200).json({
        status: "success",
        data: project,
    });

});