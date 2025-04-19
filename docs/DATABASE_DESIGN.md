# Database Design Documentation

## Overview
This document outlines the database design for the Campus Placement Management System. The system uses MongoDB as the primary database, implementing a document-based data model with references between collections.

## Database Collections

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  email: String,          // Unique, Required, Indexed
  password: String,       // Hashed, Required
  role: String,          // Enum: ['student', 'placementOfficer']
  profile: ObjectId,     // Reference to Profile collection
  createdAt: Date,
  lastLogin: Date,
  isActive: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}

// Indexes
{
  email: 1,              // Unique index
  role: 1                // Regular index
}
```

### 2. Profiles Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,        // Reference to Users collection
  personalInfo: {
    name: String,
    dateOfBirth: Date,
    gender: String,      // Enum: ['Male', 'Female', 'Other']
    contactNumber: String,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  academicInfo: {
    branch: String,      // Enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', ...]
    currentYear: Number,
    cgpa: Number,        // Range: 0-10
    activeBacklogs: Number,
    batch: String,       // Format: "YYYY-YYYY"
    semester: Number
  },
  skills: [{
    name: String,
    level: String,       // Enum: ['Beginner', 'Intermediate', 'Advanced']
    yearsOfExperience: Number
  }],
  documents: {
    resume: {
      url: String,
      uploadedAt: Date,
      filename: String,
      size: Number       // in bytes
    },
    certificates: [{
      url: String,
      name: String,
      uploadedAt: Date,
      filename: String,
      size: Number,
      type: String      // e.g., 'technical', 'language', 'achievement'
    }],
    offerLetter: {
      url: String,
      uploadedAt: Date,
      filename: String,
      size: Number,
      company: ObjectId  // Reference to Companies collection
    }
  },
  applications: [ObjectId], // Array of references to Applications collection
  placementStatus: {
    isPlaced: Boolean,
    company: ObjectId,   // Reference to Companies collection
    package: Number,     // Annual package in LPA
    joiningDate: Date
  },
  updatedAt: Date
}

// Indexes
{
  'user': 1,             // Unique index
  'academicInfo.branch': 1,
  'academicInfo.cgpa': 1,
  'academicInfo.batch': 1,
  'placementStatus.isPlaced': 1
}
```

### 3. Companies Collection
```javascript
{
  _id: ObjectId,
  name: String,          // Required
  description: String,
  industry: String,
  website: String,
  logo: String,         // URL to logo image
  eligibilityCriteria: {
    cgpa: Number,
    branches: [String],
    backlog: {
      allowed: Boolean,
      maximum: Number
    },
    batch: [String],    // Eligible graduation years
    otherRequirements: [String]
  },
  roles: [{
    position: String,
    type: String,       // Enum: ['Full-time', 'Internship']
    package: {
      min: Number,      // in LPA
      max: Number,      // in LPA
      breakup: {
        base: Number,
        variables: Number,
        benefits: Number
      }
    },
    vacancies: Number,
    locations: [String]
  }],
  rounds: [{
    name: String,
    description: String,
    status: String,     // Enum: ['Pending', 'In Progress', 'Completed']
    scheduledDate: Date,
    duration: Number,   // in minutes
    venue: String,
    instructions: String
  }],
  timeline: {
    registrationStart: Date,
    registrationEnd: Date,
    processStart: Date,
    processEnd: Date
  },
  status: String,       // Enum: ['Open', 'Closed', 'Upcoming']
  contacts: [{
    name: String,
    designation: String,
    email: String,
    phone: String
  }],
  statistics: {
    totalApplications: Number,
    shortlisted: Number,
    selected: Number,
    averagePackage: Number
  },
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{
  name: 1,
  status: 1,
  'eligibilityCriteria.cgpa': 1,
  'eligibilityCriteria.branches': 1,
  'timeline.registrationEnd': 1
}
```

### 4. Applications Collection
```javascript
{
  _id: ObjectId,
  student: ObjectId,    // Reference to Profiles collection
  company: ObjectId,    // Reference to Companies collection
  role: {
    position: String,
    package: Number
  },
  status: String,       // Enum: ['Applied', 'Shortlisted', 'In Process', 'Selected', 'Rejected']
  roundsProgress: [{
    roundId: ObjectId,
    status: String,     // Enum: ['Pending', 'Cleared', 'Failed']
    score: Number,
    feedback: String,
    interviewDate: Date,
    interviewer: String
  }],
  documents: {
    resume: String,     // URL
    offerLetter: String // URL
  },
  timeline: {
    appliedAt: Date,
    updatedAt: Date,
    resultDate: Date
  },
  withdrawnAt: Date,    // If student withdraws application
  remarks: String
}

// Indexes
{
  student: 1,
  company: 1,
  status: 1,
  'timeline.appliedAt': 1
}
```

### 5. Notifications Collection
```javascript
{
  _id: ObjectId,
  recipient: ObjectId,  // Reference to Users collection
  type: String,         // Enum: ['application', 'round', 'result', 'system']
  title: String,
  message: String,
  relatedTo: {
    company: ObjectId,  // Reference to Companies collection
    application: ObjectId // Reference to Applications collection
  },
  isRead: Boolean,
  createdAt: Date
}

// Indexes
{
  recipient: 1,
  isRead: 1,
  createdAt: 1
}
```

## Relationships

1. **One-to-One**
   - User ↔ Profile
   - Application ↔ Offer Letter

2. **One-to-Many**
   - Profile → Documents
   - Company → Roles
   - Company → Rounds
   - Application → Round Progress

3. **Many-to-Many**
   - Profile ↔ Companies (through Applications)
   - Companies ↔ Branches (through eligibilityCriteria)

## Data Validation Rules

### 1. User Collection
```javascript
{
  email: {
    validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  password: {
    minLength: 8,
    requireSpecialChar: true,
    requireNumber: true
  }
}
```

### 2. Profile Collection
```javascript
{
  'academicInfo.cgpa': {
    min: 0,
    max: 10
  },
  'academicInfo.currentYear': {
    min: 1,
    max: 4
  },
  documents: {
    fileSize: {
      max: 5 * 1024 * 1024 // 5MB
    },
    allowedTypes: ['application/pdf']
  }
}
```

### 3. Company Collection
```javascript
{
  'eligibilityCriteria.cgpa': {
    min: 0,
    max: 10
  },
  'roles.package': {
    min: 0
  },
  timeline: {
    validator: function(timeline) {
      return timeline.registrationEnd > timeline.registrationStart &&
             timeline.processEnd > timeline.processStart;
    }
  }
}
```

## Indexing Strategy

### 1. Performance Indexes
```javascript
// Frequently queried fields
db.users.createIndex({ "email": 1 }, { unique: true });
db.profiles.createIndex({ "academicInfo.cgpa": 1, "academicInfo.branch": 1 });
db.companies.createIndex({ "status": 1, "timeline.registrationEnd": 1 });
```

### 2. Compound Indexes
```javascript
// For complex queries
db.applications.createIndex({ 
  "company": 1, 
  "status": 1, 
  "timeline.appliedAt": -1 
});

db.profiles.createIndex({ 
  "academicInfo.batch": 1, 
  "academicInfo.cgpa": -1 
});
```

### 3. Text Indexes
```javascript
// For search functionality
db.companies.createIndex({ 
  "name": "text", 
  "description": "text" 
});
```

## Data Migration Strategy

1. **Version Control**
```javascript
{
  schemaVersion: Number,
  lastMigration: Date,
  migrations: [{
    version: Number,
    description: String,
    appliedAt: Date
  }]
}
```

2. **Migration Scripts**
```javascript
// Example migration script
async function migrateToV2() {
  await db.profiles.updateMany(
    { schemaVersion: 1 },
    { 
      $set: { 
        "academicInfo.semester": 1,
        schemaVersion: 2
      }
    }
  );
}
```

## Backup Strategy

1. **Regular Backups**
```bash
# Daily backups
mongodump --db placement_system --out /backup/daily/$(date +%Y%m%d)

# Weekly backups with compression
mongodump --db placement_system --archive=/backup/weekly/$(date +%Y%m%d).gz --gzip
```

2. **Retention Policy**
- Daily backups: 7 days retention
- Weekly backups: 4 weeks retention
- Monthly backups: 12 months retention

## Performance Considerations

1. **Document Size Limits**
- Keep documents under 16MB
- Use GridFS for files larger than 16MB

2. **Batch Operations**
```javascript
// Use bulk operations for multiple updates
const bulk = db.profiles.initializeOrderedBulkOp();
profiles.forEach(profile => {
  bulk.find({ _id: profile._id }).updateOne({
    $set: { updatedAt: new Date() }
  });
});
bulk.execute();
```

3. **Query Optimization**
```javascript
// Use projection to limit fields
db.profiles.find(
  { "academicInfo.batch": "2023-2024" },
  { "personalInfo.name": 1, "academicInfo": 1 }
);

// Use aggregation for complex queries
db.applications.aggregate([
  { $match: { status: "Selected" } },
  { $group: { 
    _id: "$company",
    totalSelected: { $sum: 1 },
    avgPackage: { $avg: "$role.package" }
  }}
]);
```

## Conclusion
This database design provides a scalable and efficient structure for the Campus Placement Management System. The design focuses on:
- Optimal data organization
- Efficient querying
- Data integrity
- Performance optimization
- Scalability
- Maintainability 