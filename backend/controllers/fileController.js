const asyncHandler = require("express-async-handler");
const {
    File,
    Folder,
    Directory
} = require("../models/fileModel");

//@desc Get all folder files in the directory
//@route GET /api/dashboard
//@access private

const getFolders = asyncHandler(async(req, res) => {
    const folders = await Directory.find();
    res.status(200).json(folders);
});

//@desc Get all files in the folder
//@route GET /api/dashboard/:folder_name
//@access private

const getFiles = asyncHandler(async(req, res) => {
    const files = await Folder.find();
    res.status(200).json(files);
});

//@desc Get all files in the folder
//@route GET /api/dashboard/:folder_name
//@access private

const getFile = asyncHandler(async(req, res) => {
    const file = await File.find();
    res.status(200).json(file);
});


//@desc Create Folder
//@route POST /api/dashboard/:userType
//@access private

const createFolder = asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const {folder_name, path, files} = req.body;
    if (!folder_name) {
        res.status(400);
        throw new Error("Folder name is mandatory!");
    }

    if(req.userType.toString() !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

    const folder = await Folder.create({
        folder_name,
        path,
        files
    });
    res.status(201).json(folder);
});

//@desc Create File
//@route POST /api/dashboard/:userType
//@access private

const createFile = asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const {event_id, file_name, suffix, message, access, deletable, path} = req.body;
    if (!event_id || !file_name || !suffix || !message || !access || !deletable || !path) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    if(req.userType.toString() !== "admin") {
        res.status(403);
        throw new Error("User don't have permission to create folder");
    }

    const file = await File.create({
        event_id,
        file_name,
        suffix, 
        message, 
        access, 
        deletable, 
        path
    });
    res.status(201).json(file);
});


module.exports = {
    getFolders,
    getFiles,
    getFile,
    createFolder,
    createFile
};