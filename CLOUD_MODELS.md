# Cloud Models Explanation

This project demonstrates three cloud computing models:

## 1. IaaS (Infrastructure as a Service)

### AWS S3 - Simple Storage Service

**What it is:**
- Raw cloud infrastructure for data storage
- You rent computing resources (storage space)
- You manage applications and data
- Cloud provider manages infrastructure

**How it's used:**
```javascript
// backend/src/config/aws.js
const s3 = new AWS.S3();

// Upload file to S3
s3.upload({
  Bucket: 'medicaldocs-storage',
  Key: 'medical-docs/user123/folder/file.pdf',
  Body: fileContent,
}, callback);
```

**Characteristics:**
- Pay per GB used
- Scalable to any size
- Accessible over HTTP/HTTPS
- Durable and replicated

**Real-world analogy:**
Like renting warehouse space - you can store as much as you want, but you're responsible for organizing the items inside.

---

## 2. PaaS (Platform as a Service)

### Node.js Runtime + Express Framework

**What it is:**
- Complete development environment
- Pre-built tools and services
- Focus on code, not infrastructure
- Cloud provider manages OS, middleware, runtime

**How it's used:**
```javascript
// backend/src/server.js
const app = express();
app.use(cors());
app.listen(PORT);
```

**Characteristics:**
- Built-in libraries and frameworks
- Automatic scaling
- Integrated development tools
- Focus on application logic

**Real-world analogy:**
Like renting a fully furnished office with utilities included - everything is ready, you just set up your desk and work.

---

## 3. SaaS (Software as a Service)

### Database as a Service (MongoDB Atlas)

**What it is:**
- Complete software solution delivered over the internet
- Users access via web browser or API
- No installation needed
- Cloud provider manages everything

**How it's used:**
```javascript
// backend/src/config/database.js
mongoose.connect(process.env.MONGODB_URI);
```

**Characteristics:**
- Fully managed backups
- Automatic updates
- Multi-tenant infrastructure
- Pay per usage

**Real-world analogy:**
Like using Gmail - you don't manage servers, you just access the service through your browser.

---

## Architecture Diagram

```
                    User Browser (React)
                           |
                    --------+--------
                   |                 |
            Frontend App         API Calls
            (React - PaaS)      (HTTP/REST)
                   |                 |
                   +--------+--------+
                            |
                  Backend Server (PaaS)
                  Node.js + Express
                            |
            +---------------+---------------+
            |               |               |
        MongoDB         AWS S3          JWT Auth
        (SaaS)          (IaaS)           (PaaS)
        - User data    - Files          - Security
        - Folders      - Documents
        - Docs refs    - Object storage
```

---

## Comparison Table

| Feature | IaaS | PaaS | SaaS |
|---------|------|------|------|
| User manages | Applications, Data | Applications | Nothing |
| Provider manages | Infrastructure | Infrastructure, Runtime | Everything |
| Cost model | Pay per resource | Pay per usage | Subscription/Usage |
| Example | AWS S3 | Node.js, Express | MongoDB Atlas, Gmail |
| Flexibility | Very high | Medium | Low |
| Control | High | Medium | Low |
| Maintenance | User responsible | Shared | Provider responsible |

---

## Example Flow in Our App

### 1. User Registration (PaaS)
```
User → React Frontend → Express Server (PaaS)
        → Hash password (Node.js PaaS)
        → Save to MongoDB (SaaS)
```

### 2. Upload Document (IaaS + PaaS + SaaS)
```
User → React Frontend → Express Server (PaaS)
        → Receive file → AWS S3 Upload (IaaS)
        → Save metadata to MongoDB (SaaS)
        → Return confirmation
```

### 3. Download Document (IaaS + PaaS)
```
User → React Frontend → Express Server (PaaS)
        → Generate pre-signed URL from S3 (IaaS)
        → Return URL
        → Browser downloads directly from S3 (IaaS)
```

---

## Benefits of This Approach

✅ **Scalability** - Easily handle growing users and data  
✅ **Cost-effective** - Pay only for resources used  
✅ **Maintenance-free** - Providers handle updates and security  
✅ **Global availability** - Data accessible from anywhere  
✅ **Reliability** - Built-in redundancy and backups  
✅ **Security** - Professional-grade encryption and access controls  

---

## Summary

This medical document storage system effectively uses:
- **IaaS** for secure file storage (AWS S3)
- **PaaS** for application runtime (Node.js)
- **SaaS** for database management (MongoDB)

Together, they create a modern, scalable, and maintainable cloud application!
