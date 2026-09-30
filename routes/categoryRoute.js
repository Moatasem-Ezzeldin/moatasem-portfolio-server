const Category = require("../models/categoryModel");
const express = require("express");
const router = express.Router();
const factory = require("../controllers/handlersFactory");
const categoryValidator = require("../validators/categoryValidator");

router.route('/')
    .get(factory.getAll(Category, []))
    .post(categoryValidator.createOne, factory.createOne(Category))
;

router.route('/:id')
    .get(categoryValidator.getOne, factory.getOne(Category))
    .put(categoryValidator.updateOne, factory.updateOne(Category))
    .delete(
        categoryValidator.deleteOne,
        factory.deleteOne(Category)
    )
;

module.exports = router;
