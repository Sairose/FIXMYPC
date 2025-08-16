import User from "../models/UserModel.js"
import bcrypt from 'bcrypt';

//login-register-updateProfile

const signup = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  console.log(data);
  return await User.create({ ...data, password: hashedPassword });
}

const login = async ({ email, password, role }) => {
  //email exist
  const user = await User.findOne({ email, role });
  if (!user) return null;

  //password check
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  return isPasswordMatch ? user : null;

}

const updateProfile = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

const getProfile = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};


const getTechnicians = async ()=>{
  try{
    return await User.find({ role: 'technician' }).select('-password');
  }catch(err){
    throw new Error('Error fetching technicians');
  }
}



export default { signup, login, updateProfile, getProfile, getTechnicians };