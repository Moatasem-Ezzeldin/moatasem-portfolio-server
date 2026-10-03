const Category = require("../models/categoryModel");
const Project = require("../models/projectModel");

exports.deleteCategory = async (id) => {
    // Check if category has projects
    const project = await Project.findOne({ category: id });

    if (project) {
        throw new Error("Cannot delete category because it has projects");
    }

    // Delete category
    const category = await Category.findByIdAndDelete(id);

    return category;
};