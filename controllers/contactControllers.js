const asyncHandler = require("express-async-handler");
const contactServices = require("../services/contactServices");
const ApiError = require("../utils/apiError");

// GET ME
exports.sendContactEmail = asyncHandler(async (req, res, next) => {
    await contactServices.sendContactEmail(req.body);
    
    res.status(200).json({
        success: true,
        message: "Your message has been sent successfully.",
    });

});