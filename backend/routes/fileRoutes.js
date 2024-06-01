const express = require("express");
const router = express.Router();
const {    
    getFolders,
    getFiles,
    getFile,
    createFolder,
    createFile
} = require("../controllers/fileController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/dashboard").get(getFolders);
router.route("/dashboard/:folder_name").get(getFiles);
router.route("/dashboard/:folder_name/:event_id").get(getFile);

router.route("/dashboard/:event_id/:userType").post(createFolder).post(createFile);

module.exports = router;