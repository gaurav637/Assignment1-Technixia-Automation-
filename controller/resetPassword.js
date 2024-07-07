import User from "../models/user.js";
import bcrypt from "bcrypt";

export const forgetPassword = async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;
        
        // Check if all required fields are provided
        console.log('username-> ',username);
        console.log('password-> ',password);
        console.log('newpas-> ',newPassword);
        if (!username || !password || !newPassword) {
            console.log('User did not provide all required information!');
            return res.status(400).json({ Message: "User did not provide all required information!" });
        }
        
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ Message: 'User not found' });
        }
        
        // Check if current password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log("Invalid current password");
            return res.status(400).json({ Message: "Invalid current password" });
        }
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword, salt);
        
        // Update the user's password
        await User.updateOne({ _id: user._id }, { password: hashNewPassword });
        console.log("User password updated");
        //res.status(200).json({Message: "User password updated Successfully.", Success: "True"});
        //Redirect to welcome page
        return res.redirect('/welcome');

    } catch (error) {
        console.log("Failed to update password", error);
        return res.status(500).json({ Message: "Failed to update password", error: error.message });
    }
};
