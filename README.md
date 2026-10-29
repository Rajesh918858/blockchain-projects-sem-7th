# Medical Document Storage System - Cloud Project

This is a complete **cloud-based medical document storage system** built with MERN stack and AWS services.

## 🎯 Project Overview

A secure web application that allows healthcare users to:
- ✅ **Register & Login** - User authentication with JWT
- ✅ **Create Folders** - Organize documents by category (Lab Reports, X-Rays, etc.)
- ✅ **Upload Documents** - Store medical reports securely
- ✅ **Download Documents** - Retrieve documents with pre-signed URLs
- ✅ **Cloud Storage** - All files stored in AWS S3

## 🏗️ Architecture

### Cloud Models Implemented:

#### 1. **IaaS (Infrastructure as a Service)** - AWS S3
- Raw cloud infrastructure for file storage
- Scalable object storage
- Pay-as-you-go pricing model

#### 2. **PaaS (Platform as a Service)** - AWS SDK & Node.js Runtime
- Managed runtime environment
- Pre-built services and APIs
- Abstraction from underlying infrastructure

#### 3. **SaaS (Software as a Service)** - MongoDB Atlas (Optional)
- Cloud database service
- Managed backups and scaling
- Accessible from anywhere

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AWS**: AWS SDK S3 for file storage
- **File Upload**: Multer

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose

## 📁 Project Structure

```
CLOUD PROJECT/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js           # User schema
│   │   │   ├── Folder.js         # Folder schema
│   │   │   └── Document.js       # Document schema
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── folderController.js  # Folder operations
│   │   │   └── documentController.js # Document operations
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── folderRoutes.js
│   │   │   └── documentRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT verification
│   │   ├── config/
│   │   │   ├── database.js       # MongoDB connection
│   │   │   └── aws.js            # AWS S3 configuration
│   │   └── server.js             # Main server file
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js      # Main dashboard
│   │   │   └── FolderDetails.js  # Folder view
│   │   ├── components/
│   │   │   ├── FolderCard.js
│   │   │   ├── CreateFolderModal.js
│   │   │   └── FolderView.js
│   │   ├── utils/
│   │   │   └── api.js            # API client
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
│
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- AWS Account with S3 bucket access
- Docker & Docker Compose (optional)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from`.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your values:
```
MONGODB_URI=mongodb://localhost:27017/medical-docs
JWT_SECRET=your_secure_jwt_secret_here
PORT=5000
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
NODE_ENV=development
```

5. Start backend server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

App opens at `http://localhost:3000`

## 🐳 Running with Docker

1. Create `.env` file in project root with AWS credentials
2. Run:
```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Folder Endpoints (Protected - require JWT token)

#### Get All Folders
```
GET /api/folders
Authorization: Bearer {token}
```

#### Create Folder
```
POST /api/folders
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Lab Reports",
  "description": "My lab test results"
}
```

#### Delete Folder
```
DELETE /api/folders/{folderId}
Authorization: Bearer {token}
```

### Document Endpoints (Protected)

#### Upload Document
```
POST /api/documents/folders/{folderId}/documents
Authorization: Bearer {token}
Content-Type: multipart/form-data

[file: binary data]
```

#### Get Documents in Folder
```
GET /api/documents/folders/{folderId}/documents
Authorization: Bearer {token}
```

#### Download Document
```
GET /api/documents/{documentId}/download
Authorization: Bearer {token}
```

#### Delete Document
```
DELETE /api/documents/{documentId}
Authorization: Bearer {token}
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ Private S3 objects with pre-signed URLs
- ✅ User document ownership validation
- ✅ CORS enabled for frontend communication

## ☁️ Cloud Services Used

### AWS S3 (IaaS)
- Infrastructure for blob storage
- Handles file upload and retrieval
- Pre-signed URLs for secure downloads

### AWS SDK (PaaS)
- Managed service for AWS operations
- Abstracts S3 API complexity
- Integrated with Node.js runtime

### MongoDB (Database)
- Document storage for metadata
- User and folder information
- Document references

## 🎨 Features

1. **User Authentication**
   - Secure password hashing
   - JWT token authentication
   - Session management

2. **Folder Management**
   - Create multiple folders
   - Organize by category
   - Delete folders

3. **Document Management**
   - Upload medical reports (PDF, DOC, images)
   - Download with pre-signed URLs
   - Delete documents
   - File metadata tracking

4. **Responsive UI**
   - Modern gradient design
   - Mobile-friendly interface
   - Smooth animations

## 📝 Future Enhancements

- [ ] Share documents with other users
- [ ] Document versioning
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Document encryption
- [ ] Audit logs
- [ ] Dashboard analytics
- [ ] API rate limiting

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

**AWS S3 Upload Failed**
- Verify AWS credentials
- Check S3 bucket name and region
- Ensure IAM permissions

**CORS Error**
- Backend CORS is configured for `http://localhost:3000`
- Adjust in `src/server.js` if needed

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Built as a Cloud Computing Project demonstrating IaaS, PaaS, and SaaS concepts.
