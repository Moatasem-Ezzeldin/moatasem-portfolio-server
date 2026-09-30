const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
    name: {
        en: {
            type: String,
            required: [true, "English Category name required"],
            minlength: [3, "Too short english category name"],
            maxlength: [32, "Too long english category name"],
        },
        ar: {
            type: String,
            required: [true, "Arabic Category name required"],
            minlength: [3, "Too short arabic category name"],
            maxlength: [32, "Too long arabic category name"],
        }
    },
    slug: {
        type: String,
        lowercase: true,
    },
}, { timestamps: true });

// Prevent duplicate English category names
categorySchema.index(
    { "name.en": 1 },
    { unique: true }
);

// Prevent duplicate Arabic category names
categorySchema.index(
    { "name.ar": 1 },
    { unique: true }
);

// Add Slug BEFORE SAVE
categorySchema.pre("save", function() {
    if(!this.isModified('name.en')) return;
    if(!this.name?.en) return;
    this.slug = slugify(this.name.en, { lower: true, strict: true });
});

// Update Slug on update
categorySchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();

    if (!update.name?.en) return;

    update.slug = slugify(update.name.en, {
        lower: true,
        strict: true,
    });

    this.setUpdate(update);
});

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;