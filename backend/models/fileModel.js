const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    event_id: {
        type: Number,
        required: true
    },
    file_name: {
        type: String,
        required: [true, "Please add the filename"]
    },
    suffix: {
        type: String,
        required: [true, "Please add the suffix"]
    },
    message: {
        type: String,
        required: [true, "Please add the message"]
    },
    access: {
        type: String, 
        required: [true, "Please add the access"]
    },
    deletable: {
        type: Boolean,
        required: [true, "Please confirm if deletable"]
    },
    path: {
        type: String,
        required: [true, "Please add the path"]
    }
}, {
    timestamps: true,
});

const folderSchema = mongoose.Schema({
    folder_name: {
        type: String,
        required: [true, "Please add the folder name"]
    },
    path: {
        type: String,
        required: false
    },
    files: {
        type: [fileSchema],
        required: false
    }
});

const directorySchema = mongoose.Schema({
    folders: {
        type: [folderSchema]
    }
}, {
    timestamps: true,
    collection: 'files'
});

module.exports = mongoose.model("File", fileSchema);
module.exports = mongoose.model("Folder", folderSchema);
module.exports = mongoose.model("Directory", directorySchema);