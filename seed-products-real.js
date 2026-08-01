// Run this inside mongosh, after "use EcommerseWebsite_BI"
// (or run directly: mongosh EcommerseWebsite_BI seed-products-real.js)

db.products.insertMany([
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality for music, calls, and gaming. Comfortable memory foam ear cushions designed for extended use.",
    price: 4999,
    stock: 50,
    cover_image: {
      path: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      public_id: "sample_headphones_cover"
    },
    images: [
      { path: "https://res.cloudinary.com/demo/image/upload/sample.jpg", public_id: "sample_headphones_1" },
      { path: "https://res.cloudinary.com/demo/image/upload/sample.jpg", public_id: "sample_headphones_2" }
    ],
    brand: ObjectId("6a659c7cfa5381e8c6a5146a"),      // Sony
    category: ObjectId("6a65b70d2bc4b5bfcfac742a"),   // Electronics
    is_featured: true,
    new_arrival: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Men's Casual Denim Jacket",
    description: "Classic denim jacket crafted from durable cotton fabric, featuring a comfortable regular fit, button closure, and multiple pockets. Perfect for layering in any season, blending timeless style with everyday comfort.",
    price: 2499,
    stock: 30,
    cover_image: {
      path: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      public_id: "sample_jacket_cover"
    },
    images: [],
    brand: ObjectId("6a659bd9fa5381e8c6a51468"),      // Adidas
    category: ObjectId("6a65b77c2bc4b5bfcfac742b"),   // Fashion
    is_featured: false,
    new_arrival: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "The Pragmatic Programmer",
    description: "A must-read guide for software developers covering best practices in coding, debugging, and career growth. Packed with practical tips, real-world examples, and timeless advice for writing better software efficiently.",
    price: 899,
    stock: 100,
    cover_image: {
      path: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      public_id: "sample_book_cover"
    },
    images: [],
    brand: ObjectId("6a659b10fa5381e8c6a51466"),      // Samsung (used as placeholder, no "publisher" brand exists)
    category: ObjectId("6a65b8712bc4b5bfcfac742d"),   // Books
    is_featured: true,
    new_arrival: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Non-Stick Cookware Set",
    description: "10-piece non-stick cookware set including frying pans, saucepans, and a stockpot, designed with even heat distribution and durable coating for effortless cooking and easy cleanup in any modern kitchen.",
    price: 5499,
    stock: 20,
    cover_image: {
      path: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      public_id: "sample_cookware_cover"
    },
    images: [],
    brand: ObjectId("6a659b10fa5381e8c6a51466"),      // Samsung (placeholder)
    category: ObjectId("6a65b7fa2bc4b5bfcfac742c"),   // Home & Kitchen
    is_featured: false,
    new_arrival: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Adjustable Dumbbell Set",
    description: "Space-saving adjustable dumbbell set with quick-lock weight selection, ranging from 5 to 25 kg per hand. Ideal for home workouts, strength training, and building muscle without needing a full gym setup.",
    price: 8999,
    stock: 15,
    cover_image: {
      path: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      public_id: "sample_dumbbell_cover"
    },
    images: [],
    brand: ObjectId("6a659c1dfa5381e8c6a51469"),      // Puma
    category: ObjectId("6a65b9d32bc4b5bfcfac742f"),   // Sports
    is_featured: true,
    new_arrival: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
