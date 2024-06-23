const User = require('../model/user.model');
const userController = {};

// Register User
userController.registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Input validation
    if (!username.trim() || !email.trim() || !password.trim()) {
        return res.status(400).send("All fields are required");
    } else if (password.length < 4) {
        return res.status(400).send("Password is too short");
    }

    try {
        // Check if user already exists
        const existUser = await User.findOne({ email }).lean().exec();
        if (existUser) {
            return res.status(400).send("User already exists");
        }

        // Create new user
        const user = await User.create({ username, email, password });
        if (!user) {
            return res.status(400).send("Something went wrong");
        } else {
            return res.status(201).send("User created successfully");
        }
    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
};

// Login User
userController.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Input validation
    if (!email.trim() || !password.trim()) {
        return res.status(400).send("All fields are required");
    }

    try {
        // Authenticate user and generate token
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token, { httpOnly: true }).send("Login successful");
    } catch (error) {
        return res.render("login", { error: "Invalid email or password" });
    }
};

module.exports = userController;
