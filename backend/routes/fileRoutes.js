const express = require("express");
const router = express.Router();
const {    
    getFolders
} = require("../controllers/fileController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/dashboard").get(getFolders);

module.exports = router;