const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getFolders,
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
} = require('../controllers/folderController');

const router = express.Router();

router.use(protect); // Protect all routes

router.get('/', getFolders);
router.post('/', createFolder);
router.get('/:id', getFolderById);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

module.exports = router;
