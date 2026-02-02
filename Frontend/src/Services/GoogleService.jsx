import axios from "axios";


const HandleGoogleLoginSuccess = async (credentialResponse) => {
    try {
    const backendURL = import.meta.env.VITE_API_URL;
      const idToken = credentialResponse.credential;

      const response = await axios.post(
        `${backendURL}/google-login`,
        { id_token: idToken }
      );
      console.log("Google Login response:", response.data);

      const { email, firstName} = response.data;

      localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        // localStorage.setItem('role', response.data.role)
        // localStorage.setItem('user_id', response.data.user_id)
        // localStorage.setItem("is_Verified", response.data.is_Verified)

      
      const username = firstName || email;
      localStorage.setItem("firstName", username);

      // Redirect based on role
      if(response.data.role === "admin"){
        navigate('/admin')
        }else{
            navigate('/Home')
        }
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
    }
  };

    // Google error callback
  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.");
  };
export default HandleGoogleLoginSuccess;