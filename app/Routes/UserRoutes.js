import {Router} from "express";
import {actions as UsersController} from "../Controllers/UserController";

const router = Router();

router.get('/:email', UsersController.searchForEmail);
router.post('/', UsersController.addUser);

export default router;