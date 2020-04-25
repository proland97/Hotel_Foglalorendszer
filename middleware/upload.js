const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        //TODO new Error
        req.extensionError = 'This extension is not allowed!';
        cb(null, false);
    }
};

const upload = multer({ storage: storage, limits: 1024 * 1024 * 5, fileFilter: fileFilter });

module.exports = upload;