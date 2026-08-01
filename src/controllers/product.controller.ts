import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import AppError from "../utils/customError.util";
import { deleteFromCloudinary, upload } from "../utils/cloudinary.util";
import { catchAsync } from "../utils/catchAsync.util";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Check if no products exist
    if (products.length === 0) {
      throw new AppError("No products available", 404);
    }

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

//* get by id
export const getById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) throw new AppError("product not found", 404);

  res.status(200).json({
    message: `product:${id} fetched`,
    data: product,
  });
});

//* create
export const create = catchAsync(async (req, res) => {
  const {name,price,description,is_featured,new_arrival,stock,brand,category} = req.body;

  const { cover_image, images } = req.files as {
    cover_image: Express.Multer.File[];
    images: Express.Multer.File[];
  };

  if (!name) throw new AppError("name is required", 400);
  if (!price) throw new AppError("price is required", 400);
  if (!description) throw new AppError("description is required", 400);
  if (!stock) throw new AppError("stock is required", 400);
  if (!brand) throw new AppError("brand is required", 400);
  if (!category) throw new AppError("category is required", 400);
  if (!cover_image[0]) throw new AppError("cover_image is required", 400);

  const product = new Product({
    name,
    price,
    description,
    is_featured,
    new_arrival,
    stock,
    brand,
    category,
  });

  //*cover image
  const folder = "/products";
  const { path, public_id } = await upload(cover_image[0], folder);
  product.cover_image = {
    path,
    public_id,
  };

  // Promise.all(arr) //
  // Promise.allSettled()
  //*images
  if (images && images.length > 0) {
    const promises = images.map((file) => upload(file, folder));
    const files = await Promise.allSettled(promises);
    const successImages = files
      .filter((file) => file.status == "fulfilled")
      .map((file) => file.value);

    product.set("images", successImages);
  }

  //*save
  await product.save();

  res.status(201).json({
    message: "product created",
    data: product,
  });
});


//* update
export const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {name,price,description,is_featured,new_arrival,stock,brand,category,deleted_images,} = req.body;

  const { cover_image, images } = req.files as {
    cover_image: Express.Multer.File[];
    images: Express.Multer.File[];
  };

  const product = await Product.findOne({ _id: id });

  if (!product) throw new AppError("product not found", 404);

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (category) product.category = category;
  if (brand) product.brand = brand;
  if (stock) product.stock = stock;
  if (is_featured) product.is_featured = is_featured;
  if (new_arrival) product.new_arrival = new_arrival;

  const folder = "/products";

  //* cover image — : added cover_image && check so it doesn't
  //* crash when no new cover image is sent during an update
  if (cover_image && cover_image[0]) {
    await deleteFromCloudinary(product.cover_image.public_id);

    const { path, public_id } = await upload(cover_image[0], folder);

    product.cover_image = { path, public_id };
  }

  //* if deleted images —: implemented actual delete logic
 if (deleted_images &&Array.isArray(deleted_images) &&deleted_images.length > 0) {
  await Promise.allSettled(
    deleted_images.map((publicId: string) => deleteFromCloudinary(publicId))
  );

  const filteredImages = product.images.filter(
    (img) => !deleted_images.includes(img.public_id)
  );

  product.set("images", filteredImages);
}

  //* if new images — implemented actual upload + append logic
 if (images && images.length > 0) {
  const promises = images.map((file) => upload(file, folder));
  const results = await Promise.allSettled(promises);
  const successImages = results
    .filter((r) => r.status === "fulfilled")
    .map((r: any) => r.value);

  product.set("images", [...product.images, ...successImages]);
}

  //* save
  await product.save();
  res.status(200).json({
    message: `product:${id} updated`,
    data: product,
  });
});

//* delete
export const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) throw new AppError("product not found", 404);
    await deleteFromCloudinary(product.cover_image.public_id);

  if (product.images && product.images.length > 0) {
    await Promise.allSettled(
      product.images.map((img) => deleteFromCloudinary(img.public_id)),
    );
  }

  await product.deleteOne();
  res.status(200).json({
    message: "product deleted",
    data: product,
  });
});

//* get by category
export const getByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const products = await Product.find({ category: categoryId })
    .populate("category")
    .populate("brand");

  res.status(200).json({
    message: `product by category:${categoryId} fetched`,
    data: products,
  });
});

//* get by brand
export const getByBrand = catchAsync(async (req, res) => {
  const { brandId } = req.params;

  const products = await Product.findOne({ brand: brandId })
    .populate("category")
    .populate("brand");
  res.status(200).json({
    message: `product by brand:${brandId} fetched`,
    data: products,
  });
});

//* get featured products
export const getFeatured = catchAsync(async (req, res) => {
  const products = await Product.find({ is_featured: true })
    .populate("category")
    .populate("brand");
  res.status(200).json({
    message: `featured product fetched`,
    data: products,
  });
});

//* get new arrivals
export const newArrivals = catchAsync(async (req, res) => {
  const products = await Product.find({ new_arrival: true })
    .populate("category")
    .populate("brand");
  res.status(200).json({
    message: `new arrival product fetched`,
    data: products,
  });
});
