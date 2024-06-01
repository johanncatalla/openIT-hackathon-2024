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
    console.log(`Searching for folder: ${folder_name}`);
    
    const directory = await Directory.findOne({ "dir._foldername": folder_name }, { "dir.$": 1 });
    if (!directory) {
        res.status(404);
        throw new Error("Folder not found");
    }

    const files = directory.dir[0].files;
    res.status(200).json(files);
});

module.exports = {
    getFolders,
    getFiles
};