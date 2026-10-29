# 🔌 API Quick Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication Header
```
Authorization: Bearer {jwt_token}
```

---

## 🔐 Auth Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-xxx-xxx-xxxx",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📁 Folder Endpoints

### Get All Folders (Protected)
```http
GET /folders
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "folders": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Lab Reports",
      "description": "My laboratory test results",
      "userId": "64f1a2b3c4d5e6f7g8h9i0j0",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Folder (Protected)
```http
POST /folders
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Lab Reports",
  "description": "My laboratory test results"
}
```

**Success (201):**
```json
{
  "success": true,
  "folder": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Lab Reports",
    "description": "My laboratory test results",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j0",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get Folder By ID (Protected)
```http
GET /folders/{folderId}
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "folder": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Lab Reports",
    "description": "My laboratory test results",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j0",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update Folder (Protected)
```http
PUT /folders/{folderId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Lab Reports",
  "description": "Updated description"
}
```

**Success (200):**
```json
{
  "success": true,
  "folder": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Updated Lab Reports",
    "description": "Updated description",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j0",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T15:45:00Z"
  }
}
```

---

### Delete Folder (Protected)
```http
DELETE /folders/{folderId}
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Folder deleted"
}
```

---

## 📄 Document Endpoints

### Get Documents in Folder (Protected)
```http
GET /documents/folders/{folderId}/documents
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "documents": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k1",
      "fileName": "blood_report.pdf",
      "folderId": "64f1a2b3c4d5e6f7g8h9i0j1",
      "userId": "64f1a2b3c4d5e6f7g8h9i0j0",
      "s3Key": "medical-docs/user123/folder/1705318200000-blood_report.pdf",
      "s3Url": "https://medicaldocs-storage.s3.amazonaws.com/...",
      "fileSize": 245632,
      "fileType": "application/pdf",
      "uploadedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Upload Document (Protected)
```http
POST /documents/folders/{folderId}/documents
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: <binary_file_data>
```

**Success (201):**
```json
{
  "success": true,
  "document": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0k1",
    "fileName": "blood_report.pdf",
    "folderId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j0",
    "s3Key": "medical-docs/user123/folder/1705318200000-blood_report.pdf",
    "s3Url": "https://medicaldocs-storage.s3.amazonaws.com/...",
    "fileSize": 245632,
    "fileType": "application/pdf",
    "uploadedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Download Document (Protected)
```http
GET /documents/{documentId}/download
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "downloadUrl": "https://medicaldocs-storage.s3.amazonaws.com/medical-docs/user123/folder/1705318200000-blood_report.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...&Expires=3600..."
}
```

> **Note:** URL is valid for 1 hour. Browser will download file directly from AWS S3.

---

### Delete Document (Protected)
```http
DELETE /documents/{documentId}
Authorization: Bearer {token}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Document deleted"
}
```

---

## ❌ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Token is not valid"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Not authorized"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Document not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## 💡 Usage Tips

1. **Save Token After Login**
   ```javascript
   localStorage.setItem('token', response.data.token);
   ```

2. **Include Token in Requests**
   ```javascript
   const config = {
     headers: {
       Authorization: `Bearer ${token}`
     }
   };
   ```

3. **Handle Token Expiry**
   - Tokens expire in 7 days
   - User must login again

4. **File Upload Limitations**
   - Supported formats: PDF, DOC, DOCX, JPG, PNG, JPEG
   - Max file size: No limit (AWS S3 supports large files)

5. **Pre-signed URLs**
   - Valid for 1 hour
   - Download directly from S3
   - No server bandwidth used

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "confirmPassword": "test123"
  }'
```

### Login & Save Token
```bash
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  | jq -r '.token')

echo $TOKEN
```

### Create Folder
```bash
curl -X POST http://localhost:5000/api/folders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Docs","description":"Medical docs"}'
```

---

## 📱 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ OK - Successfully processed |
| 201 | ✅ Created - Resource created |
| 400 | ❌ Bad Request - Invalid input |
| 401 | ❌ Unauthorized - No/invalid token |
| 403 | ❌ Forbidden - No permission |
| 404 | ❌ Not Found - Resource doesn't exist |
| 500 | ❌ Server Error - Internal error |

---

## 🔗 Related Documentation

- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Installation guide
- [CLOUD_MODELS.md](CLOUD_MODELS.md) - Architecture explanation
- [PROJECT_GUIDE.md](PROJECT_GUIDE.md) - Complete guide

Happy coding! 🚀
