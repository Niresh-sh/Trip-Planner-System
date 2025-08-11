import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterService = async (firstName, lastName, email, password, confirmPassword, navigate) => {
  try {
    let response = await axios.post("http://localhost:3000/api/users/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      navigate
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("User Registered Successfully");
    } else {
      toast.error("User could not be registered");
      
    }
  } catch (e) {
    console.error(e);
    toast.error("Registration failed: " + (e.response?.data?.message || e.message));
  }
};


export default RegisterService;
