import userService from "../services/userService.js";
import { generateToken } from "../utils/JWTtoken.js";

//login-register-updateProfile


const signup = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (req.file) {
      // This will contain the Cloudinary image URL
      req.body.image = req.file.path;
    }

    const user = await userService.signup(req.body);

    const token = generateToken(user);

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({ message: 'Registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: 'Error in signup controller', message: err.message });
  }
};


const login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        if (!user) return res.status(401).json({ message: 'invalid credential' });

        //generate token 
        const token = generateToken(user);

        //store in cookies
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).json({ error: 'error in logincontroller', message: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.user; // Comes from authMiddleware
    const user = await userService.getProfile(id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

const getTechnicians = async (req, res) => {
    try {
        const technicians = await userService.getTechnicians();
        res.status(200).json(technicians || []);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching technicians' });
    }
};




export default { signup, login, updateProfile, getProfile, getTechnicians };