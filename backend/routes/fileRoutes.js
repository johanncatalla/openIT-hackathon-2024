const express = require("express");
const router = express.Router();
const {    
    getFolders,
    getFiles,
    getFile,
    addFile
} = require("../controllers/fileController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/dashboard").get(getFolders);
router.route("/dashboard/folder/:folder_name").get(getFiles);
router.route("/dashboard/folder/:folder_name/:event_id").get(getFile);
router.route("/dashboard/folder/:folder_name").post(addFile);
    
module.exports = router;