

const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory, updateUserResume,adminCount } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// User routes
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);
router.get('/users/admin-count', isAuthenticated,adminCount);


// Corrected endpoint with leading slash
router.put('/user/uploadResume/:id', isAuthenticated, upload.single('resume'), (req, res) => {
    // console.log("Received request to upload resume for userId:", req.params.id);
    updateUserResume(req, res); // Call your actual controller function
});

module.exports = router;
