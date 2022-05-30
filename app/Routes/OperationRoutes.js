import {Router} from "express";
import {actions as OperationController} from "../Controllers/OperationController";

const router = Router();

router.get('/user/:email', OperationController.getAll);
router.get('/:id', OperationController.searchForId);
router.post('/', OperationController.addOperation);
router.put('/:id', OperationController.updateOperation);
router.delete('/:id', OperationController.deleteOperation);

export default router;