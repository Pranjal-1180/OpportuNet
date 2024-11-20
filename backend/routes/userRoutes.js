// const express = require('express');
// const router = express.Router();
// const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory,updateUserResume } = require('../controllers/userController');
// const { isAuthenticated, isAdmin } = require('../middleware/auth');
// const upload = require('../middleware/upload');

// //user routes

// // /api/allusers
// router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// // /api/user/id
// router.get('/user/:id', isAuthenticated, singleUser);
// // /api/user/edit/id
// router.put('/user/edit/:id', isAuthenticated, editUser);
// // /api/admin/user/delete/id
// router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
// // /api/user/jobhistory
// router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

// router.put('/api/user/uploadResume/:id', isAuthenticated,upload.single('resume'),updateUserResume);



// module.exports = router;

const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory, updateUserResume } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// User routes
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

// Corrected endpoint with leading slash
router.put('/user/uploadResume/:id', isAuthenticated, upload.single('resume'), (req, res) => {
    console.log("Received request to upload resume for userId:", req.params.id);
    updateUserResume(req, res); // Call your actual controller function
});

module.exports = router;
