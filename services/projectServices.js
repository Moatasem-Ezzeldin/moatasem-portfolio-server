const Project = require("../models/projectModel");

exports.getProjectBySlug = async (slug) => {
    
    return await Project.findOne({ slug }).populate("category", "name slug");

};