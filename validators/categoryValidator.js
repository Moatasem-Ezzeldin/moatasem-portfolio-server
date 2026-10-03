const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");


exports.getOne= [
    check('id').isMongoId().withMessage("Invalid Category id"),
    validatorMiddlewares,
];

exports.createOne= [
    check("name.en")
        .notEmpty().withMessage("English Category name is required")
        .isLength({min: 3}, {max: 32}).withMessage("English Category name must be between 3 and 100 characters")
    ,
    check("name.ar")
        .notEmpty().withMessage("Arabic Category name is required")
        .isLength({min: 3}, {max: 32}).withMessage("Arabic Category must be between 3 and 100 characters")
    ,
    validatorMiddlewares,
];

exports.updateOne= [
    check('id').isMongoId().withMessage("Invalid Category id")
    ,
    check("name.en")
        .optional()
        .isLength({min: 3}, {max: 32}).withMessage("English Category must be between 3 and 100 characters")
    ,
    check("name.ar")
        .optional()
        .isLength({min: 3}, {max: 32}).withMessage("Arabic Category must be between 3 and 100 characters")
    ,
    validatorMiddlewares,
];

exports.deleteOne= [
    check('id').isMongoId().withMessage("Invalid Category id"),
    validatorMiddlewares,
];