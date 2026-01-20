const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

io.on("connection", (socket) => {
  console.log("ESP32 connected")

  socket.on("command", (data) => {
    console.log("CMD:", data)
    io.emit("robot-command", data)
  })
})

server.listen(3001, () => {
  console.log("Socket server running on port 3001")
})
