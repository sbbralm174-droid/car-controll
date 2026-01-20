const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// CORS settings update
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A device connected:", socket.id);

  socket.on("command", (data) => {
    console.log("Received CMD:", data);
    io.emit("robot-command", data);
  });

  socket.on("disconnect", () => {
    console.log("Device disconnected");
  });
});

// Render-এর জন্য সঠিক পোর্ট হ্যান্ডলিং
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});