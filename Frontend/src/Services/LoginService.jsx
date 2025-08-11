import axios from 'axios'

const Login = async (email, password, navigate) => {
    try{
        let response = await axios.post("https://api-users-snowy.vercel.app/api/registers", 
            {
            email: email,
            password: password
            },
        )
        localStorage.setItem("id", response.data.id)
        localStorage.setItem('email', response.data.email)
        if(response.data.role === "admin"){
            navigate('/admin')
        }else{
            navigate('/')
        }
    }catch(e){
        console.log(e)
    }
}

export default Login
