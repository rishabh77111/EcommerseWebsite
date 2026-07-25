import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { uploader } from '../middlewares/multer.middleware';

const router=express.Router();

const upload=uploader();

router.post("/register",upload.single("profile_image"),register);
router.post("/login",login);

export default router;