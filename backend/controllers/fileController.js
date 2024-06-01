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



module.exports = {
    getFolders
};