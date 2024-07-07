import User from "../models/user.js";

export const getSingleUser = async (req, res) => {
    try {
        const { username } = req.query; // Use req.query to get username from the query parameters
        if (!username) {
            console.log("Username not provided");
            return res.status(400).json({ Message: "Username not provided" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            console.log("Username not found");
            return res.status(404).json({ Message: "Username not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Failed to get user", error);
        res.status(500).json({ Message: "Failed to get User!" });
    }
}
