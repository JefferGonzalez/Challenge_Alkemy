import {Router} from "express";
import {actions as CategoryController} from "../Controllers/CategoryController";

const router = Router();

router.get('/user/:email', CategoryController.getAll);
router.get('/:id', CategoryController.searchForId);
router.post('/', CategoryController.addOperation);
router.put('/:id', CategoryController.updateOperation);
router.delete('/:id', CategoryController.deleteOperation);

export default router;