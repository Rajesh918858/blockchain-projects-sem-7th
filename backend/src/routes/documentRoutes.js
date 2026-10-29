const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const {
  getDocuments,
  uploadDocument,
  deleteDocument,
  downloadDocument,
} = require('../controllers/documentController');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.use(protect); // Protect all routes

router.get('/folders/:folderId/documents', getDocuments);
router.post('/folders/:folderId/documents', upload.single('file'), uploadDocument);
router.delete('/:id', deleteDocument);
router.get('/:id/download', downloadDocument);

module.exports = router;
