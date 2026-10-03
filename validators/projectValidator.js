const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");

exports.getOne = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Project id")
    ,
    validatorMiddlewares,
];

exports.createOne = [
    check("title.en")
        .notEmpty()
        .withMessage("English Project title is required")
        .isLength({ min: 3, max: 32 })
        .withMessage("English Project title must be between 3 and 32 characters"),

    check("title.ar")
        .notEmpty()
        .withMessage("Arabic Project title is required")
        .isLength({ min: 3, max: 32 })
        .withMessage("Arabic Project title must be between 3 and 32 characters"),

    check("description.en")
        .notEmpty()
        .withMessage("English Project description is required")
        .isLength({ min: 20, max: 500 })
        .withMessage("English Project description must be between 20 and 500 characters"),

    check("description.ar")
        .notEmpty()
        .withMessage("Arabic Project description is required")
        .isLength({ min: 20, max: 500 })
        .withMessage("Arabic Project description must be between 20 and 500 characters"),

    check("category")
        .notEmpty()
        .withMessage("Project category is required")
        .isMongoId()
        .withMessage("Invalid Project category id"),

    check("tools")
        .isArray({ min: 1 })
        .withMessage("Project tools must be a non-empty array"),

    check("tools.*")
        .notEmpty()
        .withMessage("Project tool is required"),

    check("features.en")
        .isArray({ min: 1 })
        .withMessage("English Project features must be a non-empty array"),

    check("features.en.*")
        .notEmpty()
        .withMessage("English Project feature is required"),

    check("features.ar")
        .isArray({ min: 1 })
        .withMessage("Arabic Project features must be a non-empty array"),

    check("features.ar.*")
        .notEmpty()
        .withMessage("Arabic Project feature is required"),

    check("liveUrl")
        .optional()
        .isURL()
        .withMessage("Invalid Project live URL"),

    check("frontendGithubUrl")
        .optional()
        .isURL()
        .withMessage("Invalid Project frontend GitHub URL"),

    check("backendGithubUrl")
        .optional()
        .isURL()
        .withMessage("Invalid Project backend GitHub URL"),

    validatorMiddlewares,
];

exports.updateOne = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Project id"),

    check("title.en")
        .optional()
        .isLength({ min: 3, max: 32 })
        .withMessage("English Project title must be between 3 and 32 characters"),

    check("title.ar")
        .optional()
        .isLength({ min: 3, max: 32 })
        .withMessage("Arabic Project title must be between 3 and 32 characters"),

    check("description.en")
        .optional()
        .isLength({ min: 20, max: 500 })
        .withMessage("English Project description must be between 20 and 500 characters"),

    check("description.ar")
        .optional()
        .isLength({ min: 20, max: 500 })
        .withMessage("Arabic Project description must be between 20 and 500 characters"),

    check("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid Project category id"),

    check("tools")
        .optional()
        .isArray({ min: 1 })
        .withMessage("Project tools must be a non-empty array"),

    check("tools.*")
        .optional()
        .notEmpty()
        .withMessage("Project tool is required"),

    check("features.en")
        .optional()
        .isArray({ min: 1 })
        .withMessage("English Project features must be a non-empty array"),

    check("features.en.*")
        .optional()
        .notEmpty()
        .withMessage("English Project feature is required"),

    check("features.ar")
        .optional()
        .isArray({ min: 1 })
        .withMessage("Arabic Project features must be a non-empty array"),
    check("features.ar.*")
        .optional()
        .notEmpty()
        .withMessage("Arabic Project feature is required"),

    check("liveUrl")
        .optional()
        .isURL()
        .withMessage("Invalid Project live URL"),

    check("frontendGithubUrl")
        .optional()
        .isURL()
        .withMessage("Invalid Project frontend GitHub URL"),

    check("backendGithubUrl")
        .optional()
        .isURL()
        .withMessage("Invalid Project backend GitHub URL"),

    validatorMiddlewares,
];

exports.deleteOne = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Project id")
    ,
    validatorMiddlewares,
];