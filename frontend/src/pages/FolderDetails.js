import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FolderView from '../components/FolderView';
import { folderAPI, documentAPI } from '../utils/api';
import './FolderDetails.css';

const FolderDetails = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [folder, setFolder] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    fetchFolderDetails();
    fetchDocuments();
  }, [folderId]);

  const fetchFolderDetails = async () => {
    try {
      // In a real app, you'd have a getFolderById endpoint
      const response = await folderAPI.getFolders();
      const folder = response.data.folders.find(f => f._id === folderId);
      setFolder(folder);
    } catch (err) {
      setError('Failed to load folder');
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await documentAPI.getDocuments(folderId);
      setDocuments(response.data.documents);
      setLoading(false);
    } catch (err) {
      setError('Failed to load documents');
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      await documentAPI.uploadDocument(folderId, file);
      await fetchDocuments();
      setUploadingFile(false);
    } catch (err) {
      setError('Failed to upload file');
      setUploadingFile(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentAPI.deleteDocument(docId);
        await fetchDocuments();
      } catch (err) {
        setError('Failed to delete document');
      }
    }
  };

  const handleDownloadDocument = async (docId) => {
    try {
      const response = await documentAPI.downloadDocument(docId);
      window.open(response.data.downloadUrl, '_blank');
    } catch (err) {
      setError('Failed to download document');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="folder-details-container">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Folders
      </button>
      
      <div className="folder-header">
        <h1>{folder?.name}</h1>
        <p>{folder?.description}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-btn">
          📁 Upload Medical Report
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          disabled={uploadingFile}
          accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
        />
        {uploadingFile && <p className="uploading">Uploading to AWS S3...</p>}
      </div>

      <div className="documents-section">
        <h2>Documents ({documents.length})</h2>
        {documents.length === 0 ? (
          <p className="no-docs">No documents yet. Upload your first medical report!</p>
        ) : (
          <div className="documents-list">
            {documents.map((doc) => (
              <div key={doc._id} className="document-item">
                <div className="doc-info">
                  <p className="doc-name">📄 {doc.fileName}</p>
                  <p className="doc-meta">
                    Size: {(doc.fileSize / 1024).toFixed(2)} KB | 
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="doc-actions">
                  <button
                    className="btn-download"
                    onClick={() => handleDownloadDocument(doc._id)}
                  >
                    Download
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteDocument(doc._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderDetails;
