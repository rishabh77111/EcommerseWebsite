import express from 'express';
import { create, deleteBrand, getAll, getBrandById, update } from '../controllers/brand.controller';
import { uploader } from '../middlewares/multer.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { Role } from '../@types/enum.type';

const router=express.Router();
const upload=uploader();

router.get("/",getAll);
router.get("/:id",getBrandById);
router.post("/create",authenticate([Role.ADMIN,Role.SUPER_ADMIN]),upload.single("logo"),create);
router.put("/:id",authenticate([Role.ADMIN,Role.SUPER_ADMIN]),upload.single("logo"),update);
router.delete("/:id",authenticate([Role.ADMIN,Role.SUPER_ADMIN]),deleteBrand);

export default router;