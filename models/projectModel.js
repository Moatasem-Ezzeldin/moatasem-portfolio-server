const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema({
    title: {
        en: {
            type: String,
            required: [true, "English Project title required"],
            minlength: [3, "Too short english project title"],
            maxlength: [32, "Too long english project title"],
        },
        ar: {
            type: String,
            required: [true, "Arabic Project title required"],
            minlength: [3, "Too short arabic project title"],
            maxlength: [32, "Too long arabic project title"],
        }
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        en: {
            type: String,
            required: [true, "English Project description required"],
            minlength: [20, "Too short english project description"],
            maxlength: [500, "Too long english project description"],
        },
        ar: {
            type: String,
            required: [true, "Arabic Project description required"],
            minlength: [20, "Too short arabic project description"],
            maxlength: [500, "Too long arabic project description"],
        }
    },
    active: {
        type: Boolean,
        default: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Project category required"],

    },
    tools: [
        {
            type: String,
            required: [true, "Project tool required"],
        }
    ],
    features: {
        en: [
            {
                type: String,
                required: [true, "Project feature english required"],
            }
        ],
        ar: [
            {
                type: String,
                required: [true, "Project feature arabic required"],
            }
        ],

    },
    liveUrl: {
        type: String,
    },
    frontendGithubUrl: {
        type: String,
    },
    backendGithubUrl: {
        type: String,
    },
    image: {
        url: String,
        public_id: String,
        type: {
            type: String,
        },
        encoding: String,
        originalName: String,
        fieldName: String,
        mimeType: String,
        ext: String,
        size: Number,
    },
}, { timestamps: true });

// Prevent duplicate English category names
projectSchema.index(
    { "title.en": 1 },
    { unique: true }
);

// Prevent duplicate Arabic category names
projectSchema.index(
    { "title.ar": 1 },
    { unique: true }
);

// Prevent duplicate Arabic category names
projectSchema.index(
    { "slug": 1 },
    { unique: true }
);

// Add Slug BEFORE SAVE
projectSchema.pre("save", function() {
    if(!this.isModified('title.en')) return;
    if(!this.title?.en) return;
    this.slug = slugify(this.title.en, { lower: true, strict: true });
});

// Update Slug on update
projectSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();

    if (!update.title?.en) return;

    update.slug = slugify(update.title.en, {
        lower: true,
        strict: true,
    });

    this.setUpdate(update);
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;