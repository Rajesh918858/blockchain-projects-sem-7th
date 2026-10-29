# Setup & Installation Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your AWS credentials and MongoDB URI.

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 3. Using Docker (Optional)

```bash
docker-compose up --build
```

## Database Setup

### Option 1: Local MongoDB
```bash
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Copy connection string
5. Use in `.env` as `MONGODB_URI`

## AWS S3 Configuration

1. Create AWS Account
2. Go to S3 service
3. Create new bucket (e.g., `medicaldocs-storage`)
4. Create IAM user with S3 permissions
5. Get Access Key ID and Secret Access Key
6. Add to `.env`:

```
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=medicaldocs-storage
```

## Environment Variables

Create `.env` file in backend directory:

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medical-docs

# JWT
JWT_SECRET=your_super_secret_jwt_key_12345

# AWS S3
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=medicaldocs-storage
```

## Default Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## Testing the Application

1. Open http://localhost:3000
2. Register with email and password
3. Login
4. Create a folder (e.g., "Lab Reports")
5. Upload a PDF or image
6. Download or delete documents

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB server is accessible

### AWS S3 Upload Fails
- Check AWS credentials
- Verify bucket exists and is in correct region
- Check IAM permissions

### CORS Error
- Ensure backend is running on port 5000
- Check CORS configuration in backend/src/server.js
