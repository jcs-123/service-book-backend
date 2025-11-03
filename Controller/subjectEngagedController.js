const SubjectEngaged = require('../model/SubjectEngaged');

// Create or update subjects engaged
exports.createOrUpdateSubjects = async (req, res) => {
    try {
        const { subjects, userId } = req.body;

        if (!subjects || !Array.isArray(subjects)) {
            return res.status(400).json({
                success: false,
                message: "Subjects array is required"
            });
        }

        // Validate required fields
        for (let subject of subjects) {
            if (!subject.academicYear || !subject.subjectCode || !subject.subjectName) {
                return res.status(400).json({
                    success: false,
                    message: "Academic Year, Subject Code, and Subject Name are required for all subjects"
                });
            }
        }

        const userIdentifier = userId || `user-${Date.now()}`;

        // Check if record already exists for this user
        let existingRecord = await SubjectEngaged.findOne({ userId: userIdentifier });

        if (existingRecord) {
            // Update existing record
            existingRecord.subjects = subjects;
            await existingRecord.save();
            
            return res.status(200).json({
                success: true,
                message: "Subjects updated successfully",
                data: existingRecord
            });
        } else {
            // Create new record
            const newSubjects = new SubjectEngaged({
                userId: userIdentifier,
                subjects
            });

            await newSubjects.save();

            return res.status(201).json({
                success: true,
                message: "Subjects saved successfully",
                data: newSubjects
            });
        }
    } catch (error) {
        console.error("Error saving subjects:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get subjects by user ID
exports.getSubjectsByUserId = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const subjects = await SubjectEngaged.findOne({ userId });

        if (!subjects) {
            return res.status(404).json({
                success: false,
                message: "No subjects found for this user"
            });
        }

        return res.status(200).json({
            success: true,
            data: subjects
        });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
    try {
        const allSubjects = await SubjectEngaged.find();
        
        return res.status(200).json({
            success: true,
            data: allSubjects
        });
    } catch (error) {
        console.error("Error fetching all subjects:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};