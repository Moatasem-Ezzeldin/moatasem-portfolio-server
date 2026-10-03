const Project = require("../models/projectModel");
const express = require("express");
const router = express.Router();
const factory = require("../controllers/handlersFactory");
const projectValidator = require("../validators/projectValidator");
const projectControllers = require("../controllers/projectControllers");
// upload sestem
const upload = require("../utils/upload/multer");
// Middlewares
const loadExistingDocMiddlewares = require("../middlewares/loadExistingDocMiddlewares");
const checkCategoryExistsMiddlewares = require("../middlewares/checkCategoryExistsMiddlewares");
const { smartDeleteMiddlewares } = require("../middlewares/uploadFilesMiddlewares/smartDeleteMiddlewares");
const { smartUpdateMiddlewares } = require("../middlewares/uploadFilesMiddlewares/smartUpdateMiddlewares");
const { smartUploadMiddlewares } = require("../middlewares/uploadFilesMiddlewares/smartUploadMiddlewares");
const smartFileGuardMiddlewares = require("../middlewares/uploadFilesMiddlewares/smartFileGuardMiddlewares");

router.route('/')
    .get(
        factory.getAll(
            Project, 
            [ "title.en", "title.ar", "description.en", "description.ar" ],
            { path: "category", select: "name slug" },
        ),
    )
    .post(
        upload.fields([
            {name: "image", maxCount: 1},
        ]),
        projectValidator.createOne,
        checkCategoryExistsMiddlewares("add"),
        smartFileGuardMiddlewares({
            image: {
                type: "image",
                allowed: [],
                maxSize: 2 * 1024 * 1024,
                required: true,
            },
        }, "add"),
        smartUploadMiddlewares("project"), 
        factory.createOne(Project)
    )
;
router.route('/:slug').get(
    projectValidator.getOneBySlug,
    projectControllers.getProjectBySlug,
);
router.route('/:id')
    .get(
        projectValidator.getOne,
        factory.getOne(
            Project,
            { path: "category", select: "name slug" },
        )
    )
    .put(
        upload.fields([
            {name: "image", maxCount: 1},
        ]),
        projectValidator.updateOne,
        checkCategoryExistsMiddlewares("update"),
        smartFileGuardMiddlewares({
            image: {
                type: "image",
                allowed: [],
                maxSize: 2 * 1024 * 1024,
                required: false,
            },
        }, "edit"),
        loadExistingDocMiddlewares(Project),
        smartUpdateMiddlewares("project"),
        factory.updateOne(Project)
    )
    .delete(
        projectValidator.deleteOne,
        loadExistingDocMiddlewares(Project),
        smartDeleteMiddlewares({
            fields: ["image"],
        }),
        factory.deleteOne(Project)
    )
;

module.exports = router;
