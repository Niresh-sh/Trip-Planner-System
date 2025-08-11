import axios from 'axios'
const fetchData = async (url) => {
    try{
        let response = await axios.get(url)
        return response
    }catch(e){
        console.log(e)
    }
}

export default fetchData
