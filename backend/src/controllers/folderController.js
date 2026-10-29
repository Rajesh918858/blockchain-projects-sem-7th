const Folder = require('../models/Folder');

// @desc    Get all folders for user
// @route   GET /api/folders
exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, folders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new folder
// @route   POST /api/folders
exports.createFolder = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Folder name is required' });
    }

    const folder = new Folder({
      name,
      description,
      userId: req.user.id,
    });

    await folder.save();
    res.status(201).json({ success: true, folder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get folder by ID
// @route   GET /api/folders/:id
exports.getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ success: false, message: 'Folder not found' });
    }

    if (folder.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, folder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update folder
// @route   PUT /api/folders/:id
exports.updateFolder = async (req, res) => {
  try {
    const { name, description } = req.body;

    let folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ success: false, message: 'Folder not found' });
    }

    if (folder.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    folder = await Folder.findByIdAndUpdate(
      req.params.id,
      { name, description, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, folder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete folder
// @route   DELETE /api/folders/:id
exports.deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ success: false, message: 'Folder not found' });
    }

    if (folder.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Folder.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Folder deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
