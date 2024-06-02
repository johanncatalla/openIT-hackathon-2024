const asyncHandler = require("express-async-handler");
const {
    File,
    Folder,
    Directory,
    ChangedFiles,
    Changes,
    StagedFiles,
    Staged
} = require("../models/fileModel");
const { ChangeStream } = require("mongodb");

//@desc Get all folder files in the directory
//@route GET /api/files/dashboard
//@access private

const getFolders = asyncHandler(async (req, res) => {
    const directory = await Directory.find();
    res.status(200).json(directory);
});

//@desc all files in the folder
//@route GET /api/files/dashboard/folder/:folder_name
//@access private

const getFiles = asyncHandler(async (req, res) => {
    const { folder_name } = req.params;

    const directory = await Directory.findOne({ "dir._foldername": folder_name }, { "dir.$": 1 });
    if (!directory) {
        res.status(404);
        throw new Error("Folder not found");
    }

    const files = directory.dir[0].files;
    res.status(200).json(files);
});

//@desc one file in the folder
//@route GET /api/files/dashboard/folder/:folder_name/:event_id
//@access private

const getFile = asyncHandler(async (req, res) => {
    const { folder_name, event_id } = req.params;

    const directory = await Directory.findOne(
        {
            "dir._foldername": folder_name,
            "dir.files.EventID": event_id
        },
        { "dir.$": 1, });

    if (!directory) {
        res.status(404);
        throw new Error("File not found");
    }

    const matchedFile = directory.dir[0].files.find(file => { return parseInt(file.EventID) === parseInt(event_id) });
    res.status(200).json(matchedFile);

});

//@desc create a folder in the directory
//@route POST /api/files/dashboard
//@access private

const createFolder = asyncHandler(async (req, res) => {

    if (req.user.userType !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

    console.log("The request body is :", req.body);
    const { _foldername, path, files } = req.body;

    if (_foldername === undefined) {
        res.status(400);
        throw new Error("Folder name is mandatory!");
    }

    const directoryWithFolder = await Directory.findOne({ "dir._foldername": _foldername });
    if (directoryWithFolder) {
        res.status(400);
        throw new Error("Folder name already exists");
    }

    const newFolder = new Folder({ _foldername, path, files });
    const directory = await Directory.findOne();

    if (!directory) {
        res.status(400);
        throw new Error("Directory not found");
    }

    await Directory.updateOne(
        { _id: directory._id },
        { $push: { dir: newFolder } }
    );

    res.status(201).json(newFolder);

});

//@desc add a file in a folder
//@route POST /api/files/dashboard/folder/:folder_name
//@access private

const addFile = asyncHandler(async (req, res) => {

    if (req.user.userType !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }
    const { folder_name } = req.params;

    const { filename, suffix, Message, readOnly, deletable } = req.body;
    if (filename === undefined || suffix === undefined || Message === undefined || readOnly === undefined || deletable === undefined) {
        res.status(400).json({ message: "Please fill out the required fields" });
    }

    const directory = await Directory.findOne({ "dir._foldername": folder_name }, { "dir.$": 1 });
    if (!directory) {
        res.status(404);
        throw new Error("Folder not found");
    }

    const folderWithFile = await Folder.findOne({ "files.filename": filename });
    if (folderWithFile) {
        res.status(400);
        throw new Error("File name already exists");
    }

    const newFile = {
        EventID: directory.dir[0].files.length + 1,
        filename: directory.dir[0].files.length + 1,
        suffix,
        Message,
        readOnly,
        deletable,
        path: directory.dir[0]._foldername
    };

    await Directory.updateOne(
        { "dir._foldername": folder_name },
        { $push: { "dir.$.files": newFile } }
    );

    res.status(201).json(newFile);
});

//@desc edited data will initially go to changedFiles
//@route POST /api/files/dashboard/folder/:folder_name/:event_id
//@access private

const update_changedFile = asyncHandler(async (req, res) => {
    const { folder_name, event_id } = req.params;

    if (req.user.userType !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

    const { filename, suffix, Message, readOnly, deletable, path } = req.body;
    if (filename === undefined || suffix === undefined || Message === undefined || readOnly === undefined || deletable === undefined || path === undefined) {
        res.status(400);
        throw new Error("Please fill out the required fields");
    }

    const directory = await Directory.findOne(
        {
            "dir._foldername": folder_name,
            "dir.files.EventID": event_id
        },
        { "dir.$": 1 }
    );

    if (!directory) {
        res.status(404);
        throw new Error("File not found sa directory");
    }

    const editedFile = {
        EventID: event_id,
        filename,
        suffix,
        Message,
        readOnly,
        deletable,
        path
    };

    const changes = await Changes.findOne(
        { "changedFiles.EventID": event_id },
        { "dir.$": 1 });

    // IF the event_id does not exist in the changedSchema, then we will add it 
    // ELSE we will update it
    if (!changes) {

        const allChanges = await Changes.findOne();

        await Changes.updateOne(
            { _id: allChanges._id },
            { $push: { changedFiles: editedFile } }
        );

    } else {

        await Changes.updateOne(
            { "changedFiles.EventID": event_id },
            { $set: { changedFiles: editedFile } }
        );
    }

    res.status(200).json(editedFile);

});

//@desc before publishing, it will first go through the stagedSchema
//@route POST /api/files/dashboard/folder/staged/:event_id
//@access private

const stageFile = asyncHandler(async (req, res) => {

    const { event_id } = req.params;

    if (req.user.userType !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

<<<<<<< HEAD
    const {filename, suffix, Message, readOnly, deletable, path, status} = req.body;
    if (filename === undefined || suffix === undefined || Message === undefined || readOnly === undefined || 
        deletable  === undefined || path === undefined || status === undefined) {
=======
    console.log("OKKK");

    const { filename, suffix, Message, readOnly, deletable, path, status } = req.body;
    if (filename === undefined || suffix === undefined || Message === undefined || readOnly === undefined ||
        deletable === undefined || path === undefined || status === undefined) {
>>>>>>> 15f0bcef755cd60deb589220e96e59cba7dec913
        res.status(400);
        throw new Error("Please fill out the required fields");
    }

    const editedFile = {
        EventID: event_id,
        filename,
        suffix,
        Message,
        readOnly,
        deletable,
        path,
        status
    };

    const changes = await Changes.findOne(
        { "changedFiles.EventID": event_id },
        { "dir.$": 1 });

    if (!changes) {
        res.status(404);
        throw new Error("File not found in changedSchema");
    }

    const allStaged = await Staged.findOne();

    await Staged.updateOne(
        { _id: allStaged._id },
        { $push: { stagedFiles: editedFile } }
    );

    res.status(200).json(editedFile);

});

const update_stagedStatus = asyncHandler(async (req, res) => {
    const { event_id } = req.params;

    if (req.user.userType !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

    const { status } = req.body;
    if (status === undefined) {
        res.status(400);
        throw new Error("Please fill out the required fields");
    }

    const staged = await Staged.findOne(
        { "stagedFiles.EventID": event_id },
        { "dir.$": 1 });

    if (!staged) {
        res.status(404);
        throw new Error("File not found in stagedSchema");
    }

    await Staged.updateOne(
        { "stagedFiles.EventID": event_id },
        { $set: { "stagedFiles.$.status": status } }
    );

    res.status(200).json({ message: "File status updated" });

});

module.exports = {
    getFolders,
    getFiles,
    getFile,
    createFolder,
    addFile,
    update_changedFile,
<<<<<<< HEAD
    stageFile,
    viewStagedFiles
=======
    update_stagedStatus,
    stageFile
>>>>>>> 15f0bcef755cd60deb589220e96e59cba7dec913
};