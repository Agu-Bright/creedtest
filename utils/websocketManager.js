const socketIo = require("socket.io");
const Notification = require("../Models/notificationModels");
const Message = require("../Models/messageModel");
const { User } = require("../Models/userModel");
const ProjectPost = require("../Models/projectPostModel");
const Interview = require("../Models/interviewModel");

let io;
const userSockets = new Map();

module.exports = {
  initializeWebSocketServer: (server) => {
    io = socketIo(server, {
      pinTimeout: 60000, //Time it will wait while being inactive: IE, it will wait 60 sec before it goes off
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", async (socket) => {
      const userId = socket.handshake.query.userId;
      if (userId) {
        userSockets.set(userId, socket);
        await User.findByIdAndUpdate(userId, { online: true });
        console.log("user online");
      }
      console.log(`Socket Connected with the Id ${socket.id}`);
      socket.on("setup", (userData) => {
        socket.join(userData?._id);
        socket.emit("connected");
        (async () => {
          const myProjects = await ProjectPost.find({
            createdBy: userId,
            acceptedPerson: { $exists: true },
          });
          const projects = await ProjectPost.find({
            createdBy: userId,
            acceptedPerson: { $exists: false },
          });
          const myInterview = await Interview.find({
            createdBy: userId,
            acceptedPersons: { $size: 0 },
          });
          const AssigninInterviews = await Interview.find({
            createdBy: userId,
            acceptedPersons: { $exists: true, $not: { $size: 0 } },
          });

          const interviewLength = myInterview.length;
          const assignedInterviewLength = AssigninInterviews.length;
          const length = myProjects.length;
          const projectLength = projects.length;
          socket.emit("award project length", { length });
          socket.emit("project length", { projectLength });
          socket.emit("interview Length", { interviewLength });
          socket.emit("assignedInterview Length", { assignedInterviewLength });
        })();
      });
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room: " + room);
      });

      socket.on("notification", async (userData) => {
        //get users notification count
        const result = await Notification.find({
          $and: [{ receiver: userData }, { read: false }],
        });
        const length = result.length;
        socket.emit("new notification", length);
      });

      socket.on("typing", ({ chat, user }) => {
        console.log("is typing");
        socket.in(chat).emit("typing", { user, chat });
      });

      socket.on("stop typing", ({ chat, user }) => {
        socket.in(chat).emit("stop typing", { user, chat });
      });

      socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat?.users) return console.log("cat.users not defined");
        chat.users.forEach((user) => {
          if (user._id === newMessageRecieved.sender._id) return;
          socket.in(chat._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.on("read message", async ({ newMessage, user, chat }) => {
        const message = await Message.findById(newMessage);
        if (!message) return console.log("No message with the id found");
        if (message?.sender.toString() !== user?.toString()) {
          if (!message.readBy[0]) {
            message.readBy.push(user);
          }
          await message.save();
          socket.in(chat._id).emit("message read", message);
        }
      });

      socket.on("mark as read", async ({ id, userId }) => {
        await Notification.findByIdAndUpdate(id, {
          read: true,
        });
      });

      socket.on("disconnect", async () => {
        console.log("USER DISCONNECTED");
        const userId = socket.handshake.query.userId;
        if (userId) {
          await User.findByIdAndUpdate(userId, { online: false });
          console.log("user ofline");
        }
        console.log(socket.handshake.query.userId);
        socket.leave(userId);
      });
      socket.on;
    });
  },

  emitEventToClients: (eventName, eventData) => {
    io.emit(eventName, eventData);
  },

  emitEventToSpecificClient: (socketId, eventName, data) => {
    const socket = userSockets.get(socketId);
    if (socket) {
      socket.emit(eventName, data);
    }
  },
};
