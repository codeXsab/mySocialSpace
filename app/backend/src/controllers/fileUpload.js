import multer from "multer";
import path from "path";

const filePath = `C:\\Users\\SAB\\Desktop\\mySocialSpace\\client\\public\\uploads`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, "file-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Set file size limit (1MB)
}).single("file");

const fileUpload = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const file = req.file;
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file.filename });
  });
};

const testFileUpload = (req, res) => {
  res.send("File Upload api reached");
};

export { fileUpload, testFileUpload };
