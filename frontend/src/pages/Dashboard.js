import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FolderCard from '../components/FolderCard';
import CreateFolderModal from '../components/CreateFolderModal';
import { folderAPI } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await folderAPI.getFolders();
      setFolders(response.data.folders);
      setError('');
    } catch (err) {
      setError('Failed to load folders');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (name, description) => {
    try {
      await folderAPI.createFolder(name, description);
      await fetchFolders();
      setShowModal(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create folder';
      setError(errorMsg);
      console.error('Create folder error:', err);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      try {
        await folderAPI.deleteFolder(folderId);
        await fetchFolders();
      } catch (err) {
        setError('Failed to delete folder');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏥 Medical Document Storage</h1>
          <p>Cloud-based secure document management</p>
        </div>
        <div className="user-section">
          <span className="user-name">Welcome, {user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="section-header">
          <h2>Your Folders</h2>
          <button className="create-btn" onClick={() => setShowModal(true)}>
            ➕ Create New Folder
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading your folders...</div>
        ) : folders.length === 0 ? (
          <div className="empty-state">
            <p>No folders yet. Create your first folder to start storing documents!</p>
            <button className="create-btn-large" onClick={() => setShowModal(true)}>
              Create First Folder
            </button>
          </div>
        ) : (
          <div className="folders-grid">
            {folders.map((folder) => (
              <FolderCard
                key={folder._id}
                folder={folder}
                onOpen={() => navigate(`/folder/${folder._id}`)}
                onDelete={() => handleDeleteFolder(folder._id)}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <CreateFolderModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateFolder}
        />
      )}
    </div>
  );
};

export default Dashboard;
