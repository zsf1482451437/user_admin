const Router = require("koa-router");
const UserController = require("../controllers/user");

const router = new Router();

router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/register", UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;
