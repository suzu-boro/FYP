API Endpoints:

Create Product
Endpoint: POST /api/products
Description: Create a new product.

Get All Products
Endpoint: GET /api/products
Description: Fetch all products. Supports pagination and filtering by category.

Get Single Product
Endpoint: GET /api/products/:id
Description: Fetch a single product by its ID.

Delete Product
Endpoint: DELETE /api/products/:id
Description: Delete a product by its ID.

Update Product
Endpoint: PUT /api/products/:id
Description: Update a product by its ID, including handling new images.

Search Products
Endpoint: GET /api/products/search
Description: Search for products based on a query, including product name, category, and description


Technologies

Node.js:
The backend is running on Node.js, which allows for server-side JavaScript execution.

Express:
The code uses Express.js, a web application framework for Node.js, to handle HTTP requests and routing.

Mongoose:
Mongoose is used for interacting with MongoDB, providing an object data modeling (ODM) layer.

MongoDB:
MongoDB is the database used for storing product data.

File System (fs):
The fs module is used for file system operations, such as deleting old product images.

Path Module:
The path module is used for handling and transforming file paths.

URL Module:
The url module (specifically fileURLToPath and pathToFileURL) is used for working with URL paths.

Middleware for File Uploads:
The code handles file uploads with req.files and mv method to move uploaded files.

Environment Variables:
Environment variables (process.env.HOST and process.env.PORT) are used for configuration, likely with a library like dotenv to manage these settings.

Error Handling and Logging:
Error handling and logging are done with console.log statements and appropriate HTTP status codes.


Environment Variables The provided variables are environment variables used in your project to configure various aspects of the application. Here's a breakdown of each one:

1.PORT=3000: This specifies the port number on which your application server will run. In this case, the server will listen on port 3000.

2.MONGO_URI=mongodb://localhost:27017/myDatabase: This is the connection string for a local MongoDB database. It indicates that MongoDB is running on localhost (your local machine) at the default port 27017, and it will connect to a database named myDatabase.

3.MONGODB_CLOUD_URL=mongodb+srv://test:test@cluster0.59te8vi.mongodb.net/project: This is the connection string for a MongoDB Atlas (cloud-hosted) database. It uses the MongoDB SRV protocol to connect to the project database on a cluster. The credentials provided (test:test) are the username and password for authentication.

4.JWT_SECRET=SECRETHO: This is the secret key used to sign JSON Web Tokens (JWT) for authentication purposes. It should be kept confidential and is used to ensure the integrity and validity of tokens issued by your server.

5.EMAIL_USER=helloprajapati123456@gmail.com: This is the email address used as the sender for sending emails from your application. This could be used for sending confirmation emails, password resets, and other notifications.

6.EMAIL_PASS=xwkh ruir duel dybu: This is the password for the email account specified in EMAIL_USER. It is used for authenticating with the email server when sending emails. (Note: For security reasons, it's better to use an app-specific password or other secure methods instead of a personal email password.)

7.HOST=http://192.168.18.33: This specifies the host URL where your application is running. In this case, it points to a local network IP address. This could be the server's IP address in a development or staging environment.

Author:Nayan Prajapati
