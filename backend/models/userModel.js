
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import Schema from mongoose
const Schema = mongoose.Schema; 

// Define jobHistorySchema
const jobHistorySchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: 'Job' }, // Reference to Job model
    title: String,
    description: String,
    salary: String,
    location: String,
});

// Define userSchema
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) characters'],
    },
    education:{
        type: String,
        trim: true,
        // required: [true, 'education is required'],
    },

    percentage:{
        type: Number,
        trim: true,
        // required: [true, 'percentage is required'],
    },
    address:{
        type: String,
        trim: true,
        required: [true, 'address is required'],
    },
    phone:{
        type: Number,
        trim: true,
        required: [true, 'phone no. is required'],
    },
    resume: {
        type: String,
        trim: true,
        default: null,
        // Optional validation to ensure only certain file types (e.g., PDFs)
        match: [/\.pdf$/, 'Please upload a valid PDF file'],
    },
   
    jobsHistory: [jobHistorySchema],
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();  // Add return to prevent further execution
    }
    this.password = await bcrypt.hash(this.password, 10);
    next(); // Call next after hashing
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

module.exports = mongoose.model("User", userSchema);
