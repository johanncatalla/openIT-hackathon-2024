const express = require("express");
const router = express.Router();
const {    
    getFolders,
    getFiles,
    getFile,
<<<<<<< HEAD
    addFile
=======

    createFolder
>>>>>>> 949c26f718b0a948c63fa66411a5840950083405
} = require("../controllers/fileController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/dashboard").get(getFolders);
router.route("/dashboard/folder/:folder_name").get(getFiles);
router.route("/dashboard/folder/:folder_name/:event_id").get(getFile);
<<<<<<< HEAD
router.route("/dashboard/folder/:folder_name").post(addFile);
    
=======
router.route("/dashboard").post(createFolder);


>>>>>>> 949c26f718b0a948c63fa66411a5840950083405
module.exports = router;