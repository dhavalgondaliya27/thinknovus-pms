const { Router } = require('express');
const router = Router();
const {
  fileUpload,
} = require('../../controllers/fileUpload/fileUpload.controller');
const { upload } = require('../../middleware/multer.middleware');

router.post('/file/file-upload', upload.single('photo'), fileUpload);

module.exports = router;
