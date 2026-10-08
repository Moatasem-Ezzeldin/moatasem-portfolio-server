const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");

exports.sendContactEmail = [
    check("fullName")
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full name must be between 3 and 50 characters"),

    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),

    check("subject")
        .notEmpty()
        .withMessage("Subject is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Subject must be between 3 and 100 characters"),

    check("message")
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10, max: 2000 })
        .withMessage("Message must be between 10 and 2000 characters"),

    validatorMiddlewares,
];