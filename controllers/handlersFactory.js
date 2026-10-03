const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if(!document) {
        return next(new ApiError(`No document for this id: ${id}`, 404));
    }
    res.status(204).send();
});

exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true,}
    );
    if(!document) {
        return next(new ApiError(`No document for this id: ${id}`, 404));
    }
    res.status(200).json({ data: document, });
});

exports.createOne = (Model) => asyncHandler(async (req, res) => {
    const document = await Model.create( req.body );
    res.status(201).json({data: document});   
});

exports.getOne = (Model, populateOptions) => asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        let query = Model.findById(id);

        if (populateOptions) {
            query = query.populate(populateOptions);
        }

        const document = await query;

        if (!document) {
            return next(
                new ApiError(`No document for this id: ${id}`, 404)
            );
        }

        res.status(200).json({
            data: document,
        });
});

exports.getAll = (Model, searchFields = [], populateOptions) => asyncHandler(async (req, res) => {

    let filterObject = {};

    if (req.filterObject) {
        filterObject = req.filterObject;
    }

    const documentsCount = await Model.countDocuments(filterObject);

    let query = Model.find(filterObject);

    if (populateOptions) {
        query = query.populate(populateOptions);
    }

    const apiFeatures = new ApiFeatures(query, req.query)
        .paginate(documentsCount)
        .filter()
        .sort()
        .search(searchFields)
        .limitFields();

    const { mongooseQuery, paginationResult } = apiFeatures;

    const documents = await mongooseQuery;

    res.status(200).json({
        results: documents.length,
        paginationResult,
        data: documents,
    });
});
