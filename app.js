const express = require("express");
const app = express();
const task = require("./router/router-task");
const connectDB = require("./db/connect-db-task");
require("dotenv").config();
const pageNotFound = require("./middleware/no-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware for use
app.use(express.static("./public"));
app.use(express.json());

// route
app.use("/api/v1/task", task);
app.use(pageNotFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  } catch (error) {
    console.log(error);
  }
};

start();
