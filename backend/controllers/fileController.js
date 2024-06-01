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
        throw new Error("Folder not found");
    }

    const matchedFile = directory.dir[0].files.find(file => {return parseInt(file.EventID) === parseInt(event_id)});
    res.status(200).json(matchedFile);
    
});


module.exports = {
    getFolders,
    getFiles,
    getFile
};