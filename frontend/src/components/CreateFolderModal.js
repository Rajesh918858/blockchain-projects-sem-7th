import React, { useState } from 'react';
import '../styles/CreateFolderModal.css';

const CreateFolderModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Folder name is required');
      return;
    }

    setLoading(true);
    try {
      await onCreate(formData.name, formData.description);
      setFormData({ name: '', description: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Folder</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Folder Name (e.g., Lab Reports)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
          <div className="modal-actions">
            <button type="submit" className="btn-create" disabled={loading}>
              {loading ? 'Creating...' : 'Create Folder'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
