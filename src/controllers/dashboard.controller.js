import PlacementStats from '../models/PlacementStats.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Get latest placement stats
    const stats = await PlacementStats.findOne().sort({ year: -1 });
    
    if (!stats) {
      // Return default data structure
      return res.json({
        stats: {
          year: new Date().getFullYear(),
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
        }
      });
    }

    // Get upcoming companies/drives
    const upcomingDrives = await Job.find({ 
      status: 'active',
      deadline: { $gt: new Date() }
    })
    .populate('companyId', 'name')  // Only populate the name field
    .limit(5)
    .select('companyId title deadline package.ctc');

    // Get recent applications
    const recentApplications = await Application.find()
    .populate({
      path: 'jobId',
      select: 'companyId title',
      populate: {
        path: 'companyId',
        select: 'name'
      }
    })
    .populate('studentId', 'personalInfo.name')
    .sort({ createdAt: -1 })
    .limit(5);

    res.json({
      stats,
      upcomingDrives: upcomingDrives.map(drive => ({
        company: drive.companyId?.name || 'Unknown Company',
        position: drive.title,
        deadline: drive.deadline,
        package: drive.package?.ctc || 0
      })),
      recentApplications: recentApplications.map(app => ({
        student: app.studentId?.personalInfo?.name || 'Unknown Student',
        company: app.jobId?.companyId?.name || 'Unknown Company',
        status: app.status,
        date: app.createdAt
      }))
    });
  } catch (error) {
    console.error('Dashboard Controller Error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard data',
      error: error.message 
    });
  }
}; 