const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const connectDB = require("./config/db");

// App setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/api/items", itemRoutes(io));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
