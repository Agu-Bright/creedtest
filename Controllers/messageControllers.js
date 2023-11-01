const Message = require("../Models/messageModel");
const cloudinary = require("cloudinary").v2;
const { User } = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const catchAsync = require("../utils/catchAsync");
const fsExtra = require("fs-extra");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
// const allMessages = catchAsync(async (req, res) => {
//   try {
//     const messages = await Message.find({ chat: req.params.chatId })
//       .populate("sender", "name photo email")
//       .populate("chat");
//     res.status(200).json({
//       success: "true",
//       data: {
//         messages,
//       },
//     });
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });
const allMessages = catchAsync(async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const perPage = 20;

    // const skip = (page - 1) * perPage;

    // const totalMessages = await Message.countDocuments({
    //   chat: req.params.chatId,
    // });

    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name photo email")
      .populate("chat");
    // .skip(skip)
    // .limit(perPage);

    res.status(200).json({
      success: true,
      data: {
        // length: messages.length,
        messages,
        // currentPage: page,
        // totalPages: Math.ceil(totalMessages / perPage),
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = catchAsync(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name photo");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name photo email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendPhoto = catchAsync(async (req, res) => {
  const files = req.files.message_file;
  const chatId = req.body.additionalData;

  if (!files) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let uploadedUrls = [];

  //create file in the tepmfile folder
  if (Array.isArray(files)) {
    console.log("IS ARRAY");
    files.forEach((file) => {
      file.mv(`${__dirname}/tempfile/${file.name}`, (err) => {
        if (err) {
          console.log(err);
        }
        (async () => {
          const result = await cloudinary.uploader.upload(
            `./Controllers/tempfile/${file.name}`,
            {
              folder: "Photo",
              resource_type: "auto",
            }
          );
          uploadedUrls.push({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        })();
      });
    });
    fsExtra.emptyDirSync("./Controllers/tempfile");
    if (files.length === uploadedUrls.length) {
      var newMessage = {
        sender: req.user._id,
        photos: uploadedUrls,
        chat: chatId,
      };

      try {
        console.log("TRYING THE UPLOAD OF THE DATA");
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name photo");
        message = await message.populate("chat");
        message = await User.populate(message, {
          path: "chat.users",
          select: "name photo email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
          latestMessage: message,
        });

        res.json(message);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  } else {
    files.mv(`${__dirname}/tempfile/${files.name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const result = await cloudinary.uploader.upload(
      `./Controllers/tempfile/${files.name}`,
      {
        folder: "Photo",
        resource_type: "auto",
      }
    );

    uploadedUrls.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
    var newMessage = {
      sender: req.user._id,
      photos: uploadedUrls,
      chat: chatId,
    };
    fsExtra.emptyDirSync("./Controllers/tempfile");

    try {
      console.log("TRYING THE UPLOAD OF THE DATA");
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name photo");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name photo email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }

  // Create and store the message in the database
});

const sendFile = catchAsync(async (req, res) => {
  const { chatId } = req.body;
  const files = req.files;
  console.log(req.files);
  if (!files || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  console.log("chatId from req.body:", req.body.chatId);
  let uploadedUrls = [];

  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "Photo",
        resource_type: "auto",
      });

      uploadedUrls.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.sendStatus(500);
    }
  }

  console.log("chatId from req.body:", req.body.chatId);
  // Create and store the message in the database
  var newMessage = {
    sender: req.user._id,
    files: uploadedUrls,
    chat: chatId,
  };

  try {
    console.log("chatId from req.body:", req.body.chatId);
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name photo");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name photo email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage, sendPhoto, sendFile };
