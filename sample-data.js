// Clear existing data
db.users.drop();
db.studentprofiles.drop();
db.companies.drop();
db.jobs.drop();
db.applications.drop();

// Create Users
const users = db.users.insertMany([
  {
    email: "admin@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "admin",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Students
  {
    email: "john.doe@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "student",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "jane.smith@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "student",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "mike.wilson@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "student",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "sarah.parker@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "student",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Mentors
  {
    email: "mentor.tech@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "mentor",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "mentor.core@college.edu",
    password: "$2a$10$XOPbrlUKSqIyYGUVxc.Rh.t7/dtD9sGM/O1D3.wh.4IX/NouBkjie",
    role: "mentor",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create Student Profiles
const students = [
  {
    userId: users.insertedIds[1],
    personalInfo: {
      name: "John Doe",
      dateOfBirth: new Date("2000-01-15"),
      gender: "Male",
      contactNumber: "+1234567890",
      address: "123 College Street"
    },
    academicInfo: {
      branch: "Computer Science",
      currentYear: 4,
      cgpa: 8.5,
      activeBacklogs: 0,
      batch: "2024"
    },
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    certifications: [{
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: new Date("2023-06-15"),
      credentialUrl: "https://aws.amazon.com/certification/12345"
    }],
    projects: [{
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform",
      technologies: ["React", "Node.js", "MongoDB"],
      url: "https://github.com/johndoe/ecommerce"
    }],
    resumeUrl: "https://storage.example.com/resumes/johndoe.pdf",
    isPlaced: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: users.insertedIds[2],
    personalInfo: {
      name: "Jane Smith",
      dateOfBirth: new Date("2001-03-20"),
      gender: "Female",
      contactNumber: "+1234567891",
      address: "456 University Ave"
    },
    academicInfo: {
      branch: "Information Technology",
      currentYear: 4,
      cgpa: 9.2,
      activeBacklogs: 0,
      batch: "2024"
    },
    skills: ["Python", "Machine Learning", "Data Science", "SQL"],
    certifications: [{
      name: "Google Data Analytics",
      issuer: "Google",
      date: new Date("2023-08-20"),
      credentialUrl: "https://google.com/certificates/12345"
    }],
    projects: [{
      title: "AI Image Recognition",
      description: "Deep learning model for image classification",
      technologies: ["Python", "TensorFlow", "OpenCV"],
      url: "https://github.com/janesmith/ai-vision"
    }],
    resumeUrl: "https://storage.example.com/resumes/janesmith.pdf",
    isPlaced: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: users.insertedIds[3],
    personalInfo: {
      name: "Mike Wilson",
      dateOfBirth: new Date("2000-11-05"),
      gender: "Male",
      contactNumber: "+1234567892",
      address: "789 Tech Road"
    },
    academicInfo: {
      branch: "Electronics",
      currentYear: 4,
      cgpa: 8.0,
      activeBacklogs: 0,
      batch: "2024"
    },
    skills: ["VLSI", "Embedded Systems", "C++", "IoT"],
    certifications: [{
      name: "IoT Specialist",
      issuer: "Cisco",
      date: new Date("2023-07-10"),
      credentialUrl: "https://cisco.com/certificates/12345"
    }],
    projects: [{
      title: "Smart Home System",
      description: "IoT-based home automation system",
      technologies: ["Arduino", "Raspberry Pi", "C++"],
      url: "https://github.com/mikewilson/smart-home"
    }],
    resumeUrl: "https://storage.example.com/resumes/mikewilson.pdf",
    isPlaced: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: users.insertedIds[4],
    personalInfo: {
      name: "Sarah Parker",
      dateOfBirth: new Date("2001-06-25"),
      gender: "Female",
      contactNumber: "+1234567893",
      address: "321 Engineering Lane"
    },
    academicInfo: {
      branch: "Computer Science",
      currentYear: 4,
      cgpa: 8.8,
      activeBacklogs: 0,
      batch: "2024"
    },
    skills: ["Java", "Spring Boot", "Angular", "MySQL"],
    certifications: [{
      name: "Oracle Java Certification",
      issuer: "Oracle",
      date: new Date("2023-09-01"),
      credentialUrl: "https://oracle.com/certificates/12345"
    }],
    projects: [{
      title: "Hospital Management System",
      description: "Full-stack application for hospital management",
      technologies: ["Java", "Spring Boot", "Angular"],
      url: "https://github.com/sarahparker/hospital-mgmt"
    }],
    resumeUrl: "https://storage.example.com/resumes/sarahparker.pdf",
    isPlaced: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

db.studentprofiles.insertMany(students);

// Create Companies
const companies = db.companies.insertMany([
  {
    name: "Tech Solutions Inc",
    description: "Leading software development company",
    industry: "Information Technology",
    website: "https://techsolutions.example.com",
    contactInfo: {
      name: "Jane Smith",
      email: "hr@techsolutions.example.com",
      phone: "+1987654321",
      designation: "HR Manager"
    },
    placementHistory: [{
      year: 2023,
      studentsHired: 5,
      averagePackage: 800000
    }],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "DataMinds Analytics",
    description: "Data analytics and AI solutions provider",
    industry: "Data Science",
    website: "https://dataminds.example.com",
    contactInfo: {
      name: "Robert Johnson",
      email: "hr@dataminds.example.com",
      phone: "+1987654322",
      designation: "Talent Acquisition Lead"
    },
    placementHistory: [{
      year: 2023,
      studentsHired: 3,
      averagePackage: 1000000
    }],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Quantum Electronics",
    description: "Innovation in electronics and IoT",
    industry: "Electronics",
    website: "https://quantum.example.com",
    contactInfo: {
      name: "Mary Williams",
      email: "hr@quantum.example.com",
      phone: "+1987654323",
      designation: "HR Director"
    },
    placementHistory: [{
      year: 2023,
      studentsHired: 4,
      averagePackage: 750000
    }],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Global Systems Ltd",
    description: "Enterprise software solutions",
    industry: "Information Technology",
    website: "https://globalsys.example.com",
    contactInfo: {
      name: "David Brown",
      email: "hr@globalsys.example.com",
      phone: "+1987654324",
      designation: "Recruitment Manager"
    },
    placementHistory: [{
      year: 2023,
      studentsHired: 6,
      averagePackage: 850000
    }],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create Jobs
const jobs = db.jobs.insertMany([
  {
    companyId: companies.insertedIds[0],
    title: "Software Developer",
    description: "Looking for talented software developers",
    requirements: [
      "B.Tech in Computer Science",
      "Strong programming skills",
      "Good communication"
    ],
    eligibilityCriteria: {
      minimumCgpa: 7.5,
      allowedBranches: ["Computer Science", "Information Technology"],
      maximumBacklogs: 0,
      batch: "2024"
    },
    package: {
      ctc: 800000,
      breakup: "Base: 600000, Benefits: 200000"
    },
    deadline: new Date("2024-12-31"),
    status: "active",
    maxPositions: 10,
    filledPositions: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    companyId: companies.insertedIds[1],
    title: "Data Scientist",
    description: "Join our data science team",
    requirements: [
      "Strong background in Machine Learning",
      "Python expertise",
      "Statistical knowledge"
    ],
    eligibilityCriteria: {
      minimumCgpa: 8.0,
      allowedBranches: ["Computer Science", "Information Technology", "Electronics"],
      maximumBacklogs: 0,
      batch: "2024"
    },
    package: {
      ctc: 1000000,
      breakup: "Base: 750000, Benefits: 250000"
    },
    deadline: new Date("2024-11-30"),
    status: "active",
    maxPositions: 5,
    filledPositions: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    companyId: companies.insertedIds[2],
    title: "Hardware Engineer",
    description: "VLSI and embedded systems position",
    requirements: [
      "B.Tech in Electronics",
      "VLSI knowledge",
      "Embedded systems experience"
    ],
    eligibilityCriteria: {
      minimumCgpa: 7.0,
      allowedBranches: ["Electronics"],
      maximumBacklogs: 0,
      batch: "2024"
    },
    package: {
      ctc: 750000,
      breakup: "Base: 600000, Benefits: 150000"
    },
    deadline: new Date("2024-10-31"),
    status: "active",
    maxPositions: 8,
    filledPositions: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    companyId: companies.insertedIds[3],
    title: "Full Stack Developer",
    description: "Enterprise application development",
    requirements: [
      "Java/Spring Boot expertise",
      "Frontend frameworks",
      "Database design"
    ],
    eligibilityCriteria: {
      minimumCgpa: 7.5,
      allowedBranches: ["Computer Science", "Information Technology"],
      maximumBacklogs: 0,
      batch: "2024"
    },
    package: {
      ctc: 850000,
      breakup: "Base: 650000, Benefits: 200000"
    },
    deadline: new Date("2024-11-15"),
    status: "active",
    maxPositions: 12,
    filledPositions: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create Applications
db.applications.insertMany([
  {
    jobId: jobs.insertedIds[0],
    studentId: db.studentprofiles.findOne({ "personalInfo.name": "John Doe" })._id,
    status: "applied",
    interviewSchedule: {
      date: new Date("2024-03-15"),
      time: "10:00 AM",
      location: "Online",
      type: "online"
    },
    feedback: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    jobId: jobs.insertedIds[1],
    studentId: db.studentprofiles.findOne({ "personalInfo.name": "Jane Smith" })._id,
    status: "shortlisted",
    interviewSchedule: {
      date: new Date("2024-03-20"),
      time: "2:00 PM",
      location: "Online",
      type: "online"
    },
    feedback: "Good technical skills",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    jobId: jobs.insertedIds[2],
    studentId: db.studentprofiles.findOne({ "personalInfo.name": "Mike Wilson" })._id,
    status: "applied",
    interviewSchedule: null,
    feedback: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    jobId: jobs.insertedIds[3],
    studentId: db.studentprofiles.findOne({ "personalInfo.name": "Sarah Parker" })._id,
    status: "interviewed",
    interviewSchedule: {
      date: new Date("2024-03-10"),
      time: "11:30 AM",
      location: "Company Office",
      type: "offline"
    },
    feedback: "Excellent problem-solving skills",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Add placement statistics
db.placementStats.insertOne({
  year: 2024,
  totalStudents: 800,
  studentsPlaced: 450,
  companies: 85,
  offers: 520,
  students: 500,
  averageCTC: 8.5,
  packageDistribution: [
    { count: 200, range: "3-5 LPA", package: "3-5 LPA" },
    { count: 100, range: "5-9 LPA", package: "5-9 lpa" },
    { count: 75, range: "10-16 LPA", package: "10-16 lpa" },
    { count: 25, range: "16+ LPA", package: "16 lpa above" }
  ],
  upcomingCompanies: [
    {
      date: new Date("2024-02-01"),
      company: "XYZ",
      role: "core",
      position: "developer",
      status: "Apply"
    },
    {
      date: new Date("2024-02-01"),
      company: "XYZ",
      role: "IT",
      position: "developer",
      status: "Apply"
    }
  ]
}); 