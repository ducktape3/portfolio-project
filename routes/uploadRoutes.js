const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// File Upload Routes
router.get('/works', uploadController.getAllWorks);
router.post('/upload-work', uploadController.uploadWork);
router.post('/upload-file', uploadController.upload.single('file'), uploadController.uploadFile);
router.delete('/delete-work', uploadController.deleteWork);

module.exports = router;
