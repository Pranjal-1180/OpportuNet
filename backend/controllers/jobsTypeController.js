const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create job category
exports.createJobType = async (req, res, next) => {
  try {
    const jobT = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      jobT,
    });
  } catch (error) {
    next(error);
  }
};

//all jobs category
exports.allJobsType = async (req, res, next) => {
  try {
    const jobT = await JobType.find();
    res.status(200).json({
      success: true,
      jobT,
    });
  } catch (error) {
    next(error);
  }
};

//update job type
exports.updateJobType = async (req, res, next) => {
  try {
      const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
      res.status(200).json({
          success: true,
          jobT,
      })
  } catch (error) {
      next(error);
  }
}


exports.deleteJobType = async (req, res, next) => {
  console.log(`Deleting job type with ID: ${req.params.type_id}`);
  try {
    const jobT = await JobType.findByIdAndDelete(req.params.type_id);
    
    if (!jobT) {
      console.log("Job type not found");
      return res.status(404).json({
        success: false,
        message: "Job type not found"
      });
    }

    console.log("Job type deleted");
    res.status(200).json({
      success: true,
      message: "Job type deleted"
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    next(new ErrorResponse("server error", 500));
  }
}
