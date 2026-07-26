import express from 'express';
import { create, getAll, getById, remove, update } from '../controllers/category.controller';
import { uploader } from '../middlewares/multer.middleware';

const router=express.Router();

const upload=uploader();

router.get("/",getAll);
router.get("/:id",getById);
router.post("/create",upload.single("image"),create);
router.put("/:id",upload.single("image"),update);
router.delete("/:id",remove);

export default router;