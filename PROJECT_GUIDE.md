# Medical Document Storage - Complete Project Guide

## 📋 Project Summary

This is a **complete cloud-based medical document storage system** that demonstrates:
- ☁️ **Cloud Computing Models** (IaaS, PaaS, SaaS)
- 🔐 **Secure user authentication**
- 📁 **Folder organization system**
- 📄 **Document upload/download to cloud storage**
- 🎨 **Modern responsive UI**

---

## 🎯 Features Implemented

### ✅ User Authentication System
- User registration with email validation
- Secure password hashing (bcryptjs)
- JWT token-based authentication
- Protected API routes
- Session management

### ✅ Folder Management
- Create unlimited folders
- Organize by category (Lab Reports, X-Rays, Prescriptions, etc.)
- Edit folder details
- Delete folders
- View folder creation date

### ✅ Document Management
- Upload medical documents (PDF, DOC, JPG, PNG)
- Store files in AWS S3 (IaaS)
- Download documents with pre-signed URLs
- Delete documents securely
- View file metadata (size, upload date, type)

### ✅ Cloud Infrastructure
- **IaaS**: AWS S3 for scalable object storage
- **PaaS**: Node.js/Express for application runtime
- **SaaS**: MongoDB for managed database
- Docker for containerization

### ✅ Security Features
- Password encryption with bcryptjs
- JWT authentication tokens
- CORS protection
- User data isolation
- Private S3 objects
- Pre-signed URLs for downloads

---

## 📂 Complete File Structure

```
CLOUD PROJECT/
│
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── aws.js               # AWS S3 configuration
│   │   │
│   │   ├── models/                   # Database schemas
│   │   │   ├── User.js               # User model with password hashing
│   │   │   ├── Folder.js             # Folder model
│   │   │   └── Document.js           # Document metadata model
│   │   │
│   │   ├── controllers/              # Business logic
│   │   │   ├── authController.js     # Register, login, getMe
│   │   │   ├── folderController.js   # CRUD for folders
│   │   │   └── documentController.js # Upload, download, delete docs
│   │   │
│   │   ├── routes/                   # API endpoints
│   │   │   ├── authRoutes.js         # /api/auth/*
│   │   │   ├── folderRoutes.js       # /api/folders/*
│   │   │   └── documentRoutes.js     # /api/documents/*
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT verification middleware
│   │   │
│   │   └── server.js                 # Express app setup
│   │
│   ├── package.json                  # Backend dependencies
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore
│   └── Dockerfile                    # Docker image
│
├── frontend/                         # React web application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Register.js           # Registration page
│   │   │   ├── Dashboard.js          # Main dashboard with folders
│   │   │   ├── FolderDetails.js      # Folder view with documents
│   │   │   ├── Auth.css              # Auth page styles
│   │   │   ├── Dashboard.css         # Dashboard styles
│   │   │   └── FolderDetails.css     # Folder page styles
│   │   │
│   │   ├── components/
│   │   │   ├── FolderCard.js         # Folder display card
│   │   │   ├── CreateFolderModal.js  # Create folder modal
│   │   │   └── FolderView.js         # Folder details view
│   │   │
│   │   ├── styles/
│   │   │   ├── FolderCard.css        # Card styling
│   │   │   └── CreateFolderModal.css # Modal styling
│   │   │
│   │   ├── utils/
│   │   │   └── api.js                # Axios API client with interceptors
│   │   │
│   │   ├── App.js                    # Main app component with routing
│   │   ├── App.css                   # Global styles
│   │   └── index.js                  # React entry point
│   │
│   ├── public/
│   │   └── index.html                # HTML template
│   │
│   ├── package.json                  # Frontend dependencies
│   ├── .env.example                  # Environment template
│   ├── .gitignore
│   └── Dockerfile                    # Docker image
│
├── docker-compose.yml                # Multi-container orchestration
├── README.md                         # Main documentation
├── SETUP.md                          # Setup instructions
├── CLOUD_MODELS.md                   # Cloud models explanation
├── setup.sh                          # Linux/Mac setup script
├── setup.bat                         # Windows setup script
└── PROJECT_GUIDE.md                  # This file

```

---

## 🚀 Getting Started (Step by Step)

### Step 1: Clone/Download Project
```bash
cd "CLOUD PROJECT"
```

### Step 2: Run Setup Script

**For Windows:**
```bash
setup.bat
```

**For Linux/Mac:**
```bash
bash setup.sh
```

### Step 3: Configure AWS Credentials

Edit `backend/.env`:
```
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=medicaldocs-storage
```

### Step 4: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

### Step 5: Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```

### 6️⃣ Access Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login with credentials |
| GET | `/api/auth/me` | Get current user (Protected) |

### Folders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/folders` | Get all user folders |
| POST | `/api/folders` | Create new folder |
| GET | `/api/folders/:id` | Get specific folder |
| PUT | `/api/folders/:id` | Update folder |
| DELETE | `/api/folders/:id` | Delete folder |

### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/documents/folders/:folderId/documents` | Get folder documents |
| POST | `/api/documents/folders/:folderId/documents` | Upload document |
| DELETE | `/api/documents/:id` | Delete document |
| GET | `/api/documents/:id/download` | Get download URL |

---

## 🏗️ Architecture Overview

### User Registration Flow
```
User Input → Validation → Password Hash → Save to MongoDB → JWT Token → Store Token in LocalStorage
```

### Document Upload Flow
```
Select File → Validate → Send to Backend → Save to AWS S3 → Store Metadata in MongoDB → Return Reference
```

### Document Download Flow
```
Request Download → Verify User Authorization → Generate Pre-signed URL → Return URL → Browser Downloads
```

---

## 🔐 Security Highlights

| Feature | Implementation |
|---------|----------------|
| Password Security | bcryptjs with salt |
| API Authentication | JWT tokens |
| Protected Routes | Auth middleware |
| File Access | User ownership validation |
| AWS Security | Pre-signed URLs (1 hour expiry) |
| CORS | Configured for frontend |
| Data Validation | Express validator |

---

## 💾 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  createdAt: Date
}
```

### Folder Collection
```javascript
{
  _id: ObjectId,
  name: String,
  userId: ObjectId (ref: User),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Document Collection
```javascript
{
  _id: ObjectId,
  fileName: String,
  folderId: ObjectId (ref: Folder),
  userId: ObjectId (ref: User),
  s3Key: String,
  s3Url: String,
  fileSize: Number,
  fileType: String,
  uploadedAt: Date
}
```

---

## 🐳 Docker Deployment

### Build and Run
```bash
docker-compose up --build
```

### Services
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

### Environment Variables in Docker
- Automatically loaded from `.env` file
- MongoDB uses Docker container
- All services on same network

---

## 🛠️ Technology Stack Details

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File upload handling
- **aws-sdk** - AWS S3 integration
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### Infrastructure
- **Node.js** - Runtime
- **MongoDB** - Database
- **AWS S3** - Cloud storage
- **Docker** - Containerization
- **JWT** - Token-based auth

---

## 📊 Usage Examples

### Example 1: User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Pandit",
    "email": "rajesh@medical.com",
    "password": "secure123",
    "confirmPassword": "secure123"
  }'
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Pandit",
    "email": "rajesh@medical.com"
  }
}
```

### Example 2: Create Folder

```bash
curl -X POST http://localhost:5000/api/folders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lab Reports 2024",
    "description": "All my laboratory test results"
  }'
```

### Example 3: Upload Document

```bash
curl -X POST http://localhost:5000/api/documents/folders/507f1f77bcf86cd799439011/documents \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -F "file=@/path/to/report.pdf"
```

---

## 🎓 Learning Outcomes

By studying this project, you'll learn:

✅ How to build a full-stack web application  
✅ Express.js REST API development  
✅ React component architecture  
✅ JWT authentication implementation  
✅ AWS S3 cloud storage integration  
✅ MongoDB database design  
✅ Docker containerization  
✅ Security best practices  
✅ File upload handling  
✅ CRUD operations  

---

## 🚨 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify MongoDB is running
- Check `.env` file exists and has correct values

### Frontend shows blank page
- Check browser console for errors
- Verify backend is running
- Clear browser cache

### AWS S3 upload fails
- Verify AWS credentials in `.env`
- Check bucket name is correct
- Ensure IAM user has S3 permissions

### CORS errors
- Backend is configured for localhost:3000
- If different, update CORS in `backend/src/server.js`

---

## 📞 Support

For issues or questions:
1. Check documentation in README.md
2. Review SETUP.md for installation
3. Check CLOUD_MODELS.md for architecture
4. Verify all environment variables are set

---

## 📝 Project Submission

This project includes:
- ✅ Complete backend API
- ✅ Modern React frontend
- ✅ AWS S3 integration
- ✅ MongoDB database
- ✅ Docker support
- ✅ Comprehensive documentation
- ✅ Cloud models explanation
- ✅ Security implementation

All requirements for a cloud-based medical document storage system are fulfilled!

---

## 🎉 Congratulations!

You now have a production-ready cloud application demonstrating:
- **IaaS** - AWS S3 infrastructure
- **PaaS** - Node.js platform
- **SaaS** - MongoDB service

Happy coding! 🚀
