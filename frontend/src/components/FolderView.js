import React from 'react';

const FolderView = ({ folder, documents }) => {
  return (
    <div>
      <h2>{folder.name}</h2>
      <p>{folder.description}</p>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>{doc.fileName}</li>
          ))}
        </ul>
      ) : (
        <p>No documents in this folder</p>
      )}
    </div>
  );
};

export default FolderView;
