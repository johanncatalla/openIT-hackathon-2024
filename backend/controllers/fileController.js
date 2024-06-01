const asyncHandler = require("express-async-handler");
const {
    File,
    Folder,
    Directory
} = require("../models/fileModel");

//@desc Get all folder files in the directory
//@route GET /api/files/dashboard
//@access private

const getFolders = asyncHandler(async(req, res) => {
    const directory = await Directory.find();
    res.status(200).json(directory);
});

//@desc all files in the folder
//@route GET /api/files/dashboard/folder/:folder_name
//@access private

const getFiles = asyncHandler(async(req, res) => {
    const {folder_name} = req.params;

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

const getFile = asyncHandler(async(req, res) => {
    const {folder_name, event_id} = req.params;
    
    const directory = await Directory.findOne(
        {   "dir._foldername": folder_name,
            "dir.files.EventID": event_id
        }, 
        {   "dir.$": 1,
        });
        
    if (!directory) {
        res.status(404);
        throw new Error("File not found");
    }

    const matchedFile = directory.dir[0].files.find(file => {return parseInt(file.EventID) === parseInt(event_id)});
    res.status(200).json(matchedFile);
    
});

//@desc create a folder in the directory
//@route POST /api/files/dashboard
//@access private

const createFolder = asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const {_foldername, path, files} = req.body;

    if (!_foldername) {
        res.status(400);
        throw new Error("Folder name is mandatory!");
    }

    if(req.user.userType !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

    const directoryWithFolder = await Directory.findOne({ "dir._foldername": _foldername });
    if (directoryWithFolder) {
        res.status(400);
        throw new Error("Folder name already exists!");
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

const addFile = asyncHandler(async(req, res) => {
    const {folder_name} = req.params;
    
    const {file_name, suffix, message, access, deletable, path, date} = req.body;
    const directory = await Directory.findOne({ "dir._foldername": folder_name }, { "dir.$": 1 });

    if (!directory) {
        res.status(404);
        throw new Error("Folder not found");
    }
    const newFile = {
        EventID: directory.dir[0].files.length + 1,
        filename: file_name,
        suffix,
        Message: message,
        readOnly: true,
        deletable: true,
        path: directory.dir[0]._foldername,
        date
    };
    await Directory.updateOne({ "dir._foldername": folder_name}, 
                            { $push: { "dir.$.files": newFile } });

    res.status(201).json({message: "File added successfully"});
});

module.exports = {
    getFolders,
    getFiles,
    getFile,
    addFile,
    createFolder
};