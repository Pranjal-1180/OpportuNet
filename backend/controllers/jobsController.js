const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");
const User =require("../models/userModel")
//create job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('jobType', 'jobTypeName');
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};


exports.showJobs = async (req, res, next) => {
  try {
    // Enable search by keyword
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i", // Case-insensitive search
          },
        }
      : {};

    console.log("Keyword filter:", keyword);

    // Get all job type IDs
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    const ids = jobTypeCategory.map((cat) => cat._id);

    // Determine category filter
    const cat = req.query.cat;
    const categ = cat && cat !== "" ? cat : ids;
    
    // Get all unique job locations
    const jobByLocation = await Job.find({}, { location: 1 });
    const uniqueLocations = [...new Set(jobByLocation.map((val) => val.location))];
    const location = req.query.location;
    const locationFilter = location && location !== "" ? location : uniqueLocations;

    // Enable pagination
    const pageSize = Number(req.query.pageSize) || 5;
    const page = Number(req.query.pageNumber) || 1;

    // Filter jobs and count documents
    const queryFilter = {
      ...keyword,
      jobType: { $in: categ },
      location: { $in: locationFilter },
    };

    const count = await Job.countDocuments(queryFilter);

    console.log("Jobs count:", count);

    // Retrieve job data with pagination
    const jobs = await Job.find(queryFilter)
      .sort({ createdAt: -1 }) // Sort by creation date (latest first)
      .populate("jobType", "jobTypeName") // Populate jobType with jobTypeName
      .populate("user", "firstName") // Populate user with firstName
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    // Response payload
    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation: uniqueLocations,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    next(error);
  }
};

//delete job by id.
exports.deleteJob = async (req, res, next) => {
  try {
      const job = await Job.findByIdAndDelete(req.params.job_id);
      res.status(200).json({
          success: true,
          message: "job deleted."
      })
  } catch (error) {
      next(error);
  }
}



exports.getUsersByJobApplication = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        // Find users who applied for the job
        const users = await User.find({ "jobsHistory.job": jobId }).select("firstName lastName");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
