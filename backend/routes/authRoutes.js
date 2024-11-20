const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');

//auth routes
// /api/signup
router.post('/signup',upload.single('resume'), signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);

module.exports = router;

