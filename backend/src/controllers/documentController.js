const Document = require('../models/Document');
const s3 = require('../config/aws');
const fs = require('fs');

// @desc    Get all documents in a folder
// @route   GET /api/folders/:folderId/documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      folderId: req.params.folderId,
      userId: req.user.id,
    }).sort({ uploadedAt: -1 });

    res.status(200).json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload document to S3 and save reference (IaaS + PaaS)
// @route   POST /api/folders/:folderId/documents
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const { folderId } = req.params;
    const fileContent = fs.readFileSync(req.file.path);

    // S3 params for uploading (AWS S3 is IaaS - Infrastructure as a Service)
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `medical-docs/${req.user.id}/${folderId}/${Date.now()}-${req.file.originalname}`,
      Body: fileContent,
      ContentType: req.file.mimetype,
      ACL: 'private',
    };

    // Upload to S3
    s3.upload(s3Params, async (err, data) => {
      if (err) {
        fs.unlinkSync(req.file.path);
        return res.status(500).json({ success: false, message: 'Failed to upload to AWS S3' });
      }

      try {
        // Save document reference to MongoDB
        const document = new Document({
          fileName: req.file.originalname,
          folderId,
          userId: req.user.id,
          s3Key: data.key,
          s3Url: data.location,
          fileSize: req.file.size,
          fileType: req.file.mimetype,
        });

        await document.save();

        // Delete temporary file
        fs.unlinkSync(req.file.path);

        res.status(201).json({ success: true, document });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete document from S3 and database
// @route   DELETE /api/documents/:id
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Delete from S3
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: document.s3Key,
    };

    s3.deleteObject(deleteParams, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to delete from AWS S3' });
      }

      try {
        await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Document deleted' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Download document from S3
// @route   GET /api/documents/:id/download
exports.downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Generate pre-signed URL for download
    const getParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: document.s3Key,
      Expires: 3600, // URL valid for 1 hour
    };

    const downloadUrl = s3.getSignedUrl('getObject', getParams);
    res.status(200).json({ success: true, downloadUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
