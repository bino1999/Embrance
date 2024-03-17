
require("dotenv").config();
const axios = require("axios");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");
require("./models/diary");

const app = require("./app");

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const io = require("socket.io")(server);
const jwt = require("jwt-then");

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      console.log(user.warnings)
      if (user.warnings > 3) {
        // If the user has more than 3 warnings, emit a block message
        io.to(chatroomId).emit("blocked", { message: "You can't send messages" });
      } else {
        try {
          console.log(message)
          const response = await axios.post("http://localhost:5000/classify", { message });
          const hateSpeechProbability = response.data.hateSpeechProbability;
          console.log(hateSpeechProbability)
          if (hateSpeechProbability > 0.2) {
            // If hate speech probability is high, emit a warning message to the chatroom
            const warningMessage = `${user.name} is trying to send a message that may make others uncomfortable`;
            io.to(chatroomId).emit("hateSpeechDetected", { message: warningMessage });

            // Increase the user's warning count
            user.warnings += 1;
            await user.save();
          } else {
            // Otherwise, emit the message to the chatroom
            const newMessage = new Message({
              chatroom: chatroomId,
              user: socket.userId,
              name: user.name,
              message,
            });
            io.to(chatroomId).emit("newMessage", {
              message,
              name: user.name,
              user: socket.userId,
            });
            await newMessage.save();
          }
        } catch (error) {
          console.error("Error classifying message:", error.message);
        }
      }
    }
  });
});

