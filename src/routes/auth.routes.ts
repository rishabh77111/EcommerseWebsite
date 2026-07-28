import express from 'express';
import { changeProfile, login, register } from '../controllers/auth.controller';
import { uploader } from '../middlewares/multer.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';

const router=express.Router();

const upload=uploader();

router.post("/register",upload.single("profile_image"),register);
router.post("/login",login);
router.put('/profile-image',upload.single("profile_image"),authenticate(),changeProfile)

export default router;