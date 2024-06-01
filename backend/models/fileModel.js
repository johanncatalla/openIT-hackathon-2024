const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    EventID: {
        type: Number,
        required: true
    },
    filename: {
        type: String,
        required: [true, "Please add the filename"]
    },
    suffix: {
        type: String,
        required: [true, "Please add the suffix"]
    },
    Message: {
        type: String,
        required: [true, "Please add the message"]
    },
    readOnly: {
        type: Boolean, 
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
    _foldername: {
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
    dir: {
        type: [folderSchema]
    }
}, {
    timestamps: true,
    collection: 'files'
});

const File = mongoose.model("File", fileSchema);
const Folder = mongoose.model("Folder", folderSchema);
const Directory = mongoose.model("Directory", directorySchema);

module.exports = { File, Folder, Directory };