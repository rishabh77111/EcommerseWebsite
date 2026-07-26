import express from 'express';
import { create, deleteBrand, getAll, getBrandById, update } from '../controllers/brand.controller';
import { uploader } from '../middlewares/multer.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';

const router=express.Router();
const upload=uploader();

router.get("/",authenticate(),getAll);
router.get("/:id",getBrandById);
router.post("/create",upload.single("logo"),create);
router.put("/:id",upload.single("logo"),update);
router.delete("/:id",deleteBrand);

export default router;