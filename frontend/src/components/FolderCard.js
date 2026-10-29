import React from 'react';
import '../styles/FolderCard.css';

const FolderCard = ({ folder, onOpen, onDelete }) => {
  return (
    <div className="folder-card">
      <div className="folder-icon">📁</div>
      <h3>{folder.name}</h3>
      <p className="folder-description">{folder.description || 'No description'}</p>
      <p className="folder-date">Created: {new Date(folder.createdAt).toLocaleDateString()}</p>
      <div className="folder-actions">
        <button className="btn-open" onClick={onOpen}>
          Open
        </button>
        <button className="btn-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FolderCard;
