import axios from "axios";


const HandleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // credentialResponse.credential is the Google ID token
      const idToken = credentialResponse.credential;

      // Send ID token to your backend for verification
      const response = await axios.post(
        "http://localhost:3000/google-login",
        { id_token: idToken }
      );
      console.log("Google Login response:", response.data);

      // Your backend should return tokens & user info
      const { email, firstName} = response.data;

      // Store tokens/user data as desired. Here, we set "username" for Navbar.
      localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        // localStorage.setItem('role', response.data.role)
        // localStorage.setItem('user_id', response.data.user_id)
        // localStorage.setItem("is_Verified", response.data.is_Verified)

      // Set username (for example, use first_name or a combination)
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