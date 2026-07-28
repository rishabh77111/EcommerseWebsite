import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware";
import {
  create,
  getAll,
  getByBrand,
  getByCategory,
  getById,
  getFeatured,
  newArrivals,
  remove,
  update,
} from "../controllers/product.controller";

import { uploader } from "../middlewares/multer.middleware";
import { Role } from "../@types/enum.type";

const router = Router();

const upload = uploader();

router.get("/", getAll);

router.get("/featured", getFeatured);
router.get("/new-arrivals", newArrivals);
router.get("/category/:categoryId", getByCategory);
router.get("/brand/:brandId", getByBrand);
router.get("/:id", getById);

// {cover_image:[{}] , images:[{},{},{}] , field:[{},{}]}
router.post(
  "/",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  upload.fields([
    {
      name: "cover_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  create,
);
router.put(
  "/:id",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  upload.single("logo"),
  update,
);
router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), remove);

export default router;