const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");


exports.getOne= [
    check('id').isMongoId().withMessage("Invalid Category id"),
    validatorMiddleware,
];

exports.createOne= [
    check("name.en")
        .notEmpty().withMessage("English Category name is required")
        .isLength({min: 3}, {max: 100}).withMessage("English Category name must be between 3 and 100 characters")
    ,
    check("name.ar")
        .notEmpty().withMessage("Arabic Category name is required")
        .isLength({min: 3}, {max: 100}).withMessage("Arabic Category must be between 3 and 100 characters")
    ,
    validatorMiddleware,
];

exports.updateOne= [
    check('id').isMongoId().withMessage("Invalid Category id")
    ,
    check("name.en")
        .optional()
        .isLength({min: 3}, {max: 100}).withMessage("English Category must be between 3 and 100 characters")
    ,
    check("name.ar")
        .optional()
        .isLength({min: 3}, {max: 100}).withMessage("Arabic Category must be between 3 and 100 characters")
    ,
    validatorMiddleware,
];

exports.deleteOne= [
    check('id').isMongoId().withMessage("Invalid Category id"),
    validatorMiddleware,
];
