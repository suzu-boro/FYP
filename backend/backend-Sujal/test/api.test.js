const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // Assuming you have an Express app in app.js
const userModel = require("../models/userModels");
const path = require("path");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a user for login testing
  const testUser = new userModel({
    firstName: "Nayan",
    lastName: "Prajapati",
    email: "nayanpraz123@gmail.com",
    password: "newpass123", // You would normally hash the password here
    salt: "salt", // Normally generated with your generatePassword function
  });
  await testUser.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Registration API Tests", () => {
  // Test for successful registration
  it("should register a new user successfully", async () => {
    const newUser = {
      firstName: "Nayan",
      lastName: "Prajapati",
      email: "nayanpraz123@gmail.com",
      password: "newpass123",
    };

    const res = await request(app).post("/api/users/create").send(newUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("User Created Successfully!");
    expect(res.body.userData).toHaveProperty("email", "nayanpraz123@gmail.com");

    // Ensure user is saved in the database
    const userInDb = await userModel.findOne({
      email: "nayanpraz123@gmail.com",
    });
    expect(userInDb).not.toBeNull();
    expect(userInDb.firstName).toBe("Nayan");
  });

  // Test for registration with an existing email
  it("should not allow registration with an existing email", async () => {
    const existingUser = {
      firstName: "Nayan",
      lastName: "Prajapati",
      email: "nayanpraz123@gmail.com",
      password: "newpass123",
    };

    const res = await request(app).post("/api/users/create").send(existingUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("User Already Exists!");
  });

  // Test for registration with missing fields
  it("should not allow registration with missing fields", async () => {
    const incompleteUser = {
      firstName: "Incomplete",
      email: "incomplete@example.com",
      // Missing lastName and password
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(incompleteUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Please enter all fields!");
  });
});

describe("User Login API Tests", () => {
  // Test for successful login
  it("should login an existing user with correct credentials", async () => {
    const user = {
      email: "nayanpraz123@gmail.com",
      password: "newpass123", // Use the correct password
    };

    const res = await request(app).post("/api/users/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("token");
    expect(res.body.userData).toHaveProperty("email", "nayanpraz123@gmail.com");
  });

  // Test for invalid login credentials
  it("should not login with incorrect password", async () => {
    const user = {
      email: "nayanpraz123@gmail.com",
      password: "wrongpassword",
    };

    const res = await request(app).post("/api/users/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Incorrect Password!");
  });

  // Test for login with a non-existing user
  it("should not login a non-existing user", async () => {
    const user = {
      email: "non.existing@example.com",
      password: "password123",
    };

    const res = await request(app).post("/api/users/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("User Not Found!");
  });
});

// Product API Tests
describe("Product API Tests", () => {
  it("should create a new product successfully", async () => {
    const product = {
      productName: "mug",
      productPrice: 99.99,
      productCategory: "mug",
      productDescription: "This is a test product",
    };

    const res = await request(app)
      .post("/api/products/create")
      .field("productName", product.productName)
      .field("productPrice", product.productPrice)
      .field("productCategory", product.productCategory)
      .field("productDescription", product.productDescription)
      .attach("productImage", path.join(__dirname, "test-greenmug.jpg")); // Assuming you have a test image

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Product Created!");
    expect(res.body.data).toHaveProperty("productName", "Test Product");
  });

  it("should fetch all products with pagination", async () => {
    const res = await request(app)
      .get("/api/products")
      .query({ limit: 5, page: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Products fetched successfully.");
    expect(res.body.products.length).toBeLessThanOrEqual(5);
    expect(res.body.page).toBe(1);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("totalPage");
  });

  it("should update an existing product successfully", async () => {
    // First, create a product to update
    const newProduct = await request(app)
      .post("/api/products/create")
      .field("productName", "mug")
      .field("productPrice", 49.99)
      .field("productCategory", "mug")
      .field("productDescription", "Product to be updated")
      .attach("productImage", path.join(__dirname, "test-greenmug.jpg"));

    const productId = newProduct.body.data._id;

    // Now, update the product
    const updatedProduct = {
      productName: "mug",
      productPrice: 59.99,
      productCategory: "mug",
      productDescription: "This product has been updated",
    };

    const res = await request(app)
      .put(`/api/products/${productId}`)
      .field("productName", updatedProduct.productName)
      .field("productPrice", updatedProduct.productPrice)
      .field("productCategory", updatedProduct.productCategory)
      .field("productDescription", updatedProduct.productDescription)
      .attach("productImage", path.join(__dirname, "updated-greenmug.jpg"));

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Product Updated!");
    expect(res.body.updatedProduct).toHaveProperty(
      "productName",
      "Updated Product"
    );
  });
});
