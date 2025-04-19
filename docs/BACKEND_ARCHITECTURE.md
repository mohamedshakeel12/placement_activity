# Backend Architecture Documentation

## Overview
This document outlines the backend architecture and implementation details of the Campus Placement Management System. The backend is built using Node.js with Express.js framework and MongoDB as the database, following a RESTful API architecture with JWT authentication.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Multer for local storage / AWS S3 for cloud storage
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest and Supertest

## Directory Structure
```
backend/
├── config/             # Configuration files
│   ├── database.js    # Database configuration
│   └── jwt.js         # JWT configuration
├── controllers/        # Request handlers
│   ├── auth.js        # Authentication controllers
│   ├── company.js     # Company-related controllers
│   ├── profile.js     # Profile management
│   └── upload.js      # File upload handlers
├── middleware/         # Custom middleware
│   ├── auth.js        # JWT authentication
│   ├── roles.js       # Role-based access control
│   └── upload.js      # File upload middleware
├── models/            # Database models
│   ├── User.js        # User model
│   ├── Company.js     # Company model
│   ├── Profile.js     # Profile model
│   └── Application.js # Job application model
├── routes/            # API routes
│   ├── auth.js        # Authentication routes
│   ├── company.js     # Company routes
│   └── profile.js     # Profile routes
├── services/          # Business logic
├── utils/            # Utility functions
└── app.js            # Application entry point
```

## Database Schema

### 1. User Schema
```javascript
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'placementOfficer'], required: true },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});
```

### 2. Profile Schema
```javascript
const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  personalInfo: {
    name: String,
    dateOfBirth: Date,
    gender: String,
    contactNumber: String,
    address: String
  },
  academicInfo: {
    branch: String,
    currentYear: Number,
    cgpa: Number,
    activeBacklogs: Number,
    batch: String
  },
  skills: [String],
  documents: {
    resume: {
      url: String,
      uploadedAt: Date
    },
    certificates: [{
      url: String,
      name: String,
      uploadedAt: Date
    }],
    offerLetter: {
      url: String,
      uploadedAt: Date
    }
  },
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]
});
```

### 3. Company Schema
```javascript
const companySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  industry: String,
  website: String,
  logo: String,
  eligibilityCriteria: {
    cgpa: Number,
    branches: [String],
    backlog: String
  },
  role: {
    position: String,
    type: String,
    package: String
  },
  rounds: [{
    name: String,
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Completed'] 
    }
  }],
  applicationDeadline: Date,
  status: { 
    type: String, 
    enum: ['Open', 'Closed', 'Upcoming'] 
  }
});
```

## API Endpoints

### Authentication Routes
```javascript
// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/register
router.post('/register', authController.register);

// GET /api/auth/verify
router.get('/verify', authMiddleware, authController.verifyToken);
```

### Company Routes
```javascript
// GET /api/companies
router.get('/', companyController.getAllCompanies);

// GET /api/companies/:id
router.get('/:id', companyController.getCompanyById);

// POST /api/companies
router.post('/', 
  authMiddleware, 
  rolesMiddleware(['placementOfficer']), 
  companyController.createCompany
);

// PUT /api/companies/:id
router.put('/:id',
  authMiddleware,
  rolesMiddleware(['placementOfficer']),
  companyController.updateCompany
);
```

### Profile Routes
```javascript
// GET /api/profile
router.get('/', authMiddleware, profileController.getProfile);

// PUT /api/profile
router.put('/', authMiddleware, profileController.updateProfile);

// POST /api/profile/documents
router.post('/documents',
  authMiddleware,
  uploadMiddleware.single('file'),
  profileController.uploadDocument
);
```

## Middleware Implementation

### 1. Authentication Middleware
```javascript
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

### 2. Role-based Access Control
```javascript
const rolesMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied' 
      });
    }
    next();
  };
};
```

## File Upload Implementation

### 1. Local Storage Configuration
```javascript
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});
```

## Error Handling

### 1. Global Error Handler
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      error: 'Authentication Error',
      message: err.message
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
});
```

## Security Implementations

1. **Password Hashing**
```javascript
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
```

2. **Input Sanitization**
```javascript
const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};
```

## Performance Optimizations

1. **Database Indexing**
```javascript
userSchema.index({ email: 1 });
companySchema.index({ name: 1, status: 1 });
profileSchema.index({ 'academicInfo.branch': 1, 'academicInfo.cgpa': 1 });
```

2. **Caching Implementation**
```javascript
const cache = require('memory-cache');

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = cache.get(key);
    
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};
```

## Testing Strategy

### 1. Unit Tests
```javascript
describe('User Model Test', () => {
  it('should validate required fields', async () => {
    const user = new User({});
    let err;
    try {
      await user.validate();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});
```

### 2. Integration Tests
```javascript
describe('Auth API', () => {
  it('should login user and return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
```

## Deployment Configuration

```javascript
// config/production.js
module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  },
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
};
```

## Conclusion
The backend architecture is designed with scalability, security, and maintainability in mind. It provides a robust foundation for the placement management system while following Node.js and Express.js best practices. The modular structure allows for easy extensions and modifications as the application grows. 