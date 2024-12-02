const User = require("../models/userModel");
const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse");
const path = require('path');
const fs = require('fs');
// Load all users
exports.allUsers = async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//admin count
exports.adminCount = async (req, res, next) => {
  try {
    const adminCount = await User.find({ role: 1 }).countDocuments();
    res.status(200).json({
      success: true,
      adminCount,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Unable to fetch admin count', 500));  
  }
};


// Show single user
exports.singleUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id)
      .populate({
        path: 'jobsHistory.job', // Populating the job field inside jobsHistory
        model: 'Job', // The model to populate from
        select: 'title description salary location' // Choose the fields to populate
      });
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Edit user
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted",
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Create job history for user
exports.createUserJobsHistory = async (req, res, next) => {
  const { jobId } = req.body;

  try {
    // Find the current user
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return next(new ErrorResponse("You must log in", 401));
    }

    // Find the job by jobId
    const job = await Job.findById(jobId);
    if (!job) {
      return next(new ErrorResponse("Job not found", 404));
    }

    // Add the job reference to the user's job history
    const addJobHistory = {
      job: jobId,
      title: job.title,
      description: job.description,
      salary: job.salary,
      location: job.location,
    };
    currentUser.jobsHistory.push(addJobHistory);
    await currentUser.save();

    res.status(200).json({
      success: true,
      currentUser,
    });
    // next();
  } catch (error) {
    return next(error);
  }
};

// Update user resume
// exports.updateUserResume = async (req, res, next) => {
//   try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//           return next(new ErrorResponse("User not found", 404));
//       }
//       // Save the new resume path
//       const resumePath = req.file.path;

//       // If a previous resume exists, delete it
//       if (user.resume && fs.existsSync(user.resume)) {
//           fs.unlinkSync(user.resume);
//       }
//       // Update the user resume field
//       user.resume = resumePath;
//       await user.save();

//       res.status(200).json({
//           success: true,
//           message: "Resume updated successfully",
//           user
//       });
      
//   } catch (error) {
//       // return next(error);
//       console.error("Error updating resume:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.updateUserResume = async (req, res, next) => {
  try {
      const user = await User.findById(req.params.id);

      if (!user) {
          return next(new ErrorResponse("User not found", 404));
      }

      // Ensure a file was uploaded
      if (!req.file) {
          return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Normalize and save the new resume path
      const resumePath = path.posix.join('/uploads', path.basename(req.file.path));

      // Delete the previous resume if it exists
      if (user.resume) {
          const oldResumePath = path.join(process.cwd(), user.resume.replace(/\\/g, '/'));
          if (fs.existsSync(oldResumePath)) {
              fs.unlinkSync(oldResumePath);
          }
      }

      // Update the user with the new resume path
      user.resume = resumePath;
      await user.save();

      res.status(200).json({
          success: true,
          message: "Resume updated successfully",
          resume: user.resume,
      });
  } catch (error) {
      console.error("Error updating resume:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};