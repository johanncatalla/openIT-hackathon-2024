const mongoose = require("mongoose");

// FILES
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


// CHANGEDFILES
const changedFileSchema = mongoose.Schema({
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
    collection: 'files'
});


const changesSchema = mongoose.Schema({
    changedFiles: {
        type: [changedFileSchema]
    }
}, {
    timestamps: true,
    collection: 'files'
});


// CHANGEDFILES
const stagedFileSchema = mongoose.Schema({
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
    }, 
    status: {
        type: String,
        required: [true, "Please add the status"]
    }
}, {
    timestamps: true,
    collection: 'files'
});


const stagedSchema = mongoose.Schema({
    stagedFiles: {
        type: [stagedFileSchema]
    }
}, {
    timestamps: true,
    collection: 'files'
});
const File = mongoose.model("File", fileSchema);
const Folder = mongoose.model("Folder", folderSchema);
const Directory = mongoose.model("Directory", directorySchema);
const ChangedFiles = mongoose.model("ChangedFiles", changedFileSchema);
const Changes = mongoose.model("Changes", changesSchema);
const StagedFiles = mongoose.model("StagedFiles", stagedFileSchema);
const Staged = mongoose.model("Staged", stagedSchema);

module.exports = { File, Folder, Directory, ChangedFiles, Changes, StagedFiles, Staged };