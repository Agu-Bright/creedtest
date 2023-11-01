const multer = require("multer");
const AppError = require("../utils/appError");
const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folder;
	 	if (file.mimetype.startsWith("image")) {
			folder = "public/photos";
		} else if (file.mimetype.startsWith("video")) {
			folder = "public/videos";
		}else if (file.mimetype === "application/pdf") {
      folder = "public/files";
    } else {
      cb(new AppError("Not an Image!, please upload an image", 401), false);
    }
		cb(null, folder);
	},
  
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		cb(null, `admin - ${file.fieldname}-${Date.now()}.${ext}`);
	},
});
const multerFilter = (req, file, cb) => {
    // Accept only specific file types
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new AppError(
          "Invalid file type. Only image and video files are allowed."
        ),
        false
      ); // Reject the file
    }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // Maximum file size (in bytes)
    files: 5 // Maximum number of files
  }
});
module.exports = upload;
