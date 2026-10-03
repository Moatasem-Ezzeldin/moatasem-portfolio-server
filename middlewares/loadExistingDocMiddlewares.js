const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const loadExistingDocMiddlewares = (Model) =>
asyncHandler(async (req, res, next) => {

  const doc = await Model.findById(req.params.id);

  if (!doc)
    return next(new ApiError("Document not found", 404));

  req.existingDoc = doc;

  next();
});

module.exports = loadExistingDocMiddlewares;