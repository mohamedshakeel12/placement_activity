import StudentProfile from '../models/StudentProfile.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';

// Get student profile
export const getStudentProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the student profile
        const profile = await StudentProfile.findOne({ userId: id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Get applications for statistics
        const applications = await Application.find({ studentId: id });
        
        // Get job IDs from applications
        const jobIds = applications.map(app => app.jobId);
        
        // Get all jobs that the student has applied to
        const jobs = await Job.find({ _id: { $in: jobIds } });

        // Calculate statistics
        const registeredJobs = applications.length;
        const pendingApplications = applications.filter(app => app.status === 'Pending').length;
        const rejectedApplications = applications.filter(app => app.status === 'Rejected').length;

        // Format companies applied
        const appliedCompanies = applications.map(app => {
            const job = jobs.find(j => j._id.toString() === app.jobId.toString());
            return {
                name: job?.company || 'Unknown Company',
                status: app.status
            };
        });

        // Combine all data
        const responseData = {
            personalInfo: {
                name: profile.personalInfo.name,
                dateOfBirth: profile.personalInfo.dateOfBirth,
                gender: profile.personalInfo.gender,
                contactNumber: profile.personalInfo.contactNumber,
                address: profile.personalInfo.address
            },
            academicInfo: {
                branch: profile.academicInfo.branch,
                currentYear: profile.academicInfo.currentYear,
                cgpa: profile.academicInfo.cgpa,
                activeBacklogs: profile.academicInfo.activeBacklogs,
                batch: profile.academicInfo.batch
            },
            skills: profile.skills || [],
            registeredJobs,
            pendingApplications,
            missedOpportunities: rejectedApplications,
            appliedCompanies,
            resumeUrl: profile.resumeUrl,
            certifications: profile.certifications,
            offerLetterUrl: profile.resumeUrl // You might want to add a separate field for offer letter in your schema
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error in getStudentProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: id },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error in updateStudentProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Upload document
export const uploadDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const profile = await StudentProfile.findOne({ userId: id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update the appropriate document URL based on type
        switch (type) {
            case 'resume':
                profile.resumeUrl = file.path;
                break;
            case 'certificate':
                profile.certifications.push({
                    name: file.originalname,
                    url: file.path,
                    uploadedAt: new Date()
                });
                break;
            case 'offerLetter':
                profile.offerLetterUrl = file.path;
                break;
            default:
                return res.status(400).json({ message: 'Invalid document type' });
        }

        await profile.save();
        res.status(200).json({ message: 'Document uploaded successfully' });
    } catch (error) {
        console.error('Error in uploadDocument:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Remove document
export const removeDocument = async (req, res) => {
    try {
        const { id, type } = req.params;

        const profile = await StudentProfile.findOne({ userId: id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Remove the appropriate document based on type
        switch (type) {
            case 'resume':
                profile.resumeUrl = null;
                break;
            case 'certificate':
                // Remove the latest certificate
                profile.certifications.pop();
                break;
            case 'offerLetter':
                profile.offerLetterUrl = null;
                break;
            default:
                return res.status(400).json({ message: 'Invalid document type' });
        }

        await profile.save();
        res.status(200).json({ message: 'Document removed successfully' });
    } catch (error) {
        console.error('Error in removeDocument:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 