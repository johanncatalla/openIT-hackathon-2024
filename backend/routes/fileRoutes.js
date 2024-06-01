const express = require("express");
const router = express.Router();
const {    
    getFolders,
    getFiles
} = require("../controllers/fileController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/dashboard").get(getFolders);
router.route("/dashboard/folder/:folder_name").get(getFiles);

module.exports = router;