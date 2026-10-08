const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contactControllers");
const contactValidator = require("../validators/contactValidator");
const ipLimiter = require("../middlewares/limitMiddlewares/ipLimitMiddlewares");
const emailLimiter = require("../middlewares/limitMiddlewares/emailLimterMiddlewares");

router.route('/')
    .post(
        emailLimiter({ windowMinutes:15, max:3, message: "Too many attempts. Try later." }),
        ipLimiter({ windowMinutes:15, max:3, message: "Too many attempts. Try later." }),
        contactValidator.sendContactEmail, 
        contactControllers.sendContactEmail
    )
;

module.exports = router;
