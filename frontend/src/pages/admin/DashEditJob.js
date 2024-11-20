import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { editSingleJobAction, jobLoadSingleAction } from '../../redux/actions/jobAction';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_JOB_RESET } from '../../redux/constants/jobconstant';

// Custom Material UI styles using sx-like structure
const styles = {
  formContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '4rem',
  },
  formStyle: {
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: '1.5rem',
    paddingBottom: '1rem',
  },
  formField: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  formButton: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '1rem',
  },
};

const DashEditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    available: '',
    jobType: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { singleJob } = useSelector((state) => state.singleJob);
  const { success } = useSelector((state) => state.updateJob);

  // Load job type and single job details
  useEffect(() => {
    dispatch(jobTypeLoadAction());
    if (id) {
      dispatch(jobLoadSingleAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleJob) {
      setFormValues({
        _id: singleJob._id,
        title: singleJob.title,
        description: singleJob.description,
        salary: singleJob.salary,
        location: singleJob.location,
        available: singleJob.available,
        jobType: singleJob.jobType ? singleJob.jobType._id : '',
      });
    }
  }, [singleJob]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: EDIT_JOB_RESET });
        navigate('/admin/jobs');
      }, 800);
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.title) errors.title = 'Title is required';
    if (!formValues.description) errors.description = 'Description is required';
    if (!formValues.salary) errors.salary = 'Salary is required';
    if (!formValues.location) errors.location = 'Location is required';
    if (!formValues.available) errors.available = 'Availability is required';
    if (!formValues.jobType) errors.jobType = 'Job type is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(editSingleJobAction(formValues));
    }
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.formStyle}>
        <h2 style={styles.formTitle}>Edit Job</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          style={styles.formField}
          value={formValues.title}
          onChange={handleChange}
        />
        {formErrors.title && <div style={styles.errorText}>{formErrors.title}</div>}

        <textarea
          name="description"
          placeholder="Description"
          style={styles.formField}
          value={formValues.description}
          onChange={handleChange}
        />
        {formErrors.description && <div style={styles.errorText}>{formErrors.description}</div>}

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          style={styles.formField}
          value={formValues.salary}
          onChange={handleChange}
        />
        {formErrors.salary && <div style={styles.errorText}>{formErrors.salary}</div>}

        <input
          type="text"
          name="location"
          placeholder="Location"
          style={styles.formField}
          value={formValues.location}
          onChange={handleChange}
        />
        {formErrors.location && <div style={styles.errorText}>{formErrors.location}</div>}

        <input
          type="text"
          name="available"
          placeholder="Available (true/false)"
          style={styles.formField}
          value={formValues.available}
          onChange={handleChange}
        />
        {formErrors.available && <div style={styles.errorText}>{formErrors.available}</div>}

        <select
          name="jobType"
          style={styles.formField}
          value={formValues.jobType}
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          {jobType &&
            jobType.map((type) => (
              <option key={type._id} value={type._id}>
                {type.jobTypeName}
              </option>
            ))}
        </select>
        {formErrors.jobType && <div style={styles.errorText}>{formErrors.jobType}</div>}

        <button type="submit" style={styles.formButton}>
          Edit Job
        </button>
      </form>
    </div>
  );
};

export default DashEditJob;

