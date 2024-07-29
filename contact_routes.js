const express = require("express");
const router = express.Router();
const {
    getContact,
    createContact,
    getContactById,
    UpdateContactById,
    DeleteContactById,
} = require("../controllers/contactController");
router.route("/").get(getContact).post(createContact);;

router.route("/:id").get(getContactById).put(UpdateContactById).delete(DeleteContactById);


module.exports = router;
