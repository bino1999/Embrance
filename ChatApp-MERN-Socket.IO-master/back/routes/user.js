const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");


router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));
router.get("/users", catchErrors(userController.getAllUsers));
router.get("/users/:id", catchErrors(userController.getUserById));
router.post("/logout", auth, catchErrors(userController.logout)); // New logout route
router.get("/checklogin", auth, catchErrors(userController.checkLoginStatus)); // Protect checklogin route
module.exports = router;
