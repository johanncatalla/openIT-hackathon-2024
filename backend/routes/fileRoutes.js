const express = require("express");
const router = express.Router();
const {    
    getFolders,
    getFiles,
    getFile,
    addFile,
    createFolder,
    update_changeFile
} = require("../controllers/fileController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/dashboard").get(getFolders);
router.route("/dashboard/folder/:folder_name").get(getFiles);
router.route("/dashboard/folder/:folder_name/:event_id").get(getFile);
router.route("/dashboard").post(createFolder);
router.route("/dashboard/folder/:folder_name").post(addFile);
router.route("/dashboard/folder/:folder_name/:event_id").post(update_changeFile);

    



module.exports = router;